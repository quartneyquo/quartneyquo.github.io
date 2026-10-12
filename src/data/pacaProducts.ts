export const pacaProducts = [
  {
    id: 'pacaplate', title: 'PacaPlate', house: 'The village kitchen', category: 'Meal planning', tile: 0,
    summary: 'A playful AI meal-planning app with an alpaca companion, recipe suggestions, and grocery-list generation.',
    href: 'https://paca-plate.vercel.app/',
    features: ['Find recipe ideas for the week.', 'Turn meal plans into grocery lists.', 'Make everyday food decisions feel a little lighter.'],
  },
  {
    id: 'pacalife', title: 'PacaLife', house: 'The garden cottage', category: 'Goals & habits', tile: 1,
    summary: 'A cozy personal operating system for goals, habits, reflection, and everyday momentum.',
    href: 'https://pacalife.app/',
    features: ['Give goals and routines a home.', 'Make room for reflection.', 'Come back to small, steady progress.'],
  },
  {
    id: 'pacamoney', title: 'PacaMoney', house: 'The savings house', category: 'Personal finance', tile: 2,
    summary: 'A friendly money companion for budgeting, tracking, and making personal finance feel less intimidating.',
    href: 'https://paca-money.vercel.app/',
    features: ['Keep everyday spending in view.', 'Plan a budget you can revisit.', 'Build a gentler relationship with money.'],
  },
  {
    id: 'pacajob', title: 'PacaJob', house: 'The career studio', category: 'Resume & interviews', tile: 3,
    summary: 'A career companion for matching your resume to a role, improving truthful wording, and practicing interviews with Panchita.',
    href: 'https://pacajob.courtneythko.chatgpt.site/',
    features: ['Compare your resume with a target job description.', 'Refine your wording while staying true to your experience.', 'Practice interviews with Panchita.'],
  },
  {
    id: 'paca-chinese', title: 'Paca中文', house: 'The language teahouse', category: 'Chinese practice', tile: 4,
    summary: 'A playful Mandarin and Cantonese practice companion for AI conversations, partnerships, and product demos.',
    href: 'https://learn.courtneyko.com/',
    features: ['Build confidence through bite-sized language missions.', 'Review vocabulary and phrases with flashcards.', 'Practice useful conversations about AI, products, and partnerships.'],
  },
];

export type PacaProduct = typeof pacaProducts[number];
