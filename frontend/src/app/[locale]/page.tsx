import Link from 'next/link';

import { Button } from '@/components/ui';

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 p-8 text-center">
      <h1 className="text-4xl font-bold tracking-tight">TacoLearn</h1>
      <p className="text-muted-foreground max-w-md">
        Application template. Start building your features from here.
      </p>
      <div className="flex gap-3">
        <Button asChild>
          <Link href="/login">Login</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/dashboard">Dashboard</Link>
        </Button>
      </div>
    </main>
  );
}
