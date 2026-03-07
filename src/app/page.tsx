'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, MapPin, Sparkles } from 'lucide-react';
import { trips } from '@/data/trips';
import BoardingPass from '@/components/BoardingPass';

const TRIP_COLORS: Record<string, string> = {
  now: 'bg-lavender-300',
  'ai-valley-events': 'bg-blush-400',
  projects: 'bg-lavender-400',
  hobbies: 'bg-blush-300',
};

const IconX = () => (
  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.74l7.73-8.835L1.254 2.25H8.08l4.259 5.63 5.905-5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const IconInstagram = () => (
  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
  </svg>
);

const IconGitHub = () => (
  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="currentColor">
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  </svg>
);

const IconLinkedIn = () => (
  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const socials = [
  { href: 'https://x.com/courtneythko', label: 'X', Icon: IconX },
  { href: 'https://instagram.com/courtneythko', label: 'Instagram', Icon: IconInstagram },
  { href: 'https://github.com/quartneyquo', label: 'GitHub', Icon: IconGitHub },
  { href: 'https://www.linkedin.com/in/courtney-ko-720b63103/', label: 'LinkedIn', Icon: IconLinkedIn },
];

export default function Home() {
  const nowTrip = trips.find((t) => t.id === 'now')!;
  const otherTrips = trips.filter((t) => t.id !== 'now');

  return (
    <div className="min-h-screen bg-blush-50">
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-5 max-w-5xl mx-auto">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-full overflow-hidden ring-2 ring-blush-200 shadow-soft">
            <img src="/profile.jpeg" alt="Courtney" className="w-full h-full object-cover" />
          </div>
          <span className="font-bold text-plum-800 text-base">Courtney Ko</span>
        </div>
        <div className="flex items-center gap-2">
          {socials.map(({ href, label, Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              title={label}
              className="w-7 h-7 flex items-center justify-center rounded-full bg-white border border-blush-200 text-plum-400 hover:bg-blush-100 hover:text-blush-600 transition-all shadow-soft"
            >
              <Icon />
            </a>
          ))}
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-6 pb-20">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="pt-12 pb-12 text-center"
        >
          <div className="inline-flex items-center gap-2 bg-white border border-blush-200 rounded-full px-4 py-1.5 text-xs font-semibold text-blush-500 mb-6 shadow-soft">
            <span className="w-1.5 h-1.5 rounded-full bg-blush-400 animate-pulse" />
            Currently in flight
            <Sparkles size={11} className="text-lavender-400" />
          </div>

          <h1 className="text-5xl md:text-6xl font-black text-plum-900 mb-4 leading-tight">
            Hi, I&apos;m{' '}
            <span className="text-blush-500">Courtney</span>
          </h1>

          <p className="text-plum-400 text-lg max-w-xl mx-auto leading-relaxed mb-3">
            Building community, product, and tech at the intersection of people and AI
          </p>
          <div className="flex items-center justify-center gap-1.5 text-sm text-plum-500">
            <MapPin size={13} />
            San Francisco, CA
          </div>
        </motion.div>

        {/* Boarding Pass — Now trip */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mb-12"
        >
          <div className="flex items-center gap-2 mb-4">
            <h2 className="text-sm font-bold text-plum-700">🎫 Featured Trip</h2>
            <div className="flex-1 h-px bg-blush-100" />
          </div>
          <BoardingPass trip={nowTrip} />
        </motion.div>

        {/* All trips grid */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="flex items-center gap-2 mb-4">
            <h2 className="text-sm font-bold text-plum-700">✈️ All Trips</h2>
            <div className="flex-1 h-px bg-blush-100" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {otherTrips.map((trip, i) => (
              <Link key={trip.id} href={`/trips/${trip.id}`}>
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 + i * 0.08 }}
                  whileHover={{ y: -4, boxShadow: '0 12px 36px rgba(247,168,184,0.25)' }}
                  className="bg-white rounded-2xl overflow-hidden shadow-card border border-blush-100 cursor-pointer group"
                >
                  {/* Cover */}
                  <div className={`h-28 ${TRIP_COLORS[trip.id] || 'bg-blush-300'} relative overflow-hidden`}>
                    {trip.coverImage && (
                      <img
                        src={trip.coverImage}
                        alt={trip.title}
                        className="w-full h-full object-cover opacity-60 group-hover:opacity-75 transition-opacity"
                        style={{ filter: 'saturate(1.1)', objectPosition: trip.coverImagePosition ?? 'center' }}
                      />
                    )}
                  </div>

                  {/* Info */}
                  <div className="p-4">
                    <div className="text-[10px] font-bold uppercase tracking-widest text-blush-400 mb-1">
                      {trip.dateRange}
                    </div>
                    <h3 className="font-bold text-plum-800 text-base mb-1">{trip.title}</h3>
                    <p className="text-xs text-plum-400 leading-relaxed line-clamp-2">{trip.subtitle}</p>
                    <div className="flex items-center justify-between mt-3">
                      <span className="text-[10px] font-semibold text-plum-300">
                        {trip.days.reduce((a, d) => a + d.stops.length, 0)} stops
                      </span>
                      <ArrowRight size={13} className="text-blush-300 group-hover:text-blush-500 transition-colors" />
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-16 grid grid-cols-3 gap-3 md:gap-6 text-center"
        >
          {[
            { value: '20+', label: 'Events hosted' },
            { value: '5000+', label: 'Builders connected' },
            { value: '3+', label: 'Products built' },
          ].map(({ value, label }) => (
            <div key={label} className="bg-white rounded-2xl p-3 md:p-5 shadow-card border border-blush-50">
              <div className="text-xl md:text-3xl font-black text-blush-500 mb-1">{value}</div>
              <div className="text-[10px] md:text-xs text-plum-400 font-medium leading-tight">{label}</div>
            </div>
          ))}
        </motion.div>
      </main>
    </div>
  );
}
