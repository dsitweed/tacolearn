'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { useAuthStore } from '@/stores/authStore';

export default function DashboardPage() {
  const { user } = useAuthStore();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back{user?.email ? `, ${user.email}` : ''}.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Getting started</CardTitle>
        </CardHeader>
        <CardContent className="text-muted-foreground text-sm">
          This is a blank dashboard template. Add your feature pages under
          <code className="mx-1">app/[locale]/dashboard</code>.
        </CardContent>
      </Card>
    </div>
  );
}
