'use client';

import { motion } from 'framer-motion';
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

const caseStudies: CaseStudy[] = [
  {
    id: 'nvidia',
    eyebrow: 'NVIDIA · Automation Systems',
    title: 'Self-serve automation for enterprise operations workflows.',
    summary:
      'Built internal tools that turned repetitive, high-friction operational workflows into faster self-serve systems.',
    problem:
      'Manual enterprise operations workflows were slow, repetitive, and dependent on specialized knowledge spread across systems and stakeholders.',
    role:
      'Business Analyst, Automation & Systems. I identified workflow bottlenecks, translated operational pain points into internal tools, and built Python-powered automation flows.',
    process: [
      'Mapped manual request workflows to isolate repeated decisions and fragile handoffs.',
      'Partnered with stakeholders to define a self-serve workflow that non-specialists could use independently.',
      'Prototyped automation paths, validated outputs, and tightened the experience around speed, trust, and consistency.',
    ],
    built: [
      'Self-serve UI for a recurring enterprise operations workflow.',
      'Python workflows that transform unstructured request data into structured operational inputs.',
      'AI-powered case summarization workflows for faster review and resolution.',
    ],
    metrics: [
      { value: '2h → 30m', label: 'workflow processing time' },
      { value: '1w → 1.5h', label: 'case review time' },
      { value: '3+', label: 'team members enabled to self-serve' },
    ],
    tools: ['Python', 'Internal platforms', 'AI summarization', 'Workflow automation', 'Self-serve tooling'],
    outcome:
      'Reduced repetitive work, improved process consistency, and gave the team a faster operating model for recurring internal workflows.',
    accent: 'from-[#3D2540] to-[#AD8690]',
    roleFit: 'Technical PM · AI Automation',
    visual: 'automation',
  },
  {
    id: 'pearle',
    eyebrow: 'Pearle · AI Travel Platform',
    title: 'An AI group travel planner that transformed messy inspiration into itineraries.',
    summary:
      'Founded and shipped a 0 to 1 AI travel product with LLM-powered itinerary generation and collaborative planning flows.',
    problem:
      'Group travel planning starts with scattered inspiration, screenshots, social posts, and conflicting preferences. Turning that into a shared plan is tedious.',
    role:
      'Founder and Product Lead. I shaped the product vision, roadmap, MVP scope, user flows, research loops, and launch priorities.',
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
      'Scaled community operations and event systems for a technical AI ecosystem in San Francisco.',
    problem:
      'AI communities can become noisy quickly. Builders need useful rooms, real technical programming, strong partners, and reasons to keep returning.',
    role:
      'COO and community builder. I helped design programming, partnerships, event operations, and the systems behind community-led growth.',
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

const photoMoments = [
  { src: '/seoul.jpeg', label: 'Travel research', tone: 'User context' },
  { src: '/macchupicchu.jpeg', label: 'Itinerary inspiration', tone: 'Pearle' },
  { src: '/aivalley-builder-table.jpg', label: 'Builder conversations', tone: 'AI Valley' },
  { src: '/aivalley-workshop-room.jpg', label: 'Technical workshop', tone: 'Community' },
  { src: '/aivalley-founder-talk.jpg', label: 'Founder programming', tone: 'Female Founder Brunch' },
  { src: '/fembrunch.jpg', label: 'Women building AI', tone: 'Ecosystem' },
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
      className={`inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-bold transition-all ${
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

function SystemMockup({ study }: { study: CaseStudy }) {
  if (study.visual === 'automation') {
    return (
      <div className={`relative min-h-[420px] overflow-hidden rounded-2xl bg-gradient-to-br ${study.accent} p-5 text-white`}>
        <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full border border-white/20" />
        <div className="absolute -bottom-24 -left-16 h-56 w-56 rounded-full border border-white/15" />

        <div className="relative rounded-2xl border border-white/20 bg-white/12 p-4 shadow-soft backdrop-blur">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <div className="text-[10px] font-black uppercase tracking-[0.2em] text-white/60">Self-Serve Operations Console</div>
              <div className="mt-1 text-lg font-black">Enterprise Workflow Automation</div>
            </div>
            <div className="rounded-full bg-white px-3 py-1 text-[10px] font-black text-plum-900">Live flow</div>
          </div>

          <div className="grid gap-3">
            {[
              ['Request intake', 'Normalize fields', 'Structured output'],
              ['Case context', 'AI summary pass', 'Review brief'],
            ].map((row) => (
              <div key={row.join('-')} className="grid grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-2">
                {row.map((item, i) => (
                  <div key={item} className="contents">
                    <div className="rounded-xl border border-white/18 bg-white/14 px-3 py-3 text-[11px] font-bold leading-tight text-white/86">
                      {item}
                    </div>
                    {i < row.length - 1 && <ArrowRight size={13} className="text-white/55" />}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="relative mt-4 grid grid-cols-2 gap-3">
          {study.metrics.slice(0, 2).map((metric) => (
            <div key={metric.label} className="rounded-2xl border border-white/20 bg-white/14 p-4 backdrop-blur">
              <div className="text-3xl font-black">{metric.value}</div>
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
      <div className={`relative self-start overflow-hidden rounded-2xl bg-gradient-to-br ${study.accent} p-4`}>
        <div className="grid min-h-[392px] grid-cols-3 grid-rows-[130px_130px_130px] gap-3">
          {[
            { src: '/aivalley-lounge-event.jpg', label: 'Builder lounge', className: 'col-span-2 row-span-1' },
            { src: '/aivalley-workshop-room.jpg', label: 'Technical workshop', className: 'row-span-2' },
            { src: '/aivalley-builder-table.jpg', label: 'Builder conversations', className: 'row-span-1' },
            { src: '/aivalley-audience.jpg', label: 'Packed AI room', className: 'row-span-1' },
            { src: '/aivalley-founder-talk.jpg', label: 'Founder talk', className: 'row-span-1' },
            { src: '/fembrunch.jpg', label: 'Female Founder Brunch', className: 'col-span-2 row-span-1' },
          ].map(({ src, label, className }) => (
            <div
              key={src}
              className={`relative overflow-hidden rounded-2xl bg-cover bg-center ${className}`}
              style={{ backgroundImage: `url(${src})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-plum-900/50 via-plum-900/0 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 text-xs font-black text-white">{label}</div>
            </div>
          ))}
        </div>
        <div className="absolute left-5 top-5 rounded-full border border-white/20 bg-white/14 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.18em] text-white/80 backdrop-blur">
          Community engine
        </div>
      </div>
    );
  }

  if (study.image) {
    return (
      <div className="relative h-full min-h-[420px] overflow-hidden rounded-2xl bg-plum-900">
        <img src={study.image} alt="" className="h-full w-full object-cover opacity-82" />
        <div className="absolute inset-0 bg-gradient-to-t from-plum-900/70 via-plum-900/10 to-transparent" />
        <div className="absolute left-5 top-5 rounded-full border border-white/20 bg-white/14 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.18em] text-white/75 backdrop-blur">
          {study.visual === 'travel' ? 'AI planning loop' : 'Community engine'}
        </div>
        <div className="absolute bottom-5 left-5 right-5 grid gap-3 rounded-2xl border border-white/20 bg-white/12 p-4 text-white backdrop-blur">
          <div className="grid grid-cols-3 gap-2">
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
      className={`scroll-mt-24 rounded-[28px] border bg-white p-5 md:p-7 shadow-card ${
        study.id === 'nvidia' ? 'border-plum-200 ring-1 ring-plum-100' : 'border-blush-100'
      }`}
    >
      <div className={`grid items-start gap-8 lg:grid-cols-[1.05fr_0.95fr] ${isReversed ? 'lg:[&>*:first-child]:order-2' : ''}`}>
        <div>
          <div className="mb-3 text-[10px] font-black uppercase tracking-[0.22em] text-blush-500">{study.eyebrow}</div>
          <h3 className="text-3xl md:text-4xl font-black leading-tight text-plum-900">{study.title}</h3>
          <p className="mt-4 text-sm leading-relaxed text-plum-400">{study.summary}</p>

          <div className="mt-6 grid grid-cols-3 gap-3">
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

      <nav className="relative z-10 mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Link href="/" className="flex items-center gap-3">
          <LogoMark className="h-10 w-10 ring-2 ring-white" />
          <span className="text-sm font-black text-plum-900">Courtney Ko</span>
        </Link>
        <div className="flex items-center gap-2">
          <Link
            href="/resume"
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

      <div className="sticky top-3 z-20 mx-auto mb-2 hidden max-w-6xl px-6 md:block">
        <div className="ml-auto flex w-fit items-center gap-1 rounded-full border border-white/70 bg-white/95 p-1 text-[11px] font-black text-plum-700 shadow-soft-lg backdrop-blur-xl ring-1 ring-plum-900/5">
          {[
            ['Work', '#work'],
            ['Case Studies', '#case-studies'],
            ['About', '#about'],
            ['Toolkit', '#toolkit'],
            ['Contact', '#contact'],
          ].map(([label, href]) => (
            <a key={href} href={href} className="rounded-full px-3 py-1.5 transition-colors hover:bg-plum-900 hover:text-white">
              {label}
            </a>
          ))}
        </div>
      </div>

      <main className="relative z-10 mx-auto max-w-6xl px-6 pb-20">
        <section className="grid min-h-[calc(100vh-92px)] items-center gap-10 py-12 md:grid-cols-[1.08fr_0.92fr] md:py-16">
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blush-200 bg-white px-4 py-1.5 text-xs font-bold text-plum-600 shadow-soft">
              <Sparkles size={13} className="text-blush-500" />
              Product-minded builder across AI, automation, and community
            </div>
            <h1 className="max-w-4xl text-5xl font-black leading-[0.95] tracking-normal text-plum-900 md:text-7xl">
              Building useful AI systems for messy human workflows.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-plum-500 md:text-xl">
              I turn ambiguous product and operations problems into shipped tools, cleaner workflows, and communities that compound trust.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="#work">
                View Work
                <ArrowRight size={16} />
              </ButtonLink>
              <ButtonLink href="mailto:courtneythko@gmail.com" variant="secondary">
                Contact
                <Mail size={15} />
              </ButtonLink>
              <ButtonLink href={CONTACT_LINK} variant="secondary">
                LinkedIn
                <ExternalLink size={15} />
              </ButtonLink>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-plum-400">
              <span className="flex items-center gap-1.5">
                <MapPin size={14} />
                San Francisco, CA
              </span>
              <span>Product strategy</span>
              <span>AI automation</span>
              <span>Technical PM / PMM</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24, rotate: 1 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            transition={{ duration: 0.65, ease: 'easeOut', delay: 0.12 }}
            className="relative"
          >
            <div className="overflow-hidden rounded-[30px] border border-blush-100 bg-white p-3 shadow-soft-lg">
              <img src="/profile.jpeg" alt="Courtney Ko" className="aspect-[4/5] w-full rounded-2xl object-cover" />
              <div className="absolute bottom-8 left-8 right-8 rounded-2xl border border-white/60 bg-white/90 p-5 shadow-soft backdrop-blur">
                <div className="mb-3 text-[10px] font-black uppercase tracking-[0.22em] text-blush-500">Recent impact</div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <div className="text-2xl font-black text-plum-900">2h → 30m</div>
                    <div className="text-[11px] leading-snug text-plum-400">workflow processing</div>
                  </div>
                  <div>
                    <div className="text-2xl font-black text-plum-900">1w → 1.5h</div>
                    <div className="text-[11px] leading-snug text-plum-400">case review workflow</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={fadeUp}
          className="mb-20 grid grid-cols-2 gap-3 rounded-[28px] border border-blush-100 bg-white p-4 shadow-card md:grid-cols-4"
        >
          {impactStats.map((stat) => (
            <div key={stat.label} className="rounded-2xl bg-blush-50 p-4">
              <div className="text-2xl font-black text-plum-900 md:text-3xl">{stat.value}</div>
              <div className="mt-1 text-xs leading-snug text-plum-400">{stat.label}</div>
            </div>
          ))}
        </motion.section>

        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={fadeUp}
          className="mb-24"
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

          <div className="grid grid-cols-2 gap-3 md:grid-cols-6">
            {photoMoments.map((photo, index) => (
              <motion.div
                key={photo.src}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.04, duration: 0.42 }}
                className={`group relative overflow-hidden rounded-2xl border border-blush-100 bg-white shadow-card ${
                  index === 0 || index === 2 ? 'md:col-span-2 md:row-span-2' : 'md:col-span-1'
                }`}
              >
                <img
                  src={photo.src}
                  alt={photo.label}
                  className={`h-full min-h-44 w-full object-cover transition-transform duration-700 group-hover:scale-105 ${
                    index === 0 || index === 2 ? 'md:min-h-[356px]' : 'md:min-h-[172px]'
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

        <section id="work" className="mb-24 scroll-mt-24">
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

        <section id="case-studies" className="mb-24 scroll-mt-24 space-y-8">
          <SectionHeader
            eyebrow="Case Studies"
            title="Detailed work, without the fluff."
            description="Problem, role, process, build, tools, and outcomes for the work recruiters and hiring teams are most likely to care about."
          />
          <div className="rounded-[28px] border border-plum-200 bg-plum-900 p-6 text-white shadow-soft-lg md:p-8">
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

        <section id="about" className="mb-24 scroll-mt-24 grid gap-8 rounded-[28px] border border-blush-100 bg-white p-6 shadow-card md:grid-cols-[0.85fr_1.15fr] md:p-8">
          <div>
            <div className="mb-3 text-[11px] font-black uppercase tracking-[0.22em] text-blush-500">About</div>
            <h2 className="text-3xl font-black leading-tight text-plum-900 md:text-5xl">Warm human, rigorous operator.</h2>
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

        <section id="toolkit" className="mb-24 scroll-mt-24">
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

        <section id="contact" className="scroll-mt-24 overflow-hidden rounded-[32px] bg-plum-900 p-7 text-white shadow-soft-lg md:p-10">
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
