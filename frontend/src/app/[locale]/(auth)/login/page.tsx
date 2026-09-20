'use client';

import { useIntlayer } from 'next-intlayer';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function LoginPage() {
  const content = useIntlayer('loginPage');

  const handleGoogleLogin = () => {
    window.location.href = '/api/v1/auth/google';
  };

  return (
    <div className="flex min-h-screen bg-surface-container-lowest">
      {/* Left: Hero */}
      <div className="relative hidden flex-1 bg-surface-container-lowest overflow-hidden lg:flex">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5" />
        <div className="relative flex w-full flex-col justify-between p-16">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-lg bg-primary">
              <span className="text-xl font-bold text-on-primary">TL</span>
            </div>
            <span className="text-2xl font-heading font-bold text-on-surface dark:text-white">
              TacoLearn
            </span>
          </div>

          <div className="flex max-w-md flex-col gap-6">
            <h1 className="font-heading text-4xl font-bold tracking-tight text-on-surface dark:text-white">
              {content.title}
            </h1>
            <p className="text-base text-on-surface-variant">
              {content.subtitle}
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <div className="flex -space-x-2">
                <div className="size-10 rounded-full bg-primary/20 border-2 border-white dark:border-slate-800" />
                <div className="size-10 rounded-full bg-secondary/20 border-2 border-white dark:border-slate-800" />
                <div className="size-10 rounded-full bg-tertiary/20 border-2 border-white dark:border-slate-800" />
              </div>
              <p className="text-xs font-semibold text-on-surface-variant">
                {content.community}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right: Login card */}
      <div className="flex flex-1 items-center justify-center bg-white p-6 dark:bg-slate-900">
        <Card className="w-full max-w-md shrink-0 rounded-2xl border-slate-100 bg-surface-container-lowest shadow-xs dark:border-slate-800 dark:bg-slate-800">
          <CardHeader className="space-y-1">
            <CardTitle className="font-heading text-2xl font-bold text-on-surface dark:text-white">
              {content.title}
            </CardTitle>
            <CardDescription className="text-on-surface-variant">
              {content.subtitle}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-3">
              <Button
                size="lg"
                onClick={handleGoogleLogin}
                className="bg-primary text-on-primary hover:bg-primary-container flex h-12 w-full items-center justify-center gap-3 rounded-xl px-6 text-sm font-semibold shadow-xs"
              >
                <svg className="size-5" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                {content.googleButton}
              </Button>

              <p className="text-center text-xs text-on-surface-variant">
                {content.continueWithGoogle}
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-sm text-on-surface-variant">
              {content.noAccount}{' '}
              <a
                href="/register"
                className="font-medium text-primary hover:underline dark:text-white"
              >
                {content.createAccount}
              </a>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
