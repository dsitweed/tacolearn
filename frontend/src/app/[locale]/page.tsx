import {
  CatchUpFeatureSection,
  CtaBannerSection,
  ForSchoolsSection,
  HeroSection,
  HowItWorksSection,
  JlptPathsSection,
  LandingFooter,
  LandingHeader,
  SocialProofSection,
  WhyTacoLearnSection,
} from '@/features/landing';

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-white text-slate-900 antialiased dark:bg-slate-950 dark:text-slate-100">
      <LandingHeader />
      <main className="flex-1">
        <HeroSection />
        <SocialProofSection />
        <WhyTacoLearnSection />
        <HowItWorksSection />
        <JlptPathsSection />
        <ForSchoolsSection />
        <CatchUpFeatureSection />
        <CtaBannerSection />
      </main>
      <LandingFooter />
    </div>
  );
}
