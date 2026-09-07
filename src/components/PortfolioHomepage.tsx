'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { motion, useReducedMotion, useScroll } from 'framer-motion';
import Link from 'next/link';
import { EventGallery, ProductShelf } from './PortfolioPlayground';
import { SkyClouds } from './SkyClouds';
import { useOpacaMovement } from './useOpacaMovement';
import { APPROACHES, MAP_LABELS, worldDistance } from './opacaNavigation';
import './opacaRoaming.css';
import {
  ArrowRight,
  Bot,
  CalendarDays,
  Heart,
  CircleHelp,
  Leaf,
  MessageCircle,
  ExternalLink,
  Mail,
  MapPin,
  Network,
  Sparkles,
  X,
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


const CONTACT_LINK = 'https://www.linkedin.com/in/courtney-ko-720b63103/';


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
      { value: '3+', label: 'team members enabled to self-serve' },
      { value: 'AI', label: 'summaries for faster review workflows' },
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
    title: 'Technical programs that connect AI builders and partners.',
    summary:
      'Owned programming, partnerships, and operating systems for a technical AI ecosystem in San Francisco.',
    problem:
      'Builders need opportunities to try AI tools with peers. Partners need hands-on settings where developers can explore their products and APIs.',
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
      { value: '11K+', label: 'engineers and founders connected' },
      { value: '500+', label: 'hackathon registrations' },
      { value: '70+', label: 'events hosted' },
    ],
    tools: ['Community-led growth', 'Event strategy', 'Partnerships', 'DevRel', 'Operations', 'AI APIs'],
    outcome:
      'Connected 11K+ engineers and founders through an ecosystem of technical events, partner experiences, and community programming.',
    image: '/witpic.jpeg',
    accent: 'from-[#774050] to-[#C8AAAF]',
    roleFit: 'PMM · Community Growth',
    visual: 'community',
  },
];

const orderedCaseStudies = [
  caseStudies.find((study) => study.id === 'ai-valley')!,
  caseStudies.find((study) => study.id === 'nvidia')!,
  caseStudies.find((study) => study.id === 'pearle')!,
];

