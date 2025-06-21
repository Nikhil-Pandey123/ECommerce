import Navbar from '@/Components/Navbar';
import { Toaster } from 'sonner';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <div className="w-full">
          <Navbar /> {/* This appears on ALL pages */}
        </div>

        <main className="w-full">{children}</main>

        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
