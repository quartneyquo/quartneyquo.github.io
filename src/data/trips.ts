import { Trip } from '@/types';

export const trips: Trip[] = [
  {
    id: 'now',
    title: 'Now',
    subtitle: 'Current focus, active experiments, life in motion',
    dateRange: 'Spring 2026',
    coverImage: '/nowplaying.jpeg',
    themeColor: '#B9A6FF',
    description:
      'A living snapshot of what Courtney is building, learning, exploring, and living right now.',
    stats: [
      { label: 'Role', value: 'COO' },
      { label: 'Company', value: 'AI Valley' },
      { label: 'City', value: 'SF' },
      { label: 'Status', value: '✈ In flight' },
    ],
    days: [
      {
        id: 'building',
        title: 'What I\'m Building',
        dateLabel: 'Active',
        stops: [
          {
            id: 'ai-valley',
            title: 'AI Valley',
            locationLabel: 'San Francisco, CA',
            tag: 'Community',
            timeLabel: 'Full-time',
            blurb: 'Serving as COO of AI Valley — a global community for exceptional AI builders.',
            content: [
              {
                type: 'text',
                title: 'The Role',
                text: 'As COO I oversee operations, event programming, partnerships, and community experience. Every week looks different — from running hackathons to signing sponsors to onboarding new city leads.',
              },
              {
                type: 'bullets',
                title: 'Current Focus Areas',
                items: [
                  'Scaling hackathon program to new cities',
                  'Deepening NVIDIA and enterprise partnerships',
                  'Building AI-native community infrastructure',
                  'Growing Women in Tech initiative',
                ],
              },
              {
                type: 'metrics',
                title: 'Community Stats',
                items: [
                  { label: 'Members', value: '5000+' },
                  { label: 'Events', value: '20+' },
                  { label: 'Cities', value: '3+' },
                  { label: 'Hackathons', value: '10+' },
                ],
              },
            ],
          },
          {
            id: 'nvidia',
            title: 'NVIDIA',
            locationLabel: 'San Jose, CA',
            tag: 'Work',
            timeLabel: 'Current',
            blurb: 'Working at NVIDIA — front-row seat to how the world\'s most important AI company operates at scale.',
            content: [
              {
                type: 'text',
                title: 'Role',
                text: 'Operating at NVIDIA with deep exposure to AI infrastructure, developer ecosystems, and enterprise AI adoption. Day-to-day involves understanding how compute, tooling, and community intersect at the frontier of AI.',
              },
              {
                type: 'bullets',
                title: 'Areas of Exposure',
                items: [
                  'GPU infrastructure and compute orchestration',
                  'AI developer tooling, SDKs, and DGX systems',
                  'Enterprise AI adoption and deployment patterns',
                  'LLM pipelines and agentic system design',
                  'Ecosystem partnerships and developer relations',
                ],
              },
              {
                type: 'bullets',
                title: 'Key Takeaways',
                items: [
                  'Infrastructure is unsexy but everything depends on it',
                  'The best AI products solve deeply specific, painful problems',
                  'Community and ecosystem are the most durable competitive moats',
                ],
              },
            ],
          },
          {
            id: 'wip-community',
            title: 'WIP – Women in PM',
            locationLabel: 'Global (Remote)',
            tag: 'Community',
            timeLabel: 'Mar 2025 – Present',
            blurb: 'Launched and scaled a global support community for women Product Managers — 150+ members in one week.',
            content: [
              {
                type: 'text',
                title: 'What It Is',
                text: 'WIP (Work in Progress) is a global network for women PMs to share resources, mentorship, and real talk about the industry. Built to be a high-signal, low-noise space — real conversations, real support.',
              },
              {
                type: 'metrics',
                title: 'Traction',
                items: [
                  { label: 'Members', value: '150+' },
                  { label: 'Time to Scale', value: '1 week' },
                  { label: 'Scope', value: 'Global' },
                  { label: 'Focus', value: 'Women PMs' },
                ],
              },
              {
                type: 'bullets',
                title: 'What We Do',
                items: [
                  'Peer mentorship and career support',
                  'PM interview prep and resume reviews',
                  'Resource sharing across stages and industries',
                  'Community calls and virtual meetups',
                ],
              },
            ],
          },
          {
            id: 'pearle-now',
            title: 'Pearle',
            tag: 'Product',
            timeLabel: 'Building',
            blurb: 'AI-powered personal finance companion. Making financial clarity feel effortless.',
            content: [
              {
                type: 'text',
                title: 'What It Is',
                text: 'Pearle is a conversational AI layer on top of your finances. Ask it anything: "Can I afford this trip?" or "Why am I overspending?" — it gives honest, contextual answers.',
              },
              {
                type: 'bullets',
                title: 'Current Status',
                items: [
                  'Early prototype stage',
                  'Exploring Plaid integration for real bank data',
                  'Testing LLM prompting for financial context',
                ],
              },
            ],
          },
        ],
      },
      {
        id: 'learning',
        title: 'What I\'m Learning',
        dateLabel: 'Ongoing',
        stops: [
          {
            id: 'learning-ai',
            title: 'AI & LLMs',
            tag: 'Study',
            timeLabel: 'Daily',
            blurb: 'Deep-diving into reasoning models, agents, and what comes after the current wave.',
            content: [
              {
                type: 'bullets',
                title: 'Topics',
                items: [
                  'Reasoning models and chain-of-thought',
                  'Multi-agent orchestration and tool use',
                  'Fine-tuning vs prompting vs RAG',
                  'AI safety fundamentals',
                  'On-device and edge AI',
                ],
              },
            ],
          },
          {
            id: 'learning-devtools',
            title: 'Developer Tools',
            tag: 'Study',
            timeLabel: 'Weekly',
            blurb: 'Getting hands-on with the tools builders use to ship faster with AI assistance.',
            content: [
              {
                type: 'bullets',
                title: 'Stack',
                items: [
                  'Next.js App Router and React Server Components',
                  'Cursor AI and AI-assisted development',
                  'Vercel ecosystem and edge functions',
                  'v0 for rapid UI prototyping',
                ],
              },
            ],
          },
          {
            id: 'learning-community',
            title: 'Community Building',
            tag: 'Study',
            blurb: 'Research into what makes communities sticky, scalable, and worth belonging to.',
            content: [
              {
                type: 'bullets',
                title: 'Areas',
                items: [
                  'Online-to-offline community flywheels',
                  'Event-driven growth models',
                  'Building high-retention technical communities',
                  'Community as a startup moat',
                ],
              },
            ],
          },
          {
            id: 'learning-product',
            title: 'Product Growth',
            tag: 'Study',
            blurb: 'PLG, zero-to-one for AI products, and how community becomes a growth channel.',
            content: [
              {
                type: 'bullets',
                title: 'Focus',
                items: [
                  'Product-led growth (PLG) strategies',
                  'Zero-to-one for AI products',
                  'Turning community into distribution',
                  'Retention and habit formation',
                ],
              },
            ],
          },
        ],
      },
      {
        id: 'background',
        title: 'Background',
        dateLabel: 'Education & Credentials',
        stops: [
          {
            id: 'ucsd',
            title: 'UC San Diego',
            locationLabel: 'La Jolla, CA',
            tag: 'Study',
            timeLabel: '2018 – 2020',
            blurb: 'Graduated with distinction. Studied cognitive science, data science, and UX research.',
            content: [
              {
                type: 'bullets',
                title: 'Coursework',
                items: [
                  'Cognitive Neuroscience and Research Methods',
                  'Data Science and MATLAB',
                  'UX Principles and Human-Computer Interaction',
                  'JavaScript, HTML/CSS',
                ],
              },
              {
                type: 'text',
                title: 'Foundation',
                text: 'UCSD gave me the research mindset — how to ask the right questions, validate hypotheses, and build things grounded in how people actually think and behave.',
              },
            ],
          },
          {
            id: 'wells-fargo',
            title: 'Wells Fargo',
            locationLabel: 'San Francisco, CA',
            tag: 'Work',
            timeLabel: 'Prior',
            blurb: 'User Experience Project Manager on the Wells Fargo Developer Portal — led a designer team through a full portal rebranding initiative.',
            content: [
              {
                type: 'text',
                title: 'Role',
                text: 'UX PM on the Developer Portal team. Led a cross-functional group of designers on a full rebranding of the portal — aligning design direction, managing stakeholders, and shipping a cohesive new experience.',
              },
              {
                type: 'bullets',
                title: 'What I Did',
                items: [
                  'Led designer team on portal rebranding initiative',
                  'Managed cross-functional stakeholders across design, engineering, and product',
                  'Drove qualitative and quantitative research to inform design decisions',
                  'Delivered a cohesive design system and updated visual language for the portal',
                ],
              },
            ],
          },
          {
            id: 'tipbrightly-work',
            title: 'TipBrightly',
            locationLabel: 'San Francisco, CA',
            tag: 'Work',
            timeLabel: 'Prior',
            blurb: 'Founding Product Manager at TipBrightly — a digital tipping platform for service workers.',
            content: [
              {
                type: 'text',
                title: 'Role',
                text: 'Led product for TipBrightly — conducting user research with service workers, redesigning the full tipping flow, and shipping a polished v2 with engineering.',
              },
              {
                type: 'bullets',
                title: 'What I Did',
                items: [
                  'Full UX audit and service worker interviews',
                  'Redesigned onboarding from 7 steps to 3',
                  'New tip receipt UI with instant feedback',
                  'Earnings dashboard redesign',
                ],
              },
              {
                type: 'metrics',
                title: 'Impact',
                items: [
                  { label: 'Conversion', value: '+40%' },
                  { label: 'Drop-off', value: '-60%' },
                  { label: 'Satisfaction', value: '4.7/5' },
                  { label: 'Users', value: '1k+' },
                ],
              },
            ],
          },
          {
            id: 'skills',
            title: 'Skills & Languages',
            tag: 'Personal',
            blurb: 'UX research, product management, community building — with a multilingual twist.',
            content: [
              {
                type: 'bullets',
                title: 'Core Skills',
                items: [
                  'Product Management and Roadmapping',
                  'UX Research and User Interviews',
                  'Community Building and Event Programming',
                  'AI Product Strategy',
                  'Data Analysis and SQL',
                ],
              },
              {
                type: 'bullets',
                title: 'Languages',
                items: [
                  'Cantonese — Professional working proficiency',
                  'Mandarin — Limited working proficiency',
                  'English — Native',
                ],
              },
            ],
          },
        ],
      },
      {
        id: 'exploring',
        title: 'What I\'m Exploring',
        dateLabel: 'Experimenting',
        stops: [
          {
            id: 'agents',
            title: 'Agentic Workflows',
            tag: 'Experiment',
            blurb: 'Building and testing multi-agent systems that can plan, reason, and execute.',
            content: [
              {
                type: 'bullets',
                title: 'Experiments',
                items: [
                  'Autonomous event operations agent',
                  'Research synthesis agents',
                  'Claude + GPT-4o orchestration',
                  'Agentic code review pipelines',
                ],
              },
            ],
          },
          {
            id: 'voice-ui',
            title: 'Voice UI & Ambient Computing',
            tag: 'Experiment',
            blurb: 'Exploring what interfaces look like when they move beyond the screen.',
            content: [
              {
                type: 'text',
                title: 'The Question',
                text: 'What happens when AI can hear you, see you, and act on your behalf — without you touching a keyboard? That future is closer than it looks.',
              },
            ],
          },
        ],
      },
      {
        id: 'life',
        title: 'Life Lately',
        dateLabel: 'Right now',
        stops: [
          {
            id: 'sf-life',
            title: 'San Francisco',
            locationLabel: 'SF, CA',
            tag: 'Personal',
            blurb: 'Home base. The city of builders, fog, and boba.',
            content: [
              {
                type: 'bullets',
                title: 'Lately',
                items: [
                  'GTC 2026 — San Jose',
                  'AI Valley events every few weeks',
                  'Exploring new neighborhoods with Stitch',
                  'Karaoke nights with the community',
                ],
              },
            ],
          },
          {
            id: 'stitch-now',
            title: 'Stitch',
            locationLabel: 'Everywhere',
            tag: 'Personal',
            blurb: 'Good dog. Chaotic energy. Main character behavior.',
            content: [
              {
                type: 'text',
                title: 'About Stitch',
                text: 'Named after the Disney character for obvious reasons. Stitch is Courtney\'s dog and is convinced he is the most important attendee at every event. He is not wrong.',
              },
            ],
          },
        ],
      },
    ],
  },

  {
    id: 'ai-valley-events',
    title: 'AI Valley Events',
    subtitle: 'Building the future of AI through community and hackathons',
    dateRange: '2025 – 2026',
    coverImage: '/witpic.jpeg',
    coverImagePosition: 'top',
    themeColor: '#F7A8B8',
    description:
      'Every event AI Valley runs is a bet that the best ideas come from people in a room together.',
    stats: [
      { label: 'Events', value: '20+' },
      { label: 'Builders', value: '5000+' },
      { label: 'Hackathons', value: '10+' },
      { label: 'Cities', value: '3+' },
    ],
    days: [
      {
        id: 'upcoming',
        title: 'Coming Up',
        dateLabel: 'Spring 2026',
        stops: [
          {
            id: 'gtc-mixer-2026',
            title: 'AI Valley GTC Cofounder Mixer',
            timeLabel: 'Mar 17 · 6–9 PM',
            locationLabel: 'San Francisco, CA',
            tag: 'Mixer',
            image: 'https://images.lumacdn.com/cdn-cgi/image/format=auto,fit=cover,dpr=2,anim=false,background=white,quality=75,width=600,height=300/event-covers/hv/fe000cd2-fdd2-48a5-a5cc-34d4cf78bb3e.png',
            blurb: 'An intimate mixer at GTC for AI cofounders, builders, and investors.',
            content: [
              {
                type: 'metrics',
                title: 'Details',
                items: [
                  { label: 'Date', value: 'Mar 17' },
                  { label: 'Time', value: '6–9 PM' },
                  { label: 'Location', value: 'SF' },
                  { label: 'Admission', value: 'Free' },
                ],
              },
              {
                type: 'text',
                title: 'What It Is',
                text: 'GTC is massive — this mixer creates an intimate space for the builders and funders who matter to have real conversations, not conference small talk.',
              },
              {
                type: 'bullets',
                title: 'Organizers',
                items: ['Victor Su-Ortiz', 'Healthy Li', 'Courtney Ko'],
              },
              {
                type: 'links',
                title: 'RSVP',
                items: [{ label: 'Register on Luma →', href: 'https://lu.ma/aivalley' }],
              },
            ],
          },
          {
            id: 'minimax-minihack',
            title: 'MiniMax GTC MiniHack',
            timeLabel: 'Mar 19 · 5:30–8:30 PM',
            locationLabel: 'San Francisco, CA',
            tag: 'Hackathon',
            image: 'https://images.lumacdn.com/cdn-cgi/image/format=auto,fit=cover,dpr=2,anim=false,background=white,quality=75,width=600,height=300/event-covers/yu/2fe6799d-0609-40f6-964a-8134071bf8a0.png',
            blurb: 'A focused 3-hour hack night during GTC week, powered by MiniMax.',
            content: [
              {
                type: 'metrics',
                title: 'Details',
                items: [
                  { label: 'Date', value: 'Mar 19' },
                  { label: 'Time', value: '5:30–8:30 PM' },
                  { label: 'Location', value: 'SF' },
                  { label: 'Admission', value: 'Free' },
                ],
              },
              {
                type: 'text',
                title: 'Format',
                text: 'Show up, pick a goal, build for 2 hours, demo what you shipped. No pressure — maximum momentum.',
              },
              {
                type: 'links',
                title: 'RSVP',
                items: [{ label: 'Register on Luma →', href: 'https://lu.ma/aivalley' }],
              },
            ],
          },
          {
            id: 'forks-frameworks',
            title: 'Forks & Frameworks',
            timeLabel: 'Mar 8 · 11 AM–2 PM',
            locationLabel: 'Toronto, ON',
            tag: 'Community',
            image: 'https://images.lumacdn.com/cdn-cgi/image/format=auto,fit=cover,dpr=2,anim=false,background=white,quality=75,width=600,height=300/event-covers/mc/f4742ac6-deb6-4b8e-b79e-ac9d17a90fc8.png',
            blurb: 'AI Valley comes to Toronto — builders gathering for conversation and collaboration.',
            content: [
              {
                type: 'metrics',
                title: 'Details',
                items: [
                  { label: 'Date', value: 'Mar 8' },
                  { label: 'Time', value: '11 AM–2 PM' },
                  { label: 'Location', value: 'Toronto' },
                  { label: 'Admission', value: 'Free' },
                ],
              },
              {
                type: 'bullets',
                title: 'Organizers',
                items: ['Victor Su-Ortiz', 'Sineha Manivannan', 'Sahand Sojoodi'],
              },
            ],
          },
        ],
      },
      {
        id: 'past',
        title: 'Past Highlights',
        dateLabel: '2024',
        stops: [
          {
            id: 'wit-hackathon',
            title: 'Women in Tech Hackathon',
            tag: 'Hackathon',
            timeLabel: '2024',
            locationLabel: 'San Francisco, CA',
            blurb: 'A 48-hour hackathon celebrating and amplifying women builders in AI.',
            content: [
              {
                type: 'text',
                title: 'Overview',
                text: 'A 48-hour hackathon focused on empowering women in tech to build AI-powered products, supported by mentors, workshops, and sponsors.',
              },
              {
                type: 'metrics',
                title: 'Impact',
                items: [
                  { label: 'Participants', value: '80+' },
                  { label: 'Teams', value: '20+' },
                  { label: 'Projects', value: '20+' },
                  { label: 'Mentors', value: '15+' },
                ],
              },
              {
                type: 'bullets',
                title: 'Projects Built',
                items: [
                  'AI health companion for elderly care',
                  'Multilingual education chatbot',
                  'AI resume builder for career changers',
                  'Mental health check-in tool',
                ],
              },
            ],
          },
          {
            id: 'return-of-agents',
            title: 'Return of the Agents',
            tag: 'Hackathon',
            timeLabel: '2024',
            locationLabel: 'San Francisco, CA',
            blurb: 'AI Valley\'s flagship agentic AI hackathon — autonomous systems only.',
            content: [
              {
                type: 'text',
                title: 'Focus',
                text: 'Build agentic AI systems that can plan, reason, and execute multi-step tasks. No basic chatbots allowed.',
              },
              {
                type: 'bullets',
                title: 'Winning Teams',
                items: [
                  '1st: Multi-agent code review system',
                  '2nd: Autonomous research synthesizer',
                  '3rd: AI-powered event operations agent',
                ],
              },
            ],
          },
          {
            id: 'founder-dinners',
            title: 'Founder Dinners',
            tag: 'Community',
            timeLabel: 'Ongoing',
            locationLabel: 'San Francisco, CA',
            blurb: 'Curated intimate dinners for AI founders and investors. No pitching — just real talk.',
            content: [
              {
                type: 'text',
                title: 'Format',
                text: 'Typically 12–20 people. Private residences or boutique venues. Curated guest lists for high signal-to-noise ratio.',
              },
              {
                type: 'bullets',
                title: 'Topics',
                items: [
                  'What it\'s actually like to build an AI company',
                  'Fundraising realities in 2024–2025',
                  'Distribution: the hardest problem in AI',
                  'Community as a startup growth strategy',
                ],
              },
            ],
          },
          {
            id: 'mini-hack-nights',
            title: 'Mini Hack Nights',
            tag: 'Builder Event',
            timeLabel: 'Weekly',
            locationLabel: 'San Francisco, CA',
            blurb: '3-hour building sessions where builders come to ship something small and meet collaborators.',
            content: [
              {
                type: 'text',
                title: 'Format',
                text: 'Show up with a goal, build for 2 hours, demo what you made. No pressure, maximum momentum.',
              },
              {
                type: 'bullets',
                title: 'What Gets Built',
                items: [
                  'LLM-powered CLI tools',
                  'AI browser extensions',
                  'Automations with Make + AI',
                  'Tiny games built with AI assistance',
                ],
              },
            ],
          },
        ],
      },
    ],
  },

  {
    id: 'projects',
    title: 'Projects',
    subtitle: 'Products designed, built, and shipped — from 0 to 1',
    dateRange: '2019 – Present',
    coverImage: '/projects.png',
    coverImagePosition: 'top',
    themeColor: '#B9A6FF',
    description: 'Case studies from Courtney\'s work designing and shipping real products across fintech, consumer, and AI.',
    stats: [
      { label: 'Projects', value: '7+' },
      { label: 'Roles', value: 'UX + PM' },
      { label: 'Users', value: '7,000%↑' },
      { label: 'Focus', value: 'Human-first' },
    ],
    days: [
      {
        id: 'portfolio',
        title: 'Product Case Studies',
        stops: [
          {
            id: 'pearle',
            title: 'Pearle',
            tag: 'AI Product',
            timeLabel: '2025',
            blurb: 'An AI-powered personal finance companion that makes financial clarity feel effortless.',
            content: [
              {
                type: 'text',
                title: 'The Problem',
                text: 'Finance apps are either too complex (Mint, YNAB) or too passive (banking apps). People need a smart companion that understands their goals and talks to them like a human.',
              },
              {
                type: 'text',
                title: 'The Idea',
                text: 'A conversational AI layer on top of your finances. Ask it anything: "Can I afford this trip?" or "Why am I overspending on food?" — honest, contextual answers.',
              },
              {
                type: 'bullets',
                title: 'Technology',
                items: [
                  'LLM-powered natural language interface',
                  'Plaid integration for live bank data',
                  'Contextual memory of spending patterns',
                  'Proactive nudges and insights',
                ],
              },
              {
                type: 'metrics',
                title: 'Status',
                items: [
                  { label: 'Stage', value: 'Prototype' },
                  { label: 'Role', value: 'Founder' },
                  { label: 'Stack', value: 'Next.js' },
                  { label: 'Status', value: 'Active' },
                ],
              },
            ],
          },
          {
            id: 'pacaplate',
            title: 'PacaPlate',
            tag: 'App',
            timeLabel: '2026',
            blurb: 'Meal planning app with a lovable alpaca mascot (Paca) that makes planning actually fun.',
            content: [
              {
                type: 'text',
                title: 'The Goal',
                text: 'Remove the weekly dread of "what should I eat?" with an app that feels playful and helpful, not like another task manager.',
              },
              {
                type: 'text',
                title: 'Mascot Concept',
                text: 'Paca is your cheerful companion. He celebrates your wins, suggests recipes based on what\'s in your fridge, and keeps the experience light. Think Duolingo for meal planning.',
              },
              {
                type: 'bullets',
                title: 'Tech Stack',
                items: [
                  'React Native (iOS + Android)',
                  'AI recipe suggestions via LLM',
                  'Grocery list auto-generation',
                  'Nutritional context without obsession',
                ],
              },
            ],
          },
          {
            id: 'tipbrightly',
            title: 'TipBrightly',
            tag: 'Startup',
            timeLabel: '2020',
            blurb: 'Digital tipping platform for service workers. QR-code tipping that works anywhere.',
            content: [
              {
                type: 'text',
                title: 'The Problem',
                text: 'Cashless payments decimated tipping for service workers. People want to tip but have no cash. TipBrightly bridges the gap with QR-code tipping that works anywhere.',
              },
              {
                type: 'text',
                title: 'Role',
                text: 'UX Designer & Product Manager — led user research with service workers, redesigned the full tipping flow end-to-end, and shipped a polished v2 with engineering.',
              },
              {
                type: 'bullets',
                title: 'Redesign Work',
                items: [
                  'Full UX audit and service worker interviews',
                  'Onboarding reduced from 7 steps → 3',
                  'New tip receipt UI with instant feedback',
                  'Earnings dashboard redesign',
                ],
              },
              {
                type: 'metrics',
                title: 'Impact',
                items: [
                  { label: 'User Growth', value: '7,000%' },
                  { label: 'Conversion', value: '+40%' },
                  { label: 'Drop-off', value: '-60%' },
                  { label: 'Satisfaction', value: '4.7/5' },
                ],
              },
              {
                type: 'links',
                title: 'Links',
                items: [{ label: 'Visit TipBrightly →', href: 'https://tipbrightly.com' }],
              },
            ],
          },
        ],
      },
      {
        id: 'ux-research',
        title: 'UX Research & Design',
        dateLabel: '2019 – 2022',
        stops: [
          {
            id: 'soundcloud',
            title: 'SoundCloud',
            tag: 'Product',
            timeLabel: '2021',
            blurb: 'UX design and research case study — reimagining the music discovery and listening experience.',
            content: [
              {
                type: 'text',
                title: 'The Project',
                text: 'A deep-dive UX case study redesigning SoundCloud\'s core interface — improving music discovery, social features, and creator tools through user research and iterative design.',
              },
              {
                type: 'bullets',
                title: 'Process',
                items: [
                  'User interviews and listening session observations',
                  'Competitive analysis across streaming platforms',
                  'Wireframes and interactive prototypes',
                  'Usability testing and design iteration',
                ],
              },
            ],
          },
          {
            id: 'depression-apps',
            title: 'Depression Apps in India',
            tag: 'Study',
            timeLabel: '2020',
            blurb: 'UX research and wireframe design for a mental health app tailored to users in India — published in a scientific journal.',
            content: [
              {
                type: 'text',
                title: 'The Project',
                text: 'Research-driven UX design for a mental health application addressing depression in the Indian context. Grounded in user research, cultural sensitivity, and accessibility — the work was published in a scientific journal.',
              },
              {
                type: 'bullets',
                title: 'Contributions',
                items: [
                  'Qualitative user research across diverse demographics',
                  'Culturally sensitive UX design and wireframes',
                  'Published findings in a scientific journal',
                  'Focus on accessibility and low-bandwidth environments',
                ],
              },
            ],
          },
          {
            id: 'investment-app',
            title: 'Investment Portfolio App',
            tag: 'Product',
            timeLabel: '2020',
            blurb: 'UX design for a first-time investor app combining financial education with social elements.',
            content: [
              {
                type: 'text',
                title: 'The Problem',
                text: 'Investing feels inaccessible and intimidating for first-timers. This app concept combines education, community, and portfolio tools to make investing approachable for beginners.',
              },
              {
                type: 'bullets',
                title: 'Design Features',
                items: [
                  'Educational modules embedded in the investment flow',
                  'Social feed for sharing portfolio milestones',
                  'Simplified onboarding for zero-experience investors',
                  'Risk tolerance quiz and personalized recommendations',
                ],
              },
            ],
          },
          {
            id: 'humanity-for-yang',
            title: 'Humanity for Yang',
            tag: 'Community',
            timeLabel: '2019',
            blurb: 'Volunteer UX design for the Yang2020 presidential campaign — built the outreach website for grassroots supporters.',
            content: [
              {
                type: 'text',
                title: 'The Project',
                text: 'Designed and built the volunteer outreach website for Humanity for Yang, a grassroots organizing arm of the Yang2020 presidential campaign. Focus on clear calls to action and mobilizing volunteer sign-ups.',
              },
              {
                type: 'bullets',
                title: 'Scope',
                items: [
                  'End-to-end UX design and frontend build',
                  'Volunteer sign-up and event RSVP flows',
                  'Responsive design for mobile-first activists',
                  'Coordinated with campaign communications team',
                ],
              },
            ],
          },
        ],
      },
    ],
  },

  {
    id: 'hobbies',
    title: 'Hobbies',
    subtitle: 'Life outside the laptop',
    dateRange: 'Always',
    coverImage: '/hobby.jpeg',
    themeColor: '#F7A8B8',
    description: 'The things that recharge Courtney and remind her why building a good life matters.',
    stats: [
      { label: 'Countries', value: '20+' },
      { label: 'Karaoke', value: 'Expert' },
      { label: 'Dog', value: 'Stitch' },
      { label: 'Bakes', value: 'Often' },
    ],
    days: [
      {
        id: 'adventures',
        title: 'Wanderlust',
        stops: [
          {
            id: 'travel',
            title: 'Travel',
            tag: 'Adventure',
            locationLabel: 'Worldwide',
            blurb: 'Collecting experiences across time zones. Travel sharpens perspective more than almost anything.',
            content: [
              {
                type: 'bullets',
                title: 'Countries Lived In',
                items: [
                  'United States — San Francisco (current)',
                  'Italy — study abroad',
                  'Korea — career break',
                ],
              },
              {
                type: 'bullets',
                title: 'Favorite Destinations',
                items: [
                  'Tokyo, Japan — organization meets beauty',
                  'Taipei, Taiwan — night markets and warmth',
                  'New York City — relentless energy',
                  'Hong Kong — feels like home',
                ],
              },
              {
                type: 'bullets',
                title: 'On the List',
                items: ['Hong Kong — planning 2026 return', 'Portugal', 'More of Southeast Asia'],
              },
            ],
          },
        ],
      },
      {
        id: 'sound-flavor',
        title: 'Sound & Flavor',
        stops: [
          {
            id: 'music',
            title: 'Music & Karaoke',
            tag: 'Joy',
            blurb: 'Karaoke is a sacred ritual. If there\'s a microphone, Courtney is probably considering grabbing it.',
            content: [
              {
                type: 'text',
                title: 'Karaoke',
                text: 'A regular at SF karaoke spots and considers it the ultimate team-building activity. No filter, full commitment.',
              },
              {
                type: 'bullets',
                title: 'Favorite Artists',
                items: ['Laufey'],
              },
            ],
          },
          {
            id: 'baking',
            title: 'Baking',
            tag: 'Creative',
            blurb: 'Creative meditation that ends with something delicious. The kitchen is where screens go to die.',
            content: [
              {
                type: 'bullets',
                title: 'Favorites to Bake',
                items: [
                  'Matcha mochi cake',
                  'Brown butter chocolate chip cookies',
                  'Homemade focaccia',
                  'Japanese milk bread (shokupan)',
                  'Seasonal fruit tarts',
                ],
              },
              {
                type: 'bullets',
                title: 'Experiments',
                items: [
                  'Sourdough starter (currently alive)',
                  'Croissants — attempted, journey ongoing',
                  'Mochi donut variations',
                  'Asian flavors + Western pastry techniques',
                ],
              },
            ],
          },
        ],
      },
      {
        id: 'pure-love',
        title: 'Pure Love',
        stops: [
          {
            id: 'dogs',
            title: 'Dogs & Stitch',
            tag: 'Love',
            locationLabel: 'SF, CA',
            blurb: 'Stitch is a good dog. Probably the best dog.',
            content: [
              {
                type: 'text',
                title: 'Stitch',
                text: 'Named after the Disney character for obvious reasons. Chaotic, loving, and absolutely convinced he is the main character of every situation.',
              },
              {
                type: 'bullets',
                title: 'Life with Stitch',
                items: [
                  'Morning walks are non-negotiable',
                  'Stitch attends AI Valley events occasionally',
                  'Dog parks as networking events',
                  'Convinced dogs are the best judges of character',
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];