const personalProducts = [
  {
    title: 'PacaPlate',
    eyebrow: 'Live AI product',
    summary:
      'A playful AI meal-planning app with an alpaca companion, recipe suggestions, and grocery-list generation.',
    image: '/pacaplate-logo.png',
    href: 'https://paca-plate.vercel.app/',
  },
  {
    title: 'PacaLife',
    eyebrow: 'Live life design product',
    summary:
      'A cozy personal operating system for goals, habits, reflection, and everyday momentum.',
    image: '/pacalife-logo.png',
    href: 'https://pacalife.app/',
  },
  {
    title: 'PacaMoney',
    eyebrow: 'Live finance product',
    summary:
      'A friendly money companion for budgeting, tracking, and making personal finance feel less intimidating.',
    image: '/pacamoney-logo.png',
    href: 'https://paca-money.vercel.app/',
  },
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
    metric: '11K+ builders connected',
    cta: { label: 'View events', href: 'https://aivalley.io/events' },
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


const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
};


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
  const landscapeRef = useRef<HTMLDivElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const [popupPosition, setPopupPosition] = useState({ left: 12, top: 12 });
  const [selected, setSelected] = useState<string | null>(null);
  const [popupOpen, setPopupOpen] = useState(false);
  const [visited, setVisited] = useState<string[]>([]);
  const [reaction, setReaction] = useState<'pet' | 'feed' | null>(null);
  const reduceMotion = useReducedMotion();
  const positions = MAP_LABELS;
  const active = popupOpen ? worldStops.find((stop) => stop.id === selected) : undefined;
  const movement = useOpacaMovement(landscapeRef, () => { setPopupOpen(false); setReaction(null); });
  const { position, moving: traveling, facing } = movement;
  const nearest = APPROACHES.reduce((best, point, i) => worldDistance(position, point) < worldDistance(position, APPROACHES[best]) ? i : best, 0);
  const nearby = worldDistance(position, APPROACHES[nearest]) <= 12 ? worldStops[nearest] : undefined;

  useEffect(() => {
    if (!reaction) return;
    const timer = window.setTimeout(() => setReaction(null), 1400);
    return () => window.clearTimeout(timer);
  }, [reaction]);

  const greetOpaca = (kind: 'pet' | 'feed') => {
    if (traveling || reaction) return;
    setPopupOpen(false);
    setReaction(kind);
  };

  const choosePlace = (id: string, trigger: HTMLElement) => {
    movement.stop();
    triggerRef.current = trigger;
    setPopupOpen(true);
    setReaction(null);
    setSelected(id);
    setVisited(previous => previous.includes(id) ? previous : [...previous, id]);
  };

  const closePopup = (restoreFocus = true) => {
    setPopupOpen(false);
    if (restoreFocus) (triggerRef.current?.isConnected ? triggerRef.current : landscapeRef.current)?.focus({ preventScroll: true });
  };

  const walkToPlace = (id: string, trigger: HTMLButtonElement) => {
    const index = worldStops.findIndex(stop => stop.id === id);
    landscapeRef.current?.focus({ preventScroll: true });
    movement.moveTo(APPROACHES[index], () => choosePlace(id, trigger));
  };

  useLayoutEffect(() => {
    if (!active) return;
    const reposition = () => {
      const map = landscapeRef.current?.getBoundingClientRect();
      const popup = popupRef.current;
      if (!map || !popup) return;
      const point = positions[worldStops.findIndex((stop) => stop.id === active.id)];
      const x = map.left + map.width * point.x / 100;
      const y = map.top + map.height * point.y / 100;
      const width = popup.offsetWidth;
      const height = popup.offsetHeight;
      const gap = Math.max(24, map.width * 0.12);
      const left = x + width + gap + 12 < window.innerWidth ? x + gap : x - width - gap;
      setPopupPosition({
        left: Math.max(12, Math.min(left, window.innerWidth - width - 12)),
        top: Math.max(12, Math.min(y - height / 2, window.innerHeight - height - 12)),
      });
    };
    reposition();
    const observer = new ResizeObserver(reposition);
    if (popupRef.current) observer.observe(popupRef.current);
    window.addEventListener('resize', reposition);
    window.addEventListener('scroll', reposition, true);
    popupRef.current?.focus({ preventScroll: true });
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', reposition);
      window.removeEventListener('scroll', reposition, true);
    };
  }, [active]);

  useEffect(() => {
    if (!active) return;
    const dismiss = (event: PointerEvent) => {
      if (!(event.target instanceof Element)) return;
      if (popupRef.current?.contains(event.target) || event.target.closest('.world-place, .world-passport button')) return;
      setPopupOpen(false);
    };
    const escape = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      setPopupOpen(false);
      (triggerRef.current?.isConnected ? triggerRef.current : landscapeRef.current)?.focus({ preventScroll: true });
    };
    document.addEventListener('pointerdown', dismiss);
    document.addEventListener('keydown', escape);
    return () => {
      document.removeEventListener('pointerdown', dismiss);
      document.removeEventListener('keydown', escape);
    };
  }, [active]);

  return (
    <section id="world" className="opaca-world" aria-label="Courtney's interactive world" data-placement="world">
      <div className="world-landscape world-roaming" ref={landscapeRef} tabIndex={0} role="group" aria-label="Move Opaca around the map" aria-describedby="world-controls-description"
        onPointerDown={movement.onPointerDown} onPointerMove={movement.onPointerMove} onPointerUp={movement.onPointerUp} onPointerCancel={movement.onPointerCancel}
        onBlur={movement.stop} onKeyDown={event => {
          if (event.target === event.currentTarget && event.key === 'Enter' && nearby) {
            event.preventDefault(); choosePlace(nearby.id, event.currentTarget);
          } else movement.onKeyDown(event);
        }}>
        <img className="world-terrain" src="/opaca-world-pixel.png" alt="" width="1536" height="1024" loading="lazy" draggable={false} />
        {worldStops.map((stop, i) => (
          <button
            key={stop.id}
            type="button"
            className="world-place"
            data-place={i}
            style={{ left: positions[i].x + '%', top: positions[i].y + '%' }}
            onClick={(event) => walkToPlace(stop.id, event.currentTarget)}
            aria-label={`Explore ${stop.title}`}
            aria-pressed={active?.id === stop.id}
            aria-haspopup="dialog"
            aria-expanded={active?.id === stop.id}
            aria-controls={active?.id === stop.id ? 'world-place-popup' : undefined}
          >
            <span className="destination-life" aria-hidden="true">
              {i === 1 ? <><MessageCircle /><MessageCircle /></> : i === 2 ? <PearlShellIcon /> : <WorldStopMarkerIcon id={stop.id} />}
            </span>
            <span className="world-place-label"><span className="world-label-full">{stop.title}</span><span className="world-label-short" aria-hidden="true">{['NVIDIA', 'AI Valley', 'Pearle', 'Basecamp', 'Atlas', 'Contact'][i]}</span>{visited.includes(stop.id) && <span className="world-stamp" aria-label="Visited">✓</span>}</span>
          </button>
        ))}
        {movement.target && <span className="world-walk-target" aria-hidden="true" style={{ left: movement.target.x + '%', top: movement.target.y + '%' }} />}
        <button
          type="button"
          className="world-opaca"
          aria-label="Pet Opaca"
          title="Pet Opaca"
          disabled={traveling || reaction !== null}
          onClick={() => greetOpaca('pet')}
          style={{ left: position.x + '%', top: position.y + '%' }}
        >
          {traveling && !reduceMotion && <span aria-hidden="true" className="world-run-trail" style={{ transform: `scaleX(${facing})` }}><i /><i /><i /></span>}
          {reaction && <span className="opaca-reaction" data-kind={reaction} aria-hidden="true">
            {reaction === 'pet' ? <><Heart fill="currentColor" /><Heart fill="currentColor" /></> : <Leaf fill="currentColor" />}
          </span>}
          {/* The source sprite faces left; the dust trail follows movement direction. */}
          <div style={{ transform: `scaleX(${-facing})` }}><motion.img src="/opaca.png" alt="" width="1204" height="1306" draggable={false}
            animate={reduceMotion ? { y: 0, rotate: 0 } : reaction === 'pet' ? { y: [0, -20, 0, -9, 0], rotate: [0, -5, 4, 0, 0] } : reaction === 'feed' ? { y: [0, 3, 0, 3, 0], rotate: [0, 5, 0, 5, 0] } : traveling ? { y: [0, -6, 0], rotate: [-3, 3, -3] } : { y: 0, rotate: 0 }}
            transition={reaction ? { duration: 0.9 } : traveling ? { duration: 0.18, repeat: Infinity } : { duration: 0.15 }} /></div>
        </button>
      </div>
      <div className="world-passport">
        <div><span className="world-passport-title">Journey passport</span><span aria-live="polite">{visited.length === worldStops.length ? 'All six places discovered' : `${visited.length} / ${worldStops.length} places discovered`}</span></div>
        <div className="opaca-actions">
          <button type="button" aria-label="Give Opaca a pet" title="Pet Opaca" disabled={traveling || reaction !== null} onClick={() => greetOpaca('pet')}><Heart size={20} /></button>
          <button type="button" aria-label="Feed Opaca a leaf" title="Feed Opaca" disabled={traveling || reaction !== null} onClick={() => greetOpaca('feed')}><Leaf size={20} /></button>
        </div>
        <details className="world-controls-help">
          <summary aria-label="Movement controls" title="Movement controls"><CircleHelp size={20} /></summary>
          <p>Click or tap open ground to walk. With the map focused, use arrow keys or WASD. Near a place, press Enter to explore. Tab reaches every destination directly.</p>
        </details>
      </div>
      <p id="world-controls-description" className="sr-only">Use arrow keys or WASD while the map is focused, or click or tap open ground. Press Enter near a destination to explore. Tab reaches destination shortcuts. Escape closes details.</p>
      <div className="world-explore-slot" aria-live="polite">
        {nearby && !active && <button type="button" className="world-nearby" onClick={event => choosePlace(nearby.id, event.currentTarget)} aria-haspopup="dialog">Explore {nearby.title}<ArrowRight size={16} /></button>}
      </div>
      <div aria-live="polite" aria-atomic="true" className="sr-only">{reaction === 'pet' ? 'Opaca does a happy hop!' : reaction === 'feed' ? 'Opaca is enjoying his leaf.' : active ? `Exploring ${active.title}.` : ''}</div>
      {active && (
        <div className="world-detail" id="world-place-popup" ref={popupRef} role="dialog" aria-modal="false" aria-labelledby="world-popup-title" tabIndex={-1} style={popupPosition}>
          <img src={active.image} alt="" width="100" height="100" />
          <div className="world-detail-copy">
            <p className="editorial-eyebrow">{active.eyebrow}</p>
            <h3 id="world-popup-title">{active.title}</h3>
            <p>{active.blurb}</p>
            <a href={active.cta.href} className="editorial-link">{active.cta.label}<ArrowRight size={16} /></a>
          </div>
          <div className="world-detail-controls">
            <button type="button" aria-label="Close destination" title="Close destination" onClick={() => closePopup()}><X size={18} /></button>
          </div>
        </div>
      )}
    </section>
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


function CaseStudySection({ study, index }: { study: CaseStudy; index: number }) {
  const isReversed = index % 2 === 1;

  return (
    <motion.article
      id={study.id}
      initial={false}
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      variants={fadeUp}
      className={`scroll-mt-24 rounded-[24px] border bg-transparent p-4 shadow-card sm:rounded-[28px] sm:p-5 md:p-7 ${
        study.id === 'nvidia' ? 'border-plum-200 ring-1 ring-plum-100' : 'border-blush-100'
      }`}
    >
      <div className={`grid items-start gap-8 lg:grid-cols-[1.05fr_0.95fr] ${isReversed ? 'lg:[&>*:first-child]:order-2' : ''}`}>
        <div>
          <div className="mb-3 text-[10px] font-black uppercase tracking-[0.22em] text-blush-500">{study.eyebrow}</div>
          <h3 className="text-2xl font-black leading-tight text-plum-900 sm:text-3xl md:text-4xl">{study.title}</h3>
          <p className="mt-4 text-sm leading-relaxed text-plum-400">{study.summary}</p>
          {study.id === 'ai-valley' && (
            <Link
              href="https://aivalley.io/events"
              className="mt-4 inline-flex items-center gap-2 rounded-full border border-blush-200 bg-blush-50 px-4 py-2 text-xs font-black text-plum-900 transition-colors hover:border-plum-300 hover:bg-white"
            >
              <CalendarDays size={14} />
              View events
              <ArrowRight size={14} />
            </Link>
          )}

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
  const pageRef = useRef<HTMLDivElement>(null);
  const [copyStatus, setCopyStatus] = useState('Copy email');
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    if (reduceMotion) return;
    const elements = pageRef.current?.querySelectorAll('.world-introduction, .selected-work > h2, .featured-community, .secondary-work article, .section-title-row, .paca-grid article, .about-section > div, .toolkit-grid > div, .contact-section, .proof-strip > div');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('editorial-revealed');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12 });
    elements?.forEach((element) => observer.observe(element));
    return () => {
      observer.disconnect();
      elements?.forEach((element) => element.classList.remove('editorial-revealed'));
    };
  }, [reduceMotion]);

  useEffect(() => {
    if (copyStatus === 'Copy email') return;
    const timer = window.setTimeout(() => setCopyStatus('Copy email'), 3000);
    return () => window.clearTimeout(timer);
  }, [copyStatus]);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText('courtneythko@gmail.com');
      setCopyStatus('Email copied');
    } catch {
      setCopyStatus('Use Email Courtney to get in touch');
    }
  };
  useEffect(() => {
    const trackLink = (event: MouseEvent) => {
      const link = event.target instanceof Element ? event.target.closest('a') : null;
      if (!link) return;
      const href = link.getAttribute('href') ?? '';
      const action = href.includes('Courtney_Ko_Resume.pdf') ? 'resume_click'
        : href.startsWith('mailto:') ? 'email_click'
        : href.includes('linkedin.com') ? 'linkedin_click'
        : (href.includes('/trips/ai-valley-events') || href === 'https://aivalley.io/events') ? 'events_click'
        : ['#ai-valley', '#nvidia', '#pearle', '#case-studies'].includes(href) ? 'case_study_click'
        : null;
      const analytics = window as Window & { gtag?: (command: string, action: string, data: Record<string, string>) => void };
      if (action && analytics.gtag) analytics.gtag('event', action, {
        placement: link.closest('[data-placement]')?.getAttribute('data-placement') ?? 'portfolio',
      });
    };
    document.addEventListener('click', trackLink);
    return () => document.removeEventListener('click', trackLink);
  }, []);

  return (
    <div ref={pageRef} className="portfolio-editorial min-h-screen bg-[#FBF8F8] text-plum-900">
      <SkyClouds />
      <motion.div className="reading-progress" style={{ scaleX: scrollYProgress }} aria-hidden="true" />
      <a href="#main" className="skip-link">Skip to content</a>
      <header className="portfolio-header" data-placement="header">
        <Link href="/" className="wordmark">Courtney Ko<span aria-hidden="true">.</span></Link>
        <nav aria-label="Main navigation">
          <a href="#work">Work</a>
          <a href="#about" className="desktop-nav-link">About</a>
          <a href="https://aivalley.io/events">Events</a>
          <a href="/Courtney_Ko_Resume.pdf" target="_blank" rel="noopener noreferrer" className="desktop-nav-link">Resume</a>
          <a href="mailto:courtneythko@gmail.com" className="header-email">Email <ArrowRight size={14} /></a>
        </nav>
      </header>

      <main id="main" className="portfolio-main">
        <section className="portfolio-intro" aria-labelledby="intro-title" data-placement="introduction">
          <h1 id="intro-title">Courtney Ko</h1>
          <p className="intro-positioning">Building communities, partnerships,<br className="hidden sm:block" /> and product experiences for AI.</p>
          <p className="intro-description">At AI Valley, I lead technical programming, partnerships, and community operations for 11K+ builders. My experience spans enterprise automation at NVIDIA and founding AI products.</p>
          <div className="intro-actions">
            <a className="editorial-button" href="#work">View Experience <ArrowRight size={16} /></a>
            <a className="editorial-button secondary" href="/Courtney_Ko_Resume.pdf" target="_blank" rel="noopener noreferrer">Resume <ExternalLink size={15} /></a>
            <a className="editorial-link" href="mailto:courtneythko@gmail.com">Email Courtney</a>
          </div>
          <dl className="proof-strip">
            {[['11K+', 'builders connected'], ['70+', 'events hosted'], ['500+', 'hackathon registrations']].map(([value, label]) => (
              <div key={label}><dt>{label}</dt><dd>{value}</dd></div>
            ))}
          </dl>
        </section>

        <div className="world-introduction">
          <p className="editorial-eyebrow">A little more me</p>
          <h2>Explore Courtney’s world</h2>
        </div>
        <OpacaWorldHero />

        <section id="work" className="selected-work" aria-labelledby="work-title" data-placement="selected-work">
          <h2 id="work-title">Selected work</h2>
          <article className="featured-community">
            <EventGallery />
            <div className="community-summary">
              <p className="editorial-eyebrow green">Community &amp; partnerships</p>
              <h3>AI Valley</h3>
              <p>Technical programming, partner experiences, and community operations for an AI builder ecosystem.</p>
              <div className="project-links">
                <a href="#ai-valley" className="editorial-link">Explore the work <ArrowRight size={18} /></a>
                <a href="https://aivalley.io/events" className="editorial-link">View events <CalendarDays size={16} /></a>
              </div>
            </div>
          </article>
          <div className="secondary-work">
            <article>
              <p className="editorial-eyebrow green">Enterprise</p>
              <h3>NVIDIA</h3>
              <p>Enterprise automation and cross-functional execution. A self-serve workflow that went from two hours to 30 minutes.</p>
              <a href="#nvidia" className="editorial-link">Explore the work <ArrowRight size={18} /></a>
            </article>
            <article>
              <p className="editorial-eyebrow green">Product</p>
              <h3>Pearle</h3>
              <p>An AI travel product, from concept to private beta. 3.9K+ itineraries generated.</p>
              <a href="#pearle" className="editorial-link">Explore the work <ArrowRight size={18} /></a>
            </article>
          </div>
        </section>

        <section id="case-studies" className="experience-section" data-placement="experience" aria-labelledby="experience-title">
          <p className="editorial-eyebrow">Experience</p>
          <h2 id="experience-title">The work behind the results.</h2>
          {orderedCaseStudies.map((study, index) => <CaseStudySection key={study.id} study={study} index={index} />)}
        </section>

        <section className="paca-section" data-placement="products" aria-labelledby="products-title">
          <div className="section-title-row">
            <div><p className="editorial-eyebrow">Built by me</p><h2 id="products-title">Small ideas. Shipped products.</h2></div>
            <Link href="/trips/projects" className="editorial-link">All projects <ArrowRight size={16} /></Link>
          </div>
          <ProductShelf products={personalProducts} />
        </section>

        <section id="about" className="about-section" data-placement="about">
          <div>
            <p className="editorial-eyebrow">About</p>
            <h2>Curious about people.<br />Serious about building.</h2>
            <img className="about-portrait" src="/profile.jpeg" alt="Courtney Ko" width="320" height="360" loading="lazy" />
          </div>
          <div className="about-copy">
            <p>My background in psychology and UX shapes how I work: understand what people need, make the experience useful, and give them a reason to come back.</p>
            <p>That has taken me from enterprise operations and product development to running technical events and building relationships across the AI ecosystem. I enjoy connecting the people building a product with the people who will use it.</p>
            <p>Outside work, I’m usually planning a trip, testing a new idea, or finding another place for Opaca in something I build.</p>
            <div className="education-list">
              {educationCredentials.map((credential) => (
                <div key={credential.school}><strong>{credential.degree}</strong><span>{credential.school}</span></div>
              ))}
            </div>
            <a href={CONTACT_LINK} className="editorial-link" target="_blank" rel="noopener noreferrer">More on LinkedIn <ExternalLink size={15} /></a>
          </div>
        </section>

        <section id="toolkit" className="toolkit-section" aria-labelledby="toolkit-title">
          <p className="editorial-eyebrow">How I work</p>
          <h2 id="toolkit-title">People, products, and the systems between.</h2>
          <div className="toolkit-grid">
            {toolkit.map((group) => <div key={group.title}><h3>{group.title}</h3><p>{group.items.join(' · ')}</p></div>)}
          </div>
        </section>

        <section id="contact" className="contact-section" data-placement="contact">
          <p className="editorial-eyebrow">Let’s talk</p>
          <h2>Building an AI community,<br className="hidden sm:block" /> partnership, or product story?</h2>
          <p>I’d love to hear what your team is working on.</p>
          <div className="intro-actions">
            <a className="editorial-button" href="mailto:courtneythko@gmail.com">Email Courtney <Mail size={16} /></a>
            <button className="editorial-link copy-email" type="button" onClick={copyEmail}><Mail size={16} /><span aria-live="polite">{copyStatus}</span></button>
            <a className="editorial-link" href={CONTACT_LINK} target="_blank" rel="noopener noreferrer">LinkedIn <ExternalLink size={15} /></a>
            <a className="editorial-link" href="/Courtney_Ko_Resume.pdf" target="_blank" rel="noopener noreferrer">Resume <ExternalLink size={15} /></a>
          </div>
        </section>
      </main>
      <footer className="portfolio-footer"><span>Courtney Ko</span><a href="#main">Back to top ↑</a></footer>
    </div>
  );
}
