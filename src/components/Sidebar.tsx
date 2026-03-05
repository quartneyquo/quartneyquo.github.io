'use client';

import { motion } from 'framer-motion';
import { Home, Search, Library, Music2, X } from 'lucide-react';
import { Playlist } from '@/types';
import { ViewType } from './SpotifyApp';
import CoverImage from './CoverImage';

interface SidebarProps {
  view: ViewType;
  setView: (v: ViewType) => void;
  onSelectPlaylist: (id: string) => void;
  playlists: Playlist[];
  isMobileOpen: boolean;
  onMobileClose: () => void;
}

const PlaylistCover = ({ gradient, image }: { gradient: [string, string]; image?: string }) => (
  <div className="w-10 h-10 rounded flex-shrink-0 overflow-hidden">
    {image ? (
      <CoverImage src={image} alt="" className="w-full h-full" />
    ) : (
      <div
        className="w-full h-full flex items-center justify-center"
        style={{ background: `linear-gradient(135deg, ${gradient[0]}, ${gradient[1]})` }}
      >
        <Music2 size={14} className="text-white opacity-80" />
      </div>
    )}
  </div>
);

export default function Sidebar({
  view,
  setView,
  onSelectPlaylist,
  playlists,
  isMobileOpen,
  onMobileClose,
}: SidebarProps) {
  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'search', label: 'Search', icon: Search },
    { id: 'library', label: 'Your Library', icon: Library },
  ];

  const isActive = (id: string) => view === id;

  return (
    <aside
      className={`
        w-64 bg-black flex flex-col h-full flex-shrink-0 z-40
        fixed md:relative top-0 left-0 bottom-0 transition-transform duration-300
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}
    >
      {/* Logo */}
      <div className="px-6 py-5 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <img
            src="/profile.jpeg"
            alt="Courtney Ko"
            className="w-8 h-8 rounded-full object-cover ring-1 ring-purple-500/50 shadow-lg"
          />
          <span className="font-bold text-white text-lg tracking-tight">Courtney.fm</span>
        </div>
        <button
          onClick={onMobileClose}
          className="md:hidden text-white/60 hover:text-white"
        >
          <X size={18} />
        </button>
      </div>

      {/* Nav */}
      <nav className="px-3 mb-2">
        {navItems.map(({ id, label, icon: Icon }) => (
          <motion.button
            key={id}
            onClick={() => setView(id as ViewType)}
            whileHover={{ x: 2 }}
            transition={{ duration: 0.15 }}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-semibold transition-colors ${
              isActive(id)
                ? 'text-white bg-white/10'
                : 'text-[#a3a3a3] hover:text-white'
            }`}
          >
            <Icon size={20} />
            {label}
          </motion.button>
        ))}
      </nav>

      {/* Divider */}
      <div className="mx-6 border-t border-white/10 my-2" />

      {/* Playlists */}
      <div className="flex-1 overflow-y-auto px-3 pb-2">
        <div className="px-3 py-2 text-[10px] font-bold text-[#a3a3a3] uppercase tracking-widest">
          Playlists
        </div>
        {playlists.map((playlist) => (
          <motion.button
            key={playlist.id}
            onClick={() => onSelectPlaylist(playlist.id)}
            whileHover={{ x: 2 }}
            transition={{ duration: 0.15 }}
            className={`w-full flex items-center gap-3 px-2 py-2 rounded-md transition-colors group ${
              isActive(playlist.id)
                ? 'bg-white/10'
                : 'hover:bg-white/5'
            }`}
          >
            <PlaylistCover gradient={playlist.coverGradient} image={playlist.coverImage} />
            <div className="text-left min-w-0">
              <div
                className={`text-sm font-medium truncate transition-colors ${
                  isActive(playlist.id) ? 'text-white' : 'text-[#a3a3a3] group-hover:text-white'
                }`}
              >
                {playlist.title}
              </div>
              <div className="text-xs text-[#a3a3a3] truncate">
                {playlist.tracks.length} tracks
              </div>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Footer */}
      <div className="px-4 py-4 border-t border-white/5">
        <div className="flex items-center gap-2.5 mb-3">
          <img
            src="/profile.jpeg"
            alt="Courtney"
            className="w-7 h-7 rounded-full object-cover ring-1 ring-purple-500/40"
          />
          <span className="text-sm font-semibold text-white">Courtney</span>
        </div>
        <div className="flex items-center gap-2">
          {/* X / Twitter */}
          <a
            href="https://x.com/courtneythko"
            target="_blank"
            rel="noopener noreferrer"
            title="@courtneythko on X"
            className="w-7 h-7 flex items-center justify-center rounded-full bg-white/5 text-[#a3a3a3] hover:text-white hover:bg-white/15 transition-colors"
          >
            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.74l7.73-8.835L1.254 2.25H8.08l4.259 5.63 5.905-5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>
          {/* Instagram */}
          <a
            href="https://instagram.com/courtneythko"
            target="_blank"
            rel="noopener noreferrer"
            title="@courtneythko on Instagram"
            className="w-7 h-7 flex items-center justify-center rounded-full bg-white/5 text-[#a3a3a3] hover:text-white hover:bg-white/15 transition-colors"
          >
            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="currentColor">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
            </svg>
          </a>
          {/* GitHub */}
          <a
            href="https://github.com/quartneyquo"
            target="_blank"
            rel="noopener noreferrer"
            title="quartneyquo on GitHub"
            className="w-7 h-7 flex items-center justify-center rounded-full bg-white/5 text-[#a3a3a3] hover:text-white hover:bg-white/15 transition-colors"
          >
            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="currentColor">
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
            </svg>
          </a>
          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/courtney-ko-720b63103/"
            target="_blank"
            rel="noopener noreferrer"
            title="Courtney Ko on LinkedIn"
            className="w-7 h-7 flex items-center justify-center rounded-full bg-white/5 text-[#a3a3a3] hover:text-white hover:bg-white/15 transition-colors"
          >
            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>
          {/* Email */}
          <a
            href="mailto:courtneythko@gmail.com"
            title="Email Courtney"
            className="w-7 h-7 flex items-center justify-center rounded-full bg-white/5 text-[#a3a3a3] hover:text-white hover:bg-white/15 transition-colors"
          >
            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
          </a>
        </div>
      </div>
    </aside>
  );
}
