'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { ShoppingCart, Search, Settings } from 'lucide-react';
import { Sheet, SheetTrigger, SheetContent } from '@/Components/ui/sheet';
import { Dialog, DialogTrigger, DialogContent } from '@/Components/ui/dialog';
import { useCartStore } from '@/lib/store/cartStore';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { Button } from './ui/button';
export default function Navbar() {
  // User authentication state
  const Router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        localStorage.removeItem('user');
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    toast.success('Logged out successfully');
    Router.push('/login');
  };

  // Cart related
  const cartCount = useCartStore(state => state.getCartCount());
  const pathname = usePathname();

  // Determine navbar background based on current route
  const getNavbarBackground = () => {
    if (pathname === '/') {
      return 'bg-transparent'; // Transparent for home page
    }
    return 'bg-black/90 backdrop-blur-sm'; // Semi-transparent black with blur for other pages
  };

  return (
    <nav
      className={`sticky top-0 z-50 w-full px-4 py-3 font-extrabold text-white shadow-md transition-all duration-300 ${getNavbarBackground()}`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-white">
          <Image
            src="/Airflex photo/airflex-logo-1.png"
            alt="Logo"
            width={100}
            height={100}
            className="mr-2 inline-block"
          />
        </Link>

        {/* Navigation Links */}
        <ul className="hidden gap-6 font-medium md:flex">
          <li>
            <Link href="/" className="transition-colors hover:text-gray-300">
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/products"
              className="transition-colors hover:text-gray-300"
            >
              Collections
            </Link>
          </li>
          <li>
            <Link
              href="/blog"
              className="transition-colors hover:text-gray-300"
            >
              Blog
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              className="transition-colors hover:text-gray-300"
            >
              Contact Us
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              className="transition-colors hover:text-gray-300"
            >
              About Us
            </Link>
          </li>
        </ul>

        {/* Right Icons */}
        <div className="flex items-center gap-4">
          {/* Cart */}
          <div className="relative">
            <Link href="/cart">
              <ShoppingCart className="h-6 w-6 cursor-pointer transition-colors hover:text-gray-300" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>

          {/* Search (Dialog) */}
          <Dialog>
            <DialogTrigger asChild>
              <Search className="h-6 w-6 cursor-pointer transition-colors hover:text-gray-300" />
            </DialogTrigger>
            <DialogContent className="bg-white p-6 text-black">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full rounded-md border px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </DialogContent>
          </Dialog>

          {/* Settings (Sidebar Sheet) */}
          <Sheet>
            <SheetTrigger asChild>
              <Settings className="h-6 w-6 cursor-pointer transition-colors hover:text-gray-300" />
            </SheetTrigger>
            <SheetContent side="right" className="w-64 bg-black p-6 text-white">
              <h3 className="mb-4 text-lg font-semibold">
                {user ? `Hi, ${user.firstName}` : `Account`}
              </h3>
              <ul className="space-y-4">
                {!user ? (
                  <>
                    <li>
                      <Link href="/login">Login</Link>
                    </li>

                    <li>
                      <Link href="/signup">Sign Up</Link>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <Link href="/dashboard">Dashboard</Link>
                    </li>
                    <li>
                      <Link href="/wishlist">Wishlist</Link>
                    </li>
                    <li>
                      <Link href="/checkout">Checkout</Link>
                    </li>

                    {/* Logout Button */}
                    <li>
                      <Button
                        onClick={handleLogout}
                        className="bg-white text-black hover:underline"
                      >
                        Logout
                      </Button>
                    </li>
                  </>
                )}
              </ul>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
