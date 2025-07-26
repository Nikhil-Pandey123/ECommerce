'use client';
import React, { useState } from 'react';
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
} from 'lucide-react';
import Link from 'next/link';

const Sidebar = () => {
  const [activeItem, setActiveItem] = useState('dashboard');
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'orders', label: 'Orders', icon: ShoppingCart },
    { id: 'reports', label: 'Reports', icon: FileText },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="flex h-full w-64 flex-col border-r border-gray-800 bg-[#1e1e1e]">
      {/* Logo */}
      <div className="border-b border-gray-800 p-6">
        <div className="flex items-center space-x-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600">
            <span className="text-sm font-bold text-white">A</span>
          </div>
          <span className="text-xl font-semibold text-white">Admin</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-4 p-4">
        {navigationItems.map(({ id, label, icon: Icon }) => {
          const isActive = activeItem === id;

          return (
            <Link
              key={id}
              href={`/admin/${label.toLowerCase()}`}
              onClick={() => setActiveItem(id)}
              className={`flex items-center space-x-3 rounded-lg px-3 py-2.5 transition-colors duration-200 ${
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:bg-[#2a2a2a] hover:text-white'
              }`}
            >
              <Icon
                className={`h-5 w-5 ${isActive ? 'text-white' : 'text-gray-400'}`}
              />
              <span className="text-sm font-medium">{label}</span>
            </Link>
          );
        })}
      </nav>

      {/* User Profile */}
      <div className="border-t border-gray-800 p-4">
        <div className="relative">
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex w-full items-center space-x-3 rounded-lg p-3 transition-colors duration-200 hover:bg-[#2a2a2a]"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-600">
              <User className="h-4 w-4 text-gray-300" />
            </div>
            <div className="flex-1 text-left">
              <p className="text-sm font-medium text-white">Nikhil Pandey</p>
              <p className="text-xs text-gray-400">Administrator</p>
            </div>
            <ChevronDown
              className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${
                isProfileOpen ? 'rotate-180 transform' : ''
              }`}
            />
          </button>

          {isProfileOpen && (
            <div className="absolute right-0 bottom-full left-0 mb-2 rounded-lg border border-gray-700 bg-[#2a2a2a] shadow-lg">
              <button className="flex w-full items-center space-x-3 rounded-t-lg px-3 py-2 hover:bg-[#3a3a3a]">
                <User className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-300">Profile</span>
              </button>
              <button className="flex w-full items-center space-x-3 px-3 py-2 hover:bg-[#3a3a3a]">
                <Settings className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-300">Account Settings</span>
              </button>
              <div className="border-t border-gray-700">
                <button className="flex w-full items-center space-x-3 rounded-b-lg px-3 py-2 text-red-400 hover:bg-[#3a3a3a]">
                  <LogOut className="h-4 w-4" />
                  <span className="text-sm">Sign Out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
