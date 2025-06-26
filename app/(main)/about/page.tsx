'use client';
import AirflexBackground from '@/Components/AirflexBackground';
export default function AboutPage() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Full-width background with Airflex-inspired design - CONSISTENT WITH CONTACT */}
      <AirflexBackground>
        <section className="relative z-10 min-h-screen px-6 py-20">
          <div className="mx-auto max-w-7xl">
            {/* Hero section - CONSISTENT TYPOGRAPHY */}
            <div className="mb-16 text-center">
              <div className="relative inline-block">
                <h1 className="animate-fade-in mb-6 bg-gradient-to-r from-gray-700 via-gray-800 to-cyan-600 bg-clip-text text-5xl font-bold tracking-wide text-transparent md:text-6xl">
                  About Airflex
                </h1>
                {/* Enhanced decorative underlines */}
                <div className="absolute -bottom-3 left-1/2 h-1.5 w-28 -translate-x-1/2 transform rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 shadow-lg shadow-cyan-400/30"></div>
                <div className="absolute -bottom-6 left-1/2 h-0.5 w-16 -translate-x-1/2 transform rounded-full bg-gradient-to-r from-blue-300 to-cyan-300"></div>
              </div>

              <p className="mx-auto mt-8 max-w-3xl text-2xl leading-relaxed text-gray-600">
                More than a sportswear brand — we're a
                <span className="font-semibold text-cyan-400"> movement</span>{' '}
                empowering athletes worldwide.
              </p>
            </div>

            {/* Main content grid */}
            <div className="mb-16 grid gap-16 lg:grid-cols-2">
              {/* Left column - Story & Mission */}
              <div className="space-y-8">
                <div className="rounded-2xl border border-slate-700/40 bg-gradient-to-br from-slate-800/60 to-slate-900/60 p-8 shadow-2xl backdrop-blur-sm">
                  <h2 className="mb-8 flex items-center text-3xl font-bold text-white">
                    <div className="mr-4 h-8 w-2 rounded-full bg-gradient-to-b from-cyan-400 to-blue-500"></div>
                    Our Story
                  </h2>
                  <p className="mb-6 text-lg leading-relaxed text-gray-300">
                    Airflex exists to empower everyday athletes to perform,
                    look, and feel their best. We believe that greatness isn't
                    reserved for the few — it lives within everyone who dares to
                    push their limits and chase their dreams.
                  </p>
                  <p className="text-lg leading-relaxed text-gray-300">
                    Born from the resilient spirit of the Himalayas, our brand
                    embodies the strength, determination, and unwavering spirit
                    that defines Nepal. We bring this mountain mentality to
                    athletes worldwide.
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-700/40 bg-gradient-to-br from-slate-800/60 to-slate-900/60 p-8 shadow-2xl backdrop-blur-sm">
                  <h2 className="mb-8 flex items-center text-3xl font-bold text-white">
                    <div className="mr-4 h-8 w-2 rounded-full bg-gradient-to-b from-blue-400 to-cyan-500"></div>
                    Our Mission
                  </h2>
                  <p className="text-lg leading-relaxed text-gray-300">
                    To create premium sportswear that doesn't just look good,
                    but performs when it matters most. Every stitch, every
                    fabric choice, every design decision is made with your
                    success in mind.
                  </p>
                </div>
              </div>

              {/* Right column - Values & Promise */}
              <div className="space-y-8">
                <div className="rounded-2xl border border-slate-700/40 bg-gradient-to-br from-slate-800/60 to-slate-900/60 p-8 shadow-2xl backdrop-blur-sm">
                  <h2 className="mb-8 flex items-center text-3xl font-bold text-white">
                    <div className="mr-4 h-8 w-2 rounded-full bg-gradient-to-b from-cyan-400 to-blue-500"></div>
                    Our Values
                  </h2>

                  <div className="space-y-6">
                    <div className="group flex items-center space-x-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 shadow-lg shadow-cyan-500/30 transition-transform duration-300 group-hover:scale-110">
                        <span className="font-bold text-white">P</span>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white">
                          Performance
                        </h3>
                        <p className="text-gray-300">
                          Engineered for excellence
                        </p>
                      </div>
                    </div>

                    <div className="group flex items-center space-x-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-cyan-600 shadow-lg shadow-blue-500/30 transition-transform duration-300 group-hover:scale-110">
                        <span className="font-bold text-white">S</span>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white">
                          Style
                        </h3>
                        <p className="text-gray-300">Contemporary designs</p>
                      </div>
                    </div>

                    <div className="group flex items-center space-x-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-cyan-600 to-blue-500 shadow-lg shadow-cyan-600/30 transition-transform duration-300 group-hover:scale-110">
                        <span className="font-bold text-white">P</span>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white">
                          Purpose
                        </h3>
                        <p className="text-gray-300">Sustainability & impact</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-700/40 bg-gradient-to-br from-slate-800/60 to-slate-900/60 p-8 shadow-2xl backdrop-blur-sm">
                  <h2 className="mb-8 flex items-center text-3xl font-bold text-white">
                    <div className="mr-4 h-8 w-2 rounded-full bg-gradient-to-b from-blue-400 to-cyan-500"></div>
                    Our Promise
                  </h2>
                  <p className="text-lg leading-relaxed text-gray-300">
                    Performance, style, and purpose aren't just words to us —
                    they're our commitment. Every piece we create is designed to
                    elevate your performance while making you feel confident and
                    unstoppable.
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom CTA - CONSISTENT WITH CONTACT */}
            <div className="mt-16 text-center">
              <div className="mx-auto max-w-4xl rounded-3xl border border-slate-700/40 bg-gradient-to-r from-slate-800/60 to-slate-900/60 p-10 shadow-2xl backdrop-blur-sm">
                <h2 className="mb-4 text-3xl font-bold text-white">
                  Join the{' '}
                  <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                    Airflex Movement
                  </span>
                </h2>
                <p className="mb-6 text-lg text-gray-300">
                  Ready to elevate your performance? Discover gear that moves
                  with you, supports your goals, and never compromises on style.
                </p>
                <button className="transform rounded-full bg-gradient-to-r from-blue-500 to-cyan-600 px-10 py-3 font-bold text-white shadow-2xl shadow-blue-500/30 transition-all duration-300 hover:scale-105 hover:from-blue-600 hover:to-cyan-700">
                  Explore Collection
                </button>
              </div>
            </div>
          </div>
        </section>
      </AirflexBackground>
    </div>
  );
}
