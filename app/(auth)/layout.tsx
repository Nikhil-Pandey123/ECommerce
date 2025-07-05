// app/(auth)/layout.tsx
import type { Metadata } from 'next';
import { Toaster } from 'sonner';
export const metadata: Metadata = {
  title: 'Auth | MyApp',
  description: 'Login or Signup to access the platform',
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
