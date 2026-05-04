'use client';

import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import {
  ArrowRight,
  BarChart3,
  Bot,
  BriefcaseBusiness,
  Code2,
  ExternalLink,
  Layers3,
  Mail,
  MapPin,
  Network,
  Sparkles,
  Wand2,
} from 'lucide-react';

type CaseStudy = {
  id: string;
  eyebrow: string;
  title: string;
  summary: string;
  problem: string;
  role: string;
  process: string[];
  built: string[];
  metrics: { value: string; label: string }[];
  tools: string[];
  outcome: string;
  image?: string;
  accent: string;
  roleFit: string;
  visual: 'automation' | 'travel' | 'community';
};

type WorldStop = {
  id: string;
  title: string;
  eyebrow: string;
  blurb: string;
  metric: string;
  cta: { label: string; href: string };
  x: number;
  y: number;
  image: string;
  icon: typeof Bot;
};

type NavItem = {
  label: string;
  shortLabel: string;
  href: string;
  icon: typeof Bot;
};

const CONTACT_LINK = 'https://www.linkedin.com/in/courtney-ko-720b63103/';

const socials = [
  { href: 'mailto:courtneythko@gmail.com', label: 'Email', Icon: Mail },
  { href: 'https://www.linkedin.com/in/courtney-ko-720b63103/', label: 'LinkedIn', Icon: BriefcaseBusiness },
];

const impactStats = [
  { value: '75%', label: 'faster enterprise workflow processing' },
  { value: '90%', label: 'faster case review with AI summaries' },
  { value: '3.9K+', label: 'Pearle itineraries generated in beta' },
  { value: '8K+', label: 'AI builders connected through AI Valley' },
];

const roleTargets = ['Product Manager', 'Technical PM', 'AI Automation', 'PMM / Community Growth'];

const caseStudies: CaseStudy[] = [
  {
    id: 'nvidia',
    eyebrow: 'NVIDIA · Automation Systems',
    title: 'Self-serve automation for enterprise operations workflows.',
    summary:
      'Owned workflow diagnosis, self-serve tooling, and Python automation that turned repetitive operations into faster self-serve systems.',
    problem:
      'Manual enterprise operations workflows were slow, repetitive, and dependent on specialized knowledge spread across systems and stakeholders.',
    role:
      'Business Analyst, Automation & Systems. I identified workflow bottlenecks, translated operational pain points into scoped tooling, and built Python-powered automation flows.',
    process: [
      'Mapped manual request workflows to isolate repeated decisions and fragile handoffs.',
      'Partnered with stakeholders to define a self-serve workflow that non-specialists could use independently.',
      'Prototyped automation paths, validated outputs, and tightened the experience around speed, trust, and consistency.',
    ],
    built: [
      'Self-serve UI for recurring operations requests.',
      'Python workflows that transform unstructured request data into structured inputs.',
      'AI-powered summarization workflows for faster review and resolution.',
    ],
    metrics: [
      { value: '2h → 30m', label: 'workflow processing time' },
      { value: '1w → 1.5h', label: 'case review time' },
      { value: '3+', label: 'team members enabled to self-serve' },
    ],
    tools: ['Python', 'Internal platforms', 'AI summarization', 'Workflow automation', 'Self-serve tooling'],
    outcome:
      'Reduced repetitive work, improved process consistency, and gave the team a faster operating model without exposing sensitive internal details.',
    accent: 'from-[#3D2540] to-[#AD8690]',
    roleFit: 'Technical PM · AI Automation',
    visual: 'automation',
  },
  {
    id: 'pearle',
    eyebrow: 'Pearle · AI Travel Platform',
    title: 'An AI group travel planner that transformed messy inspiration into itineraries.',
    summary:
      'Founded, scoped, and shipped a 0 to 1 AI travel product with LLM-powered itinerary generation and collaborative planning flows.',
    problem:
      'Group travel planning starts with scattered inspiration, screenshots, social posts, and conflicting preferences. Turning that into a shared plan is tedious.',
    role:
      'Founder and Product Lead. I owned product vision, roadmap, MVP scope, user flows, research loops, and launch priorities.',
    process: [
      'Interviewed beta users to understand how groups collect, compare, and commit to travel ideas.',
      'Defined the core itinerary generation loop and prioritized the fastest path to a usable MVP.',
      'Iterated on private beta feedback to improve clarity, collaboration, and generated itinerary quality.',
    ],
    built: [
      'LLM-powered itinerary generation experience.',
      'Structured data pipeline for turning travel inspiration into editable plans.',
      'Collaborative planning flows for groups comparing options.',
    ],
    metrics: [
      { value: '10w', label: 'MVP delivery timeline' },
      { value: '3.9K+', label: 'itineraries generated' },
      { value: '25+', label: 'private beta users' },
    ],
    tools: ['LLM APIs', 'NLP pipelines', 'Product strategy', 'User research', 'Prototyping', 'Roadmapping'],
    outcome:
      'Validated demand for AI-assisted group travel planning and turned a broad consumer problem into a focused, testable product experience.',
    image: '/pearle.jpeg',
    accent: 'from-[#2B1B2E] to-[#9F8AFF]',
    roleFit: 'Founder · AI Product',
    visual: 'travel',
  },
  {
    id: 'ai-valley',
    eyebrow: 'AI Valley · Community & Ecosystem',
    title: 'High-signal AI programming for founders, engineers, and partners.',
    summary:
      'Owned programming, partnerships, and operating systems for a technical AI ecosystem in San Francisco.',
    problem:
      'AI communities can become noisy quickly. Builders need useful rooms, real technical programming, strong partners, and reasons to keep returning.',
    role:
      'COO and community builder. I owned programming design, partnerships, event operations, and the systems behind community-led growth.',
    process: [
      'Designed programming around what builders actually need: hands-on API adoption, hackathons, demos, and founder relationships.',
      'Coordinated sponsors, partners, organizers, and builders so events created value on every side.',
      'Built repeatable operating rhythms for events, outreach, activation, and community momentum.',
    ],
    built: [
      'Technical hackathons, workshops, and founder events.',
      'Partner experiences with AI infrastructure and ecosystem companies.',
      'San Francisco all-women AI hackathon with 500+ registrations.',
    ],
    metrics: [
      { value: '8K+', label: 'engineers and founders connected' },
      { value: '500+', label: 'hackathon registrations' },
      { value: '20+', label: 'events hosted' },
    ],
    tools: ['Community-led growth', 'Event strategy', 'Partnerships', 'DevRel', 'Operations', 'AI APIs'],
    outcome:
      'Created a community engine that connects builders, sponsors, and founders through credible technical programming.',
    image: '/witpic.jpeg',
    accent: 'from-[#774050] to-[#C8AAAF]',
    roleFit: 'PMM · Community Growth',
    visual: 'community',
  },
];

const orderedCaseStudies = [
  caseStudies.find((study) => study.id === 'nvidia')!,
  caseStudies.find((study) => study.id === 'ai-valley')!,
  caseStudies.find((study) => study.id === 'pearle')!,
];

const toolkit = [
  { title: 'Product Strategy', items: ['Roadmaps', '0 to 1 MVPs', 'Experimentation', 'Launch loops'] },
  { title: 'AI Automation', items: ['Workflow optimization', 'AI summaries', 'LLM APIs', 'Internal tools'] },
  { title: 'Research & UX', items: ['User interviews', 'Journey mapping', 'Prototyping', 'Figma'] },
  { title: 'Technical Fluency', items: ['Python', 'SQL', 'APIs', 'Data workflows', 'Internal systems'] },
  { title: 'Builder Tools', items: ['Claude Code', 'Replit', 'Rapid prototypes', 'Prompt systems'] },
  { title: 'Community Growth', items: ['Event strategy', 'Partnerships', 'DevRel', 'Founder ecosystems'] },
];

const educationCredentials = [
  {
    degree: 'M.A. Psychology',
    school: 'San Francisco State University',
    logo: '/sfsu-logo.svg',
  },
  {
    degree: 'B.S. Cognitive Science',
    school: 'UC San Diego',
    logo: '/ucsd-logo.svg',
  },
];

