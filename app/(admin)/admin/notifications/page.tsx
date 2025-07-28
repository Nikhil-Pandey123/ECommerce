'use client';
import React, { useState, useEffect } from 'react';

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [filter, setFilter] = useState('all');
  useEffect(() => {
    const mockNotifications = [
      {
        id: 1,
        type: 'order',
        title: 'New Order Received',
        message: 'Order #6884e5b910022c326a229c67 from Mandip Joshi',
        time: '2 minutes ago',
        read: false,
        priority: 'high',
      },
      {
        id: 2,
        type: 'user',
        title: 'New User Registration',
        message: 'Nikhil Pandey has registered as a new customer',
        time: '15 minutes ago',
        read: false,
        priority: 'medium',
      },
      {
        id: 3,
        type: 'system',
        title: 'Low Stock Alert',
        message: 'Product p4 stock is running low (3 items remaining)',
        time: '1 hour ago',
        read: true,
        priority: 'high',
      },
      {
        id: 4,
        type: 'order',
        title: 'Order Shipped',
        message: 'Order #68836fdc3b9681833abe2b32 has been shipped',
        time: '2 hours ago',
        read: true,
        priority: 'low',
      },
      {
        id: 5,
        type: 'payment',
        title: 'Payment Received',
        message:
          'Payment of ₹5397 received for order #6884e5b910022c326a229c67',
        time: '3 hours ago',
        read: true,
        priority: 'medium',
      },
      {
        id: 6,
        type: 'system',
        title: 'Database Backup Complete',
        message: 'Daily database backup completed successfully',
        time: '4 hours ago',
        read: true,
        priority: 'low',
      },
      {
        id: 7,
        type: 'user',
        title: 'User Support Request',
        message: 'Customer kimj6398@gmail.com submitted a support ticket',
        time: '5 hours ago',
        read: false,
        priority: 'medium',
      },
    ];

    setTimeout(() => {
      setNotifications(mockNotifications);
      setLoading(false);
    }, 500);
  }, []);

  const getTypeIcon = type => {
    const icons = {
      order: (
        <svg
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
          />
        </svg>
      ),
      user: (
        <svg
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
      ),
      system: (
        <svg
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      ),
      payment: (
        <svg
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      ),
    };
    return icons[type] || icons.system;
  };

  const getTypeColor = type => {
    const colors = {
      order: 'bg-blue-500',
      user: 'bg-green-500',
      system: 'bg-purple-500',
      payment: 'bg-yellow-500',
    };
    return colors[type] || 'bg-gray-500';
  };

  const getPriorityColor = priority => {
    const colors = {
      high: 'border-red-500',
      medium: 'border-yellow-500',
      low: 'border-green-500',
    };
    return colors[priority] || 'border-gray-500';
  };

  const markAsRead = id => {
    setNotifications(prev =>
      prev.map(notif => (notif.id === id ? { ...notif, read: true } : notif))
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(notif => ({ ...notif, read: true })));
  };

  const filteredNotifications = notifications.filter(notif => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !notif.read;
    return notif.type === filter;
  });

  const unreadCount = notifications.filter(notif => !notif.read).length;

  return (
    <div className="min-h-screen p-6">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <div className="mb-4 flex items-center justify-between">
            <h1 className="text-3xl font-bold text-white">Notifications</h1>
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
              >
                Mark all as read
              </button>
            )}
          </div>
          <p className="text-gray-400">
            Stay updated with your admin activities
          </p>

          {/* Stats */}
          <div className="mt-6 flex items-center space-x-6">
            <div className="rounded-lg border border-gray-700 bg-gray-800 px-4 py-2">
              <span className="text-sm text-gray-400">Total</span>
              <div className="text-2xl font-semibold text-white">
                {notifications.length}
              </div>
            </div>
            <div className="rounded-lg border border-gray-700 bg-gray-800 px-4 py-2">
              <span className="text-sm text-gray-400">Unread</span>
              <div className="text-2xl font-semibold text-blue-400">
                {unreadCount}
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-6 flex flex-wrap gap-2">
          {['all', 'unread', 'order', 'user', 'system', 'payment'].map(
            filterType => (
              <button
                key={filterType}
                onClick={() => setFilter(filterType)}
                className={`rounded-lg px-4 py-2 text-sm font-medium capitalize transition-colors ${
                  filter === filterType
                    ? 'bg-blue-600 text-white'
                    : 'border border-gray-700 bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {filterType}
                {filterType === 'unread' && unreadCount > 0 && (
                  <span className="ml-2 rounded-full bg-red-500 px-2 py-0.5 text-xs text-white">
                    {unreadCount}
                  </span>
                )}
              </button>
            )
          )}
        </div>

        {/* Notifications List */}
        <div className="space-y-3">
          {filteredNotifications.length === 0 ? (
            <div className="rounded-lg border border-gray-700 bg-gray-800 py-12 text-center">
              <div className="mb-2 text-lg text-gray-400">
                No notifications found
              </div>
              <div className="text-sm text-gray-500">
                {filter === 'unread'
                  ? 'All notifications have been read'
                  : 'No notifications match your filter'}
              </div>
            </div>
          ) : (
            filteredNotifications.map(notification => (
              <div
                key={notification.id}
                onClick={() =>
                  !notification.read && markAsRead(notification.id)
                }
                className={`hover:bg-gray-750 cursor-pointer rounded-lg border bg-gray-800 p-4 transition-all ${
                  notification.read
                    ? 'border-gray-700'
                    : getPriorityColor(notification.priority)
                } ${!notification.read ? 'shadow-lg' : ''}`}
              >
                <div className="flex items-start space-x-4">
                  {/* Icon */}
                  <div
                    className={`rounded-full p-2 text-white ${getTypeColor(notification.type)}`}
                  >
                    {getTypeIcon(notification.type)}
                  </div>

                  {/* Content */}
                  <div className="min-w-0 flex-1">
                    <div className="mb-1 flex items-center justify-between">
                      <h3
                        className={`font-semibold ${notification.read ? 'text-gray-300' : 'text-white'}`}
                      >
                        {notification.title}
                      </h3>
                      <div className="flex items-center space-x-2">
                        {!notification.read && (
                          <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                        )}
                        <span
                          className={`text-xs ${notification.read ? 'text-gray-500' : 'text-gray-400'}`}
                        >
                          {notification.time}
                        </span>
                      </div>
                    </div>
                    <p
                      className={`text-sm ${notification.read ? 'text-gray-400' : 'text-gray-300'}`}
                    >
                      {notification.message}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {filteredNotifications.length > 0 && (
          <div className="mt-8 text-center">
            <div className="text-sm text-gray-500">
              Showing {filteredNotifications.length} of {notifications.length}{' '}
              notifications
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationsPage;
