export type PacaProduct = {
  id: string;
  title: string;
  house: string;
  category: string;
  tile: number;
  doorPosition: number;
  image?: string;
  summary: string;
  href: string;
  features: string[];
  preview: { src: string; alt: string; caption: string };
};

export const pacaProducts: PacaProduct[] = [
  {
    id: 'pacaplate', title: 'PacaPlate', house: 'The village kitchen', category: 'Meal planning', tile: 0, doorPosition: 77,
    preview: { src: '/project-previews/pacaplate.jpg', alt: 'PacaPlate welcome screen with its alpaca logo and sign-in options.', caption: 'The PacaPlate welcome screen · Sign in to plan your meals.' },
    summary: 'A playful AI meal-planning app with an alpaca companion, recipe suggestions, and grocery-list generation.',
    href: 'https://paca-plate.vercel.app/',
    features: ['Find recipe ideas for the week.', 'Turn meal plans into grocery lists.', 'Make everyday food decisions feel a little lighter.'],
  },
  {
    id: 'pacalife', title: 'PacaLife', house: 'The garden cottage', category: 'Daily planning', tile: 1, doorPosition: 62,
    preview: { src: '/project-previews/pacalife.jpg', alt: 'PacaLife Suite homepage introducing its meals, money, and daily planning apps.', caption: 'The PacaLife Suite homepage.' },
    summary: 'A cozy personal operating system for tasks, calendars, shared lists, and everyday momentum.',
    href: 'https://pacalife.app/',
    features: ['Give tasks and shared lists a home.', 'Bring your calendar into your daily plan.', 'Turn voice notes into useful next steps.'],
  },
  {
    id: 'pacamoney', title: 'PacaMoney', house: 'The savings house', category: 'Personal finance', tile: 2, doorPosition: 51,
    preview: { src: '/project-previews/pacamoney.jpg', alt: 'PacaMoney welcome screen introducing its shared budgeting workspace.', caption: 'The PacaMoney welcome screen · Sign in to see your budget.' },
    summary: 'A friendly money companion for budgeting, tracking, and making personal finance feel less intimidating.',
    href: 'https://paca-money.vercel.app/',
    features: ['Keep everyday spending in view.', 'Plan a budget you can revisit.', 'Build a gentler relationship with money.'],
  },
  {
    id: 'pacajob', title: 'PacaJob', house: 'The career studio', category: 'Resume & interviews', tile: 3, doorPosition: 68,
    preview: { src: '/project-previews/pacajob.jpg', alt: 'PacaJob career workspace for reviewing a resume and practicing interviews.', caption: 'A look inside the career studio.' },
    summary: 'A career companion for matching your resume to a role, improving truthful wording, and practicing interviews with Panchita.',
    href: 'https://pacajob.courtneythko.chatgpt.site/',
    features: ['Compare your resume with a target job description.', 'Refine your wording while staying true to your experience.', 'Practice interviews with Panchita.'],
  },
  {
    id: 'paca-chinese', title: 'Paca中文', house: 'The language teahouse', category: 'Chinese practice', tile: 4, doorPosition: 21,
    preview: { src: '/project-previews/paca-chinese.jpg', alt: 'Paca中文 learning workspace with Mandarin and Cantonese practice activities.', caption: 'A look inside the language teahouse.' },
    summary: 'A playful Mandarin and Cantonese practice companion for AI conversations, partnerships, and product demos.',
    href: 'https://learn.courtneyko.com/',
    features: ['Build confidence through bite-sized language missions.', 'Review vocabulary and phrases with flashcards.', 'Practice useful conversations about AI, products, and partnerships.'],
  },
  {
    id: 'pacachef', title: 'PacaChef', house: 'The cookbook cottage', category: 'Recipes & cooking', tile: 5, doorPosition: 61,
    preview: { src: '/project-previews/pacachef.jpg', alt: 'PacaChef cookbook home with Panchita, recipe imports, AI recipe creation, and cooking shortcuts.', caption: 'The PacaChef cookbook · Shown with sample recipes.' },
    image: '/pacachef-house.png',
    summary: 'A cozy personal cookbook for saving recipes, creating new dishes with AI, and cooking step by step with Panchita.',
    href: 'https://cook.courtneyko.com/',
    features: ['Save recipes from links, photos, or pasted text.', 'Dream up new dishes with AI and organize your cookbook.', 'Cook step by step with timers, serving adjustments, and Panchita by your side.'],
  },
];
