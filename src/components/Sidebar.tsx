'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { Trip } from '@/types';
import SearchBar from './SearchBar';

interface SidebarProps {
  trips: Trip[];
  currentTripId: string;
  search: string;
  onSearch: (v: string) => void;
  isMobileOpen: boolean;
  onMobileClose: () => void;
}

const TRIP_BG: Record<string, string> = {
  now: 'bg-lavender-300',
  'ai-valley-events': 'bg-blush-400',
  projects: 'bg-lavender-400',
  hobbies: 'bg-blush-300',
};

// Inline SVG icons for socials
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

export default function Sidebar({
  trips,
  currentTripId,
  search,
  onSearch,
  isMobileOpen,
  onMobileClose,
}: SidebarProps) {
  return (
    <>
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-plum-900/20 backdrop-blur-sm z-30 md:hidden"
          onClick={onMobileClose}
        />
      )}

      <aside
        className={`
          fixed md:relative top-0 left-0 bottom-0 z-40
          w-64 flex flex-col bg-white border-r border-blush-100 shadow-soft
          transition-transform duration-300
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}
      >
        {/* Logo */}
        <div className="px-5 py-5 flex items-center justify-between border-b border-blush-100">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-full overflow-hidden ring-2 ring-blush-200">
              <img src="/profile.jpeg" alt="Courtney" className="w-full h-full object-cover" />
            </div>
            <span className="font-bold text-plum-800 text-base tracking-tight group-hover:text-blush-500 transition-colors">
              Courtney Ko
            </span>
          </Link>
          <button onClick={onMobileClose} className="md:hidden text-plum-300 hover:text-plum-600">
            <X size={18} />
          </button>
        </div>

        {/* Search */}
        <div className="px-4 py-3 border-b border-blush-50">
          <SearchBar value={search} onChange={onSearch} />
        </div>

        {/* Trip list */}
        <div className="flex-1 overflow-y-auto px-3 py-3 space-y-1">
          <p className="text-[10px] font-black uppercase tracking-widest text-plum-300 px-2 mb-2">
            ✈ Trips
          </p>
          {trips.map((trip) => {
            const isActive = trip.id === currentTripId;
            return (
              <Link key={trip.id} href={`/trips/${trip.id}`} onClick={onMobileClose}>
                <motion.div
                  whileHover={{ x: 3 }}
                  transition={{ duration: 0.15 }}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer transition-all ${
                    isActive ? 'bg-blush-50 shadow-card' : 'hover:bg-blush-50/60'
                  }`}
                >
                  <div
                    className={`w-9 h-9 rounded-lg flex-shrink-0 overflow-hidden ${TRIP_BG[trip.id] || 'bg-blush-300'}`}
                  >
                    {trip.coverImage && (
                      <img src={trip.coverImage} alt={trip.title} className="w-full h-full object-cover" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <div className={`text-sm font-semibold truncate ${isActive ? 'text-blush-600' : 'text-plum-700'}`}>
                      {trip.title}
                    </div>
                    <div className="text-[10px] text-plum-300 truncate">{trip.dateRange}</div>
                  </div>
                  {isActive && (
                    <div className="ml-auto w-1.5 h-1.5 rounded-full bg-blush-400 flex-shrink-0" />
                  )}
                </motion.div>
              </Link>
            );
          })}
        </div>

        {/* Footer */}
        <div className="px-5 py-4 border-t border-blush-100">
          <div className="flex items-center gap-2 mb-3">
            <img src="/profile.jpeg" alt="Courtney" className="w-6 h-6 rounded-full object-cover" />
            <span className="text-sm font-semibold text-plum-700">Courtney</span>
          </div>
          <div className="flex items-center gap-2">
            {socials.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                title={label}
                className="w-7 h-7 flex items-center justify-center rounded-full bg-blush-50 text-plum-400 hover:bg-blush-100 hover:text-blush-600 transition-all"
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>
      </aside>
    </>
  );
}
