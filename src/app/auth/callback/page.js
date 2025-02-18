'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getCurrentUser } from '@/lib/appwrite';

export default function CallbackPage() {
  const router = useRouter();
  const [attempts, setAttempts] = useState(0);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = await getCurrentUser();
        if (user) {
          router.push('/dashboard');
          return;
        }
        
        if (attempts < 5) {
          setTimeout(() => setAttempts(prev => prev + 1), 1000);
        } else {
          router.push('/login');
        }
      } catch (error) {
        console.error('Auth callback error:', error);
        router.push('/login');
      }
    };

    checkAuth();
  }, [router, attempts]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
    </div>
  );
} 