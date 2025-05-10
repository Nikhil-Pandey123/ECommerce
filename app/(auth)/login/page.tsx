import React from 'react';
import { Card,CardHeader,CardTitle,CardContent,CardDescription } from '@/Components/ui/card';
import { Label } from '@/Components/ui/label';
import { Input } from '@/Components/ui/input';
import { Button } from '@/Components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
const Login = () => {
  return (
    <div className='flex items-center justify-center h-screen w-full px-4 '>
      <Card className='max-w-sm w-full rounded-[10px] shadow-md '>
        <CardHeader>
          <CardTitle className='text-2xl font-bold'>Login</CardTitle>
          <CardDescription>Login to your Airflex account</CardDescription>
        </CardHeader>
        <CardContent>
          <form className='flex flex-col gap-y-4' >
            <div className='flex flex-col gap-y-2'>
              <Label>Email</Label>
              <Input type='email' placeholder='hello@example.com' />

              <Label>Password</Label>
              <Input type='password' placeholder='Your password' />
            </div>
            <Button>Submit</Button>
          </form>

          <div className='flex items-center justify-between mt-4 gap-x-2'>
            <Link href="/">
              <Button>
                <Image src="/Google.png" alt="Google" width={20} height={20} className='mr-2 rounded-full bg-trasparent ' />
                Login with Google
              </Button>
            </Link>

            <Link href="/">
              <Button>
                <Image src="/Google.png" alt="Google" width={20} height={20} className='mr-2 rounded-full bg-transparent ' />
                Login with Facebook
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>  
  )
};

export default Login;