const photoMoments = [
  { src: '/seoul.jpeg', label: 'Travel research', tone: 'User context' },
  { src: '/macchupicchu.jpeg', label: 'Itinerary inspiration', tone: 'Pearle' },
  { src: '/aivalley-builder-table.jpg', label: 'Builder conversations', tone: 'AI Valley' },
  { src: '/aivalley-workshop-room.jpg', label: 'Technical workshop', tone: 'Community' },
  { src: '/aivalley-founder-talk.jpg', label: 'Founder programming', tone: 'Female Founder Brunch' },
  { src: '/fembrunch.jpg', label: 'Women building AI', tone: 'Ecosystem' },
];

const worldStops: WorldStop[] = [
  {
    id: 'nvidia-lab',
    title: 'NVIDIA Lab',
    eyebrow: 'Enterprise Automation',
    blurb: 'Workflow diagnosis, self-serve tooling, Python automation, and AI summaries for faster internal operations.',
    metric: '2h -> 30m workflow processing',
    cta: { label: 'Open case study', href: '#nvidia' },
    x: 17,
    y: 28,
    image: '/nowplaying.jpeg',
    icon: Bot,
  },
  {
    id: 'ai-valley-hub',
    title: 'AI Valley Hub',
    eyebrow: 'Community Engine',
    blurb: 'High-signal rooms for builders, founders, partners, technical workshops, and community-led growth.',
    metric: '8K+ builders connected',
    cta: { label: 'Visit the hub', href: '#ai-valley' },
    x: 47,
    y: 30,
    image: '/aivalley-lounge-event.jpg',
    icon: Network,
  },
  {
    id: 'pearle-port',
    title: 'Pearle Port',
    eyebrow: 'AI Travel Product',
    blurb: 'A 0 to 1 group travel planner that turns messy inspiration into collaborative itineraries.',
    metric: '3.9K+ itineraries generated',
    cta: { label: 'See Pearle', href: '#pearle' },
    x: 76,
    y: 27,
    image: '/pearle.jpeg',
    icon: Sparkles,
  },
  {
    id: 'basecamp',
    title: 'Courtney Basecamp',
    eyebrow: 'About',
    blurb: 'UX, psychology, product strategy, AI tools, and a very real love of making complex things feel usable.',
    metric: 'Warm human, rigorous operator',
    cta: { label: 'Meet Courtney', href: '#about' },
    x: 24,
    y: 66,
    image: '/profile.jpeg',
    icon: MapPin,
  },
  {
    id: 'travel-atlas',
    title: 'Travel Atlas',
    eyebrow: 'Worldview',
    blurb: 'Travel research, cultural curiosity, and lived inspiration for building products people actually use.',
    metric: '20 countries and counting',
    cta: { label: 'View context', href: '#work' },
    x: 55,
    y: 68,
    image: '/macchupicchu.jpeg',
    icon: MapPin,
  },
  {
    id: 'contact-terminal',
    title: 'Contact Terminal',
    eyebrow: 'Next Step',
    blurb: 'For teams building AI products, automation systems, or technical communities with taste and momentum.',
    metric: 'Open to product, AI, PMM',
    cta: { label: 'Start a conversation', href: 'mailto:courtneythko@gmail.com' },
    x: 82,
    y: 63,
    image: '/sf.jpeg',
    icon: Mail,
  },
];

const navItems: NavItem[] = [
  { label: 'World', shortLabel: 'World', href: '#world', icon: MapPin },
  { label: 'Work', shortLabel: 'Work', href: '#work', icon: BriefcaseBusiness },
  { label: 'Case Studies', shortLabel: 'Cases', href: '#case-studies', icon: Layers3 },
  { label: 'About', shortLabel: 'About', href: '#about', icon: Sparkles },
  { label: 'Toolkit', shortLabel: 'Tools', href: '#toolkit', icon: Wand2 },
  { label: 'Contact', shortLabel: 'Contact', href: '#contact', icon: Mail },
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
};

function SectionHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mb-8 max-w-3xl">
      <div className="mb-3 text-[11px] font-black uppercase tracking-[0.22em] text-blush-500">{eyebrow}</div>
      <h2 className="text-3xl md:text-5xl font-black leading-tight text-plum-900">{title}</h2>
      {description && <p className="mt-4 text-sm md:text-base leading-relaxed text-plum-400">{description}</p>}
    </div>
  );
}

