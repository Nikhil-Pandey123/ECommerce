import Navbar from '@/components/Navbar';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="bg-primary">
          <Navbar />
          <main className="flex min-h-screen flex-col items-center justify-between p-24">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
