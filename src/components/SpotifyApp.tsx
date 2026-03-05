'use client';

import { useState, useEffect, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import { playlists } from '@/data/playlists';
import Sidebar from './Sidebar';
import MainPanel from './MainPanel';
import PlayerBar from './PlayerBar';
import DetailDrawer from './DetailDrawer';
import { Track, Playlist } from '@/types';

export type ViewType = 'home' | 'search' | 'library' | string;

export default function SpotifyApp() {
  const [view, setView] = useState<ViewType>('home');
  const [selectedTrack, setSelectedTrack] = useState<Track | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const tourRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const currentPlaylist: Playlist | null =
    playlists.find((p) => p.id === view) ?? null;
  const currentTracks = currentPlaylist?.tracks ?? [];
  const nextTrack = currentTracks[currentTrackIndex + 1] ?? null;

  const selectTrack = (track: Track, index: number) => {
    setSelectedTrack(track);
    setCurrentTrackIndex(index);
    setIsDrawerOpen(true);
  };

  const selectPlaylist = (id: string) => {
    setView(id);
    setIsDrawerOpen(false);
    setSelectedTrack(null);
    setCurrentTrackIndex(0);
    setIsPlaying(false);
    setIsMobileSidebarOpen(false);
  };

  const goToView = (v: ViewType) => {
    setView(v);
    setIsMobileSidebarOpen(false);
  };

  // Guided tour: auto-advance every 8s when isPlaying
  useEffect(() => {
    if (isPlaying && currentTracks.length > 0) {
      tourRef.current = setInterval(() => {
        setCurrentTrackIndex((prev) => {
          const next = prev + 1;
          if (next >= currentTracks.length) {
            setIsPlaying(false);
            return prev;
          }
          setSelectedTrack(currentTracks[next]);
          setIsDrawerOpen(true);
          return next;
        });
      }, 8000);
    }
    return () => {
      if (tourRef.current) clearInterval(tourRef.current);
    };
  }, [isPlaying, currentTracks]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') return;

      switch (e.key) {
        case 'j':
        case 'ArrowDown': {
          e.preventDefault();
          if (currentTracks.length > 0) {
            const next = Math.min(currentTrackIndex + 1, currentTracks.length - 1);
            setCurrentTrackIndex(next);
            setSelectedTrack(currentTracks[next]);
          }
          break;
        }
        case 'k':
        case 'ArrowUp': {
          e.preventDefault();
          if (currentTracks.length > 0) {
            const prev = Math.max(currentTrackIndex - 1, 0);
            setCurrentTrackIndex(prev);
            setSelectedTrack(currentTracks[prev]);
          }
          break;
        }
        case 'Enter': {
          if (selectedTrack) setIsDrawerOpen(true);
          break;
        }
        case 'Escape': {
          setIsDrawerOpen(false);
          break;
        }
        case '/': {
          e.preventDefault();
          setView('search');
          setTimeout(() => document.getElementById('search-input')?.focus(), 100);
          break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentTrackIndex, currentTracks, selectedTrack]);

  const handleTogglePlay = () => {
    if (!isPlaying && currentTracks.length > 0 && !selectedTrack) {
      setSelectedTrack(currentTracks[0]);
      setCurrentTrackIndex(0);
      setIsDrawerOpen(true);
    }
    setIsPlaying((p) => !p);
  };

  const handleNext = () => {
    const next = Math.min(currentTrackIndex + 1, currentTracks.length - 1);
    setCurrentTrackIndex(next);
    if (currentTracks[next]) {
      setSelectedTrack(currentTracks[next]);
      if (isDrawerOpen) setIsDrawerOpen(true);
    }
  };

  const handlePrev = () => {
    const prev = Math.max(currentTrackIndex - 1, 0);
    setCurrentTrackIndex(prev);
    if (currentTracks[prev]) setSelectedTrack(currentTracks[prev]);
  };

  return (
    <div className="flex flex-col h-screen bg-[#121212] text-white overflow-hidden">
      <div className="flex flex-1 overflow-hidden relative">
        {/* Mobile sidebar overlay */}
        {isMobileSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/60 z-30 md:hidden"
            onClick={() => setIsMobileSidebarOpen(false)}
          />
        )}

        <Sidebar
          view={view}
          setView={goToView}
          onSelectPlaylist={selectPlaylist}
          playlists={playlists}
          isMobileOpen={isMobileSidebarOpen}
          onMobileClose={() => setIsMobileSidebarOpen(false)}
        />

        <MainPanel
          view={view}
          playlists={playlists}
          currentPlaylist={currentPlaylist}
          selectedTrack={selectedTrack}
          currentTrackIndex={currentTrackIndex}
          onSelectTrack={selectTrack}
          onSelectPlaylist={selectPlaylist}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          isDrawerOpen={isDrawerOpen}
          onOpenMobileSidebar={() => setIsMobileSidebarOpen(true)}
        />

        <AnimatePresence>
          {isDrawerOpen && selectedTrack && (
            <DetailDrawer
              track={selectedTrack}
              playlist={currentPlaylist}
              onClose={() => setIsDrawerOpen(false)}
            />
          )}
        </AnimatePresence>
      </div>

      <PlayerBar
        currentTrack={selectedTrack}
        nextTrack={nextTrack}
        currentPlaylist={currentPlaylist}
        currentTrackIndex={currentTrackIndex}
        totalTracks={currentTracks.length}
        isPlaying={isPlaying}
        onTogglePlay={handleTogglePlay}
        onNext={handleNext}
        onPrev={handlePrev}
      />
    </div>
  );
}
