'use client';
import React, { useState } from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from '@/Components/ui/card';
import { Label } from '@/Components/ui/label';
import { Input } from '@/Components/ui/input';
import { Button } from '@/Components/ui/button';
import { toast } from 'sonner'; // Add this import for toast
import Image from 'next/image';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!formData.email || !formData.password) {
      toast.error('Please fill in all fields');
      setIsLoading(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error('Please enter a valid email address');
      setIsLoading(false);
      return;
    }

    toast.loading('Logging you in...', { id: 'login' });

    try {
      const res = await fetch('http://localhost:5000/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        //  Login success
        toast.success('Login successful! Redirecting...', {
          id: 'login',
          duration: 3000,
        });

        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));

        //  Reset form
        setFormData({ email: '', password: '' });

        //  Delay before redirecting to dashboard
        setTimeout(() => {
          router.push('/dashboard');
        }, 2000); // 2 seconds loading feel
      } else {
        //  Login failed
        toast.error(data.message || 'Login failed. Please try again.', {
          id: 'login',
        });
      }
    } catch (error) {
      toast.error(
        'Network error. Please check your connection and try again.',
        { id: 'login' }
      );
      console.error('Network error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleProviderLogin = async (provider: 'google' | 'facebook') => {
    try {
      toast.loading('Redirecting to ' + provider + '...', {
        id: 'provider-login',
      });

      const result = await signIn(provider, {
        callbackUrl: '/',
        redirect: false,
      });

      if (result?.error) {
        toast.error('Failed to sign in with ' + provider, {
          id: 'provider-login',
        });
      } else if (result?.ok) {
        toast.success('Successfully signed in with ' + provider, {
          id: 'provider-login',
        });
      }
    } catch (error) {
      toast.error('Failed to sign in with ' + provider, {
        id: 'provider-login',
      });
    }
  };

  return (
    <div className="flex h-screen w-full items-center justify-center px-4">
      <Card className="w-full max-w-sm rounded-[10px] shadow-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Login</CardTitle>
          <CardDescription>Login to your Airflex account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-y-4">
            <div className="flex flex-col gap-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="hello@example.com"
                value={formData.email}
                onChange={handleInputChange}
                required
                disabled={isLoading}
              />

              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Your password"
                value={formData.password}
                onChange={handleInputChange}
                required
                disabled={isLoading}
              />
            </div>

            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Logging in...' : 'Submit'}
            </Button>
          </form>

          <div className="mt-4 flex flex-col gap-y-2">
            <Button
              onClick={() => handleProviderLogin('google')}
              className="cursor-pointer bg-white text-black hover:bg-gray-50"
              disabled={isLoading}
              type="button"
            >
              <Image
                src="icons/google.svg"
                alt="Google"
                width={20}
                height={20}
                className="mr-2 rounded-full"
              />
              Login with Google
            </Button>

            <Button
              onClick={() => handleProviderLogin('facebook')}
              className="cursor-pointer bg-blue-600 text-white hover:bg-blue-700"
              disabled={isLoading}
              type="button"
            >
              <Image
                src="icons/avatar.svg"
                alt="Facebook"
                width={20}
                height={20}
                className="mr-2 rounded-full"
              />
              Login with Facebook
            </Button>
          </div>

          <div className="mt-4 text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <a href="/register" className="text-blue-600 hover:underline">
              Sign up
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
