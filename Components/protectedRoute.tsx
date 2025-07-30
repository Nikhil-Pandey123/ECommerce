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
      const user = localStorage.getItem('user');

      console.log('ProtectedRoute - Token exists:', !!token);
      console.log('ProtectedRoute - User data:', user);
      console.log('ProtectedRoute - Require admin:', requireAdmin);

      if (!token) {
        console.log('No token found, setting unauthenticated');
        setAuthState('unauthenticated');
        return;
      }

      try {
        const url = requireAdmin
          ? 'http://localhost:5000/api/admin/check-access'
          : 'http://localhost:5000/api/users/profile';

        console.log('Making request to:', url);

        const response = await fetch(url, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        console.log('Response status:', response.status);

        if (response.ok) {
          const data = await response.json();
          console.log('Response data:', data);

          if (requireAdmin && !data.authorized) {
            console.log('Admin required but not authorized');
            setAuthState('unauthorized');
          } else {
            console.log('Authentication successful');
            setAuthState('authenticated');
          }
        } else if (response.status === 401) {
          console.log('401 - Token invalid/expired');
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          setAuthState('unauthenticated');
        } else if (response.status === 403) {
          console.log('403 - Authenticated but not authorized');
          setAuthState('unauthorized');
        } else {
          console.log('Other error status:', response.status);
          const errorData = await response.text();
          console.log('Error response:', errorData);
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
      console.log('Redirecting to login...');
      const currentPath = window.location.pathname + window.location.search;
      localStorage.setItem('redirectPath', currentPath);
      setHasRedirected(true);
      router.push('/login');
    } else if (authState === 'unauthorized') {
      console.log('Redirecting due to unauthorized access...');
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
    return null;
  }

  // Only render children when fully authenticated and authorized
  return <>{children}</>;
};

export default ProtectedRoute;
