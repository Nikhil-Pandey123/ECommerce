'use client';
import { useCartStore } from '@/lib/store/cartStore';
import { useWishlistStore } from '@/lib/store/wishlistStore';
import { useRouter } from 'next/navigation';
import React, { ReactNode, use, useEffect, useState } from 'react';
import { toast } from 'sonner';

// AirflexBackground Component
interface AirflexBackgroundProps {
  children: ReactNode;
  variant?: string;
  className?: string;
  showOverlay?: boolean;
}

function AirflexBackground({
  children,
  variant = 'default',
  className = '',
  showOverlay = true,
}: AirflexBackgroundProps) {
  return (
    <div
      className={`relative min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 ${className}`}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-80 w-80 animate-pulse rounded-full bg-gradient-to-br from-cyan-200/30 to-blue-200/30 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 h-80 w-80 animate-pulse rounded-full bg-gradient-to-br from-blue-200/30 to-teal-200/30 blur-3xl delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 transform animate-pulse rounded-full bg-gradient-to-br from-teal-200/20 to-cyan-200/20 blur-3xl delay-500"></div>
      </div>

      {/* Overlay */}
      {showOverlay && (
        <div className="absolute inset-0 bg-white/10 backdrop-blur-[1px]"></div>
      )}

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}

// Main Dashboard Component
export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    firstName: '',
    email: '',
  });
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalOrders: 12,
    totalSpent: 1249.99,
    wishlistItems: 5,
    rewardPoints: 850,
  });

  // Load user data from localStorage
  useEffect(() => {
    const loadUserData = () => {
      try {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          const userData = JSON.parse(storedUser);
          setUser({
            firstName: userData.firstName || 'User',
            email: userData.email || 'user@example.com',
          });
        } else {
          // Redirect to login if no user data found
          router.push('/login');
          return;
        }
      } catch (error) {
        console.error('Error loading user data:', error);
        localStorage.removeItem('user');
        router.push('/login');
        return;
      }

      // Simulate loading time
      setTimeout(() => {
        setLoading(false);
      }, 800);
    };

    loadUserData();
  }, [router]);

  const handleLogout = () => {
    try {
      // Clearing out localStorage and state
      localStorage.removeItem('user');
      localStorage.removeItem('token');

      useCartStore.getState().clearCart();
      useWishlistStore.getState().clearWishlist();

      toast.success('Logged out successfully');
      router.push('/');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Failed to log out');
    }
  };

  const handleShopNow = () => {
    router.push('/products');
  };

  const handleTrackOrder = () => {
    router.push('/orders');
  };

  const handleSupport = () => {
    router.push('/contact');
  };

  const handleViewAllOrders = () => {
    router.push('/orders');
  };

  const handleViewAllWishlist = () => {
    router.push('/wishlist');
  };

  const handleAddToCart = (itemName: string) => {
    toast.success(`${itemName} added to cart!`);
  };

  if (loading) {
    return (
      <AirflexBackground>
        <div className="flex min-h-screen items-center justify-center">
          <div className="text-center">
            <div className="mx-auto mb-4 h-16 w-16 animate-spin rounded-full border-4 border-cyan-500 border-t-transparent"></div>
            <p className="text-lg font-medium text-gray-700">
              Loading your dashboard...
            </p>
          </div>
        </div>
      </AirflexBackground>
    );
  }

  return (
    <AirflexBackground>
      <div className="min-h-screen">
        {/* Header */}
        <header className="border-b border-gray-200/50 bg-white/80 shadow-sm backdrop-blur-sm">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
            <div className="flex items-center space-x-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 shadow-lg">
                <span className="text-lg font-bold text-white">
                  {user.firstName.charAt(0).toUpperCase() || 'U'}
                </span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">
                  Welcome back, {user.firstName || 'User'}!
                </h1>
                <p className="text-sm text-gray-600">{user.email}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="cursor-pointer rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-red-600 shadow-sm transition-colors duration-200 hover:bg-red-100"
            >
              Logout
            </button>
          </div>
        </header>

        {/* Main Content */}
        <main className="mx-auto max-w-7xl px-6 py-8">
          {/* Stats Cards */}
          <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="transform rounded-xl border border-gray-200/50 bg-white/80 p-6 shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Total Orders
                  </p>
                  <p className="text-3xl font-bold text-gray-800">
                    {stats.totalOrders}
                  </p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                  <svg
                    className="h-6 w-6 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div className="transform rounded-xl border border-gray-200/50 bg-white/80 p-6 shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Total Spent
                  </p>
                  <p className="text-3xl font-bold text-gray-800">
                    ${stats.totalSpent.toFixed(2)}
                  </p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                  <svg
                    className="h-6 w-6 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div className="transform rounded-xl border border-gray-200/50 bg-white/80 p-6 shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Wishlist Items
                  </p>
                  <p className="text-3xl font-bold text-gray-800">
                    {stats.wishlistItems}
                  </p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-pink-100">
                  <svg
                    className="h-6 w-6 text-pink-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div className="transform rounded-xl border border-gray-200/50 bg-white/80 p-6 shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Reward Points
                  </p>
                  <p className="text-3xl font-bold text-gray-800">
                    {stats.rewardPoints.toLocaleString()}
                  </p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-yellow-100">
                  <svg
                    className="h-6 w-6 text-yellow-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Main Dashboard Grid */}
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {/* Recent Orders */}
            <div className="rounded-xl border border-gray-200/50 bg-white/80 p-6 shadow-lg backdrop-blur-sm">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-800">
                  Recent Orders
                </h2>
                <button
                  onClick={handleViewAllOrders}
                  className="text-sm font-medium text-cyan-600 transition-colors hover:text-cyan-700"
                >
                  View All
                </button>
              </div>
              <div className="space-y-4">
                {[1, 2, 3].map(order => (
                  <div
                    key={order}
                    className="flex items-center justify-between rounded-lg bg-gray-50/50 p-4 transition-colors duration-200 hover:bg-gray-100/50"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 shadow-md">
                        <span className="font-bold text-white">#{order}</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">
                          Order #000{order}
                        </p>
                        <p className="text-sm text-gray-600">
                          2 items • $129.99
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
                        Delivered
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Wishlist Preview */}
            <div className="rounded-xl border border-gray-200/50 bg-white/80 p-6 shadow-lg backdrop-blur-sm">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-800">
                  Your Wishlist
                </h2>
                <button
                  onClick={handleViewAllWishlist}
                  className="text-sm font-medium text-cyan-600 transition-colors hover:text-cyan-700"
                >
                  View All
                </button>
              </div>
              <div className="space-y-4">
                {[
                  { name: 'Wireless Headphones', price: 199.99 },
                  { name: 'Smart Watch', price: 299.99 },
                  { name: 'Laptop Stand', price: 79.99 },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between rounded-lg bg-gray-50/50 p-4 transition-colors duration-200 hover:bg-gray-100/50"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="h-12 w-12 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 shadow-md"></div>
                      <div>
                        <p className="font-medium text-gray-800">{item.name}</p>
                        <p className="text-sm text-gray-600">
                          ${item.price.toFixed(2)}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleAddToCart(item.name)}
                      className="text-cyan-600 transition-colors hover:text-cyan-700"
                      aria-label={`Add ${item.name} to cart`}
                    >
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                        />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-8 rounded-xl border border-gray-200/50 bg-white/80 p-6 shadow-lg backdrop-blur-sm">
            <h2 className="mb-6 text-xl font-bold text-gray-800">
              Quick Actions
            </h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <button
                onClick={handleShopNow}
                className="transform rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 p-4 text-white shadow-lg transition-all duration-300 hover:scale-105 hover:from-cyan-600 hover:to-blue-600"
              >
                <div className="flex items-center space-x-3">
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                    />
                  </svg>
                  <span className="font-medium">Shop Now</span>
                </div>
              </button>
              <button
                onClick={handleTrackOrder}
                className="transform rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 p-4 text-white shadow-lg transition-all duration-300 hover:scale-105 hover:from-blue-600 hover:to-cyan-600"
              >
                <div className="flex items-center space-x-3">
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span className="font-medium">Track Order</span>
                </div>
              </button>
              <button
                onClick={handleSupport}
                className="transform rounded-lg bg-gradient-to-r from-green-500 to-teal-500 p-4 text-white shadow-lg transition-all duration-300 hover:scale-105 hover:from-green-600 hover:to-teal-600"
              >
                <div className="flex items-center space-x-3">
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364"
                    />
                  </svg>
                  <span className="font-medium">Support</span>
                </div>
              </button>
            </div>
          </div>
        </main>
      </div>
    </AirflexBackground>
  );
}
