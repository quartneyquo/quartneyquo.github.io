'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Menu } from 'lucide-react';
import { Trip, Stop } from '@/types';
import Sidebar from './Sidebar';
import TripHeader from './TripHeader';
import TimelineDay from './TimelineDay';
import StopDrawer from './StopDrawer';
import FilterChips from './FilterChips';
import MiniBar from './MiniBar';

interface TripPageClientProps {
  trip: Trip;
  allTrips: Trip[];
}

export default function TripPageClient({ trip, allTrips }: TripPageClientProps) {
  const [selectedStop, setSelectedStop] = useState<Stop | null>(null);
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Flatten all stops for drawer navigation
  const allStops = useMemo(
    () => trip.days.flatMap((d) => d.stops),
    [trip]
  );

  // All unique tags in this trip
  const allTags = useMemo(
    () => Array.from(new Set(allStops.map((s) => s.tag))),
    [allStops]
  );

  const currentIndex = selectedStop ? allStops.findIndex((s) => s.id === selectedStop.id) : -1;
  const prevStop = currentIndex > 0 ? allStops[currentIndex - 1] : null;
  const nextStop = currentIndex < allStops.length - 1 ? allStops[currentIndex + 1] : null;

  // Filtered stop IDs based on search + tag
  const filteredStopIds = useMemo<Set<string> | null>(() => {
    const q = search.toLowerCase().trim();
    const hasFilter = activeFilter !== 'All';
    const hasSearch = q.length > 0;

    if (!hasFilter && !hasSearch) return null; // show all

    const ids = new Set<string>();
    allStops.forEach((stop) => {
      const matchesTag = !hasFilter || stop.tag === activeFilter;
      const matchesSearch =
        !hasSearch ||
        stop.title.toLowerCase().includes(q) ||
        stop.blurb.toLowerCase().includes(q) ||
        stop.tag.toLowerCase().includes(q) ||
        stop.locationLabel?.toLowerCase().includes(q);

      if (matchesTag && matchesSearch) ids.add(stop.id);
    });
    return ids;
  }, [search, activeFilter, allStops]);

  const handleSelectStop = useCallback((stop: Stop) => {
    setSelectedStop(stop);
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.set('stop', stop.id);
      window.history.replaceState({}, '', url.toString());
    }
  }, []);

  const handleClose = useCallback(() => {
    setSelectedStop(null);
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.delete('stop');
      window.history.replaceState({}, '', url.toString());
    }
  }, []);

  // Restore stop from URL on load
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const stopId = params.get('stop');
      if (stopId) {
        const stop = allStops.find((s) => s.id === stopId);
        if (stop) setSelectedStop(stop);
      }
    }
  }, [allStops]);

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.target as HTMLElement).tagName === 'INPUT') return;
      if (e.key === 'Escape') handleClose();
      if (e.key === 'ArrowRight' || e.key === 'j') {
        if (nextStop) handleSelectStop(nextStop);
      }
      if (e.key === 'ArrowLeft' || e.key === 'k') {
        if (prevStop) handleSelectStop(prevStop);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [nextStop, prevStop, handleClose, handleSelectStop]);

  return (
    <div className="flex h-screen overflow-hidden bg-blush-50">
      <Sidebar
        trips={allTrips}
        currentTripId={trip.id}
        search={search}
        onSearch={setSearch}
        isMobileOpen={isMobileSidebarOpen}
        onMobileClose={() => setIsMobileSidebarOpen(false)}
      />

      {/* Main content */}
      <main className="flex-1 overflow-y-auto pb-20">
        {/* Mobile top bar */}
        <div className="md:hidden flex items-center gap-3 px-4 pt-4 pb-2">
          <button
            onClick={() => setIsMobileSidebarOpen(true)}
            className="p-2 rounded-xl bg-white shadow-card text-plum-500"
          >
            <Menu size={18} />
          </button>
          <span className="font-bold text-plum-700 text-sm">{trip.title}</span>
        </div>

        <div className="px-4 md:px-6 pt-4 md:pt-6">
          <TripHeader trip={trip} />

          {/* Filters */}
          <div className="mb-6">
            <FilterChips
              available={allTags}
              active={activeFilter}
              onChange={setActiveFilter}
            />
          </div>

          {/* Timeline */}
          <div>
            {trip.days.map((day, i) => (
              <TimelineDay
                key={day.id}
                day={day}
                dayNumber={i + 1}
                selectedStopId={selectedStop?.id ?? null}
                onSelectStop={handleSelectStop}
                filteredStopIds={filteredStopIds}
              />
            ))}

            {filteredStopIds?.size === 0 && (
              <div className="text-center py-16 text-plum-300">
                <div className="text-4xl mb-3">✈️</div>
                <p className="font-semibold text-plum-500">No stops match your search</p>
                <p className="text-sm mt-1">Try a different filter or keyword</p>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Detail drawer */}
      <StopDrawer
        stop={selectedStop}
        trip={trip}
        allStops={allStops}
        onClose={handleClose}
        onNavigate={handleSelectStop}
      />

      {/* Mini bar */}
      <AnimatePresence>
        {selectedStop && (
          <MiniBar
            currentStop={selectedStop}
            prevStop={prevStop}
            nextStop={nextStop}
            onNavigate={handleSelectStop}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
