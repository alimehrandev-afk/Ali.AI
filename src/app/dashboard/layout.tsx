'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { LoadingScreen } from '@/components/LoadingScreen';
import { Sidebar } from '@/components/dashboard/Sidebar';
import { ChatInterface } from '@/components/dashboard/ChatInterface';
import { useUIStore } from '@/store';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { isAuthenticated, user } = useAuth();
  const { sidebarOpen } = useUIStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isAuthenticated === false) {
      router.push('/auth/login');
    } else if (isAuthenticated === true) {
      setIsLoading(false);
    }
  }, [isAuthenticated, router]);

  if (isLoading || !isAuthenticated) {
    return <LoadingScreen />;
  }

  return (
    <div className="flex h-screen bg-dark-950">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-auto">
          {children}
        </div>
      </div>
    </div>
  );
}
