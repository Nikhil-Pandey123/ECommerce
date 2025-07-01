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
import Image from 'next/image';
import { signIn } from 'next-auth/react';
import { Eye, EyeOff, Mail, Lock, Sparkles } from 'lucide-react';
import AirflexBackground from '@/Components/AirflexBackground';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleProviderLogin = async (provider: 'google' | 'facebook') => {
    setIsLoading(true);
    try {
      await signIn(provider, {
        callbackUrl: '/',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Add your form submission logic here
    setTimeout(() => setIsLoading(false), 2000); // Simulate API call
  };

  return (
    <AirflexBackground className="flex items-center justify-center px-4 py-8">
      <Card className="relative z-10 w-full max-w-md transform overflow-hidden border-0 bg-white/80 shadow-2xl shadow-blue-500/10 backdrop-blur-xl transition-all duration-300">
        <CardHeader className="relative pt-8 pb-8 text-center">
          <CardTitle className="bg-gradient-to-r from-gray-700 via-gray-800 to-cyan-600 bg-clip-text text-3xl font-bold text-transparent">
            Welcome Back
          </CardTitle>
          <CardDescription className="mt-2 text-base text-gray-500">
            Sign in to your{' '}
            <span className="font-semibold text-blue-600">Airflex</span> account
          </CardDescription>
        </CardHeader>

        <CardContent className="px-8 pb-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <Mail className="h-4 w-4 text-blue-500" />
                Email Address
              </Label>
              <div className="group relative">
                <Input
                  type="email"
                  placeholder="hello@example.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="rounded-xl border-gray-200 bg-gray-50/50 py-3 pr-4 pl-4 transition-all duration-300 group-hover:bg-white focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/20"
                  required
                />
                <div className="absolute inset-0 -z-10 rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 blur transition-opacity duration-300 group-focus-within:opacity-100"></div>
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <Lock className="h-4 w-4 text-blue-500" />
                Password
              </Label>
              <div className="group relative">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="rounded-xl border-gray-200 bg-gray-50/50 py-3 pr-12 pl-4 transition-all duration-300 group-hover:bg-white focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/20"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-1/2 right-3 -translate-y-1/2 transform text-gray-400 transition-colors duration-200 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
                <div className="absolute inset-0 -z-10 rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 blur transition-opacity duration-300 group-focus-within:opacity-100"></div>
              </div>
            </div>

            {/* Forgot Password */}
            <div className="text-right">
              <a
                href="#"
                className="text-sm font-medium text-blue-600 transition-colors duration-200 hover:text-blue-700"
              >
                Forgot password?
              </a>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="relative w-full transform overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 py-3 font-semibold text-white shadow-lg shadow-blue-500/25 transition-all duration-300 hover:scale-105 hover:from-blue-700 hover:to-purple-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <span className="relative z-10">
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white"></div>
                    Signing in...
                  </div>
                ) : (
                  'Sign In'
                )}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 transition-opacity duration-300 hover:opacity-100"></div>
            </Button>
          </form>

          {/* Divider */}
          <div className="my-8 flex items-center justify-center gap-4">
            <span className="rounded-full border border-gray-200 bg-white px-4 text-sm text-gray-500">
              or continue with
            </span>
          </div>

          {/* Social Login Buttons */}
          <div className="space-y-3">
            <Button
              type="button"
              onClick={() => handleProviderLogin('google')}
              disabled={isLoading}
              className="group relative w-full transform overflow-hidden rounded-xl border border-gray-200 bg-white py-3 font-medium text-gray-700 transition-all duration-300 hover:scale-105 hover:bg-gray-50 hover:shadow-lg"
            >
              <div className="relative z-10 flex items-center justify-center gap-3">
                <Image
                  src="icons/google.svg"
                  alt="Google"
                  width={20}
                  height={20}
                  className="transition-transform duration-300 group-hover:scale-110"
                />
                Continue with Google
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
            </Button>

            <Button
              type="button"
              onClick={() => handleProviderLogin('facebook')}
              disabled={isLoading}
              className="group relative w-full transform overflow-hidden rounded-xl border-0 bg-blue-600 py-3 font-medium text-white transition-all duration-300 hover:scale-105 hover:bg-blue-700 hover:shadow-lg"
            >
              <div className="relative z-10 flex items-center justify-center gap-3">
                <Image
                  src="icons/avatar.svg"
                  alt="Facebook"
                  width={20}
                  height={20}
                  className="transition-transform duration-300 group-hover:scale-110"
                />
                Continue with Facebook
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
            </Button>
          </div>

          {/* Sign Up Link */}
          <div className="mt-8 border-t border-gray-100 pt-6 text-center">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <a
                href="#"
                className="font-semibold text-blue-600 transition-colors duration-200 hover:text-blue-700"
              >
                Sign up for free
              </a>
            </p>
          </div>
        </CardContent>
      </Card>
    </AirflexBackground>
  );
};

export default Login;
