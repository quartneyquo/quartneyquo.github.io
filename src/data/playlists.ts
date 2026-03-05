import { Playlist } from '@/types';

export const playlists: Playlist[] = [
  {
    id: 'now-playing',
    title: 'Now Playing',
    description: "What Courtney is currently building, exploring, and working on.",
    coverGradient: ['#7c3aed', '#c084fc'],
    tracks: [
      {
        id: 'ai-valley',
        title: 'AI Valley',
        type: 'Community',
        year: 2024,
        description:
          'AI Valley is a global builder community bringing together founders, engineers, and creatives pushing the frontier of AI. As COO, Courtney oversees operations, events, and community growth.',
        contentSections: [
          {
            title: 'Role',
            text: 'Chief Operating Officer — responsible for operations, events, partnerships, and community experience.',
          },
          {
            title: 'Mission',
            text: 'Build the most impactful global AI builder community — a place where the next wave of AI companies, tools, and ideas is born.',
          },
          {
            title: 'Community Stats',
            stats: [
              { label: 'Members', value: '500+' },
              { label: 'Events Hosted', value: '10+' },
              { label: 'Cities', value: '3+' },
              { label: 'Hackathons', value: '4' },
            ],
          },
          {
            title: 'Upcoming Focus',
            items: [
              'Scaling hackathon program to new cities',
              'Deepening NVIDIA and enterprise partnerships',
              'Growing the Women in Tech initiative',
              'Building an AI-native community platform',
            ],
          },
        ],
      },
      {
        id: 'nvidia',
        title: 'NVIDIA',
        type: 'Work',
        year: 2024,
        description:
          "Working in orbit of NVIDIA's AI infrastructure ecosystem — gaining deep exposure to what it takes to build and deploy AI at scale.",
        contentSections: [
          {
            title: 'Current Role',
            text: 'Working at the intersection of AI infrastructure, developer relations, and ecosystem building within the NVIDIA orbit.',
          },
          {
            title: 'Exposure to AI Infrastructure',
            items: [
              'GPU clusters and compute orchestration',
              'LLM deployment pipelines',
              'AI developer tooling and SDKs',
              'Enterprise AI adoption patterns',
            ],
          },
          {
            title: 'Key Learnings',
            items: [
              'Infrastructure is the unsexy but critical layer underneath all AI',
              'The best AI products solve deeply specific problems',
              'Community and ecosystem are unfair competitive advantages',
              'Speed of iteration beats polish in early-stage AI products',
            ],
          },
        ],
      },
      {
        id: 'building-mode',
        title: 'Building Mode',
        type: 'Projects',
        year: 2025,
        description:
          "Always in some state of building. Current experiments span AI products, developer tools, and community infrastructure.",
        contentSections: [
          {
            title: 'Current Experiments',
            items: [
              'AI-native community platform for AI Valley',
              'Personal knowledge management with LLMs',
              'Automating event operations with agents',
            ],
          },
          {
            title: 'Product Prototypes',
            items: [
              'Pearle — AI-powered personal finance companion',
              'PacaPlate — meal planning app with alpaca mascot',
              'Internal tools for hackathon judging',
            ],
          },
          {
            title: 'Things Being Explored',
            items: [
              'Agentic workflows with Claude and GPT-4o',
              'Vibe coding with Cursor and v0',
              'Voice UI and ambient computing',
              'On-device AI for mobile',
            ],
          },
        ],
      },
      {
        id: 'learning-queue',
        title: 'Learning Queue',
        type: 'Curiosity',
        year: 2025,
        description:
          "Courtney's active learning stack — topics being read, watched, and experimented with right now.",
        contentSections: [
          {
            title: 'AI',
            items: [
              'Reasoning models and chain-of-thought',
              'Multi-agent systems and orchestration',
              'Fine-tuning vs. prompting vs. RAG',
              'AI safety and alignment basics',
            ],
          },
          {
            title: 'Developer Tools',
            items: [
              'Next.js App Router and React Server Components',
              'Cursor AI and AI-assisted development',
              'Vercel ecosystem and edge functions',
            ],
          },
          {
            title: 'Community Building',
            items: [
              'Online-to-offline community flywheels',
              'Event-driven growth models',
              'Building high-retention technical communities',
            ],
          },
          {
            title: 'Product Growth',
            items: [
              'PLG (product-led growth) strategies',
              'Zero-to-one for AI products',
              'Community as a growth channel',
            ],
          },
        ],
      },
      {
        id: 'life-lately',
        title: 'Life Lately',
        type: 'Personal',
        year: 2025,
        description:
          "What's going on outside of the work — travels, events attended, things bringing joy.",
        contentSections: [
          {
            title: 'Travel',
            items: [
              'San Francisco, CA — home base',
              'GTC 2025 — San Jose',
              'Exploring more of Japan for 2025',
            ],
          },
          {
            title: 'Events',
            items: [
              'GTC 2025 — NVIDIA\'s annual AI conference',
              'AI Valley Founder Dinners',
              'Local SF tech gatherings',
            ],
          },
          {
            title: 'Inspiration',
            items: [
              'Talking to builders who are 3 steps ahead',
              'Reading about companies that turned community into a moat',
              'Stitch (the dog) being chaotic good',
            ],
          },
        ],
      },
    ],
  },

  {
    id: 'ai-valley-events',
    title: 'AI Valley Events',
    description: 'Building the future of AI through community and hackathons.',
    coverGradient: ['#0ea5e9', '#06b6d4'],
    tracks: [
      {
        id: 'women-in-tech-hackathon',
        title: 'Women in Tech Hackathon',
        type: 'Hackathon',
        year: 2024,
        description:
          'A dedicated hackathon celebrating and amplifying women builders in AI. Participants shipped real products in 48 hours, supported by mentors and sponsors.',
        contentSections: [
          {
            title: 'Overview',
            text: 'A 48-hour hackathon focused on empowering women in tech to build AI-powered products, with mentorship, workshops, and prizes.',
          },
          {
            title: 'Theme',
            text: 'Build AI products that solve real problems for underserved communities and everyday people.',
          },
          {
            title: 'Sponsors',
            items: [
              'NVIDIA',
              'Local SF tech companies',
              'AI-focused VCs',
            ],
          },
          {
            title: 'Participants',
            stats: [
              { label: 'Participants', value: '80+' },
              { label: 'Teams', value: '20+' },
              { label: 'Projects Built', value: '20+' },
              { label: 'Mentors', value: '15+' },
            ],
          },
          {
            title: 'Projects Built',
            items: [
              'AI health companion for elderly care',
              'Multilingual education chatbot',
              'AI-powered resume builder for career changers',
              'Mental health check-in tool',
            ],
          },
          {
            title: 'Impact',
            items: [
              'Several projects continued post-hackathon',
              'Connected women builders with investors',
              'Inspired follow-on events in other cities',
            ],
          },
        ],
      },
      {
        id: 'return-of-the-agents',
        title: 'Return of the Agents',
        type: 'AI Hackathon',
        year: 2024,
        description:
          'AI Valley\'s flagship agentic AI hackathon — focused entirely on multi-agent systems, autonomous workflows, and the next wave of AI applications.',
        contentSections: [
          {
            title: 'Focus',
            text: 'Build agentic AI systems — autonomous agents that can plan, reason, and execute multi-step tasks. No basic chatbots allowed.',
          },
          {
            title: 'Partners',
            items: [
              'NVIDIA (compute credits)',
              'Anthropic (API access)',
              'LangChain (tooling)',
              'Local SF VC firms',
            ],
          },
          {
            title: 'Winning Teams',
            items: [
              '1st: Multi-agent code review system',
              '2nd: Autonomous research synthesizer',
              '3rd: AI-powered event operations agent',
            ],
          },
          {
            title: 'Highlights',
            items: [
              'Keynote on the state of agentic AI',
              'Live demo of Claude agents in production',
              'Panel: "Will agents replace SaaS?"',
              'Several teams pursuing YC after the event',
            ],
          },
        ],
      },
      {
        id: 'gtc-mixer',
        title: 'AI Valley GTC Mixer',
        type: 'Founder Event',
        year: 2025,
        description:
          'A curated evening mixer at NVIDIA GTC — bringing together AI founders, researchers, and investors in one room during the biggest AI conference of the year.',
        contentSections: [
          {
            title: 'Purpose',
            text: 'Cut through the conference noise. GTC is enormous — the mixer creates an intimate space for real conversations between the builders and funders who matter.',
          },
          {
            title: 'Attendees',
            items: [
              'AI startup founders',
              'NVIDIA ecosystem partners',
              'AI-focused VCs and angels',
              'Enterprise AI decision-makers',
              'AI researchers and engineers',
            ],
          },
          {
            title: 'Key Conversations',
            items: [
              'Where is compute heading in 2025-2026?',
              'The infrastructure layer that\'s still missing',
              'Enterprise AI adoption — the real blockers',
              'Who\'s winning in vertical AI?',
            ],
          },
        ],
      },
      {
        id: 'founder-dinners',
        title: 'Founder Dinners',
        type: 'Community',
        year: 2024,
        description:
          'Intimate dinners bringing together AI founders and investors for candid, off-the-record conversations. No pitching — just real talk.',
        contentSections: [
          {
            title: 'Curated Gatherings',
            text: 'Typically 12-20 people. Hosted at private residences or boutique venues. Curated guest lists ensure high signal-to-noise ratio.',
          },
          {
            title: 'Founder + Investor Conversations',
            items: [
              'What it\'s actually like to build an AI company right now',
              'Fundraising realities in 2024-2025',
              'Distribution: the hardest problem in AI',
              'How to build a team around AI products',
              'Community as a startup growth strategy',
            ],
          },
        ],
      },
      {
        id: 'mini-hack-nights',
        title: 'Mini Hack Nights',
        type: 'Builder Event',
        year: 2024,
        description:
          'Weekly 3-hour building sessions where builders come to make progress on their projects, meet collaborators, and ship something small.',
        contentSections: [
          {
            title: 'Format',
            text: 'Show up, pick a goal for the night, build for 2 hours, demo what you built. No pressure, maximum momentum.',
          },
          {
            title: 'Rapid Experiments',
            items: [
              'LLM-powered CLI tools',
              'AI browser extensions',
              'Automations with Make/Zapier + AI',
              'Tiny games built with AI assistance',
            ],
          },
          {
            title: 'Community Collaboration',
            items: [
              'Pair programming and skill sharing',
              'Spontaneous team formation',
              'Feedback loops on in-progress projects',
              'Connections that turned into co-founder relationships',
            ],
          },
        ],
      },
    ],
  },

  {
    id: 'projects',
    title: 'Projects',
    description: 'Products and experiments Courtney has built.',
    coverGradient: ['#f97316', '#fbbf24'],
    tracks: [
      {
        id: 'pearle',
        title: 'Pearle',
        type: 'AI Product',
        year: 2024,
        description:
          'An AI-powered personal finance companion designed to make financial clarity feel effortless and personalized — not like homework.',
        contentSections: [
          {
            title: 'Problem',
            text: 'Personal finance apps are either too complex (Mint, YNAB) or too passive (banking apps). People need a smart companion that understands their goals and talks to them like a human.',
          },
          {
            title: 'Idea',
            text: 'Pearle is a conversational AI layer on top of your finances. Ask it anything: "Can I afford to take this trip?" or "Why am I overspending on food?" — it gives you honest, contextual answers.',
          },
          {
            title: 'Technology',
            items: [
              'LLM-powered natural language interface',
              'Integration with Plaid for bank data',
              'Contextual memory of spending patterns',
              'Proactive nudges and insights',
            ],
          },
          {
            title: 'Status',
            text: 'Early prototype. Exploring partnerships with financial institutions and fintech platforms.',
          },
        ],
      },
      {
        id: 'pacaplate',
        title: 'PacaPlate',
        type: 'App',
        year: 2024,
        description:
          'A meal planning app with a lovable alpaca mascot (Paca) that makes planning weekly meals actually fun. Designed for busy people who still want to eat well.',
        contentSections: [
          {
            title: 'Goal',
            text: 'Remove the weekly dread of "what should I eat?" with an app that feels playful and helpful, not like another task manager.',
          },
          {
            title: 'Alpaca Mascot Concept',
            text: 'Paca is your cheerful meal planning companion. He celebrates your wins ("You planned 5 meals this week!"), suggests recipes based on what\'s in your fridge, and keeps the experience light.',
          },
          {
            title: 'Technology Stack',
            items: [
              'React Native (iOS & Android)',
              'AI recipe suggestions via LLM',
              'Grocery list generation',
              'Nutritional context without obsession',
            ],
          },
          {
            title: 'Vision',
            text: 'Paca becomes the Duolingo of meal planning — habit-forming, fun, and genuinely useful.',
          },
        ],
      },
      {
        id: 'tipbrightly',
        title: 'TipBrightly',
        type: 'Startup',
        year: 2023,
        description:
          'A digital tipping platform designed for service workers in the gig economy — making it easier for customers to tip cashlessly and for workers to receive and track their income.',
        contentSections: [
          {
            title: 'Problem',
            text: 'Cashless payments have decimated tipping for service workers. People want to tip but have no cash. TipBrightly bridges that gap with QR-code based tipping that works anywhere.',
          },
          {
            title: "Courtney's Role",
            text: 'Product design lead — responsible for user research, UX/UI redesign, and coordinating with engineering to ship a polished v2.',
          },
          {
            title: 'Product Redesign',
            items: [
              'Full UX audit and user interviews with service workers',
              'Redesigned onboarding from 7 steps to 3',
              'New tip receipt experience with instant feedback',
              'Dashboard redesign for workers to track earnings',
            ],
          },
          {
            title: 'Impact',
            stats: [
              { label: 'Conversion lift', value: '+40%' },
              { label: 'Onboarding drop-off', value: '-60%' },
              { label: 'User satisfaction', value: '4.7/5' },
              { label: 'Active users', value: '1,000+' },
            ],
          },
        ],
      },
    ],
  },

  {
    id: 'hobbies',
    title: 'Hobbies',
    description: 'Things Courtney enjoys outside of work.',
    coverGradient: ['#ec4899', '#f43f5e'],
    tracks: [
      {
        id: 'travel',
        title: 'Travel',
        type: 'Adventure',
        year: 2025,
        description:
          'Collecting experiences across time zones. Courtney has lived in multiple countries and finds that travel sharpens perspective more than almost anything else.',
        contentSections: [
          {
            title: 'Countries Lived In',
            items: [
              'United States (current — San Francisco, CA)',
              'Japan (study abroad)',
              'Taiwan (extended family stays)',
            ],
          },
          {
            title: 'Favorite Destinations',
            items: [
              'Tokyo, Japan — organization meets beauty',
              'Taipei, Taiwan — night markets and warmth',
              'New York City — relentless energy',
              'Vancouver, BC — mountains meet tech',
            ],
          },
          {
            title: 'Recent Trips',
            items: [
              'GTC 2025 — San Jose',
              'Bay Area regional adventures',
              'Planning: Japan 2025',
            ],
          },
        ],
      },
      {
        id: 'music',
        title: 'Music',
        type: 'Joy',
        year: 2025,
        description:
          "Music is a big part of Courtney's life — from belting at karaoke to attending live shows. If there's a microphone, she's probably considering grabbing it.",
        contentSections: [
          {
            title: 'Karaoke',
            text: 'Karaoke is a sacred ritual. Courtney is a regular at SF karaoke spots and considers it the ultimate team-building activity.',
          },
          {
            title: 'Favorite Artists',
            items: [
              'Mitski',
              'Frank Ocean',
              'Hozier',
              'Beyoncé',
              'Japanese Breakfast',
              'Bon Iver',
            ],
          },
          {
            title: 'Concerts',
            items: [
              'Beyoncé Renaissance Tour',
              'Hozier at The Fillmore',
              'Various SF indie shows',
              'GoldenVoice venue regular',
            ],
          },
        ],
      },
      {
        id: 'baking',
        title: 'Baking',
        type: 'Creative',
        year: 2025,
        description:
          'Baking is Courtney\'s form of creative meditation — precise, satisfying, and ends with something delicious. The kitchen is where she unplugs from screens.',
        contentSections: [
          {
            title: 'Favorite Things to Bake',
            items: [
              'Matcha mochi cake',
              'Brown butter chocolate chip cookies',
              'Homemade focaccia with toppings',
              'Japanese milk bread (shokupan)',
              'Seasonal fruit tarts',
            ],
          },
          {
            title: 'Experiments',
            items: [
              'Combining Asian flavors with Western pastry techniques',
              'Sourdough starter journey (currently alive)',
              'Croissants — attempted multiple times, journey ongoing',
              'Mochi donut variations',
            ],
          },
        ],
      },
      {
        id: 'dogs',
        title: 'Dogs',
        type: 'Love',
        year: 2025,
        description:
          "Stitch is a good dog. Probably the best dog. Any and all dogs are welcome in Courtney's world.",
        contentSections: [
          {
            title: 'Stitch',
            text: 'Stitch is Courtney\'s dog — chaotic, loving, and absolutely convinced he is the main character. Named after the Disney character for obvious reasons.',
          },
          {
            title: 'Life with Dogs',
            items: [
              'Morning walks are non-negotiable',
              'Stitch attends AI Valley events (occasionally)',
              'Dog parks as networking events',
              'Convinced dogs make everything better',
            ],
          },
          {
            title: 'Dog Philosophy',
            text: 'Dogs are the best judges of character. If Stitch likes you, you\'re probably a good person. If he doesn\'t, take it as feedback.',
          },
        ],
      },
    ],
  },
];
