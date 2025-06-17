import Navbar from '@/Components/Navbar';
import { Toaster } from 'sonner';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar /> {/* This appears on ALL pages */}
        {children}
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
