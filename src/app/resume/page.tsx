'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Plane, ArrowLeft, ChevronDown } from 'lucide-react';

type Category = 'All' | 'AI' | 'Product' | 'Enterprise' | 'Community' | 'Developer';

interface Flight {
  id: string;
  company: string;
  companyCode: string;
  role: string;
  roleCode: string;
  dateRange: string;
  status: 'In Flight' | 'Landed';
  categories: Exclude<Category, 'All'>[];
  bullets: string[];
}

const FLIGHTS: Flight[] = [
  {
    id: 'ai-valley',
    company: 'AI Valley',
    companyCode: 'AIV',
    role: 'Chief Operating Officer',
    roleCode: 'COO',
    dateRange: 'Sep 2025 → Present',
    status: 'In Flight',
    categories: ['AI', 'Community'],
    bullets: [
      'Scaled a 0→1 developer community to 5,000+ engineers and founders by identifying user needs and designing high-signal technical programming (hackathons, workshops, events).',
      'Defined and executed product strategy for community growth, improving activation, engagement, and retention through structured onboarding and event experiences.',
      'Led cross-functional execution across sponsors, partners, and internal teams to deliver multi-sided platform value (builders, sponsors, and organizers).',
      "Launched and scaled San Francisco's largest all-women AI hackathon (500+ registrations), improving accessibility and participation in technical communities.",
    ],
  },
  {
    id: 'nvidia',
    company: 'NVIDIA',
    companyCode: 'NVD',
    role: 'Business Operations Analyst (Contract)',
    roleCode: 'ENT',
    dateRange: 'Oct 2025 → Present',
    status: 'In Flight',
    categories: ['AI', 'Enterprise'],
    bullets: [
      'Owned internal product workflows across Salesforce and SAP for licensing and entitlement systems, improving scalability of enterprise operations.',
      'Built a Python-based automation to convert Salesforce CLI requests into SAP sales orders, reducing processing time from 2–3 hours to under 5 minutes (95%+ reduction).',
      'Led workflow redesign to eliminate manual steps, reduce error rates, and improve system reliability for order processing.',
      'Partnered with engineering, finance, and support to define requirements, resolve edge cases, and maintain pricing and entitlement logic.',
      'Built dashboards to monitor system performance, enabling data-driven decisions on escalations, latency, and process improvements.',
    ],
  },
  {
    id: 'pearle',
    company: 'Pearle',
    companyCode: 'PRL',
    role: 'Founder / Product Lead',
    roleCode: 'AI',
    dateRange: 'Mar 2025 → Sep 2025',
    status: 'Landed',
    categories: ['AI', 'Product'],
    bullets: [
      'Built and launched a 0→1 AI-powered group travel platform, defining product vision, roadmap, and core user flows.',
      'Designed AI-driven features including an itinerary generation system using LLM APIs and structured data pipelines.',
      'Conducted user research and iterated on product experience, driving 3.9K+ itinerary generations during private beta.',
      'Delivered MVP in 10 weeks by prioritizing high-impact features and coordinating engineering execution.',
    ],
  },
  {
    id: 'tipbrightly-pm',
    company: 'TipBrightly',
    companyCode: 'TIP',
    role: 'Product Manager',
    roleCode: 'FIN',
    dateRange: 'Nov 2024 → Oct 2025',
    status: 'Landed',
    categories: ['Product'],
    bullets: [
      'Shipped real-time analytics dashboard (Python, SQL) reducing reporting latency by 96%.',
      'Built AI-driven churn prediction model using behavioral signals to flag at-risk accounts.',
      'Designed and ran A/B experiments optimizing onboarding and activation, increasing NPS to 78.',
    ],
  },
  {
    id: 'career-exploration',
    company: 'South Korea & Asia',
    companyCode: 'ASI',
    role: 'Independent Product Prototyping & Advisory',
    roleCode: 'SFO',
    dateRange: 'Mar 2023 → Sep 2024',
    status: 'Landed',
    categories: ['AI', 'Product'],
    bullets: [
      'Built early-stage AI prototypes exploring LLM-based workflows and automation opportunities.',
      'Advised on operational systems and user workflows for international education services.',
    ],
  },
  {
    id: 'wells-fargo',
    company: 'Wells Fargo',
    companyCode: 'WFC',
    role: 'Design Producer (Product Design PM)',
    roleCode: 'DEV',
    dateRange: 'Aug 2021 → Mar 2023',
    status: 'Landed',
    categories: ['Developer'],
    bullets: [
      'Led delivery for API and SDK platforms across 10+ stakeholders, improving developer experience and integration workflows.',
      'Standardized 100+ API documentation assets across 25+ products, reducing friction in developer onboarding.',
      'Drove cross-functional alignment between product, engineering, and design to improve usability and system clarity.',
    ],
  },
  {
    id: 'tipbrightly-founding',
    company: 'TipBrightly',
    companyCode: 'TIP',
    role: 'Founding Product Manager',
    roleCode: 'FIN',
    dateRange: 'Jun 2020 → Aug 2021',
    status: 'Landed',
    categories: ['Product'],
    bullets: [
      'Led 0→1 platform redesign driving 919% transaction growth (to $99K).',
      'Owned payments systems, role-based permissions, and transactional workflows with guardrails preventing revenue leakage.',
      'Built instrumentation to track activation, revenue growth, and retention metrics.',
    ],
  },
];

