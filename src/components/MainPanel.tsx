'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Menu } from 'lucide-react';
import { Playlist, Track } from '@/types';
import { ViewType } from './SpotifyApp';
import HomeView from './HomeView';
import PlaylistView from './PlaylistView';
import SearchView from './SearchView';

interface MainPanelProps {
  view: ViewType;
  playlists: Playlist[];
  currentPlaylist: Playlist | null;
  selectedTrack: Track | null;
  currentTrackIndex: number;
  onSelectTrack: (track: Track, index: number) => void;
  onSelectPlaylist: (id: string) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  isDrawerOpen: boolean;
  onOpenMobileSidebar: () => void;
}

const pageVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};

export default function MainPanel({
  view,
  playlists,
  currentPlaylist,
  selectedTrack,
  currentTrackIndex,
  onSelectTrack,
  onSelectPlaylist,
  searchQuery,
  setSearchQuery,
  isDrawerOpen,
  onOpenMobileSidebar,
}: MainPanelProps) {
  const showHome = view === 'home' || view === 'library';
  const showSearch = view === 'search';
  const showPlaylist = !!currentPlaylist && !showHome && !showSearch;

  return (
    <main
      className="flex-1 overflow-y-auto md:ml-0 ml-0 relative"
      style={{
        background: 'linear-gradient(180deg, #1e1040 0%, #121212 400px)',
      }}
    >
      {/* Mobile header */}
      <div className="md:hidden flex items-center justify-between px-4 pt-4 pb-2">
        <button
          onClick={onOpenMobileSidebar}
          className="text-white p-1.5 rounded-md bg-white/10"
        >
          <Menu size={20} />
        </button>
        <span className="text-sm font-semibold text-white">CK.fm</span>
        <div className="w-8" />
      </div>

      <AnimatePresence mode="wait">
        {showSearch && (
          <motion.div
            key="search"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.25 }}
          >
            <SearchView
              playlists={playlists}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              onSelectTrack={onSelectTrack}
              onSelectPlaylist={onSelectPlaylist}
            />
          </motion.div>
        )}

        {showHome && (
          <motion.div
            key={view}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.25 }}
          >
            <HomeView
              playlists={playlists}
              onSelectPlaylist={onSelectPlaylist}
              isLibrary={view === 'library'}
            />
          </motion.div>
        )}

        {showPlaylist && (
          <motion.div
            key={currentPlaylist.id}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.25 }}
          >
            <PlaylistView
              playlist={currentPlaylist}
              selectedTrack={selectedTrack}
              currentTrackIndex={currentTrackIndex}
              onSelectTrack={onSelectTrack}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
