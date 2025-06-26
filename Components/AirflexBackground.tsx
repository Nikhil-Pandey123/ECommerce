'use client';

import React, { ReactNode } from 'react';

interface AirflexBackgroundProps {
  children: ReactNode;
  variant?: string;
  className?: string;
  showOverlay?: boolean;
}

export default function AirflexBackground({
  children,
  variant = 'default',
  className = '',
  showOverlay = true,
}: AirflexBackgroundProps) {
  return (
    <div
      className={`relative min-h-screen w-full overflow-hidden ${className}`}
    >
      {/* Full-width background with Airflex-inspired design */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-cyan-50">
        {/* Animated geometric shapes inspired by AIRFLEX logo */}
        <div className="absolute top-16 right-16 h-36 w-36 opacity-5">
          <div className="relative h-full w-full">
            {/* Large "A" shape */}
            <div className="absolute inset-0 -rotate-12 transform animate-pulse">
              <div className="mx-auto h-0 w-0 border-r-18 border-b-36 border-l-18 border-r-transparent border-b-cyan-400 border-l-transparent"></div>
              <div className="mx-auto mt-2 h-4 w-9 skew-x-12 transform bg-gradient-to-r from-cyan-400 to-blue-400"></div>
            </div>
          </div>
        </div>

        {/* Floating themed elements */}
        <div className="absolute top-24 left-24 h-28 w-28 animate-pulse rounded-full bg-gradient-to-r from-cyan-400/15 to-blue-400/15 opacity-30"></div>
        <div className="absolute right-32 bottom-32 h-20 w-20 animate-bounce rounded-full bg-gradient-to-r from-blue-400/15 to-cyan-400/15 opacity-25"></div>
        <div className="animate-spin-slow absolute top-1/2 right-1/5 h-14 w-14 rotate-45 transform bg-cyan-400/10"></div>
        <div className="absolute bottom-1/3 left-1/4 h-24 w-24 animate-pulse rounded-full bg-gradient-to-r from-slate-600/15 to-cyan-400/15 opacity-20"></div>

        {/* Bubble shapes */}
        <div className="absolute top-40 left-40 opacity-8">
          <div className="relative h-12 w-16 rounded-2xl bg-gradient-to-r from-cyan-300/20 to-blue-300/20">
            <div className="absolute -bottom-2 left-4 h-0 w-0 border-t-4 border-r-4 border-l-4 border-t-cyan-300/20 border-r-transparent border-l-transparent"></div>
          </div>
        </div>

        <div className="absolute right-48 bottom-48 opacity-8">
          <div className="relative h-14 w-20 rounded-2xl bg-gradient-to-r from-blue-300/20 to-cyan-300/20">
            <div className="absolute right-6 -bottom-2 h-0 w-0 border-t-4 border-r-4 border-l-4 border-t-blue-300/20 border-r-transparent border-l-transparent"></div>
          </div>
        </div>

        {/* Dynamic grid pattern */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `
            linear-gradient(90deg, #06b6d4 1px, transparent 1px),
            linear-gradient(#06b6d4 1px, transparent 1px)
          `,
            backgroundSize: '50px 50px',
          }}
        ></div>

        {/* Enhanced wing shapes */}
        <div className="absolute top-32 left-32 opacity-8">
          <div className="relative h-22 w-44">
            <div className="absolute inset-0 skew-y-6 transform rounded-full bg-gradient-to-r from-transparent via-cyan-300/30 to-transparent blur-sm"></div>
            <div className="absolute inset-x-4 inset-y-1 -skew-y-3 transform rounded-full bg-gradient-to-r from-transparent via-blue-300/30 to-transparent"></div>
          </div>
        </div>

        <div className="absolute right-32 bottom-32 opacity-8">
          <div className="relative h-22 w-44 rotate-180 transform">
            <div className="absolute inset-0 skew-y-6 transform rounded-full bg-gradient-to-r from-transparent via-cyan-300/30 to-transparent blur-sm"></div>
            <div className="absolute inset-x-4 inset-y-1 -skew-y-3 transform rounded-full bg-gradient-to-r from-transparent via-blue-300/30 to-transparent"></div>
          </div>
        </div>

        {/* Conditional overlay for depth */}
        {showOverlay && (
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/5 to-transparent"></div>
        )}
      </div>

      {/* Content with relative positioning */}
      <div className="relative z-10">{children}</div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }

        .animate-spin-slow {
          animation: spin-slow 25s linear infinite;
        }
      `}</style>
    </div>
  );
}
