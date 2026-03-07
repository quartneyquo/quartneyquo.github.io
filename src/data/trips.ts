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
            timeLabel: 'Sep 2025 – Present',
            blurb: 'Chief Operating Officer — scaled AI ecosystem to 5,000+ members through technical hackathons and community programming.',
            content: [
              {
                type: 'text',
                title: 'The Role',
                text: 'As COO I lead end-to-end execution — aligning sponsors, engineers, and founders to ship production-ready agent systems and run technical events focused on LLM agents, RAG systems, and multimodal workflows.',
              },
              {
                type: 'bullets',
                title: 'Highlights',
                items: [
                  'Scaled AI ecosystem to 5,000+ members through technical hackathons',
                  'Hosted the largest all-women AI hackathon in San Francisco — 500+ registrations',
                  'Led events focused on LLM agents, RAG systems, and multimodal workflows',
                  'Aligned sponsors, engineers, and founders to ship production-ready systems',
                ],
              },
              {
                type: 'metrics',
                title: 'Community Stats',
                items: [
                  { label: 'Members', value: '5,000+' },
                  { label: 'WIT Hackathon', value: '500+' },
                  { label: 'Events', value: '20+' },
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
            timeLabel: 'Oct 2025 – Present',
            blurb: 'Business Operations Analyst on Enterprise Monetization Systems — owning entitlement infrastructure across SAP and Salesforce.',
            content: [
              {
                type: 'text',
                title: 'Role',
                text: 'Business Operations Analyst – Enterprise Monetization Systems. Own enterprise entitlement systems powering licensing, renewals, contract mapping, and access controls across SAP and Salesforce ecosystems.',
              },
              {
                type: 'bullets',
                title: 'What I Do',
                items: [
                  'Own enterprise entitlement systems for licensing, renewals, and contract mapping',
                  'Built executive dashboards tracking entitlement accuracy, escalation rates, processing latency, and revenue impact',
                  'Identified workflow bottlenecks and implemented system improvements reducing manual intervention',
                  'Partner cross-functionally with engineering, finance, and support on pricing logic and compliance integrity',
                ],
              },
              {
                type: 'metrics',
                title: 'Systems',
                items: [
                  { label: 'CRM', value: 'Salesforce' },
                  { label: 'ERP', value: 'SAP' },
                  { label: 'Focus', value: 'Monetization' },
                  { label: 'Scope', value: 'Enterprise' },
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
            timeLabel: 'Mar – Sep 2025',
            blurb: 'Founded and shipped a 0→1 AI-powered group travel platform — NLP pipelines extracting itineraries from social media.',
            content: [
              {
                type: 'text',
                title: 'What It Was',
                text: 'AI-powered group travel platform integrating LLMs with custom NLP pipelines to extract structured travel data from social media. Built a NLP engine converting unstructured posts into editable itinerary components.',
              },
              {
                type: 'bullets',
                title: 'What I Built',
                items: [
                  'NLP engine parsing unstructured social posts into structured itinerary components',
                  'Collaborative planning workflows for multi-user itinerary coordination',
                  'Delivered MVP in 10 weeks; iterated with 25+ beta users',
                  '3,900+ event generations during private beta',
                ],
              },
              {
                type: 'metrics',
                title: 'Traction',
                items: [
                  { label: 'MVP Timeline', value: '10 weeks' },
                  { label: 'Beta Users', value: '25+' },
                  { label: 'Event Gens', value: '3,900+' },
                  { label: 'Role', value: 'Founder' },
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
            id: 'sfsu',
            title: 'San Francisco State University',
            locationLabel: 'San Francisco, CA',
            tag: 'Study',
            timeLabel: 'Graduate',
            blurb: 'M.A. Psychology — research methods, behavioral science, and applied human factors.',
            content: [
              {
                type: 'text',
                title: 'Degree',
                text: 'M.A. Psychology. Graduate-level training in research design, behavioral analysis, and human cognition — directly applicable to product research and user-centered design.',
              },
            ],
          },
          {
            id: 'ucsd',
            title: 'UC San Diego',
            locationLabel: 'La Jolla, CA',
            tag: 'Study',
            timeLabel: 'Undergraduate',
            blurb: 'B.S. Cognitive Science — the intersection of human cognition, computation, and design.',
            content: [
              {
                type: 'text',
                title: 'Degree',
                text: 'B.S. Cognitive Science. Studied how humans think, learn, and interact with systems — the foundation for everything in product and UX.',
              },
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
            ],
          },
          {
            id: 'wells-fargo',
            title: 'Wells Fargo',
            locationLabel: 'San Francisco, CA',
            tag: 'Work',
            timeLabel: 'Aug 2021 – Mar 2023',
            blurb: 'Design Producer (Product Design Program Manager) — led cross-functional SDK and API platform delivery across fintech products.',
            content: [
              {
                type: 'text',
                title: 'Role',
                text: 'Design Producer (Product Design Program Manager). Led cross-functional delivery across 10+ stakeholders for SDK and API platforms powering fintech products.',
              },
              {
                type: 'bullets',
                title: 'What I Did',
                items: [
                  'Prioritized product development for APIs and SDKs, driving agile adoption and improving developer efficiency',
                  'Standardized 100+ API documentation assets across 25+ products, accelerating onboarding',
                  'Conducted customer research and A/B testing to refine transactions and increase adoption',
                  'Launched SDK-powered credit card payment solutions across 7,500+ hotels',
                ],
              },
              {
                type: 'metrics',
                title: 'Scale',
                items: [
                  { label: 'Stakeholders', value: '10+' },
                  { label: 'API Assets', value: '100+' },
                  { label: 'Products', value: '25+' },
                  { label: 'Hotels', value: '7,500+' },
                ],
              },
            ],
          },
          {
            id: 'tipbrightly-work',
            title: 'TipBrightly',
            locationLabel: 'San Francisco, CA',
            tag: 'Work',
            timeLabel: 'Nov 2024 – Oct 2025',
            blurb: 'Product Manager — shipped analytics dashboards, AI churn prediction, and A/B experiments driving NPS to 78.',
            content: [
              {
                type: 'text',
                title: 'PM Role (2024–2025)',
                text: 'Product Manager responsible for analytics infrastructure, AI-driven retention tooling, and growth experimentation.',
              },
              {
                type: 'bullets',
                title: 'What I Shipped',
                items: [
                  'Real-time analytics dashboard (Python, SQL) reducing reporting latency by 96%',
                  'AI-driven churn prediction model using behavioral signals to flag at-risk accounts',
                  'A/B experiments optimizing onboarding and activation — increased NPS to 78',
                ],
              },
              {
                type: 'text',
                title: 'Founding PM Role (2020–2021)',
                text: 'Led 0→1 platform redesign as Founding PM, owning payments workflows and building instrumentation for activation, revenue, and retention.',
              },
              {
                type: 'metrics',
                title: 'Founding PM Impact',
                items: [
                  { label: 'Transaction Growth', value: '919%' },
                  { label: 'Revenue', value: '$9.7K→$99K' },
                  { label: 'NPS (2025)', value: '78' },
                  { label: 'Latency Cut', value: '96%' },
                ],
              },
            ],
          },
          {
            id: 'independent-exploration',
            title: 'Independent Product Exploration',
            locationLabel: 'South Korea & Asia',
            tag: 'Work',
            timeLabel: 'Mar 2023 – Sep 2024',
            blurb: 'Career break building AI product prototypes and advising students on international school placements across Asia.',
            content: [
              {
                type: 'bullets',
                title: 'What I Did',
                items: [
                  'Built and tested early-stage AI product prototypes through rapid experimentation',
                  'Explored LLM-based workflows and structured data extraction',
                  'Advised students on international school placements (contract role)',
                  'Managed cross-border coordination and operational processes',
                ],
              },
            ],
          },
          {
            id: 'skills',
            title: 'Skills & Languages',
            tag: 'Personal',
            blurb: '0→1 product delivery, LLMs, NLP, SQL, Python — with a multilingual twist.',
            content: [
              {
                type: 'bullets',
                title: 'Product',
                items: [
                  '0→1 Delivery, Roadmapping, KPI Definition',
                  'A/B Testing and Experimentation',
                  'Funnel Analysis and Data Instrumentation',
                ],
              },
              {
                type: 'bullets',
                title: 'AI & Technical',
                items: [
                  'Large Language Models (LLMs) and NLP',
                  'Prompt Engineering and API Integrations',
                  'SQL, Python, Data Instrumentation',
                ],
              },
              {
                type: 'bullets',
                title: 'UX & Systems',
                items: [
                  'Conversational UX, Prototyping (Figma, Code)',
                  'Workflow Automation, Salesforce, SAP',
                  'Jira, AWS',
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
            timeLabel: 'Mar – Sep 2025',
            blurb: '0→1 AI-powered group travel platform — NLP pipelines turning social media posts into collaborative itineraries.',
            content: [
              {
                type: 'text',
                title: 'The Problem',
                text: 'Group travel planning is scattered across DMs, notes, and Instagram saves. Pearle extracted structured itinerary data from social media using custom NLP, making planning collaborative and effortless.',
              },
              {
                type: 'text',
                title: 'What I Built',
                text: 'Integrated LLMs with custom NLP pipelines to extract structured travel data from unstructured social posts. Designed collaborative planning workflows supporting multi-user itinerary coordination.',
              },
              {
                type: 'metrics',
                title: 'Traction',
                items: [
                  { label: 'MVP Timeline', value: '10 weeks' },
                  { label: 'Beta Users', value: '25+' },
                  { label: 'Event Gens', value: '3,900+' },
                  { label: 'Role', value: 'Founder' },
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
            timeLabel: '2020 – 2025',
            blurb: 'QR-code tipping platform for service workers. Led product across two stints — 919% transaction growth and NPS of 78.',
            content: [
              {
                type: 'text',
                title: 'Founding PM (Jun 2020 – Aug 2021)',
                text: 'Led 0→1 platform redesign as Founding PM. Owned payments system transactional workflows and built instrumentation to track activation, revenue growth, and retention.',
              },
              {
                type: 'text',
                title: 'PM (Nov 2024 – Oct 2025)',
                text: 'Returned as PM to ship a real-time analytics dashboard (Python, SQL), an AI-driven churn prediction model, and A/B experiments that lifted NPS to 78.',
              },
              {
                type: 'metrics',
                title: 'Impact',
                items: [
                  { label: 'Transaction Growth', value: '919%' },
                  { label: 'Revenue', value: '$9.7K→$99K' },
                  { label: 'NPS', value: '78' },
                  { label: 'Latency Cut', value: '96%' },
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
                type: 'map',
                title: 'Countries Visited',
                countries: [
                  '36',  // Australia
                  '484', // Mexico
                  '124', // Canada
                  '380', // Italy
                  '191', // Croatia
                  '250', // France
                  '276', // Germany
                  '410', // South Korea
                  '756', // Switzerland
                  '196', // Cyprus
                  '40',  // Austria
                  '348', // Hungary
                  '56',  // Belgium
                  '344', // Hong Kong
                  '392', // Japan
                  '156', // China
                  '158', // Taiwan
                  '704', // Vietnam
                  '336', // Vatican City
                  '604', // Peru
                ],
              },
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
                title: 'Go-Tos',
                items: [
                  'Chocolate chip cookies',
                  'Banana bread',
                  'Daan Taat (Hong Kong egg tarts)',
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