const CATEGORIES: Category[] = ['All', 'AI', 'Product', 'Enterprise', 'Community', 'Developer'];

const ACTIVE_CHIP: Record<Category, string> = {
  All: 'bg-plum-800 text-white border-plum-800',
  AI: 'bg-blush-400 text-white border-blush-400',
  Product: 'bg-lavender-400 text-white border-lavender-400',
  Enterprise: 'bg-plum-500 text-white border-plum-500',
  Community: 'bg-blush-300 text-white border-blush-300',
  Developer: 'bg-lavender-300 text-white border-lavender-300',
};

const TAG_STYLE: Record<Exclude<Category, 'All'>, string> = {
  AI: 'bg-blush-100 text-blush-600',
  Product: 'bg-lavender-100 text-lavender-600',
  Enterprise: 'bg-plum-100 text-plum-500',
  Community: 'bg-blush-50 text-blush-500',
  Developer: 'bg-lavender-50 text-lavender-500',
};

const SKILLS: Record<string, string[]> = {
  Product: ['Product Strategy', 'Roadmapping', 'Experimentation', 'A/B Testing', 'User Research'],
  Technical: ['Python', 'SQL', 'LLM APIs', 'NLP Pipelines', 'API/SDK Integrations', 'Workflow Automation'],
  Systems: ['Salesforce', 'SAP', 'AWS', 'Jira', 'Figma'],
};

const EDUCATION = [
  { degree: 'M.A. Psychology', school: 'San Francisco State University', code: 'SFSU', logo: '/sfsu-logo.svg' },
  { degree: 'B.S. Cognitive Science', school: 'University of California, San Diego', code: 'UCSD', logo: '/ucsd-logo.svg' },
];

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};

