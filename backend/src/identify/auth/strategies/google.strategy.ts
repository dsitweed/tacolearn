import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-google-oauth20';

import { AuthService } from '../auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
    config: ConfigService,
  ) {
    super({
      clientID: config.get('GOOGLE_CLIENT_ID'),
      clientSecret: config.get('GOOGLE_CLIENT_SECRET'),
      callbackURL: `${process.env.APP_URL}/api/v1/auth/google/callback`,
      scope: ['profile', 'email'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    const email = profile.emails?.[0]?.value;
    const googleId = profile.id;

    if (!email) {
      throw new Error('Google account must have a verified email');
    }

    const user = await this.authService.validateOrRegisterGoogleUser(
      googleId,
      email,
      profile.displayName,
      profile.photos?.[0]?.value,
    );

    if (!user) {
      throw new Error('Unable to authenticate with Google');
    }

    return user;
  }
}
