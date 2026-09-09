'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion, useScroll } from 'framer-motion';
import Link from 'next/link';
import { EventGallery, ProductShelf } from './PortfolioPlayground';
import { ContinuousJourney, JourneyStop, JourneyDisclosure } from './ContinuousJourney';
import { portfolioLinkAction } from './portfolioAnalytics';
import './watercolorJourney.css';
import { WatercolorSprite } from './WatercolorSprite';
import { HeroAtmosphere } from './HeroAtmosphere';
import {
  ArrowRight,
  CalendarDays,
  ExternalLink,
  Mail,
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


const fadeUp = { visible: { opacity: 1, y: 0 } };


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
      const link = event.target instanceof Element ? event.target.closest('a, summary[data-case-study]') : null;
      if (!link) return;
      const href = link.getAttribute('href') ?? `#${link.getAttribute('data-case-study') ?? ''}`;
      const action = portfolioLinkAction(href);
      const analytics = window as Window & { gtag?: (command: string, action: string, data: Record<string, string>) => void };
      if (action && analytics.gtag) analytics.gtag('event', action, {
        placement: link.closest('[data-placement]')?.getAttribute('data-placement') ?? 'portfolio',
      });
    };
    document.addEventListener('click', trackLink);
    return () => document.removeEventListener('click', trackLink);
  }, []);

  return (
    <div ref={pageRef} className="portfolio-editorial watercolor-portfolio min-h-screen text-plum-900">
      <motion.div className="reading-progress" style={{ scaleX: scrollYProgress }} aria-hidden="true" />
      <a href="#main" className="skip-link">Skip to content</a>
      <header className="portfolio-header" data-placement="header">
        <Link href="/" className="wordmark" aria-label="Courtney Ko home">Courtney Ko</Link>
        <nav aria-label="Main navigation">
          <a href="#work">Work</a>
          <a href="#about" className="desktop-nav-link">About</a>
          <a href="https://aivalley.io/events">Events</a>
          <a href="/Courtney_Ko_Resume.pdf" target="_blank" rel="noopener noreferrer" className="desktop-nav-link">Resume</a>
          <a href="mailto:courtneythko@gmail.com" className="header-email">Email <ArrowRight size={14} /></a>
        </nav>
      </header>

      <main id="main" className="portfolio-main">
        <ContinuousJourney>
        <span id="world" className="journey-alias" />
        <JourneyStop id="basecamp" tile={0} title="Courtney's Basecamp" className="journey-basecamp" placement="introduction">
        <HeroAtmosphere />
        <div className="portfolio-intro" aria-labelledby="intro-title">
          <h1 id="intro-title" className="intro-name">Courtney Ko</h1>
          <p className="intro-positioning">Building communities, partnerships, and product experiences for AI.</p>
          <p className="intro-description">Community and partnerships at AI Valley. Previously NVIDIA.<br />Building useful AI products, with people at the heart.</p>
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
        </div>
        <nav className="basecamp-destinations" aria-label="Explore destinations">
          {[['work', 'AI Valley', 1], ['nvidia-lab', 'NVIDIA', 2], ['pearle-port', 'Pearle', 3]].map(([id, label, tile]) => (
            <a key={id} href={`#${id}`}>
              <WatercolorSprite tile={Number(tile)} className="watercolor-mini" />
              <span>{label} <ArrowRight size={12} /></span>
            </a>
          ))}
        </nav>
        </JourneyStop>

        <JourneyStop id="work" tile={1} title="AI Valley Hub" placement="selected-work">
          <span id="case-studies" className="journey-alias" />
          <p className="editorial-eyebrow">Community &amp; partnerships</p>
          <h2>AI Valley</h2>
          <p>Technical programming, partner experiences, and community operations for an AI builder ecosystem.</p>
          <div className="journey-inline-metrics"><div><strong>11K+</strong><span>builders connected</span></div><div><strong>70+</strong><span>events hosted</span></div></div>
          <div className="project-links"><a href="https://aivalley.io/events" className="editorial-link">View events <CalendarDays size={16} /></a></div>
          <EventGallery />
          <JourneyDisclosure id="ai-valley" title="AI Valley"><CaseStudySection study={orderedCaseStudies[0]} index={0} /></JourneyDisclosure>
        </JourneyStop>

        <JourneyStop id="nvidia-lab" tile={2} title="NVIDIA Lab" placement="experience">
          <p className="editorial-eyebrow">Automation &amp; systems</p>
          <h2>NVIDIA</h2>
          <p>Enterprise automation and cross-functional execution. A self-serve workflow that went from two hours to 30 minutes.</p>
          <div className="journey-inline-metrics"><div><strong>2h → 30m</strong><span>workflow processing time</span></div><div><strong>3+</strong><span>team members enabled to self-serve</span></div></div>
          <img className="journey-photo nvidia-photo" src="/nowplaying.jpeg" alt="Courtney at NVIDIA headquarters" width="768" height="1024" loading="lazy" />
          <JourneyDisclosure id="nvidia" title="NVIDIA"><CaseStudySection study={orderedCaseStudies[1]} index={1} /></JourneyDisclosure>
        </JourneyStop>

        <JourneyStop id="pearle-port" tile={3} title="Pearle Port" placement="experience">
          <p className="editorial-eyebrow">Founder &amp; AI product</p>
          <h2>Pearle</h2>
          <p>An AI travel product, from concept to private beta. LLM-powered itinerary generation and collaborative planning for groups.</p>
          <div className="journey-inline-metrics"><div><strong>3.9K+</strong><span>itineraries generated</span></div><div><strong>10w</strong><span>MVP delivery timeline</span></div></div>
          <img className="journey-photo pearle-photo" src="/pearle-travel-assistant.png" alt="Pearle AI group travel assistant with destination suggestions, chat input, and trip-planning progress" width="800" height="584" loading="lazy" />
          <JourneyDisclosure id="pearle" title="Pearle"><CaseStudySection study={orderedCaseStudies[2]} index={2} /></JourneyDisclosure>
        </JourneyStop>

        <JourneyStop id="paca-village" tile={4} title="Paca Village" className="journey-products" placement="products">
          <div className="section-title-row">
            <div><p className="editorial-eyebrow">Built by me</p><h2 id="products-title">Small ideas. Shipped products.</h2></div>
            <Link href="/trips/projects" className="editorial-link">All projects <ArrowRight size={16} /></Link>
          </div>
          <ProductShelf products={personalProducts} />
          <noscript><div className="project-links">{personalProducts.map(product => <a key={product.title} href={product.href} className="editorial-link">Visit {product.title}</a>)}</div></noscript>
        </JourneyStop>

        <JourneyStop id="about" tile={5} title="Travel Atlas" className="journey-about" placement="about">
          <div>
            <p className="editorial-eyebrow">About</p>
            <h2>Curious about people.<br />Serious about building.</h2>
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
          <div className="travel-photos about-memories">
            <figure className="portrait-memory"><img className="about-portrait" src="/profile.jpeg" alt="Courtney Ko" width="1050" height="1350" loading="lazy" /><figcaption>Courtney Ko</figcaption></figure>
            <figure><img src="/macchupicchu.jpeg" alt="Courtney visiting Machu Picchu" width="400" height="400" loading="lazy" /><figcaption>Machu Picchu</figcaption></figure>
            <figure><img src="/seoul.jpeg" alt="A memory from Seoul" width="400" height="400" loading="lazy" /><figcaption>Seoul</figcaption></figure>
          </div>
        <section id="toolkit" className="journey-toolkit" aria-labelledby="toolkit-title">
          <p className="editorial-eyebrow">How I work</p>
          <h3 id="toolkit-title">People, products, and the systems between.</h3>
          <div className="toolkit-grid">
            {toolkit.map((group) => <div key={group.title}><h4>{group.title}</h4><p>{group.items.join(' · ')}</p></div>)}
          </div>
        </section>
        </JourneyStop>

        <JourneyStop id="contact" tile={6} title="Contact Post Office" className="journey-contact" placement="contact">
          <p className="editorial-eyebrow">Let’s talk</p>
          <h2 id="contact-title">Building an AI community,<br className="hidden sm:block" /> partnership, or product story?</h2>
          <p>I’d love to hear what your team is working on.</p>
          <div className="intro-actions">
            <a className="editorial-button" href="mailto:courtneythko@gmail.com">Email Courtney <Mail size={16} /></a>
            <button className="editorial-link copy-email" type="button" onClick={copyEmail}><Mail size={16} /><span aria-live="polite">{copyStatus}</span></button>
            <a className="editorial-link" href={CONTACT_LINK} target="_blank" rel="noopener noreferrer">LinkedIn <ExternalLink size={15} /></a>
            <a className="editorial-link" href="https://x.com/Courtneythko" target="_blank" rel="noopener noreferrer" aria-label="Courtney on X">X <ExternalLink size={15} /></a>
            <a className="editorial-link" href="/Courtney_Ko_Resume.pdf" target="_blank" rel="noopener noreferrer">Resume <ExternalLink size={15} /></a>
          </div>
        </JourneyStop>
        </ContinuousJourney>
      </main>
      <footer className="portfolio-footer"><span>Courtney Ko</span><a href="#main">Back to top ↑</a></footer>
    </div>
  );
}