function ButtonLink({
  href,
  children,
  variant = 'primary',
}: {
  href: string;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
}) {
  return (
    <a
      href={href}
      target={href.startsWith('http') || href.startsWith('mailto:') ? '_blank' : undefined}
      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
      className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-bold transition-all ${
        variant === 'primary'
          ? 'bg-plum-900 text-white shadow-soft hover:-translate-y-0.5 hover:bg-plum-800'
          : 'border border-blush-200 bg-white text-plum-800 shadow-soft hover:-translate-y-0.5 hover:border-blush-300 hover:bg-blush-50'
      }`}
    >
      {children}
    </a>
  );
}

function LogoMark({ className = '' }: { className?: string }) {
  return (
    <motion.span
      aria-hidden="true"
      className={`relative inline-flex items-center justify-center overflow-visible rounded-full border border-blush-200 bg-white shadow-soft ${className}`}
      animate={{ y: [0, -2, 0], rotate: [-1, 1, -1] }}
      whileHover={{ y: -3, scale: 1.04, rotate: -2 }}
      transition={{ duration: 3.4, ease: 'easeInOut', repeat: Infinity }}
    >
      <img
        src="/favicon2.png"
        alt=""
        className="h-[150%] w-[150%] max-w-none object-contain"
      />
    </motion.span>
  );
}

function PearlShellIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" className={className} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 25.5C11.2 16 17.4 10 24 10s12.8 6 14 15.5" strokeWidth="3.4" />
      <path d="M14 24.8c2.7-4.2 5.8-6.5 10-6.5s7.3 2.3 10 6.5" strokeWidth="2.8" />
      <path d="M18.3 22.4l-4-5.4M24 21.2V14M29.7 22.4l4-5.4" strokeWidth="2.2" />
      <path d="M11.5 29.2c3.2-1.7 6.3-1.3 8.3.8 2.2-2.1 6.2-2.1 8.4 0 2-2.1 5.1-2.5 8.3-.8-1.9 5.9-6.6 9.2-12.5 9.2s-10.6-3.3-12.5-9.2Z" strokeWidth="3.4" />
      <circle cx="24" cy="28.1" r="5.3" fill="white" strokeWidth="3" />
    </svg>
  );
}

function WorldStopMarkerIcon({ id, className = '' }: { id: string; className?: string }) {
  if (id === 'pearle-port') {
    return <PearlShellIcon className={className} />;
  }

  if (id === 'nvidia-lab') {
    return (
      <svg viewBox="0 0 48 48" aria-hidden="true" className={className} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
        <rect x="13" y="15" width="22" height="20" rx="5" strokeWidth="3.2" />
        <path d="M18 15v-4M24 15V9M30 15v-4M18 35v4M24 35v4M30 35v4M13 21H9M13 29H9M35 21h4M35 29h4" strokeWidth="2.5" />
        <path d="M18.5 26.5h5l2-5 4 10 1.8-5h3.2" strokeWidth="2.6" />
      </svg>
    );
  }

  if (id === 'ai-valley-hub') {
    return (
      <svg viewBox="0 0 48 48" aria-hidden="true" className={className} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="24" cy="13" r="5.4" strokeWidth="3.2" />
        <circle cx="13" cy="32" r="5.4" strokeWidth="3.2" />
        <circle cx="35" cy="32" r="5.4" strokeWidth="3.2" />
        <path d="M21.4 17.8l-5.7 9.5M26.6 17.8l5.7 9.5M18.8 32h10.4" strokeWidth="2.7" />
      </svg>
    );
  }

  if (id === 'basecamp') {
    return (
      <svg viewBox="0 0 48 48" aria-hidden="true" className={className} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 36h32L24 11 8 36Z" strokeWidth="3.2" />
        <path d="M24 11v25M24 36l7-11M24 36l-7-11" strokeWidth="2.6" />
        <path d="M12 36h24" strokeWidth="3.2" />
      </svg>
    );
  }

  if (id === 'travel-atlas') {
    return (
      <svg viewBox="0 0 48 48" aria-hidden="true" className={className} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="24" cy="24" r="16" strokeWidth="3.2" />
        <path d="M24 8c5 4.5 7.5 9.8 7.5 16S29 35.5 24 40M24 8c-5 4.5-7.5 9.8-7.5 16S19 35.5 24 40M9 24h30M13 15.5h22M13 32.5h22" strokeWidth="2.2" />
        <path d="M28.5 19.5l-3 8.7-6 2.3 3-8.7 6-2.3Z" fill="currentColor" strokeWidth="2" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" className={className} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      <rect x="10" y="13" width="28" height="22" rx="4" strokeWidth="3.2" />
      <path d="M15 20l8 6 10-6M15 31h18" strokeWidth="2.7" />
      <path d="M35 9v7M31.5 12.5h7" strokeWidth="2.4" />
    </svg>
  );
}

function OpacaWorldHero() {
  const [targetStopId, setTargetStopId] = useState<string | null>(null);
  const [arrivedStopId, setArrivedStopId] = useState<string | null>(null);
  const targetIndex = worldStops.findIndex((stop) => stop.id === targetStopId);
  const targetStop = targetIndex >= 0 ? worldStops[targetIndex] : null;
  const activeStop = worldStops.find((stop) => stop.id === arrivedStopId) ?? null;
  const shouldReduceMotion = useReducedMotion();
  const ActiveIcon = activeStop?.icon;
  const opacaPosition = targetStop ? { x: targetStop.x, y: targetStop.y } : { x: 51, y: 54 };
  const isTraveling = Boolean(targetStop && !activeStop);

  useEffect(() => {
    if (!targetStopId) {
      setArrivedStopId(null);
      return undefined;
    }

    if (shouldReduceMotion) {
      setArrivedStopId(targetStopId);
      return undefined;
    }

    setArrivedStopId(null);
    const arriveTimer = window.setTimeout(() => {
      setArrivedStopId(targetStopId);
    }, 880);

    return () => window.clearTimeout(arriveTimer);
  }, [shouldReduceMotion, targetStopId]);

  const selectStop = (stopId: string) => {
    setTargetStopId(stopId);
  };

  const goToNextStop = () => {
    setTargetStopId(worldStops[((targetIndex >= 0 ? targetIndex : -1) + 1) % worldStops.length].id);
  };

  return (
    <section id="world" className="scroll-mt-24 py-3 sm:py-10 md:py-14">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease: 'easeOut' }}
        className="relative overflow-hidden rounded-[26px] border border-blush-100 bg-[#F7ECEF] p-2 shadow-soft-lg sm:rounded-[34px] sm:p-4"
      >
        <div className="relative min-h-[560px] overflow-hidden rounded-[22px] border border-white/70 bg-[#83C96B] shadow-[inset_0_0_70px_rgba(41,82,39,0.18)] sm:min-h-[780px] sm:rounded-[28px] lg:min-h-[720px]">
          <div aria-hidden className="absolute inset-0 bg-[radial-gradient(circle_at_18%_24%,rgba(255,255,205,0.26)_0_2px,transparent_3px),radial-gradient(circle_at_82%_72%,rgba(56,112,54,0.17)_0_2px,transparent_4px),radial-gradient(circle_at_48%_46%,rgba(255,255,255,0.18),transparent_31%),linear-gradient(135deg,rgba(255,255,255,0.1),transparent_38%,rgba(42,107,53,0.16))] [background-size:34px_34px,42px_42px,100%_100%,100%_100%]" />

          <svg
            aria-hidden="true"
            className="absolute inset-0 h-full w-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <defs>
              <filter id="softTerrain" x="-20%" y="-20%" width="140%" height="140%">
                <feTurbulence type="fractalNoise" baseFrequency="0.018" numOctaves="2" seed="7" />
                <feDisplacementMap in="SourceGraphic" scale="1.15" />
              </filter>
            </defs>
            <path
              d="M 8 39 C 17 31, 30 35, 35 46 C 42 61, 28 74, 14 69 C 1 65, -2 50, 8 39 Z"
              fill="#A7D978"
              opacity="0.62"
              filter="url(#softTerrain)"
            />
            <path
              d="M 61 12 C 76 3, 93 11, 95 27 C 98 45, 78 53, 65 44 C 53 36, 49 20, 61 12 Z"
              fill="#A2D276"
              opacity="0.58"
              filter="url(#softTerrain)"
            />
            <path
              d="M 64 63 C 80 54, 98 62, 98 79 C 99 95, 82 103, 67 96 C 52 89, 50 72, 64 63 Z"
              fill="#A9DC86"
              opacity="0.55"
              filter="url(#softTerrain)"
            />
            <path
              d="M -8 9 C 10 2, 22 7, 29 16 C 39 29, 24 37, 12 31 C 2 26, -5 24, -8 19 Z"
              fill="#69B8BD"
              filter="url(#softTerrain)"
            />
            <path
              d="M -8 9 C 10 2, 22 7, 29 16 C 39 29, 24 37, 12 31 C 2 26, -5 24, -8 19"
              fill="none"
              stroke="#D8F0DA"
              strokeWidth="2.3"
            />
            <path
              d="M 103 74 C 89 72, 78 80, 82 92 C 85 102, 100 101, 106 95 Z"
              fill="#70B8C8"
              filter="url(#softTerrain)"
            />
            <path
              d="M 103 74 C 89 72, 78 80, 82 92 C 85 102, 100 101, 106 95"
              fill="none"
              stroke="#D8F0DA"
              strokeWidth="2.3"
            />
            {[
              'M 17 28 C 28 22, 37 23, 47 30 C 57 36, 68 32, 76 27 C 76 39, 66 52, 50 58 C 38 63, 30 64, 24 66 C 33 73, 45 74, 55 68 C 64 63, 74 61, 82 63',
              'M -7 78 C 4 73, 15 69, 24 66',
              'M 82 63 C 91 60, 99 55, 107 48',
            ].map((path) => (
              <g key={path}>
                <path d={path} fill="none" stroke="#8C6C44" strokeLinecap="round" strokeLinejoin="round" strokeWidth="10" opacity="0.22" />
                <path d={path} fill="none" stroke="#C79A63" strokeLinecap="round" strokeLinejoin="round" strokeWidth="8.5" />
                <path d={path} fill="none" stroke="#E7C58D" strokeLinecap="round" strokeLinejoin="round" strokeWidth="6.4" />
                <path d={path} fill="none" stroke="#F4D9A9" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.4" opacity="0.26" />
              </g>
            ))}
            <path
              d="M 17 28 C 28 22, 37 23, 47 30 C 57 36, 68 32, 76 27 C 76 39, 66 52, 50 58 C 38 63, 30 64, 24 66 C 33 73, 45 74, 55 68 C 64 63, 74 61, 82 63"
              fill="none"
              stroke="rgba(43,27,46,0.18)"
              strokeDasharray="1.5 2.4"
              strokeLinecap="round"
              strokeWidth="0.56"
            />
            <motion.path
              d="M 17 28 C 28 22, 37 23, 47 30 C 57 36, 68 32, 76 27 C 76 39, 66 52, 50 58 C 38 63, 30 64, 24 66 C 33 73, 45 74, 55 68 C 64 63, 74 61, 82 63"
              fill="none"
              stroke="rgba(255,255,255,0.42)"
              strokeDasharray="1.4 2.5"
              strokeLinecap="round"
              strokeWidth="0.32"
              animate={shouldReduceMotion ? undefined : { strokeDashoffset: [0, -14] }}
              transition={{ duration: 11, ease: 'linear', repeat: Infinity }}
            />
          </svg>

          {[
            ['left-[7%] top-[42%]', 'scale-95'],
            ['left-[10%] top-[46%]', 'scale-75'],
            ['left-[13%] top-[43%]', 'scale-90'],
            ['left-[34%] top-[45%]', 'scale-80'],
            ['left-[40%] top-[40%]', 'scale-95'],
            ['left-[63%] top-[22%]', 'scale-75'],
            ['left-[83%] top-[37%]', 'scale-90'],
            ['left-[88%] top-[42%]', 'scale-75'],
            ['left-[74%] top-[72%]', 'scale-95'],
            ['left-[79%] top-[76%]', 'scale-80'],
            ['left-[18%] top-[78%]', 'scale-75'],
            ['left-[14%] top-[80%]', 'scale-95'],
          ].map(([position, scale]) => (
            <div key={position} aria-hidden className={`absolute ${position} ${scale} h-11 w-10`}>
              <div className="absolute left-1/2 top-6 h-5 w-2 -translate-x-1/2 rounded-sm bg-[#8B6841]" />
              <div className="absolute left-0 top-2 h-8 w-8 rounded-full bg-[#2E7C43] shadow-[inset_-5px_-6px_0_rgba(20,67,34,0.22)]" />
              <div className="absolute left-4 top-0 h-8 w-8 rounded-full bg-[#3F9651] shadow-[inset_-5px_-6px_0_rgba(20,67,34,0.2)]" />
              <div className="absolute left-2 top-5 h-8 w-8 rounded-full bg-[#347F45] shadow-[inset_-5px_-6px_0_rgba(20,67,34,0.2)]" />
            </div>
          ))}

          {[
            'left-[22%] top-[24%]',
            'left-[30%] top-[18%]',
            'left-[51%] top-[20%]',
            'left-[68%] top-[18%]',
            'left-[91%] top-[27%]',
            'left-[7%] top-[65%]',
            'left-[41%] top-[76%]',
            'left-[62%] top-[80%]',
            'left-[91%] top-[61%]',
          ].map((position) => (
            <div key={position} aria-hidden className={`absolute ${position} h-5 w-7 rounded-[50%] bg-[#7C8863] shadow-[inset_-4px_-3px_0_rgba(43,27,46,0.16)]`} />
          ))}

          {[
            ['left-[25%] top-[36%]', 'bg-[#FFE6F1]'],
            ['left-[54%] top-[48%]', 'bg-[#FFF2A6]'],
            ['left-[72%] top-[50%]', 'bg-[#FFE6F1]'],
            ['left-[16%] top-[58%]', 'bg-[#FFF2A6]'],
            ['left-[37%] top-[66%]', 'bg-[#D9F6FF]'],
            ['left-[89%] top-[55%]', 'bg-[#FFE6F1]'],
            ['left-[6%] top-[30%]', 'bg-[#D9F6FF]'],
            ['left-[61%] top-[26%]', 'bg-[#FFF2A6]'],
          ].map(([position, color]) => (
            <div key={position} aria-hidden className={`absolute ${position} h-3 w-3 rounded-full ${color} shadow-[0_0_0_2px_rgba(255,255,255,0.45)]`} />
          ))}

          {[
            ['left-[12%] top-[33%]', '#FFE6F1'],
            ['left-[19%] top-[50%]', '#FFF2A6'],
            ['left-[28%] top-[73%]', '#D9F6FF'],
            ['left-[35%] top-[31%]', '#FFE6F1'],
            ['left-[44%] top-[52%]', '#FFF2A6'],
            ['left-[57%] top-[24%]', '#D9F6FF'],
            ['left-[65%] top-[59%]', '#FFE6F1'],
            ['left-[73%] top-[77%]', '#FFF2A6'],
            ['left-[84%] top-[45%]', '#D9F6FF'],
            ['left-[92%] top-[69%]', '#FFE6F1'],
          ].map(([position, color]) => (
            <div key={`${position}-cluster`} aria-hidden className={`absolute ${position} h-5 w-5`}>
              <span className="absolute left-2 top-3 h-2 w-0.5 rounded-full bg-[#3F8A45]" />
              <span className="absolute left-1 top-1 h-2.5 w-2.5 rounded-full" style={{ backgroundColor: color }} />
              <span className="absolute left-3 top-1 h-2.5 w-2.5 rounded-full" style={{ backgroundColor: color }} />
              <span className="absolute left-2 top-0 h-2.5 w-2.5 rounded-full" style={{ backgroundColor: color }} />
              <span className="absolute left-2 top-2 h-1.5 w-1.5 rounded-full bg-[#F7D47B]" />
            </div>
          ))}

          <div className="absolute left-3 right-3 top-3 z-40 flex flex-col gap-2 sm:left-5 sm:right-5 sm:top-5 sm:gap-3 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-2xl rounded-[16px] border-2 border-[#9A7348]/55 bg-[#FFF3C7] px-3 py-2 text-plum-900 shadow-[0_5px_0_rgba(98,65,38,0.18),0_18px_36px_rgba(43,27,46,0.12)] sm:rounded-[22px] sm:px-5 sm:py-3">
              <div className="flex flex-col gap-0.5 sm:gap-1.5">
                <span className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.16em] text-blush-500">
                  <Sparkles size={13} />
                  Opaca quest map
                </span>
                <span className="text-[12px] font-black leading-tight min-[430px]:text-sm sm:text-lg">AI product builder turning messy workflows into shipped systems.</span>
              </div>
              <p className="mt-0.5 text-[11px] font-bold text-plum-600 sm:mt-1 sm:text-sm">Tap a stop. Opaca runs there.</p>
            </div>

            <div className="hidden w-fit max-w-full flex-wrap gap-1.5 rounded-[18px] border-2 border-[#9A7348]/40 bg-[#F8E2AB] p-1 shadow-[0_5px_0_rgba(98,65,38,0.18)] sm:flex sm:gap-2 sm:rounded-[22px] sm:p-1.5">
              <button type="button" onClick={() => selectStop(worldStops[0].id)} className="rounded-full bg-plum-900 px-3 py-2 text-[11px] font-black text-white shadow-[0_3px_0_rgba(43,27,46,0.24)] transition-transform hover:-translate-y-0.5 sm:px-4 sm:text-xs">
                Start Journey
              </button>
              <a href="#work" className="rounded-full border-2 border-[#B88951] bg-white px-3 py-2 text-[11px] font-black text-plum-900 shadow-[0_3px_0_rgba(98,65,38,0.16)] transition-transform hover:-translate-y-0.5 sm:px-4 sm:text-xs">
                View Work
              </a>
              <a href="/Courtney_Ko_Resume.pdf" target="_blank" rel="noopener noreferrer" className="hidden rounded-full border-2 border-[#B88951] bg-white px-4 py-2 text-xs font-black text-plum-900 shadow-[0_3px_0_rgba(98,65,38,0.16)] transition-transform hover:-translate-y-0.5 min-[430px]:inline-block">
                Resume
              </a>
            </div>
          </div>

          <div className="absolute bottom-3 left-3 right-3 z-40 flex gap-1.5 rounded-[18px] border-2 border-[#9A7348]/40 bg-[#F8E2AB] p-1 shadow-[0_5px_0_rgba(98,65,38,0.18)] sm:hidden">
            <button type="button" onClick={() => selectStop(worldStops[0].id)} className="flex-1 rounded-full bg-plum-900 px-3 py-2 text-[11px] font-black text-white">
              Start
            </button>
            <a href="#work" className="flex-1 rounded-full border-2 border-[#B88951] bg-white px-3 py-2 text-center text-[11px] font-black text-plum-900">
              Work
            </a>
            <a href="/Courtney_Ko_Resume.pdf" target="_blank" rel="noopener noreferrer" className="flex-1 rounded-full border-2 border-[#B88951] bg-white px-3 py-2 text-center text-[11px] font-black text-plum-900">
              Resume
            </a>
          </div>

          {worldStops.map((stop, index) => {
            const isActive = stop.id === targetStop?.id;

            return (
              <button
                key={stop.id}
                type="button"
                onClick={() => selectStop(stop.id)}
                aria-pressed={isActive}
                aria-label={`Open ${stop.title}`}
                className={`group absolute z-30 flex w-14 flex-col items-center gap-1 rounded-[20px] text-plum-900 transition-all focus:outline-none focus-visible:ring-4 focus-visible:ring-blush-300/50 sm:w-[118px] sm:rounded-[24px] ${
                  isActive
                    ? '-translate-y-1'
                    : 'hover:-translate-y-1'
                }`}
                style={{ left: `${stop.x}%`, top: `${stop.y}%`, transform: 'translate(-50%, -50%)' }}
              >
                <div className="relative flex h-12 w-12 items-center justify-center sm:h-20 sm:w-20">
                  <div className="absolute bottom-1 h-5 w-10 rounded-[50%] bg-plum-900/14 sm:h-7 sm:w-12" />
                  <div className={`relative flex h-9 w-9 items-center justify-center rounded-[14px] border-2 shadow-[0_4px_0_rgba(98,65,38,0.42)] transition-colors sm:h-14 sm:w-14 sm:rounded-[18px] sm:shadow-[0_5px_0_rgba(98,65,38,0.45)] ${
                    isActive ? 'border-plum-900 bg-[#FFF4C9] text-plum-900' : 'border-[#9A7348] bg-[#F0C980] text-plum-700'
                  }`}>
                    <WorldStopMarkerIcon id={stop.id} className="h-6 w-6 sm:h-8 sm:w-8" />
                  </div>
                  <div className="absolute -right-1 top-0 flex h-5 w-5 items-center justify-center rounded-full border border-white/80 bg-plum-900 text-[10px] font-black text-white">
                    {index + 1}
                  </div>
                </div>
                <span
                  className={`hidden rounded-md border px-2.5 py-1 text-center text-[10px] font-black leading-tight shadow-[0_3px_0_rgba(98,65,38,0.18)] sm:inline-block sm:text-xs ${
                    isActive ? 'border-plum-900 bg-plum-900 text-white' : 'border-[#A77C4C] bg-[#F8E2AB] text-plum-700'
                  }`}
                >
                  {stop.title}
                </span>
              </button>
            );
          })}

          <motion.div
            aria-hidden="true"
            className="absolute z-[35] h-24 w-24 sm:h-44 sm:w-44"
            initial={false}
            animate={{ left: `${opacaPosition.x}%`, top: `${opacaPosition.y}%` }}
            transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.88, ease: [0.22, 0.68, 0.26, 1] }}
            style={{ transform: 'translate(-50%, -72%)' }}
          >
            <motion.div
              className="absolute bottom-0 left-1/2 h-5 w-20 -translate-x-1/2 rounded-full bg-plum-900/18 blur-[1px]"
              animate={shouldReduceMotion ? undefined : isTraveling ? { scaleX: [0.82, 1.08, 0.86], opacity: [0.12, 0.22, 0.14] } : { scaleX: [1, 0.94, 1], opacity: [0.15, 0.2, 0.15] }}
              transition={{ duration: isTraveling ? 0.34 : 2.4, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.img
              src="/opaca.png"
              alt=""
              className="relative h-full w-full object-contain [image-rendering:pixelated] drop-shadow-[0_18px_24px_rgba(43,27,46,0.2)]"
              animate={shouldReduceMotion ? undefined : isTraveling ? { y: [0, -10, 0, -7, 0], rotate: [-4, 5, -3, 4, -2], scaleX: [1, 0.96, 1.03, 0.97, 1] } : { y: [0, -4, 0], rotate: [-0.6, 0.6, -0.6] }}
              transition={{ duration: isTraveling ? 0.44 : 2.8, ease: 'easeInOut', repeat: Infinity }}
            />
            {isTraveling && !shouldReduceMotion && (
              <motion.div
                className="absolute bottom-7 left-5 h-3 w-3 rounded-full bg-[#E7C58D]/80"
                animate={{ x: [-4, -18, -28], y: [0, 3, 6], scale: [0.8, 1.15, 0.2], opacity: [0, 0.62, 0] }}
                transition={{ duration: 0.52, repeat: Infinity, ease: 'easeOut' }}
              />
            )}
          </motion.div>

          {!targetStop && (
            <div className="absolute bottom-5 left-5 z-40 hidden rounded-2xl border-2 border-[#9A7348] bg-[#F8E2AB] p-3 text-plum-900 shadow-[0_6px_0_rgba(98,65,38,0.24)] sm:block">
              <div className="text-[10px] font-black uppercase tracking-[0.16em] text-blush-500">Choose a landmark</div>
              <div className="mt-2 flex items-center gap-1.5">
                {worldStops.map((stop, index) => (
                  <button
                    key={stop.id}
                    type="button"
                    onClick={() => selectStop(stop.id)}
                    aria-label={`Start at ${stop.title}`}
                    className="flex h-7 w-7 items-center justify-center rounded-full bg-white/70 text-[10px] font-black text-plum-700 transition-colors hover:bg-plum-900 hover:text-white"
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            </div>
          )}

          {activeStop && ActiveIcon && (
            <motion.div
              key={activeStop.id}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.32 }}
              className="absolute bottom-5 right-6 z-40 hidden w-[480px] overflow-hidden rounded-[18px] border-2 border-[#9A7348] bg-[#F8E2AB] p-4 text-plum-900 shadow-[0_9px_0_rgba(98,65,38,0.22),0_22px_42px_rgba(43,27,46,0.18)] lg:block"
            >
              <div className="absolute inset-x-0 top-0 h-2 bg-[#D4A15D]" />
              <div className="relative grid min-w-0 gap-3 sm:grid-cols-[76px_minmax(0,1fr)] sm:items-start">
                <div className="hidden h-16 overflow-hidden rounded-xl border-2 border-[#B88951] bg-plum-900 sm:block">
                  <img src={activeStop.image} alt="" className="h-full w-full object-cover opacity-85" />
                </div>
                <div className="min-w-0">
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-white/58 px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.14em] text-blush-500">
                      <ActiveIcon size={12} />
                      Opaca arrived
                    </span>
                  </div>
                  <h2 className="text-xl font-black leading-tight text-plum-900">{activeStop.title}</h2>
                  <div className="mt-2 rounded-xl border border-[#D4A15D]/40 bg-white/48 px-3 py-2 text-xs font-black text-plum-700">{activeStop.metric}</div>
                  <p className="mt-2 text-sm leading-relaxed text-plum-600">{activeStop.blurb}</p>
                </div>
                <div className="flex min-w-0 flex-wrap gap-2 sm:col-span-2 sm:justify-end">
                  <a
                    href={activeStop.cta.href}
                    className="inline-flex min-h-10 flex-1 items-center justify-center gap-2 rounded-xl bg-plum-900 px-4 py-2 text-xs font-black text-white shadow-[0_4px_0_rgba(43,27,46,0.28)] transition-transform hover:-translate-y-0.5 sm:flex-none"
                  >
                    {activeStop.cta.label}
                    <ArrowRight size={14} />
                  </a>
                  <button
                    type="button"
                    onClick={goToNextStop}
                    className="inline-flex min-h-10 flex-1 items-center justify-center rounded-xl border-2 border-[#B88951] bg-white/62 px-4 py-2 text-xs font-black text-plum-700 transition-colors hover:bg-white sm:flex-none"
                  >
                    Next
                  </button>
                  <button
                    type="button"
                    onClick={() => setTargetStopId(null)}
                    className="inline-flex min-h-10 flex-1 items-center justify-center rounded-xl border-2 border-[#B88951] bg-white/42 px-4 py-2 text-xs font-black text-plum-500 transition-colors hover:bg-white hover:text-plum-700 sm:flex-none"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {activeStop && ActiveIcon && (
          <motion.div
            key={`${activeStop.id}-mobile`}
            initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.28 }}
            className="mt-3 rounded-[18px] border-2 border-[#9A7348] bg-[#F8E2AB] p-3 text-plum-900 shadow-[0_6px_0_rgba(98,65,38,0.18)] sm:p-4 lg:hidden"
          >
            <div className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-white/58 px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.14em] text-blush-500">
              <ActiveIcon size={12} />
              Opaca arrived
            </div>
            <h2 className="text-lg font-black leading-tight sm:text-xl">{activeStop.title}</h2>
            <div className="mt-2 rounded-xl border border-[#D4A15D]/40 bg-white/48 px-3 py-2 text-xs font-black text-plum-700">{activeStop.metric}</div>
            <p className="mt-2 text-sm leading-relaxed text-plum-600 sm:text-base">{activeStop.blurb}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <a
                href={activeStop.cta.href}
                className="inline-flex min-h-10 flex-[2] items-center justify-center gap-2 rounded-xl bg-plum-900 px-4 py-2 text-xs font-black text-white shadow-[0_4px_0_rgba(43,27,46,0.28)]"
              >
                {activeStop.cta.label}
                <ArrowRight size={14} />
              </a>
              <button
                type="button"
                onClick={goToNextStop}
                className="inline-flex min-h-10 flex-1 items-center justify-center rounded-xl border-2 border-[#B88951] bg-white/62 px-4 py-2 text-xs font-black text-plum-700"
              >
                Next
              </button>
              <button
                type="button"
                onClick={() => setTargetStopId(null)}
                className="inline-flex min-h-10 items-center justify-center rounded-xl border-2 border-[#B88951] bg-white/42 px-4 py-2 text-xs font-black text-plum-500"
              >
                Close
              </button>
            </div>
          </motion.div>
        )}

        <div className="mt-3 flex snap-x gap-2 overflow-x-auto pb-1 lg:hidden">
          {worldStops.map((stop) => (
            <button
              key={stop.id}
              type="button"
              onClick={() => selectStop(stop.id)}
              className={`min-w-[64%] snap-start rounded-2xl border p-3 text-left transition-colors min-[430px]:min-w-[46%] sm:min-w-[42%] ${
                stop.id === targetStop?.id
                  ? 'border-plum-900 bg-white text-plum-900'
                  : 'border-blush-100 bg-white/78 text-plum-500'
              }`}
            >
              <div className="text-[10px] font-black uppercase tracking-[0.16em] text-blush-500">{stop.eyebrow}</div>
              <div className="mt-1 text-sm font-black">{stop.title}</div>
              <div className="mt-1 text-xs leading-snug text-plum-400">{stop.metric}</div>
            </button>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

function SideNav() {
  const [hasPassedWorld, setHasPassedWorld] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const updateVisibility = () => {
      const worldSection = document.getElementById('world');

      if (!worldSection) {
        setHasPassedWorld(true);
        return;
      }

      setHasPassedWorld(worldSection.getBoundingClientRect().bottom < window.innerHeight * 0.28);
    };

    updateVisibility();
    window.addEventListener('scroll', updateVisibility, { passive: true });
    window.addEventListener('resize', updateVisibility);

    return () => {
      window.removeEventListener('scroll', updateVisibility);
      window.removeEventListener('resize', updateVisibility);
    };
  }, []);

  return (
    <motion.aside
      aria-hidden={!hasPassedWorld}
      initial={false}
      animate={hasPassedWorld ? { opacity: 1, x: 0, pointerEvents: 'auto' } : { opacity: 0, x: -16, pointerEvents: 'none' }}
      transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.28, ease: 'easeOut' }}
      className="fixed left-4 top-1/2 z-30 hidden -translate-y-1/2 xl:block"
    >
      <nav aria-label="Portfolio sections" className="rounded-[24px] border-2 border-[#9A7348]/45 bg-[#F8E2AB] p-2 shadow-[0_7px_0_rgba(98,65,38,0.18),0_20px_50px_rgba(43,27,46,0.12)]">
        <div className="mb-2 px-2 pt-1 text-[9px] font-black uppercase tracking-[0.16em] text-blush-500">Map</div>
        <div className="flex flex-col gap-1">
          {navItems.map(({ label, href, icon: Icon }) => (
            <a
              key={href}
              href={href}
              className="group flex items-center gap-2 rounded-2xl px-2.5 py-2 text-xs font-black text-plum-700 transition-colors hover:bg-white focus:outline-none focus-visible:ring-4 focus-visible:ring-blush-300/50"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border-2 border-[#B88951] bg-white text-plum-900 shadow-[0_3px_0_rgba(98,65,38,0.13)] transition-transform group-hover:-translate-y-0.5">
                <Icon size={15} />
              </span>
              <span className="w-20">{label}</span>
            </a>
          ))}
        </div>
      </nav>
    </motion.aside>
  );
}

function SystemMockup({ study }: { study: CaseStudy }) {
  if (study.visual === 'automation') {
    return (
      <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${study.accent} p-4 text-white sm:min-h-[420px] sm:p-5`}>
        <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full border border-white/20" />
        <div className="absolute -bottom-24 -left-16 h-56 w-56 rounded-full border border-white/15" />

        <div className="relative rounded-2xl border border-white/20 bg-white/12 p-4 shadow-soft backdrop-blur">
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="text-[10px] font-black uppercase tracking-[0.16em] text-white/60 sm:tracking-[0.2em]">Self-Serve Operations Console</div>
              <div className="mt-1 text-base font-black sm:text-lg">Enterprise Workflow Automation</div>
            </div>
            <div className="w-fit rounded-full bg-white px-3 py-1 text-[10px] font-black text-plum-900">Live flow</div>
          </div>

          <div className="grid gap-3">
            {[
              ['Request intake', 'Normalize fields', 'Structured output'],
              ['Case context', 'AI summary pass', 'Review brief'],
            ].map((row) => (
              <div key={row.join('-')} className="grid grid-cols-1 items-center gap-2 sm:grid-cols-[1fr_auto_1fr_auto_1fr]">
                {row.map((item, i) => (
                  <div key={item} className="contents">
                    <div className="rounded-xl border border-white/18 bg-white/14 px-3 py-3 text-[11px] font-bold leading-tight text-white/86">
                      {item}
                    </div>
                    {i < row.length - 1 && <ArrowRight size={13} className="hidden text-white/55 sm:block" />}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="relative mt-4 grid gap-3 sm:grid-cols-2">
          {study.metrics.slice(0, 2).map((metric) => (
            <div key={metric.label} className="rounded-2xl border border-white/20 bg-white/14 p-4 backdrop-blur">
              <div className="text-2xl font-black sm:text-3xl">{metric.value}</div>
              <div className="mt-1 text-[11px] leading-snug text-white/70">{metric.label}</div>
            </div>
          ))}
        </div>

        <div className="relative mt-4 rounded-2xl border border-white/20 bg-plum-900/20 p-4">
          <div className="mb-3 text-[10px] font-black uppercase tracking-[0.2em] text-white/60">Operator view</div>
          <div className="space-y-2">
            {['Validate request data', 'Generate structured inputs', 'Summarize review context'].map((item, i) => (
              <div key={item} className="flex items-center gap-3 rounded-xl bg-white/10 px-3 py-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-[10px] font-black text-plum-900">{i + 1}</span>
                <span className="text-xs font-semibold text-white/78">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (study.visual === 'community') {
    return (
      <div className={`relative self-start overflow-hidden rounded-2xl bg-gradient-to-br ${study.accent} p-3 sm:p-4`}>
        <div className="grid min-h-[336px] grid-cols-2 grid-rows-[112px_112px_112px] gap-2 sm:min-h-[392px] sm:grid-cols-3 sm:grid-rows-[130px_130px_130px] sm:gap-3">
          {[
            { src: '/aivalley-lounge-event.jpg', label: 'Builder lounge', className: 'col-span-2 row-span-1' },
            { src: '/aivalley-workshop-room.jpg', label: 'Technical workshop', className: 'row-span-1 sm:row-span-2' },
            { src: '/aivalley-builder-table.jpg', label: 'Builder conversations', className: 'row-span-1' },
            { src: '/aivalley-audience.jpg', label: 'Packed AI room', className: 'row-span-1' },
            { src: '/aivalley-founder-talk.jpg', label: 'Founder talk', className: 'row-span-1' },
            { src: '/fembrunch.jpg', label: 'Female Founder Brunch', className: 'row-span-1 sm:col-span-2' },
          ].map(({ src, label, className }) => (
            <div
              key={src}
              className={`relative overflow-hidden rounded-2xl bg-cover bg-center ${className}`}
              style={{ backgroundImage: `url(${src})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-plum-900/50 via-plum-900/0 to-transparent" />
              <div className="absolute bottom-2 left-2 right-2 text-[11px] font-black leading-tight text-white sm:bottom-3 sm:left-3 sm:right-3 sm:text-xs">{label}</div>
            </div>
          ))}
        </div>
        <div className="absolute left-4 top-4 rounded-full border border-white/20 bg-white/14 px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.16em] text-white/80 backdrop-blur sm:left-5 sm:top-5 sm:text-[10px] sm:tracking-[0.18em]">
          Community engine
        </div>
      </div>
    );
  }

  if (study.image) {
    return (
      <div className="relative overflow-hidden rounded-2xl bg-plum-900 sm:min-h-[420px]">
        <img src={study.image} alt="" className="min-h-[520px] w-full object-cover opacity-82 sm:h-full sm:min-h-[420px]" />
        <div className="absolute inset-0 bg-gradient-to-t from-plum-900/70 via-plum-900/10 to-transparent" />
        <div className="absolute left-5 top-5 rounded-full border border-white/20 bg-white/14 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.18em] text-white/75 backdrop-blur">
          {study.visual === 'travel' ? 'AI planning loop' : 'Community engine'}
        </div>
        <div className="absolute bottom-4 left-4 right-4 grid gap-3 rounded-2xl border border-white/20 bg-white/12 p-3 text-white backdrop-blur sm:bottom-5 sm:left-5 sm:right-5 sm:p-4">
          <div className="grid gap-2 sm:grid-cols-3">
            {study.metrics.map((metric) => (
              <div key={metric.label} className="rounded-xl bg-white/12 p-3">
                <div className="text-lg font-black">{metric.value}</div>
                <div className="mt-1 text-[10px] leading-snug text-white/70">{metric.label}</div>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-2 text-[11px] font-bold text-white/74">
            <span className="h-1.5 w-1.5 rounded-full bg-blush-200" />
            {study.outcome}
          </div>
        </div>
      </div>
    );
  }
}

function FeaturedCard({ study, index }: { study: CaseStudy; index: number }) {
  const proofLine = study.id === 'nvidia'
    ? 'Owned automation from workflow diagnosis to self-serve tooling.'
    : study.id === 'pearle'
      ? 'Founded the product and shipped the MVP from zero to beta.'
      : 'Scaled programming, partnerships, and community operations.';

  return (
    <motion.a
      href={`#${study.id}`}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ delay: index * 0.08, duration: 0.45 }}
      className="group block rounded-2xl border border-blush-100 bg-white p-5 shadow-card transition-all hover:-translate-y-1 hover:border-blush-300 hover:shadow-soft-lg"
    >
      <div className={`mb-5 h-1.5 w-16 rounded-full bg-gradient-to-r ${study.accent}`} />
      <div className="mb-2 text-[10px] font-black uppercase tracking-[0.2em] text-blush-500">{study.eyebrow}</div>
      <div className="mb-3 inline-flex rounded-full bg-blush-50 px-2.5 py-1 text-[10px] font-black text-plum-500">{study.roleFit}</div>
      <h3 className="text-xl font-black leading-tight text-plum-900">{study.title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-plum-400">{study.summary}</p>
      <p className="mt-3 rounded-xl bg-plum-50 px-3 py-2 text-xs font-black leading-snug text-plum-700">{proofLine}</p>
      <div className="mt-5 flex items-center justify-between">
        <div className="text-sm font-black text-plum-900">{study.metrics[0].value}</div>
        <ArrowRight size={16} className="text-blush-400 transition-transform group-hover:translate-x-1" />
      </div>
    </motion.a>
  );
}

function CaseStudySection({ study, index }: { study: CaseStudy; index: number }) {
  const isReversed = index % 2 === 1;

  return (
    <motion.article
      id={study.id}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      variants={fadeUp}
      className={`scroll-mt-24 rounded-[24px] border bg-white p-4 shadow-card sm:rounded-[28px] sm:p-5 md:p-7 ${
        study.id === 'nvidia' ? 'border-plum-200 ring-1 ring-plum-100' : 'border-blush-100'
      }`}
    >
      <div className={`grid items-start gap-8 lg:grid-cols-[1.05fr_0.95fr] ${isReversed ? 'lg:[&>*:first-child]:order-2' : ''}`}>
        <div>
          <div className="mb-3 text-[10px] font-black uppercase tracking-[0.22em] text-blush-500">{study.eyebrow}</div>
          <h3 className="text-2xl font-black leading-tight text-plum-900 sm:text-3xl md:text-4xl">{study.title}</h3>
          <p className="mt-4 text-sm leading-relaxed text-plum-400">{study.summary}</p>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {study.metrics.map((metric) => (
              <div key={metric.label} className="rounded-xl border border-blush-100 bg-blush-50 p-3">
                <div className="text-lg md:text-2xl font-black text-plum-900">{metric.value}</div>
                <div className="mt-1 text-[10px] leading-snug text-plum-400">{metric.label}</div>
              </div>
            ))}
          </div>

          <div className="mt-6 grid gap-5 md:grid-cols-2">
            <div>
              <h4 className="text-xs font-black uppercase tracking-[0.18em] text-plum-900">Problem</h4>
              <p className="mt-2 text-sm leading-relaxed text-plum-400">{study.problem}</p>
            </div>
            <div>
              <h4 className="text-xs font-black uppercase tracking-[0.18em] text-plum-900">My Role</h4>
              <p className="mt-2 text-sm leading-relaxed text-plum-400">{study.role}</p>
            </div>
          </div>

          <div className="mt-6 grid gap-5 md:grid-cols-2">
            <div>
              <h4 className="text-xs font-black uppercase tracking-[0.18em] text-plum-900">Process</h4>
              <ul className="mt-3 space-y-2.5">
                {study.process.map((item) => (
                  <li key={item} className="flex gap-2 text-sm leading-relaxed text-plum-400">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blush-400" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-black uppercase tracking-[0.18em] text-plum-900">What I Built</h4>
              <ul className="mt-3 space-y-2.5">
                {study.built.map((item) => (
                  <li key={item} className="flex gap-2 text-sm leading-relaxed text-plum-400">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-lavender-400" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>

        <div className="space-y-5">
          <SystemMockup study={study} />

          <div>
            <h4 className="text-xs font-black uppercase tracking-[0.18em] text-plum-900">Tools Used</h4>
            <div className="mt-3 flex flex-wrap gap-2">
              {study.tools.map((tool) => (
                <span key={tool} className="rounded-full border border-blush-100 bg-blush-50 px-3 py-1.5 text-[11px] font-bold text-plum-500">
                  {tool}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-2xl bg-plum-900 p-5 text-white">
            <div className="mb-2 text-[10px] font-black uppercase tracking-[0.2em] text-blush-200">Outcome</div>
            <p className="text-sm leading-relaxed text-white/82">{study.outcome}</p>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-[#FBF8F8] text-plum-900">
      <div aria-hidden className="pointer-events-none fixed inset-x-0 top-0 h-[520px] bg-[linear-gradient(180deg,#F1E9EB_0%,rgba(251,248,248,0)_78%)]" />
      <SideNav />

      <nav className="relative z-10 mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 sm:py-5">
        <Link href="/" className="flex items-center gap-3">
          <LogoMark className="h-10 w-10 ring-2 ring-white" />
          <span className="text-sm font-black text-plum-900">Courtney Ko</span>
        </Link>
        <div className="flex items-center gap-2">
          <Link
            href="/Courtney_Ko_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden rounded-full border border-blush-200 bg-white px-3 py-1.5 text-[11px] font-bold text-plum-500 shadow-soft transition-colors hover:bg-blush-50 sm:inline-flex"
          >
            Resume
          </Link>
          {socials.map(({ href, label, Icon }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
              title={label}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-blush-200 bg-white text-plum-400 shadow-soft transition-colors hover:bg-blush-50 hover:text-plum-900"
            >
              <Icon size={14} />
            </a>
          ))}
        </div>
      </nav>

      <div className="sticky top-2 z-20 mx-auto mb-2 max-w-6xl px-4 sm:px-6 md:top-3 xl:hidden">
        <div className="ml-auto flex w-fit items-center gap-1 rounded-full border border-white/70 bg-white/95 p-1 text-[11px] font-black text-plum-700 shadow-soft-lg backdrop-blur-xl ring-1 ring-plum-900/5">
          {navItems.map(({ shortLabel, label, href }) => (
            <a key={href} href={href} className="rounded-full px-2.5 py-1.5 transition-colors hover:bg-plum-900 hover:text-white sm:px-3">
              <span className={label !== shortLabel ? 'sm:hidden' : ''}>{shortLabel}</span>
              {label !== shortLabel && <span className="hidden sm:inline">{label}</span>}
            </a>
          ))}
        </div>
      </div>

      <main className="relative z-10 mx-auto max-w-6xl px-4 pb-16 sm:px-6 sm:pb-20">
        <OpacaWorldHero />

        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={fadeUp}
          className="mb-16 rounded-[24px] border border-blush-100 bg-white p-3 shadow-card sm:mb-20 sm:rounded-[28px] sm:p-4"
        >
          <div className="grid gap-3 min-[430px]:grid-cols-2 md:grid-cols-4">
            {impactStats.map((stat) => (
              <div key={stat.label} className="rounded-2xl bg-blush-50 p-4">
                <div className="text-2xl font-black text-plum-900 md:text-3xl">{stat.value}</div>
                <div className="mt-1 text-xs leading-snug text-plum-400">{stat.label}</div>
              </div>
            ))}
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-2 rounded-2xl border border-blush-100 bg-white px-3 py-3">
            <span className="text-[10px] font-black uppercase tracking-[0.18em] text-blush-500">Role fit</span>
            {roleTargets.map((role) => (
              <span key={role} className="rounded-full bg-plum-900 px-3 py-1.5 text-[11px] font-black text-white">
                {role}
              </span>
            ))}
          </div>
        </motion.section>

        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={fadeUp}
          className="mb-20 sm:mb-24"
        >
          <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="mb-2 text-[11px] font-black uppercase tracking-[0.22em] text-blush-500">Product Context</div>
              <h2 className="max-w-2xl text-3xl font-black leading-tight text-plum-900 md:text-5xl">
                Real people, real places, real builder rooms.
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-plum-400">
              Pearle came from lived travel behavior. AI Valley comes from creating rooms where technical people actually want to build.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-6">
            {photoMoments.map((photo, index) => (
              <motion.div
                key={photo.src}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.04, duration: 0.42 }}
                className={`group relative overflow-hidden rounded-2xl border border-blush-100 bg-white shadow-card ${
                  index === 0 || index === 2 ? 'sm:col-span-2 md:col-span-2 md:row-span-2' : 'md:col-span-1'
                }`}
              >
                <img
                  src={photo.src}
                  alt={photo.label}
                  className={`h-full min-h-44 w-full object-cover transition-transform duration-700 group-hover:scale-105 ${
                    index === 0 || index === 2 ? 'min-h-56 md:min-h-[356px]' : 'md:min-h-[172px]'
                  }`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-plum-900/70 via-plum-900/5 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3">
                  <div className="text-[10px] font-black uppercase tracking-[0.16em] text-white/62">{photo.tone}</div>
                  <div className="mt-1 text-sm font-black text-white">{photo.label}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <section id="work" className="mb-20 scroll-mt-24 sm:mb-24">
          <SectionHeader
            eyebrow="Featured Work"
            title="Three proof points across automation, AI product, and ecosystem building."
            description="Each project shows the same pattern: find the real workflow, build the minimum useful system, and make the outcome measurable."
          />
          <div className="grid gap-4 md:grid-cols-3">
            {orderedCaseStudies.map((study, index) => (
              <FeaturedCard key={study.id} study={study} index={index} />
            ))}
          </div>
        </section>

        <section id="case-studies" className="mb-20 scroll-mt-24 space-y-6 sm:mb-24 sm:space-y-8">
          <SectionHeader
            eyebrow="Case Studies"
            title="Detailed work, without the fluff."
            description="Problem, role, process, build, tools, and outcomes for the work recruiters and hiring teams are most likely to care about."
          />
          <div className="rounded-[24px] border border-plum-200 bg-plum-900 p-5 text-white shadow-soft-lg sm:rounded-[28px] sm:p-6 md:p-8">
            <div className="grid items-center gap-6 md:grid-cols-[1fr_auto]">
              <div>
                <div className="mb-2 text-[10px] font-black uppercase tracking-[0.22em] text-blush-200">Flagship case study</div>
                <h3 className="text-2xl font-black md:text-4xl">NVIDIA Automation Systems</h3>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/72">
                  The clearest proof of technical PM range: workflow diagnosis, internal tooling, Python automation, AI-assisted summaries, and measurable operations impact.
                </p>
              </div>
              <a
                href="#nvidia"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-black text-plum-900 transition-transform hover:-translate-y-0.5"
              >
                Jump to NVIDIA
                <ArrowRight size={15} />
              </a>
            </div>
          </div>
          {orderedCaseStudies.map((study, index) => (
            <CaseStudySection key={study.id} study={study} index={index} />
          ))}
        </section>

        <section id="about" className="mb-20 scroll-mt-24 grid gap-8 rounded-[24px] border border-blush-100 bg-white p-5 shadow-card sm:mb-24 sm:rounded-[28px] sm:p-6 md:grid-cols-[0.85fr_1.15fr] md:p-8">
          <div>
            <div className="mb-3 text-[11px] font-black uppercase tracking-[0.22em] text-blush-500">About</div>
            <h2 className="text-3xl font-black leading-tight text-plum-900 md:text-5xl">Warm human, rigorous operator.</h2>
            <div className="mt-7 space-y-3">
              {educationCredentials.map((credential) => (
                <div
                  key={credential.school}
                  className="flex items-center gap-3 rounded-2xl border border-blush-100 bg-blush-50/70 p-3"
                >
                  <div className="flex h-12 w-16 shrink-0 items-center justify-center rounded-xl border border-blush-100 bg-white p-2 shadow-soft">
                    <img src={credential.logo} alt={`${credential.school} logo`} className="h-full w-full object-contain" />
                  </div>
                  <div>
                    <div className="text-sm font-black text-plum-900">{credential.degree}</div>
                    <div className="text-xs font-semibold text-plum-400">{credential.school}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-4 text-sm leading-relaxed text-plum-500 md:text-base">
            <p>
              My background sits between UX, psychology, product, AI tools, and community building. I like problems where the user need is real, the workflow is tangled, and the best solution requires both taste and systems thinking.
            </p>
            <p>
              I have led 0 to 1 product work, built automation for enterprise operations, designed AI-powered workflows, and created rooms where technical builders actually want to spend time.
            </p>
            <p>
              The throughline is simple: I make complex things feel usable, credible, and momentum-building.
            </p>
          </div>
        </section>

        <section id="toolkit" className="mb-20 scroll-mt-24 sm:mb-24">
          <SectionHeader
            eyebrow="Skills / Toolkit"
            title="Product judgment with technical fluency."
            description="A practical mix of strategy, research, automation, prototyping, and community-led growth."
          />
          <div className="grid gap-4 md:grid-cols-3">
            {toolkit.map((group, index) => (
              <motion.div
                key={group.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ delay: index * 0.04, duration: 0.4 }}
                className="rounded-2xl border border-blush-100 bg-white p-5 shadow-card"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-plum-900 text-white">
                  {[Layers3, Bot, Wand2, Code2, BarChart3, Network][index] &&
                    (() => {
                      const Icon = [Layers3, Bot, Wand2, Code2, BarChart3, Network][index];
                      return <Icon size={18} />;
                    })()}
                </div>
                <h3 className="font-black text-plum-900">{group.title}</h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span key={item} className="rounded-full border border-blush-100 bg-blush-50 px-3 py-1 text-[11px] font-bold text-plum-500">
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <section id="contact" className="scroll-mt-24 overflow-hidden rounded-[26px] bg-plum-900 p-5 text-white shadow-soft-lg sm:rounded-[32px] sm:p-7 md:p-10">
          <div className="grid items-end gap-8 md:grid-cols-[1fr_auto]">
            <div>
              <div className="mb-3 text-[11px] font-black uppercase tracking-[0.22em] text-blush-200">Contact</div>
              <h2 className="max-w-2xl text-3xl font-black leading-tight md:text-5xl">
                Interested in AI product, automation, or community-led growth?
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/72">
                I’m always happy to talk with teams building useful products, better internal systems, and thoughtful technical communities.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <ButtonLink href="mailto:courtneythko@gmail.com" variant="secondary">
                Email
                <Mail size={15} />
              </ButtonLink>
              <ButtonLink href={CONTACT_LINK} variant="secondary">
                LinkedIn
                <ExternalLink size={15} />
              </ButtonLink>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
