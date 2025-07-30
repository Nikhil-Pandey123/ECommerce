'use client';
import { useEffect, useState, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

interface ProtectedRouteProps {
  children: ReactNode;
  requireAdmin?: boolean;
}

type AuthState =
  | 'loading'
  | 'authenticated'
  | 'unauthenticated'
  | 'unauthorized';

const ProtectedRoute = ({
  children,
  requireAdmin = false,
}: ProtectedRouteProps) => {
  const [authState, setAuthState] = useState<AuthState>('loading');
  const [hasRedirected, setHasRedirected] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        setAuthState('unauthenticated');
        return;
      }

      try {
        const url = requireAdmin
          ? 'http://localhost:5000/api/admin/check-access'
          : 'http://localhost:5000/api/users/profile';

        const response = await fetch(url, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();

          if (requireAdmin && !data.authorized) {
            setAuthState('unauthorized');
          } else {
            setAuthState('authenticated');
          }
        } else if (response.status === 401) {
          // Token is invalid or expired
          localStorage.removeItem('token');
          setAuthState('unauthenticated');
        } else if (response.status === 403) {
          // Authenticated but not authorized
          setAuthState('unauthorized');
        } else {
          setAuthState('unauthenticated');
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        setAuthState('unauthenticated');
      }
    };

    checkAuth();
  }, [requireAdmin]);

  useEffect(() => {
    if (authState === 'loading' || hasRedirected) return;

    if (authState === 'unauthenticated') {
      const currentPath = window.location.pathname + window.location.search;
      localStorage.setItem('redirectPath', currentPath);
      setHasRedirected(true);
      router.push('/login');
    } else if (authState === 'unauthorized') {
      toast.error("You don't have permission to access the admin dashboard");
      setHasRedirected(true);
      router.push('/');
    }
  }, [authState, hasRedirected, router]);

  // Show loading spinner while checking authentication
  if (authState === 'loading') {
    return (
      <div className="bg-background flex min-h-screen flex-col items-center justify-center space-y-4">
        <div className="border-primary h-16 w-16 animate-spin rounded-full border-4 border-t-transparent"></div>
        <p className="text-muted-foreground text-sm">Verifying access...</p>
      </div>
    );
  }

  // Don't render anything if not authorized or during redirect
  if (authState !== 'authenticated' || hasRedirected) {
    toast.error(
      'You must be logged in to view this page. Redirecting to login...'
    );
    return null;
  }

  // Only render children when fully authenticated and authorized
  return <>{children}</>;
};

export default ProtectedRoute;
