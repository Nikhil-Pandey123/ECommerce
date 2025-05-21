'use client';
import React from 'react';
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
const Login = () => {
  const handleProviderLogin = (provider: 'google' | 'facebook') => {
    signIn(provider, {
      callbackUrl: '/',
    });
  };
  return (
    <div className="flex h-screen w-full items-center justify-center px-4">
      <Card className="w-full max-w-sm rounded-[10px] shadow-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Login</CardTitle>
          <CardDescription>Login to your Airflex account</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-y-4">
            <div className="flex flex-col gap-y-2">
              <Label>Email</Label>
              <Input type="email" placeholder="hello@example.com" />

              <Label>Password</Label>
              <Input type="password" placeholder="Your password" />
            </div>
            <Button>Submit</Button>
          </form>

          <div className="mt-4 flex flex-col gap-y-2">
            <Button
              onClick={() => signIn('google', { callbackUrl: '/' })}
              className="cursor-pointer bg-white text-black"
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
              onClick={() => signIn('facebook', { callbackUrl: '/' })}
              className="cursor-pointer bg-blue-600 text-white"
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
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