export default function ResumePage() {
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filtered =
    activeCategory === 'All'
      ? FLIGHTS
      : FLIGHTS.filter((f) => f.categories.includes(activeCategory as Exclude<Category, 'All'>));

  const inFlight = FLIGHTS.filter((f) => f.status === 'In Flight').length;

  return (
    <div className="min-h-screen bg-blush-50">
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-5 max-w-5xl mx-auto">
        <Link
          href="/"
          className="flex items-center gap-1.5 text-plum-400 hover:text-plum-800 transition-colors text-sm font-semibold"
        >
          <ArrowLeft size={14} />
          Back
        </Link>
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-full overflow-hidden ring-2 ring-blush-200 shadow-soft">
            <img src="/profile.jpeg" alt="Courtney" className="w-full h-full object-cover" />
          </div>
          <span className="font-bold text-plum-800 text-base">Courtney Ko</span>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-6 pb-20">

        {/* Boarding pass header */}
        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="pt-8 pb-10">
          <div className="relative overflow-hidden rounded-3xl bg-blush-400 p-7 mb-8">
            <div className="absolute -top-10 -right-10 w-52 h-52 bg-white/10 rounded-full" />
            <div className="absolute -bottom-16 -left-8 w-44 h-44 bg-white/10 rounded-full" />

            <div className="relative z-10">
              {/* Top row */}
              <div className="flex items-start justify-between mb-7">
                <div>
                  <div className="text-[9px] font-black uppercase tracking-[0.2em] text-white/60 mb-0.5">Passenger</div>
                  <div className="text-3xl font-black text-white leading-tight">Courtney Ko</div>
                  <div className="text-sm text-white/70 mt-1">COO · Community Architect · Product Builder</div>
                </div>
                <div className="text-right">
                  <div className="text-[9px] font-black uppercase tracking-[0.2em] text-white/60 mb-0.5">Status</div>
                  <div className="flex items-center gap-1.5 text-white font-bold text-sm">
                    <Plane size={14} className="animate-pulse" />
                    In flight
                  </div>
                </div>
              </div>

              {/* Route */}
              <div className="flex items-center gap-3 mb-7">
                <div>
                  <div className="text-[9px] font-black uppercase tracking-[0.2em] text-white/60 mb-0.5">Origin</div>
                  <div className="text-3xl font-black text-white">SFO</div>
                  <div className="text-[10px] text-white/70">San Francisco</div>
                </div>
                <div className="flex-1 flex items-center gap-2 px-4">
                  <div className="flex-1 h-px border-t-2 border-dashed border-white/40" />
                  <Plane size={20} className="text-white/70" />
                  <div className="flex-1 h-px border-t-2 border-dashed border-white/40" />
                </div>
                <div className="text-right">
                  <div className="text-[9px] font-black uppercase tracking-[0.2em] text-white/60 mb-0.5">Destination</div>
                  <div className="text-3xl font-black text-white">∞</div>
                  <div className="text-[10px] text-white/70">Frontier of AI</div>
                </div>
              </div>

              {/* Perforation */}
              <div className="relative flex items-center my-5">
                <div className="absolute -left-7 w-5 h-5 rounded-full bg-blush-50" />
                <div className="flex-1 border-t-2 border-dashed border-white/30" />
                <div className="absolute -right-7 w-5 h-5 rounded-full bg-blush-50" />
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-4 gap-4 mt-5">
                <div>
                  <div className="text-[9px] font-black uppercase tracking-[0.2em] text-white/60 mb-0.5">Flights Logged</div>
                  <div className="text-2xl font-black text-white">{FLIGHTS.length}</div>
                </div>
                <div>
                  <div className="text-[9px] font-black uppercase tracking-[0.2em] text-white/60 mb-0.5">Active</div>
                  <div className="text-2xl font-black text-white">{inFlight}</div>
                </div>
                <div>
                  <div className="text-[9px] font-black uppercase tracking-[0.2em] text-white/60 mb-0.5">Home Base</div>
                  <div className="text-lg font-black text-white">SF, CA</div>
                </div>
                <div>
                  <div className="text-[9px] font-black uppercase tracking-[0.2em] text-white/60 mb-0.5">Contact</div>
                  <div className="text-xs font-bold text-white break-all">courtneythko@gmail.com</div>
                </div>
              </div>
            </div>
          </div>

          {/* Manifest (summary) */}
          <div className="bg-white rounded-2xl p-6 shadow-card border border-blush-100">
            <div className="text-[9px] font-black uppercase tracking-[0.2em] text-blush-400 mb-2">
              Passenger Manifest
            </div>
            <p className="text-sm text-plum-500 leading-relaxed">
              Product manager by background. Community builder at heart. Currently Business Analyst at NVIDIA and COO of AI Valley — a technical builder community in SF running hackathons, cofounder mixers, and hands-on events with partners including NVIDIA, Afore Capital, MiniMax, and Hanwha AI Center. Drawn to DevRel, ecosystem strategy, and community-driven product — where community is the growth lever.
            </p>
          </div>
        </motion.div>

        {/* Flight Log */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{ hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0, transition: { duration: 0.45, delay: 0.1 } } }}
          className="mb-14"
        >
          <div className="flex items-center gap-2 mb-4">
            <h2 className="text-sm font-bold text-plum-700">Flight Log</h2>
            <div className="flex-1 h-px bg-blush-100" />
            <span className="text-[11px] text-plum-300 font-medium">Experience</span>
          </div>

          {/* Filter chips */}
          <div className="flex flex-wrap gap-2 mb-5">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1 rounded-full text-[11px] font-bold border transition-all ${
                  activeCategory === cat
                    ? ACTIVE_CHIP[cat]
                    : 'bg-white border-blush-200 text-plum-400 hover:border-blush-300 hover:text-plum-600'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Flight cards */}
          <div className="space-y-3">
            <AnimatePresence mode="popLayout">
              {filtered.map((flight, i) => {
                const isOpen = expandedId === flight.id;
                return (
                  <motion.div
                    key={flight.id}
                    layout
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ delay: i * 0.05, duration: 0.32 }}
                  >
                    <div
                      className={`bg-white rounded-2xl border shadow-card overflow-hidden transition-colors cursor-pointer ${
                        isOpen ? 'border-blush-300' : 'border-blush-100 hover:border-blush-200'
                      }`}
                      onClick={() => setExpandedId(isOpen ? null : flight.id)}
                    >
                      {/* Card header row */}
                      <div className="p-5">
                        <div className="flex items-center gap-3 sm:gap-4">
                          {/* Airport codes */}
                          <div className="flex items-center gap-2 flex-shrink-0">
                            <div className="text-center">
                              <div className="text-lg font-black text-plum-900 leading-none">{flight.companyCode}</div>
                              <div className="text-[8px] text-plum-300 mt-0.5 font-medium uppercase tracking-wide">org</div>
                            </div>
                            <div className="flex items-center gap-0.5">
                              <div className="w-3 h-px border-t border-dashed border-blush-300" />
                              <Plane size={10} className="text-blush-400" />
                              <div className="w-3 h-px border-t border-dashed border-blush-300" />
                            </div>
                            <div className="text-center">
                              <div className="text-lg font-black text-plum-900 leading-none">{flight.roleCode}</div>
                              <div className="text-[8px] text-plum-300 mt-0.5 font-medium uppercase tracking-wide">dst</div>
                            </div>
                          </div>

                          {/* Divider */}
                          <div className="w-px h-9 bg-blush-100 flex-shrink-0 hidden sm:block" />

                          {/* Company + role + date */}
                          <div className="flex-1 min-w-0">
                            <div className="font-black text-plum-900 text-sm leading-tight truncate">{flight.company}</div>
                            <div className="text-xs text-plum-400 mt-0.5 truncate">{flight.role}</div>
                            <div className="text-[10px] text-plum-300 font-medium mt-0.5">{flight.dateRange}</div>
                          </div>

                          {/* Status + tags */}
                          <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                            <div
                              className={`flex items-center gap-1 text-[10px] font-bold px-2.5 py-1 rounded-full ${
                                flight.status === 'In Flight'
                                  ? 'bg-blush-100 text-blush-600'
                                  : 'bg-plum-50 text-plum-400'
                              }`}
                            >
                              {flight.status === 'In Flight' && (
                                <span className="w-1.5 h-1.5 rounded-full bg-blush-400 animate-pulse" />
                              )}
                              {flight.status}
                            </div>
                            <div className="flex gap-1 flex-wrap justify-end">
                              {flight.categories.map((cat) => (
                                <span
                                  key={cat}
                                  className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${TAG_STYLE[cat]}`}
                                >
                                  {cat}
                                </span>
                              ))}
                            </div>
                          </div>

                          <ChevronDown
                            size={14}
                            className={`text-blush-300 transition-transform flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`}
                          />
                        </div>
                      </div>

                      {/* Expandable content */}
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.28, ease: 'easeInOut' }}
                            style={{ overflow: 'hidden' }}
                          >
                            {/* Boarding-pass perforation */}
                            <div className="relative flex items-center mx-5">
                              <div className="absolute -left-5 w-4 h-4 rounded-full bg-blush-50" />
                              <div className="flex-1 border-t-2 border-dashed border-blush-100" />
                              <div className="absolute -right-5 w-4 h-4 rounded-full bg-blush-50" />
                            </div>

                            <ul className="px-5 pb-5 pt-4 space-y-2.5">
                              {flight.bullets.map((bullet, bi) => (
                                <motion.li
                                  key={bi}
                                  initial={{ opacity: 0, x: -6 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: bi * 0.05 }}
                                  className="flex gap-2.5 text-xs text-plum-500 leading-relaxed"
                                >
                                  <span className="text-blush-300 font-black mt-px flex-shrink-0">→</span>
                                  {bullet}
                                </motion.li>
                              ))}
                            </ul>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Skills — Cargo Manifest */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={fadeUp}
          className="mb-14"
        >
          <div className="flex items-center gap-2 mb-4">
            <h2 className="text-sm font-bold text-plum-700">Cargo Manifest</h2>
            <div className="flex-1 h-px bg-blush-100" />
            <span className="text-[11px] text-plum-300 font-medium">Skills</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {Object.entries(SKILLS).map(([category, skills]) => (
              <div key={category} className="bg-white rounded-2xl p-5 shadow-card border border-blush-100">
                <div className="text-[9px] font-black uppercase tracking-[0.2em] text-blush-400 mb-3">{category}</div>
                <div className="flex flex-wrap gap-1.5">
                  {skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-[11px] bg-blush-50 text-plum-600 font-medium px-2.5 py-1 rounded-full border border-blush-100"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Education — Clearances */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={fadeUp}
          className="mb-10"
        >
          <div className="flex items-center gap-2 mb-4">
            <h2 className="text-sm font-bold text-plum-700">Clearances</h2>
            <div className="flex-1 h-px bg-blush-100" />
            <span className="text-[11px] text-plum-300 font-medium">Education</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {EDUCATION.map(({ degree, school, code, logo }) => (
              <div
                key={code}
                className="bg-white rounded-2xl p-5 shadow-card border border-blush-100 flex items-center gap-4"
              >
                <div className="w-16 h-12 rounded-xl bg-white border border-blush-100 flex items-center justify-center flex-shrink-0 p-2">
                  <img src={logo} alt={school} className="w-full h-full object-contain" />
                </div>
                <div>
                  <div className="font-bold text-plum-900 text-sm">{degree}</div>
                  <div className="text-xs text-plum-400 mt-0.5">{school}</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Footer */}
        <div className="pt-6 border-t border-blush-100 flex flex-col items-center gap-3">
          <div className="relative w-14 h-14 rounded-full overflow-hidden ring-2 ring-blush-200 shadow-soft">
            <img src="/stitch.jpeg" alt="Stitch" className="w-full h-full object-cover" />
          </div>
          <p className="text-[10px] text-plum-300 font-medium">
            Co-piloted by Stitch · Courtney Ko · San Francisco, CA · 2026
          </p>
        </div>

      </main>
    </div>
  );
}
