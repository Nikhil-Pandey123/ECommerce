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
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Sparkles,
  Check,
  Shield,
  Zap,
  Heart,
} from 'lucide-react';
import AirflexBackground from '@/Components/AirflexBackground';
import { useRouter } from 'next/navigation';

const Register = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));

    // Calculate password strength
    if (field === 'password') {
      let strength = 0;
      if (value.length >= 8) strength++;
      if (/[A-Z]/.test(value)) strength++;
      if (/[0-9]/.test(value)) strength++;
      if (/[^A-Za-z0-9]/.test(value)) strength++;
      setPasswordStrength(strength);
    }
  };

  const handleProviderRegister = async (provider: 'google' | 'facebook') => {
    setIsLoading(true);
    try {
      toast.loading('Redirecting to ' + provider + '...', {
        id: 'provider-signup',
      });

      await signIn(provider, {
        callbackUrl: '/',
      });
    } catch (error) {
      toast.error('Failed to sign up with ' + provider, {
        id: 'provider-signup',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!agreedToTerms) {
      toast.error('Please accept the Terms of Service and Privacy Policy');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (passwordStrength < 3) {
      toast.error('Please create a stronger password');
      return;
    }

    setIsLoading(true);

    // Show loading toast
    toast.loading('Creating your account...', {
      id: 'registration',
    });

    try {
      const res = await fetch('http://localhost:5000/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        // Registration successful
        toast.success('Account created successfully! Redirecting to login...', {
          id: 'registration',
          duration: 3000,
        });

        // Reset form
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          confirmPassword: '',
        });
        setAgreedToTerms(false);
        setPasswordStrength(0);

        // Redirect to login page after delay
        setTimeout(() => {
          router.push('/login');
        }, 2000);
      } else {
        // Registration failed - show specific error message
        const errorMessage =
          data.message || 'Registration failed. Please try again.';
        toast.error(errorMessage, {
          id: 'registration',
          duration: 4000,
        });
      }
    } catch (error) {
      // Network error
      toast.error(
        'Network error. Please check your connection and try again.',
        {
          id: 'registration',
          duration: 4000,
        }
      );
      console.error('Network error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getPasswordStrengthColor = (strength: number) => {
    switch (strength) {
      case 0:
        return 'bg-gray-200';
      case 1:
        return 'bg-red-400';
      case 2:
        return 'bg-yellow-400';
      case 3:
        return 'bg-blue-400';
      case 4:
        return 'bg-green-400';
      default:
        return 'bg-gray-200';
    }
  };

  const getPasswordStrengthText = (strength: number) => {
    switch (strength) {
      case 0:
        return 'Enter password';
      case 1:
        return 'Weak';
      case 2:
        return 'Fair';
      case 3:
        return 'Good';
      case 4:
        return 'Strong';
      default:
        return '';
    }
  };

  return (
    <AirflexBackground className="flex items-center justify-center px-4 py-8">
      <Card className="relative z-10 w-full max-w-lg transform overflow-hidden border-0 bg-white/90 shadow-2xl shadow-purple-500/10 backdrop-blur-xl transition-all duration-500">
        {/* Enhanced card glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-pink-500/10 opacity-0 transition-opacity duration-500 hover:opacity-100"></div>

        <CardHeader className="relative pt-8 pb-6 text-center">
          <CardTitle className="animate-gradient-x bg-gradient-to-r from-gray-700 via-gray-800 to-cyan-600 bg-clip-text text-4xl font-bold text-transparent">
            Join Airflex
          </CardTitle>
          <CardDescription className="mt-3 text-lg text-gray-600">
            Create your account and start your journey with us
          </CardDescription>

          {/* Feature highlights */}
          <div className="mt-6 flex justify-center gap-6">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Shield className="h-4 w-4 text-green-500" />
              <span>Secure</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Zap className="h-4 w-4 text-yellow-500" />
              <span>Fast</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Heart className="h-4 w-4 text-red-500" />
              <span>Loved</span>
            </div>
          </div>
        </CardHeader>

        <CardContent className="px-8 pb-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name Fields Row */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <User className="h-4 w-4 text-purple-500" />
                  First Name
                </Label>
                <div className="group relative">
                  <Input
                    type="text"
                    placeholder="John"
                    value={formData.firstName}
                    onChange={e =>
                      handleInputChange('firstName', e.target.value)
                    }
                    className="rounded-xl border-gray-200 bg-gray-50/50 py-3 pr-4 pl-4 transition-all duration-300 group-hover:bg-white focus:border-purple-500 focus:bg-white focus:ring-2 focus:ring-purple-500/20"
                    required
                  />
                  <div className="absolute inset-0 -z-10 rounded-xl bg-gradient-to-r from-purple-500/20 to-blue-500/20 opacity-0 blur transition-opacity duration-300 group-focus-within:opacity-100"></div>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <User className="h-4 w-4 text-purple-500" />
                  Last Name
                </Label>
                <div className="group relative">
                  <Input
                    type="text"
                    placeholder="Doe"
                    value={formData.lastName}
                    onChange={e =>
                      handleInputChange('lastName', e.target.value)
                    }
                    className="rounded-xl border-gray-200 bg-gray-50/50 py-3 pr-4 pl-4 transition-all duration-300 group-hover:bg-white focus:border-purple-500 focus:bg-white focus:ring-2 focus:ring-purple-500/20"
                    required
                  />
                  <div className="absolute inset-0 -z-10 rounded-xl bg-gradient-to-r from-purple-500/20 to-blue-500/20 opacity-0 blur transition-opacity duration-300 group-focus-within:opacity-100"></div>
                </div>
              </div>
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <Mail className="h-4 w-4 text-blue-500" />
                Email Address
              </Label>
              <div className="group relative">
                <Input
                  type="email"
                  placeholder="john.doe@example.com"
                  value={formData.email}
                  onChange={e => handleInputChange('email', e.target.value)}
                  className="rounded-xl border-gray-200 bg-gray-50/50 py-3 pr-4 pl-4 transition-all duration-300 group-hover:bg-white focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/20"
                  required
                />
                <div className="absolute inset-0 -z-10 rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 blur transition-opacity duration-300 group-focus-within:opacity-100"></div>
              </div>
            </div>

            {/* Password Field with Strength Indicator */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <Lock className="h-4 w-4 text-green-500" />
                Password
              </Label>
              <div className="group relative">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Create a strong password"
                  value={formData.password}
                  onChange={e => handleInputChange('password', e.target.value)}
                  className="rounded-xl border-gray-200 bg-gray-50/50 py-3 pr-12 pl-4 transition-all duration-300 group-hover:bg-white focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-green-500/20"
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
                <div className="absolute inset-0 -z-10 rounded-xl bg-gradient-to-r from-green-500/20 to-blue-500/20 opacity-0 blur transition-opacity duration-300 group-focus-within:opacity-100"></div>
              </div>

              {/* Password Strength Indicator */}
              {formData.password && (
                <div className="mt-2">
                  <div className="mb-1 flex gap-1">
                    {[1, 2, 3, 4].map(level => (
                      <div
                        key={level}
                        className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                          level <= passwordStrength
                            ? getPasswordStrengthColor(passwordStrength)
                            : 'bg-gray-200'
                        }`}
                      />
                    ))}
                  </div>
                  <p
                    className={`text-xs ${
                      passwordStrength >= 3
                        ? 'text-green-600'
                        : passwordStrength >= 2
                          ? 'text-yellow-600'
                          : 'text-red-600'
                    }`}
                  >
                    Password strength:{' '}
                    {getPasswordStrengthText(passwordStrength)}
                  </p>
                </div>
              )}
            </div>

            {/* Confirm Password Field */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <Lock className="h-4 w-4 text-pink-500" />
                Confirm Password
              </Label>
              <div className="group relative">
                <Input
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={e =>
                    handleInputChange('confirmPassword', e.target.value)
                  }
                  className="rounded-xl border-gray-200 bg-gray-50/50 py-3 pr-12 pl-4 transition-all duration-300 group-hover:bg-white focus:border-pink-500 focus:bg-white focus:ring-2 focus:ring-pink-500/20"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute top-1/2 right-3 -translate-y-1/2 transform text-gray-400 transition-colors duration-200 hover:text-gray-600"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
                <div className="absolute inset-0 -z-10 rounded-xl bg-gradient-to-r from-pink-500/20 to-purple-500/20 opacity-0 blur transition-opacity duration-300 group-focus-within:opacity-100"></div>
              </div>
              {formData.confirmPassword &&
                formData.password !== formData.confirmPassword && (
                  <p className="flex items-center gap-1 text-xs text-red-600">
                    <span className="h-1 w-1 rounded-full bg-red-600"></span>
                    Passwords don't match
                  </p>
                )}
              {formData.confirmPassword &&
                formData.password === formData.confirmPassword && (
                  <p className="flex items-center gap-1 text-xs text-green-600">
                    <Check className="h-3 w-3" />
                    Passwords match
                  </p>
                )}
            </div>

            {/* Terms and Conditions */}
            <div className="flex items-start gap-3 pt-2">
              <div className="relative">
                <input
                  type="checkbox"
                  id="terms"
                  checked={agreedToTerms}
                  onChange={e => setAgreedToTerms(e.target.checked)}
                  className="sr-only"
                />
                <label
                  htmlFor="terms"
                  className={`flex h-5 w-5 cursor-pointer items-center justify-center rounded border-2 transition-all duration-200 ${
                    agreedToTerms
                      ? 'border-purple-500 bg-gradient-to-r from-purple-500 to-blue-500'
                      : 'border-gray-300 hover:border-purple-400'
                  }`}
                >
                  {agreedToTerms && <Check className="h-3 w-3 text-white" />}
                </label>
              </div>
              <p className="text-sm leading-relaxed text-gray-600">
                I agree to the{' '}
                <a
                  href="#"
                  className="font-medium text-purple-600 transition-colors duration-200 hover:text-purple-700"
                >
                  Terms of Service
                </a>{' '}
                and{' '}
                <a
                  href="#"
                  className="font-medium text-purple-600 transition-colors duration-200 hover:text-purple-700"
                >
                  Privacy Policy
                </a>
              </p>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={
                isLoading ||
                !agreedToTerms ||
                formData.password !== formData.confirmPassword
              }
              className="relative w-full transform overflow-hidden rounded-xl bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 py-4 font-semibold text-white shadow-xl shadow-purple-500/25 transition-all duration-300 hover:scale-105 hover:from-purple-700 hover:via-blue-700 hover:to-pink-700 disabled:transform-none disabled:cursor-not-allowed disabled:opacity-50"
            >
              <span className="relative z-10">
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white"></div>
                    Creating Account...
                  </div>
                ) : (
                  'Create Account'
                )}
              </span>
              <div className="animate-shimmer absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 transition-opacity duration-300 hover:opacity-100"></div>
            </Button>
          </form>

          {/* Divider */}
          <div className="my-8 flex items-center gap-4">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
            <span className="rounded-full border border-gray-200 bg-white px-4 text-sm text-gray-500 shadow-sm">
              or sign up with
            </span>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
          </div>

          {/* Social Registration Buttons */}
          <div className="space-y-3">
            <Button
              type="button"
              onClick={() => handleProviderRegister('google')}
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
                Sign up with Google
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
            </Button>

            <Button
              type="button"
              onClick={() => handleProviderRegister('facebook')}
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
                Sign up with Facebook
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
            </Button>
          </div>

          {/* Sign In Link */}
          <div className="mt-8 border-t border-gray-100 pt-6 text-center">
            <p className="text-gray-600">
              Already have an account?{' '}
              <a
                href="#"
                className="font-semibold text-purple-600 transition-colors duration-200 hover:text-purple-700"
              >
                Sign in here
              </a>
            </p>
          </div>
        </CardContent>
      </Card>

      <style jsx>{`
        @keyframes gradient-x {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        .animate-gradient-x {
          animation: gradient-x 3s ease infinite;
          background-size: 200% 200%;
        }
        .animate-shimmer {
          animation: shimmer 2s ease-in-out infinite;
        }
      `}</style>
    </AirflexBackground>
  );
};

export default Register;
