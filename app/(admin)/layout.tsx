import React from 'react';
import Header from '@/Components/Header';
import Sidebar from '@/Components/Sidebar';

export const metadata = {
  title: 'Admin Dashboard',
  description: 'Admin Dashboard for managing the application',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#121212] text-white antialiased">
      <div className="flex h-screen overflow-hidden">
        {<Sidebar />}
        <div className="flex flex-1 flex-col overflow-auto">
          <div className="mx-auto w-full max-w-7xl">
            <Header />
            <main>{children}</main>
          </div>
        </div>
      </div>
    </div>
  );
}
