'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, MapPin, Plane, Mail, ExternalLink } from 'lucide-react';
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

const PROJECTS = [
  {
    title: 'Pearle',
    tag: 'AI Product',
    description: 'AI travel planning assistant — NLP pipelines turning social media posts into collaborative itineraries.',
    outcome: '',
    href: 'https://pearletravel.com',
  },
  {
    title: 'PacaPlate',
    tag: 'App',
    description: 'AI calorie tracking app using computer vision — making nutrition tracking feel effortless and fun.',
    outcome: 'In progress · 2026',
    href: null,
  },
  {
    title: 'TipBrightly',
    tag: 'Fintech',
    description: 'QR-code tipping platform for service workers — led product across two stints, redesigned core flows.',
    outcome: '919% transaction growth',
    href: 'https://tipbrightly.com',
  },
];

const DISPATCHES = [
  {
    title: 'Building AI Valley community experiences',
    description: 'Designing founder events, builder touchpoints, and community moments that feel more intentional.',
    status: 'In progress',
    domain: 'Community',
    freshness: 'Updated this week',
    accent: 'border-blush-300',
    statusStyle: 'bg-blush-100 text-blush-600',
  },
  {
    title: 'Exploring AI agents and tool-use patterns',
    description: 'Studying orchestration patterns, workflows, and where agents feel genuinely useful vs. overhyped.',
    status: 'Researching',
    domain: 'AI',
    freshness: 'Updated recently',
    accent: 'border-lavender-300',
    statusStyle: 'bg-lavender-100 text-lavender-600',
  },
  {
    title: 'Designing travel planning tools',
    description: 'Experimenting with interfaces for smarter trip inspiration and collaborative itinerary flow.',
    status: 'Prototyping',
    domain: 'Product',
    freshness: 'Updated this month',
    accent: 'border-plum-200',
    statusStyle: 'bg-plum-100 text-plum-500',
  },
  {
    title: 'Experimenting with new product ideas',
    description: 'Exploring early-stage concepts at the intersection of AI, community, and everyday human needs.',
    status: 'Exploring',
    domain: 'Experiments',
    freshness: 'Ongoing',
    accent: 'border-blush-200',
    statusStyle: 'bg-blush-50 text-blush-500',
  },
];

