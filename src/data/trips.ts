import { Trip } from '@/types';

export const trips: Trip[] = [
  {
    id: 'now',
    title: 'Now',
    subtitle: 'Current focus, active experiments, life in motion',
    dateRange: 'Spring 2026',
    coverImage: '/nowplaying.jpeg',
    coverImagePosition: '50% 63%',
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
            blurb: 'Chief Operating Officer — scaled AI ecosystem to 8,000+ members through technical hackathons and community programming.',
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
                  'Scaled AI ecosystem to 8,000+ members through technical hackathons',
                  'Hosted the largest all-women AI hackathon in San Francisco — 150+ participants, 40+ teams, 40+ projects in under one day',
                  'Led events focused on LLM agents, RAG systems, and multimodal workflows',
                  'Aligned sponsors, engineers, and founders to ship production-ready systems',
                ],
              },
              {
                type: 'metrics',
                title: 'Community Stats',
                items: [
                  { label: 'Members', value: '8,000+' },
                  { label: 'WIT Hackathon', value: '150+' },
                  { label: 'Events', value: '20+' },
                  { label: 'Hackathons', value: '10+' },
                ],
              },
              {
                type: 'links',
                title: 'Links',
                items: [{ label: 'Visit AI Valley →', href: 'https://aivalley.io' }],
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
        dateLabel: 'Stay tuned',
        stops: [
          {
            id: 'next-up-teaser',
            title: 'More events in the works',
            timeLabel: 'Summer 2026',
            locationLabel: 'San Francisco, CA',
            tag: 'Community',
            blurb: 'New hackathons, founder gatherings, and builder meetups in the pipeline. Follow along on Luma for the next drop.',
            content: [
              {
                type: 'text',
                title: 'What\'s Next',
                text: 'AI Valley is queueing up the next round of programming — flagship hackathons, intimate founder dinners, and partner events with the labs and funds shaping what builders ship next.',
              },
              {
                type: 'links',
                title: 'Stay in the Loop',
                items: [{ label: 'Follow on Luma →', href: 'https://lu.ma/aivalley' }],
              },
            ],
          },
        ],
      },
      {
        id: 'past',
        title: 'Past Highlights',
        dateLabel: '2025 – 2026',
        stops: [
          {
            id: 'female-founder-brunch',
            title: 'Female Founder Brunch',
            tag: 'Community',
            timeLabel: 'Apr 2026',
            locationLabel: 'San Francisco, CA',
            image: '/femalebrunch.jpg',
            blurb: 'An intimate brunch for the women building the next generation of AI companies — cocktails, candor, and community.',
            content: [
              {
                type: 'gallery',
                photos: [
                  { src: '/femalebrunch.jpg', caption: 'Cheers to the women building what\'s next' },
                ],
              },
              {
                type: 'text',
                title: 'Why',
                text: 'San Francisco runs on rooms — and the rooms that matter most are often the ones women aren\'t in. This brunch flipped that. A small, deliberate gathering of female founders, operators, and investors to swap notes on fundraising, hiring, and the messy parts of building an AI company in 2026.',
              },
              {
                type: 'text',
                title: 'The Format',
                text: 'No panels. No pitches. Just brunch, real conversation, and a toast to the women going first.',
              },
              {
                type: 'metrics',
                title: 'The Room',
                items: [
                  { label: 'Founders', value: '20+' },
                  { label: 'Format', value: 'Invite-only' },
                  { label: 'Vibe', value: 'Candid' },
                  { label: 'Location', value: 'SF' },
                ],
              },
            ],
          },
          {
            id: 'minimax-minihack',
            title: 'MiniMax GTC MiniHack',
            timeLabel: 'Mar 19, 2026',
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
                  { label: 'Format', value: 'Hack night' },
                ],
              },
              {
                type: 'text',
                title: 'Format',
                text: 'Show up, pick a goal, build for 2 hours, demo what you shipped. No pressure — maximum momentum.',
              },
            ],
          },
          {
            id: 'gtc-mixer-2026',
            title: 'AI Valley GTC Cofounder Mixer',
            timeLabel: 'Mar 17, 2026',
            locationLabel: 'San Francisco, CA',
            tag: 'Mixer',
            image: 'https://images.lumacdn.com/cdn-cgi/image/format=auto,fit=cover,dpr=2,anim=false,background=white,quality=75,width=600,height=300/event-covers/hv/fe000cd2-fdd2-48a5-a5cc-34d4cf78bb3e.png',
            blurb: 'An intimate mixer at GTC for AI cofounders, builders, and investors.',
            content: [
              {
                type: 'text',
                title: 'What It Was',
                text: 'GTC is massive — this mixer carved out an intimate space for the builders and funders who matter to have real conversations, not conference small talk.',
              },
              {
                type: 'bullets',
                title: 'Organizers',
                items: ['Victor Su-Ortiz', 'Healthy Li', 'Courtney Ko'],
              },
              {
                type: 'metrics',
                title: 'Details',
                items: [
                  { label: 'Date', value: 'Mar 17' },
                  { label: 'Time', value: '6–9 PM' },
                  { label: 'Location', value: 'SF' },
                  { label: 'Format', value: 'Mixer' },
                ],
              },
            ],
          },
          {
            id: 'forks-frameworks',
            title: 'Forks & Frameworks',
            timeLabel: 'Mar 8, 2026',
            locationLabel: 'Toronto, ON',
            tag: 'Community',
            image: 'https://images.lumacdn.com/cdn-cgi/image/format=auto,fit=cover,dpr=2,anim=false,background=white,quality=75,width=600,height=300/event-covers/mc/f4742ac6-deb6-4b8e-b79e-ac9d17a90fc8.png',
            blurb: 'AI Valley\'s first Toronto chapter — builders gathering for brunch, conversation, and collaboration.',
            content: [
              {
                type: 'text',
                title: 'Why Toronto',
                text: 'AI Valley\'s first stop outside the Bay. Toronto has a quietly serious AI scene — this brought local builders into the same room AI Valley creates back home.',
              },
              {
                type: 'bullets',
                title: 'Organizers',
                items: ['Victor Su-Ortiz', 'Sineha Manivannan', 'Sahand Sojoodi'],
              },
              {
                type: 'metrics',
                title: 'Details',
                items: [
                  { label: 'Date', value: 'Mar 8' },
                  { label: 'Time', value: '11 AM–2 PM' },
                  { label: 'Location', value: 'Toronto' },
                  { label: 'Format', value: 'Community brunch' },
                ],
              },
            ],
          },
          {
            id: 'return-of-agents-2026',
            title: 'Return of the Agents',
            tag: 'Hackathon',
            timeLabel: 'Feb 21, 2026',
            locationLabel: '501 Folsom St, San Francisco, CA',
            image: 'https://images.lumacdn.com/event-covers/iy/c347a41e-63db-4591-b5f4-91f52731a8b3.png',
            blurb: 'Flagship agentic AI hackathon — 500+ hand-selected builders, $5K prizes, and Afore Capital pre-seed consideration.',
            content: [
              {
                type: 'gallery',
                photos: [{ src: '/rota.jpg', caption: 'Return of the Agents · Feb 21, 2026' }],
              },
              {
                type: 'text',
                title: 'Focus',
                text: 'Build agentic AI systems that can plan, reason, and execute multi-step tasks. Hybrid event drawing builders from across the country. Top teams considered for Afore Capital\'s pre-seed program ($500K–$2M+).',
              },
              {
                type: 'metrics',
                title: 'Scale',
                items: [
                  { label: 'Builders', value: '500+' },
                  { label: 'Prizes', value: '$5K' },
                  { label: 'Format', value: 'Hybrid' },
                  { label: 'Funding', value: 'Afore' },
                ],
              },
            ],
          },
          {
            id: 'build-what-you-love',
            title: 'Build What You Love — WIT Hackathon',
            tag: 'Hackathon',
            timeLabel: 'Feb 14, 2026',
            locationLabel: '501 Folsom St, San Francisco, CA',
            image: 'https://images.lumacdn.com/event-covers/q1/ec78151c-6570-4182-b04d-57450bfa829a.jpg',
            blurb: 'The largest hybrid AI hackathon for women and nonbinary folks — 150+ participants, 40+ teams, 40+ projects shipped in under a day.',
            content: [
              {
                type: 'text',
                title: 'Overview',
                text: 'A high-energy hackathon celebrating women and nonbinary builders in AI. Supported by Replit, Vercel, Daytona, and MiniMax. Custom jewelry prize by Kyle Chan.',
              },
              {
                type: 'metrics',
                title: 'Impact',
                items: [
                  { label: 'Participants', value: '150+' },
                  { label: 'Teams', value: '40+' },
                  { label: 'Projects', value: '40+' },
                  { label: 'Duration', value: '< 1 day' },
                ],
              },
              {
                type: 'bullets',
                title: 'Sponsors',
                items: ['Replit', 'Vercel', 'Daytona', 'MiniMax'],
              },
            ],
          },
          {
            id: 'droids-strike-back',
            title: 'The Droids Strike Back',
            tag: 'Hackathon',
            timeLabel: 'Nov 22, 2025',
            locationLabel: '501 Folsom St, San Francisco, CA',
            image: 'https://images.lumacdn.com/event-covers/fr/13f464b3-2046-42e8-b634-73d40f3c253f.png',
            blurb: 'Invite-only hackathon — 200+ hand-selected builders on AI and hardware. $5K in prizes.',
            content: [
              {
                type: 'text',
                title: 'Format',
                text: 'Invite-only event for 200+ curated builders focused on AI and hardware intersections. High signal-to-noise, production-quality demos.',
              },
              {
                type: 'metrics',
                title: 'Scale',
                items: [
                  { label: 'Builders', value: '200+' },
                  { label: 'Prizes', value: '$5K' },
                  { label: 'Format', value: 'Invite-only' },
                  { label: 'Focus', value: 'AI + Hardware' },
                ],
              },
            ],
          },
          {
            id: 'a-new-agent',
            title: 'A New Agent',
            tag: 'Hackathon',
            timeLabel: 'Oct 11, 2025',
            locationLabel: '680 2nd St, San Francisco, CA',
            image: 'https://images.lumacdn.com/event-covers/6i/ac0397ef-0992-4286-8826-390e732d9901.jpg',
            blurb: 'Exclusive autonomous AI agents hackathon — $5K in prizes.',
            content: [
              {
                type: 'text',
                title: 'Focus',
                text: 'An exclusive gathering of builders focused on autonomous AI agents. Every project had to demonstrate real agency — planning, reasoning, executing.',
              },
              {
                type: 'metrics',
                title: 'Details',
                items: [
                  { label: 'Prizes', value: '$5K' },
                  { label: 'Focus', value: 'AI Agents' },
                  { label: 'Format', value: 'Exclusive' },
                  { label: 'Location', value: 'SF' },
                ],
              },
            ],
          },
          {
            id: 'dumb-hackathon',
            title: 'The Dumb Hackathon',
            tag: 'Hackathon',
            timeLabel: 'Sep 20, 2025',
            locationLabel: '1417 15th St, San Francisco, CA',
            image: 'https://images.lumacdn.com/event-covers/1i/850d678b-4af6-4a5f-84e5-b64a1747dfef.png',
            blurb: 'Build deliberately useless projects — a celebration of creativity, humor, and just building for fun.',
            content: [
              {
                type: 'text',
                title: 'The Concept',
                text: 'What if you built something completely, gloriously useless? The Dumb Hackathon is a reminder that building for joy — not utility — is its own kind of innovation. Custom Labubu prize with diamonds and pearls by Kyle Chan.',
              },
            ],
          },
          {
            id: 'agent-foundry',
            title: 'Agent Foundry',
            tag: 'Hackathon',
            timeLabel: 'Aug 23, 2025',
            locationLabel: '680 2nd St, San Francisco, CA',
            image: 'https://images.lumacdn.com/event-covers/97/1860a02a-f26b-421f-88af-f11940031ed1.png',
            blurb: 'Invite-only for 200 developers and researchers focused on AI agents and Model Context Protocol.',
            content: [
              {
                type: 'text',
                title: 'Focus',
                text: 'Deep technical hackathon for top developers and researchers exploring AI agents and the Model Context Protocol ecosystem.',
              },
              {
                type: 'metrics',
                title: 'Details',
                items: [
                  { label: 'Builders', value: '200' },
                  { label: 'Focus', value: 'MCP + Agents' },
                  { label: 'Format', value: 'Invite-only' },
                  { label: 'Location', value: 'SF' },
                ],
              },
            ],
          },
          {
            id: 'agents-in-the-loop',
            title: 'Agents in the Loop',
            tag: 'Hackathon',
            timeLabel: 'Aug 2, 2025',
            locationLabel: '501 Folsom St, San Francisco, CA',
            image: 'https://images.lumacdn.com/event-covers/ym/9c453965-5992-4494-807f-bc16c5e64c0f.png',
            blurb: 'Three tracks: Agentic Workflows, LLM-Powered Workflows, and Wildcard — $10K+ in prizes.',
            content: [
              {
                type: 'bullets',
                title: 'Tracks',
                items: [
                  'Agentic Workflows',
                  'LLM-Powered Workflows',
                  'Wildcard',
                ],
              },
              {
                type: 'metrics',
                title: 'Details',
                items: [
                  { label: 'Prizes', value: '$10K+' },
                  { label: 'Location', value: 'SF' },
                  { label: 'Tracks', value: '3' },
                  { label: 'Format', value: 'Open' },
                ],
              },
            ],
          },
          {
            id: 'ai-valley-hackathon-palo-alto',
            title: 'AI Valley Hackathon — Palo Alto',
            tag: 'Hackathon',
            timeLabel: 'Apr 19, 2025',
            locationLabel: '519 Webster St, Palo Alto, CA',
            image: 'https://images.lumacdn.com/event-covers/yd/339b2dcc-e00e-40b8-a2aa-5c52220e7814.jpg',
            blurb: 'Student-focused AI hackathon on AI Agents & Applied Intelligence — $3K+ prizes and $300K pre-seed potential.',
            content: [
              {
                type: 'text',
                title: 'Format',
                text: 'Single-day event for students focused on AI Agents and Applied Intelligence. Top teams eligible for $300K pre-seed funding consideration.',
              },
              {
                type: 'metrics',
                title: 'Details',
                items: [
                  { label: 'Prizes', value: '$3K+' },
                  { label: 'Funding', value: '$300K' },
                  { label: 'Audience', value: 'Students' },
                  { label: 'Location', value: 'Palo Alto' },
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
              {
                type: 'links',
                title: 'Links',
                items: [{ label: 'Visit Pearle →', href: 'https://pearletravel.com' }],
              },
            ],
          },
          {
            id: 'opaca',
            title: 'Opaca',
            tag: 'Creative',
            timeLabel: '2026',
            blurb: 'A love letter to alpacas — a personal creative project celebrating the world\'s most underrated animal.',
            content: [
              {
                type: 'gallery',
                photos: [{ src: '/opaca.png', caption: 'Opaca' }],
              },
              {
                type: 'text',
                title: 'What It Is',
                text: 'Opaca is a love letter to alpacas. A personal creative project — part art, part web experiment, all heart. Because sometimes you build things just because they bring you joy.',
              },
              {
                type: 'links',
                title: 'Links',
                items: [{ label: 'Visit Opaca →', href: 'https://quartneyquo.github.io/opaca' }],
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
                type: 'gallery',
                title: 'Moments',
                photos: [
                  { src: '/macchupicchu.jpeg', caption: 'Machu Picchu, Peru' },
                  { src: '/seoul.jpeg', caption: 'Seoul, Korea' },
                  { src: '/china.jpeg', caption: 'China' },
                  { src: '/sf.jpeg', caption: 'San Francisco' },
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
                type: 'gallery',
                photos: [
                  { src: '/stitch.jpeg', caption: 'Stitch & friends' },
                ],
              },
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
