'use client';
import React, { useEffect, useState } from 'react';
import StatCard from '@/Components/StatCard';
import { Users } from 'lucide-react';
import axios from 'axios';

const Page = () => {
  interface User {
    _id: string;
    firstName?: string;
    firstname?: string;
    email: string;
    role: string;
  }

  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    axios
      .get('http://localhost:5000/getUsers')
      .then(res => setUsers(res.data.users))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="relative z-10 min-h-screen flex-1 overflow-auto dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 py-6 lg:px-8">
        {/* Stat Cards */}
        <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard name={'Total Users'} icon={Users} value={users.length} />
          <StatCard name={'Active Users'} icon={Users} value={users.length} />
          {/* Add more StatCards if needed */}
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-lg shadow-md">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="dark:bg-gray-800">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold dark:text-gray-300">
                  First Name
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold dark:text-gray-300">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold dark:text-gray-300">
                  Role
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-800 dark:bg-gray-950">
              {users.map(user => {
                const firstName = user.firstName || user.firstname;
                return (
                  <tr
                    key={user._id}
                    className="transition dark:hover:bg-gray-800"
                  >
                    <td className="px-6 py-4 text-sm whitespace-nowrap dark:text-gray-100">
                      {firstName}
                    </td>
                    <td className="px-6 py-4 text-sm whitespace-nowrap dark:text-gray-100">
                      {user.email}
                    </td>
                    <td className="px-6 py-4 text-sm whitespace-nowrap capitalize dark:text-gray-100">
                      {user.role}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Page;