const MOMENTS = [
  { src: '/seoul.jpeg', caption: 'Seoul, Korea', context: 'Lived and explored Korean culture', position: 'object-top' },
  { src: '/macchupicchu.jpeg', caption: 'Machu Picchu', context: 'Solo travel and exploration', position: 'object-center' },
  { src: '/sf.jpeg', caption: 'San Francisco', context: 'Home base for building', position: 'object-center' },
  { src: '/china.jpeg', caption: 'China', context: 'Heritage and discovery', position: 'object-center' },
  { src: '/stitch.jpeg', caption: 'Stitch', context: 'My dog and constant companion', position: 'object-center' },
  { src: '/witpic.jpeg', caption: 'AI Valley', context: 'Community I help lead', position: 'object-top' },
];

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Home() {
  const nowTrip = trips.find((t) => t.id === 'now')!;
  const aiValleyTrip = trips.find((t) => t.id === 'ai-valley-events')!;
  const gridTrips = trips.filter((t) => t.id !== 'now');

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
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="pt-14 pb-10 text-center"
        >
          <div className="inline-flex items-center gap-2 bg-white border border-blush-200 rounded-full px-4 py-1.5 text-xs font-semibold text-blush-500 mb-4 shadow-soft">
            <span className="w-1.5 h-1.5 rounded-full bg-blush-400 animate-pulse" />
            Currently in flight
            <Plane size={11} className="text-blush-400" />
          </div>

          <div className="flex justify-center -mb-6 -mt-4">
            <img src="/favicon2.png" alt="Courtney Ko" className="w-56 h-56 object-contain" />
          </div>

          <h1 className="text-5xl md:text-6xl font-black text-plum-900 mb-4 leading-tight">
            Courtney Ko
          </h1>

          <p className="text-sm font-semibold text-plum-500 mb-5 tracking-wide">
            COO at AI Valley · Community Architect · Product Builder
          </p>

          <p className="text-plum-400 text-lg max-w-lg mx-auto leading-relaxed mb-5">
            Building communities, products, and experiments at the frontier of AI
          </p>

          {/* Proof point */}
          <div className="inline-flex items-center gap-2 text-sm text-plum-500 bg-white border border-blush-100 rounded-full px-4 py-2 shadow-soft mb-4">
            <span className="font-black text-blush-500">5,000+</span>
            builders connected through AI Valley
          </div>

          <div className="flex items-center justify-center gap-1.5 text-sm text-plum-400">
            <MapPin size={13} />
            San Francisco, CA
          </div>
        </motion.div>

        {/* Impact Stats */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{ hidden: { opacity: 0, y: 22 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.1 } } }}
          className="mb-14"
        >
          <div className="flex items-center gap-2 mb-4">
            <h2 className="text-sm font-bold text-plum-700">Impact</h2>
            <div className="flex-1 h-px bg-blush-100" />
          </div>
          <div className="grid grid-cols-3 gap-3 md:gap-5 text-center">
            {[
              { value: '5,000+', label: 'Builders connected' },
              { value: '20+', label: 'Events hosted' },
              { value: '5+', label: 'Years building' },
            ].map(({ value, label }) => (
              <div key={label} className="bg-white rounded-2xl p-3 md:p-5 shadow-card border border-blush-50">
                <div className="text-xl md:text-3xl font-black text-blush-500 mb-1">{value}</div>
                <div className="text-[10px] md:text-xs text-plum-400 font-medium leading-tight">{label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Boarding Pass — Now */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.18 } } }}
          className="mb-14"
        >
          <div className="flex items-center gap-2 mb-4">
            <h2 className="text-sm font-bold text-plum-700">Current Itinerary</h2>
            <div className="flex-1 h-px bg-blush-100" />
          </div>
          <BoardingPass trip={nowTrip} />
        </motion.div>

        {/* AI Valley Spotlight */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={fadeUp}
          className="mb-14"
        >
          <div className="flex items-center gap-2 mb-4">
            <h2 className="text-sm font-bold text-plum-700">Main Destination</h2>
            <div className="flex-1 h-px bg-blush-100" />
          </div>

          <Link href="/trips/ai-valley-events">
            <motion.div
              whileHover={{ y: -3, boxShadow: '0 20px 56px rgba(173,134,144,0.22)' }}
              transition={{ duration: 0.22 }}
              className="relative overflow-hidden rounded-3xl bg-white border border-blush-100 shadow-card cursor-pointer group"
            >
              <div className="h-52 relative overflow-hidden bg-blush-300">
                {aiValleyTrip.coverImage && (
                  <img
                    src={aiValleyTrip.coverImage}
                    alt="AI Valley"
                    className="w-full h-full object-cover opacity-70 group-hover:opacity-80 transition-opacity duration-300"
                    style={{ objectPosition: aiValleyTrip.coverImagePosition ?? 'center' }}
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-plum-900/75 via-plum-900/20 to-transparent" />
                <div className="absolute bottom-5 left-6 right-6">
                  <div className="text-[9px] font-black uppercase tracking-[0.2em] text-white/60 mb-1">
                    Community · San Francisco
                  </div>
                  <h3 className="text-2xl font-black text-white leading-tight">AI Valley</h3>
                </div>
              </div>

              <div className="p-6">
                <p className="text-sm text-plum-500 leading-relaxed mb-5">
                  San Francisco's technical AI community — running hackathons, events, and programming that connects builders, founders, and researchers at the frontier.
                </p>

                {/* Photo strip */}
                <div className="flex gap-2 mb-5 overflow-x-auto pb-1 -mx-1 px-1">
                  {[
                    { src: '/witpic.jpeg', label: 'WIT Hackathon' },
                    { src: '/rota.jpg', label: 'Return of the Agents' },
                    { src: '/nowplaying.jpeg', label: 'Community' },
                  ].map(({ src, label }) => (
                    <div key={src} className="relative flex-shrink-0 w-36 h-24 rounded-xl overflow-hidden bg-blush-200">
                      <img src={src} alt={label} className="w-full h-full object-cover opacity-80" />
                      <div className="absolute inset-0 bg-gradient-to-t from-plum-900/50 to-transparent" />
                      <span className="absolute bottom-1.5 left-2 text-[9px] font-bold text-white/80 uppercase tracking-wide">{label}</span>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-3 gap-3 mb-5">
                  {[
                    { value: '20+', label: 'Events hosted' },
                    { value: '5,000+', label: 'Builders' },
                    { value: '5+', label: 'Years building' },
                  ].map(({ value, label }) => (
                    <div key={label} className="bg-blush-50 border border-blush-100 rounded-xl p-3 text-center">
                      <div className="text-lg font-black text-blush-500 leading-none mb-1">{value}</div>
                      <div className="text-[10px] text-plum-400 font-medium">{label}</div>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-end gap-1.5 text-xs font-semibold text-blush-400 group-hover:text-blush-600 transition-colors">
                  View events <ArrowRight size={13} />
                </div>
              </div>
            </motion.div>
          </Link>
        </motion.div>

        {/* Projects */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={fadeUp}
          className="mb-14"
        >
          <div className="flex items-center gap-2 mb-4">
            <h2 className="text-sm font-bold text-plum-700">What I've Built</h2>
            <div className="flex-1 h-px bg-blush-100" />
            <Link href="/trips/projects" className="text-[11px] text-blush-400 hover:text-blush-600 font-semibold transition-colors">
              All projects <ArrowRight size={11} className="inline" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {PROJECTS.map((project, i) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                whileHover={{ y: -3, boxShadow: '0 12px 32px rgba(173,134,144,0.18)' }}
                className="bg-white rounded-2xl p-5 shadow-card border border-blush-100 flex flex-col"
              >
                <span className="text-[10px] font-bold uppercase tracking-widest text-blush-400 mb-3">{project.tag}</span>
                <h3 className="font-black text-plum-900 text-lg mb-2 leading-tight">{project.title}</h3>
                <p className="text-xs text-plum-400 leading-relaxed flex-1 mb-4">{project.description}</p>
                <div className="flex items-center justify-between">
                  {project.outcome && (
                    <span className="text-[10px] font-semibold text-lavender-500 bg-lavender-50 px-2.5 py-1 rounded-full">
                      {project.outcome}
                    </span>
                  )}
                  {project.href && (
                    <a
                      href={project.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="text-blush-400 hover:text-blush-600 transition-colors"
                    >
                      <ExternalLink size={13} />
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Currently Building */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={fadeUp}
          className="mb-14"
        >
          <div className="flex items-center gap-2 mb-1">
            <h2 className="text-sm font-bold text-plum-700">Currently Building</h2>
            <div className="flex-1 h-px bg-blush-100" />
          </div>
          <p className="text-[11px] text-plum-300 font-medium mb-5">Dispatches from the field</p>

          <div className="relative">
            {/* Connecting line */}
            <div className="absolute left-[11px] top-4 bottom-4 w-px bg-blush-100 hidden sm:block" />

            <div className="space-y-3">
              {DISPATCHES.map(({ title, description, status, domain, freshness, accent, statusStyle }, i) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                  className="relative sm:pl-8"
                >
                  {/* Timeline dot */}
                  <div className="absolute left-0 top-5 w-[10px] h-[10px] rounded-full bg-white border-2 border-blush-300 hidden sm:block" />

                  <div className={`bg-white rounded-2xl border-l-4 ${accent} border-t border-r border-b border-blush-100 shadow-card p-5`}>
                    {/* Dispatch number */}
                    <div className="text-[9px] font-black uppercase tracking-[0.2em] text-blush-300 mb-2">
                      Dispatch {String(i + 1).padStart(2, '0')}
                    </div>

                    <h3 className="font-bold text-plum-900 text-sm leading-snug mb-1.5">{title}</h3>
                    <p className="text-xs text-plum-400 leading-relaxed mb-3">{description}</p>

                    {/* Meta row */}
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${statusStyle}`}>
                        {status}
                      </span>
                      <span className="text-[10px] text-plum-300 font-medium">{domain}</span>
                      <span className="text-plum-200 text-[10px]">·</span>
                      <span className="text-[10px] text-plum-300 font-medium">{freshness}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* All Trips Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={fadeUp}
          className="mb-14"
        >
          <div className="flex items-center gap-2 mb-4">
            <h2 className="text-sm font-bold text-plum-700">All Trips</h2>
            <div className="flex-1 h-px bg-blush-100" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {gridTrips.map((trip, i) => (
              <Link key={trip.id} href={`/trips/${trip.id}`}>
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                  whileHover={{ y: -4, boxShadow: '0 12px 36px rgba(173,134,144,0.22)' }}
                  className="bg-white rounded-2xl overflow-hidden shadow-card border border-blush-100 cursor-pointer group h-full"
                >
                  <div className={`h-28 ${TRIP_COLORS[trip.id] || 'bg-blush-300'} relative overflow-hidden`}>
                    {trip.coverImage && (
                      <img
                        src={trip.coverImage}
                        alt={trip.title}
                        className="w-full h-full object-cover opacity-60 group-hover:opacity-75 transition-opacity duration-300"
                        style={{ filter: 'saturate(1.1)', objectPosition: trip.coverImagePosition ?? 'center' }}
                      />
                    )}
                  </div>
                  <div className="p-4">
                    <div className="text-[10px] font-bold uppercase tracking-widest text-blush-400 mb-1">{trip.dateRange}</div>
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

        {/* Moments */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={fadeUp}
          className="mb-14"
        >
          <div className="flex items-center gap-2 mb-4">
            <h2 className="text-sm font-bold text-plum-700">Moments</h2>
            <div className="flex-1 h-px bg-blush-100" />
          </div>
          <div className="grid grid-cols-3 gap-3">
            {MOMENTS.map(({ src, caption, context, position }) => (
              <div key={src} className="relative rounded-2xl overflow-hidden bg-blush-200 shadow-card h-36 sm:h-44 group">
                <img src={src} alt={caption} className={`w-full h-full object-cover ${position} group-hover:scale-105 transition-transform duration-500`} />
                <div className="absolute inset-0 bg-gradient-to-t from-plum-900/70 via-plum-900/10 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-2.5">
                  <div className="text-[10px] font-black text-white leading-none mb-0.5">{caption}</div>
                  <div className="text-[9px] text-white/65 leading-tight">{context}</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Footer CTA */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="pt-12 border-t border-blush-100 text-center"
        >
          <div className="text-3xl mb-4">🦙</div>
          <h2 className="text-2xl font-black text-plum-900 mb-2">Let's build something interesting.</h2>
          <p className="text-sm text-plum-400 leading-relaxed mb-8 max-w-sm mx-auto">
            Whether it's a community event, a product idea, or just a good conversation — I'm always open.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
            <a
              href="https://www.linkedin.com/in/courtney-ko-720b63103/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 bg-plum-800 text-white rounded-full text-sm font-semibold hover:bg-plum-700 transition-colors shadow-soft"
            >
              <Mail size={14} />
              Connect on LinkedIn
            </a>
            {socials.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                title={label}
                className="w-9 h-9 flex items-center justify-center rounded-full bg-white border border-blush-200 text-plum-400 hover:bg-blush-100 hover:text-blush-600 transition-all shadow-soft"
              >
                <Icon />
              </a>
            ))}
          </div>

          <p className="text-[10px] text-plum-300 font-medium">
            Made with care in San Francisco · 2026
          </p>
        </motion.div>

      </main>
    </div>
  );
}
