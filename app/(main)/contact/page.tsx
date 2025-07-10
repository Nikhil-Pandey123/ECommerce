'use client';

import { useState } from 'react';
import { Input } from '@/Components/ui/input';
import { Textarea } from '@/Components/ui/textarea';
import { Button } from '@/Components/ui/button';
import { toast } from 'sonner';
import Link from 'next/link';
import Image from 'next/image';
import AirflexBackground from '@/Components/AirflexBackground';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Message sent successfully!');
    setName('');
    setEmail('');
    setMessage('');

    // backend logic
    try {
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          message,
        }),
      });
      const data = await response.json();

      if (response.ok) {
        toast.success('Message sent successfully!');

        // Clearing the form
        setName('');
        setEmail('');
        setMessage('');
      } else {
        toast.error(
          data.message || 'Failed to send message. Please try again.'
        );
      }
    } catch (error) {
      toast.error(
        'An error occurred while sending your message. Please try again later.'
      );
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Consistent background with TopSellingSection */}
      <AirflexBackground>
        <section className="relative z-10 min-h-screen px-6 py-20">
          <div className="mx-auto max-w-7xl">
            {/* Hero section with consistent typography */}
            <div className="mb-12 text-center">
              <div className="relative inline-block">
                <h1 className="mb-4 bg-gradient-to-r from-gray-700 via-gray-800 to-cyan-600 bg-clip-text text-4xl font-bold tracking-wider text-transparent md:text-5xl">
                  Get In Touch
                </h1>
                {/* Decorative underline inspired by logo */}
                <div className="absolute -bottom-2 left-1/2 h-1 w-24 -translate-x-1/2 transform rounded-full bg-gradient-to-r from-cyan-400 to-blue-500"></div>
                <div className="absolute -bottom-4 left-1/2 h-0.5 w-16 -translate-x-1/2 transform rounded-full bg-gradient-to-r from-gray-400 to-cyan-300"></div>
              </div>

              <p className="mx-auto mt-6 max-w-3xl text-lg text-gray-600">
                Have questions? Want to collaborate? We'd love to hear from you.
                <span className="font-semibold text-cyan-600">
                  {' '}
                  Let's connect
                </span>{' '}
                and make something amazing together.
              </p>
            </div>

            <div className="grid items-start gap-16 lg:grid-cols-2">
              {/* Contact Information */}
              <div className="space-y-8">
                <div className="rounded-2xl border border-gray-200/60 bg-white/80 p-8 shadow-xl backdrop-blur-sm">
                  <h2 className="mb-8 flex items-center text-3xl font-bold text-gray-800">
                    <div className="mr-4 h-8 w-2 rounded-full bg-gradient-to-b from-cyan-400 to-blue-500"></div>
                    Contact Information
                  </h2>

                  <div className="space-y-6">
                    <div className="group flex items-center space-x-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 shadow-lg shadow-cyan-500/30 transition-transform duration-300 group-hover:scale-110">
                        <svg
                          className="h-6 w-6 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">
                          Email
                        </h3>
                        <p className="text-gray-600">airflex@gmail.com</p>
                      </div>
                    </div>

                    <div className="group flex items-center space-x-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-cyan-600 shadow-lg shadow-blue-500/30 transition-transform duration-300 group-hover:scale-110">
                        <svg
                          className="h-6 w-6 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                          />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">
                          Phone
                        </h3>
                        <p className="text-gray-600">+977 9843106940</p>
                      </div>
                    </div>

                    <div className="group flex items-center space-x-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-cyan-600 to-blue-500 shadow-lg shadow-cyan-600/30 transition-transform duration-300 group-hover:scale-110">
                        <svg
                          className="h-6 w-6 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">
                          Location
                        </h3>
                        <p className="text-gray-600">
                          Mid-Baneshwor, Kathmandu
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Social Media */}
                <div className="rounded-2xl border border-gray-200/60 bg-white/80 p-8 shadow-xl backdrop-blur-sm">
                  <h3 className="mb-6 flex items-center text-2xl font-bold text-gray-800">
                    <div className="mr-4 h-6 w-2 rounded-full bg-gradient-to-b from-blue-400 to-cyan-500"></div>
                    Follow Us
                  </h3>
                  <div className="flex space-x-4">
                    <div className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 shadow-lg shadow-cyan-500/30 transition-transform duration-300 hover:scale-110">
                      <span className="font-bold">
                        <Image
                          src="/Airflex photo/fb-logo.png"
                          alt="instagram"
                          width={48}
                          height={48}
                        />
                      </span>
                    </div>
                    <div className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-cyan-600 shadow-lg shadow-blue-500/30 transition-transform duration-300 hover:scale-110">
                      <span className="font-bold text-white">
                        <Image
                          src="/Airflex photo/telegram.png"
                          alt="instagram"
                          width={45}
                          height={45}
                        />
                      </span>
                    </div>
                    <div className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-gradient-to-br from-cyan-600 to-blue-500 shadow-lg shadow-cyan-600/30 transition-transform duration-300 hover:scale-110">
                      <span className="font-bold text-white">
                        <Image
                          src="/Airflex photo/instagram.png"
                          alt="instagram"
                          width={48}
                          height={48}
                        />
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact wala Form */}
              <div className="rounded-2xl border border-gray-200/60 bg-white/80 p-8 shadow-xl backdrop-blur-sm">
                <h2 className="mb-8 flex items-center text-3xl font-bold text-gray-800">
                  <div className="mr-4 h-8 w-2 rounded-full bg-gradient-to-b from-cyan-400 to-blue-500"></div>
                  Send us a Message
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Your Name
                    </label>
                    <Input
                      placeholder="Enter your full name"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      className="border-gray-300 bg-white/70 text-gray-800 placeholder-gray-500 transition-all duration-300 focus:border-cyan-400 focus:ring-cyan-400/20"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Email Address
                    </label>
                    <Input
                      placeholder="Enter your email address"
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      className="border-gray-300 bg-white/70 text-gray-800 placeholder-gray-500 transition-all duration-300 focus:border-cyan-400 focus:ring-cyan-400/20"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Your Message
                    </label>
                    <Textarea
                      placeholder="Tell us what's on your mind..."
                      value={message}
                      onChange={e => setMessage(e.target.value)}
                      rows={6}
                      className="resize-none border-gray-300 bg-white/70 text-gray-800 placeholder-gray-500 transition-all duration-300 focus:border-cyan-400 focus:ring-cyan-400/20"
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    onClick={handleSubmit}
                    className="w-full transform rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-4 font-semibold text-white shadow-lg shadow-cyan-500/30 transition-all duration-300 hover:scale-105 hover:from-cyan-600 hover:to-blue-700 hover:shadow-cyan-500/50"
                  >
                    Send Message
                  </Button>
                </form>
              </div>
            </div>

            {/* Bottom CTA */}
            <div className="mt-16 text-center">
              <div className="mx-auto max-w-4xl rounded-3xl border border-gray-200/60 bg-white/80 p-10 shadow-xl backdrop-blur-sm">
                <h2 className="mb-4 text-3xl font-bold text-gray-800">
                  Ready to Start Your{' '}
                  <span className="bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                    Airflex Journey
                  </span>
                  ?
                </h2>
                <p className="mb-6 text-lg text-gray-600">
                  Join thousands of athletes who trust Airflex for their
                  performance needs.
                </p>
                <Link
                  href="/products"
                  className="transform cursor-pointer rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 px-10 py-3 font-semibold text-white shadow-lg shadow-cyan-500/30 transition-all duration-300 hover:scale-105 hover:from-cyan-600 hover:to-blue-700"
                >
                  Shop Now
                </Link>
              </div>
            </div>
          </div>
        </section>
      </AirflexBackground>
    </div>
  );
}
