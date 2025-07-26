'use client';
import React, { useState, useEffect } from 'react';
import {
  Home,
  Users,
  BarChart3,
  Settings,
  FileText,
  ShoppingCart,
  Bell,
  ChevronDown,
  LogOut,
  User,
  Menu,
  X,
} from 'lucide-react';
import Link from 'next/link';

const Sidebar = () => {
  const [activeItem, setActiveItem] = useState('dashboard');
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'orders', label: 'Orders', icon: ShoppingCart },
    { id: 'reports', label: 'Reports', icon: FileText },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = event => {
      if (isSidebarOpen && window.innerWidth < 768) {
        const sidebar = document.getElementById('sidebar');
        const toggleButton = document.getElementById('mobile-toggle');

        if (
          sidebar &&
          !sidebar.contains(event.target) &&
          toggleButton &&
          !toggleButton.contains(event.target)
        ) {
          setIsSidebarOpen(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isSidebarOpen]);

  // Close sidebar on window resize to desktop size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="bg-opacity-50 fixed inset-0 z-40 bg-black md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Mobile Toggle Button */}
      <div
        id="mobile-toggle"
        className="fixed top-0 right-0 left-0 z-50 flex items-center justify-between border-b border-gray-800 bg-[#1e1e1e] p-4 md:hidden"
      >
        <div className="flex items-center space-x-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600">
            <span className="text-sm font-bold text-white">A</span>
          </div>
          <span className="text-xl font-semibold text-white">Admin</span>
        </div>
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="rounded-md p-1 transition-colors hover:bg-gray-700"
        >
          {isSidebarOpen ? (
            <X className="h-6 w-6 text-white" />
          ) : (
            <Menu className="h-6 w-6 text-white" />
          )}
        </button>
      </div>

      {/* Sidebar */}
      <div
        id="sidebar"
        className={`fixed inset-y-0 left-0 z-50 w-64 transform border-r border-gray-800 bg-[#1e1e1e] transition-transform duration-300 ease-in-out md:relative md:z-auto md:transform-none md:transition-none ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'} `}
      >
        {/* Logo */}
        <div className="hidden items-center space-x-3 border-b border-gray-800 p-6 md:flex">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600">
            <span className="text-sm font-bold text-white">A</span>
          </div>
          <span className="text-xl font-semibold text-white">Admin</span>
        </div>

        {/* Mobile spacing to account for fixed header */}
        <div className="h-16 md:hidden" />

        {/* Navigation */}
        <nav className="flex-1 space-y-4 overflow-y-auto p-4">
          {navigationItems.map(({ id, label, icon: Icon }) => {
            const isActive = activeItem === id;

            return (
              <Link
                key={id}
                href={`/admin/${label.toLowerCase()}`}
                onClick={() => {
                  setActiveItem(id);
                  setIsSidebarOpen(false);
                  setIsProfileOpen(false);
                }}
                className={`flex items-center space-x-3 rounded-lg px-3 py-2.5 transition-all duration-200 ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-gray-300 hover:bg-[#2a2a2a] hover:text-white'
                }`}
              >
                <Icon
                  className={`h-5 w-5 flex-shrink-0 ${isActive ? 'text-white' : 'text-gray-400'}`}
                />
                <span className="truncate text-sm font-medium">{label}</span>
              </Link>
            );
          })}
        </nav>

        {/* User Profile */}
        <div className="mt-auto border-t border-gray-800 p-4">
          <div className="relative">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex w-full items-center space-x-3 rounded-lg p-3 transition-colors duration-200 hover:bg-[#2a2a2a]"
            >
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gray-600">
                <User className="h-4 w-4 text-gray-300" />
              </div>
              <div className="min-w-0 flex-1 text-left">
                <p className="truncate text-sm font-medium text-white">
                  Nikhil Pandey{' '}
                </p>
                <p className="truncate text-xs text-gray-400">Administrator</p>
              </div>
              <ChevronDown
                className={`h-4 w-4 flex-shrink-0 text-gray-400 transition-transform duration-200 ${
                  isProfileOpen ? 'rotate-180 transform' : ''
                }`}
              />
            </button>

            {/* Profile Dropdown */}
            {isProfileOpen && (
              <div className="absolute right-0 bottom-full left-0 z-10 mb-2 rounded-lg border border-gray-700 bg-[#2a2a2a] shadow-xl">
                <button
                  className="flex w-full items-center space-x-3 rounded-t-lg px-3 py-2 transition-colors hover:bg-[#3a3a3a]"
                  onClick={() => setIsProfileOpen(false)}
                >
                  <User className="h-4 w-4 flex-shrink-0 text-gray-400" />
                  <span className="text-sm text-gray-300">Profile</span>
                </button>
                <button
                  className="flex w-full items-center space-x-3 px-3 py-2 transition-colors hover:bg-[#3a3a3a]"
                  onClick={() => setIsProfileOpen(false)}
                >
                  <Settings className="h-4 w-4 flex-shrink-0 text-gray-400" />
                  <span className="text-sm text-gray-300">
                    Account Settings
                  </span>
                </button>
                <div className="border-t border-gray-700">
                  <button
                    className="flex w-full items-center space-x-3 rounded-b-lg px-3 py-2 text-red-400 transition-colors hover:bg-[#3a3a3a]"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    <LogOut className="h-4 w-4 flex-shrink-0" />
                    <span className="text-sm">Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="h-16 md:hidden" />
    </>
  );
};

export default Sidebar;
