'use client';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingCart, Search, Settings } from 'lucide-react';
import { Sheet, SheetTrigger, SheetContent } from '@/Components/ui/sheet';
import { Dialog, DialogTrigger, DialogContent } from '@/Components/ui/dialog';
import { useCartStore } from '@/lib/store/cartStore';

export default function Navbar() {
  const cartCount = useCartStore(state => state.getCartCount());
  return (
    <nav className="bg-primary w-full px-4 py-3 text-white shadow-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-white">
          <Image
            src="/Airflex photo/airflex-app-icon.png"
            alt="Logo"
            width={40}
            height={40}
            className="mr-2 inline-block"
          />
          Airflex
        </Link>

        {/* Navigation Links */}
        <ul className="hidden gap-6 font-medium md:flex">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/products">Collections</Link>
          </li>
          <li>
            <Link href="/blog">Blog</Link>
          </li>
          <li>
            <Link href="/contact">Contact Us</Link>
          </li>
          <li>
            <Link href="/about">About Us</Link>
          </li>
        </ul>

        {/* Right Icons */}
        <div className="flex items-center gap-4">
          {/* Cart */}
          <div className="relative">
            <Link href="/cart">
              <ShoppingCart className="h-6 w-6 cursor-pointer" />
              <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold">
                {cartCount}
              </span>
            </Link>
          </div>

          {/* Search (Dialog) */}
          <Dialog>
            <DialogTrigger asChild>
              <Search className="h-6 w-6 cursor-pointer" />
            </DialogTrigger>
            <DialogContent className="bg-white p-6 text-black">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full rounded-md border px-4 py-2"
              />
            </DialogContent>
          </Dialog>

          {/* Settings (Sidebar Sheet) */}
          <Sheet>
            <SheetTrigger asChild>
              <Settings className="h-6 w-6 cursor-pointer" />
            </SheetTrigger>
            <SheetContent side="right" className="w-64 bg-black p-6 text-white">
              <h3 className="mb-4 text-lg font-semibold">Account</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/login">Login</Link>
                </li>
                <li>
                  <Link href="/register">Register</Link>
                </li>
                <li>
                  <Link href="/wishlist">Wishlist</Link>
                </li>
                <li>
                  <Link href="/checkout">Checkout</Link>
                </li>
              </ul>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
