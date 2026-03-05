'use client';

import { motion } from 'framer-motion';
import { Home, Search, Library, Music2, X } from 'lucide-react';
import { Playlist } from '@/types';
import { ViewType } from './SpotifyApp';

interface SidebarProps {
  view: ViewType;
  setView: (v: ViewType) => void;
  onSelectPlaylist: (id: string) => void;
  playlists: Playlist[];
  isMobileOpen: boolean;
  onMobileClose: () => void;
}

const PlaylistCover = ({ gradient }: { gradient: [string, string] }) => (
  <div
    className="w-10 h-10 rounded flex items-center justify-center flex-shrink-0"
    style={{ background: `linear-gradient(135deg, ${gradient[0]}, ${gradient[1]})` }}
  >
    <Music2 size={14} className="text-white opacity-80" />
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
          <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
            <Music2 size={14} className="text-white" />
          </div>
          <span className="font-bold text-white text-lg tracking-tight">CK.fm</span>
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
            <PlaylistCover gradient={playlist.coverGradient} />
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
      <div className="px-6 py-4 border-t border-white/5">
        <div className="text-xs text-[#a3a3a3] leading-relaxed">
          <div className="font-semibold text-white mb-1.5">Courtney Ko</div>
          <div className="flex gap-4">
            <a
              href="https://www.linkedin.com/in/courtney-ko-720b63103/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="mailto:courtneythko@gmail.com"
              className="hover:text-white transition-colors"
            >
              Email
            </a>
          </div>
        </div>
      </div>
    </aside>
  );
}
