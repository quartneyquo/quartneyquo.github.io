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
  preview: { src: string; animatedSrc: string; alt: string; caption: string };
};

export const pacaProducts: PacaProduct[] = [
  {
    id: 'pacaplate', title: 'PacaPlate', house: 'The village kitchen', category: 'Food & nutrition', tile: 0, doorPosition: 77,
    preview: { src: '/project-previews/pacaplate.jpg', animatedSrc: '/project-previews/pacaplate.gif', alt: 'PacaPlate demo moving from the daily nutrition view to logging food and updated totals.', caption: 'Food diary → log a meal → daily totals. Sample data.' },
    summary: 'A friendly food diary for logging meals, tracking nutrition, and exploring meal ideas with an alpaca companion.',
    href: 'https://paca-plate.vercel.app/',
    features: ['Log meals from a searchable food database.', 'See daily calories, macros, and nutrition totals.', 'Ask Paca Coach for meal ideas and food guidance.'],
  },
  {
    id: 'pacalife', title: 'PacaLife', house: 'The garden cottage', category: 'Daily planning', tile: 1, doorPosition: 62,
    preview: { src: '/project-previews/pacalife.jpg', animatedSrc: '/project-previews/pacalife.gif', alt: 'PacaLife demo showing a daily plan, to-do lists, and adding a task.', caption: 'Daily plan → to-do lists → a new task. Sample data.' },
    summary: 'A cozy personal operating system for tasks, calendars, shared lists, and everyday momentum.',
    href: 'https://pacalife.app/',
    features: ['Give tasks and shared lists a home.', 'Bring your calendar into your daily plan.', 'Turn voice notes into useful next steps.'],
  },
  {
    id: 'pacamoney', title: 'PacaMoney', house: 'The savings house', category: 'Personal finance', tile: 2, doorPosition: 51,
    preview: { src: '/project-previews/pacamoney.jpg', animatedSrc: '/project-previews/pacamoney.gif', alt: 'PacaMoney demo showing a sample budget overview, category budgets, and savings goals.', caption: 'Spending overview → budgets → savings goals. Sample data.' },
    summary: 'A friendly money companion for budgeting, tracking, and making personal finance feel less intimidating.',
    href: 'https://paca-money.vercel.app/',
    features: ['Keep everyday spending in view.', 'Plan a budget you can revisit.', 'Build a gentler relationship with money.'],
  },
  {
    id: 'pacajob', title: 'PacaJob', house: 'The career studio', category: 'Resume & interviews', tile: 3, doorPosition: 68,
    preview: { src: '/project-previews/pacajob.jpg', animatedSrc: '/project-previews/pacajob.gif', alt: 'PacaJob demo showing resume matching inputs and interview practice setup.', caption: 'Resume matching → interview practice. Sample resume.' },
    summary: 'A career companion for matching your resume to a role, improving truthful wording, and practicing interviews with Panchita.',
    href: 'https://pacajob.courtneyko.com/',
    features: ['Compare your resume with a target job description.', 'Refine your wording while staying true to your experience.', 'Practice interviews with Panchita.'],
  },
  {
    id: 'paca-chinese', title: 'Paca中文', house: 'The language teahouse', category: 'Chinese practice', tile: 4, doorPosition: 21,
    preview: { src: '/project-previews/paca-chinese.jpg', animatedSrc: '/project-previews/paca-chinese.gif', alt: 'Paca中文 demo moving from a language lesson to a flashcard and revealing its translation.', caption: 'A little lesson → a flashcard → the answer.' },
    summary: 'A playful Mandarin and Cantonese practice companion for AI conversations, partnerships, and product demos.',
    href: 'https://learn.courtneyko.com/',
    features: ['Build confidence through bite-sized language missions.', 'Review vocabulary and phrases with flashcards.', 'Practice useful conversations about AI, products, and partnerships.'],
  },
  {
    id: 'pacachef', title: 'PacaChef', house: 'The cookbook cottage', category: 'Recipes & cooking', tile: 5, doorPosition: 61,
    preview: { src: '/project-previews/pacachef.jpg', animatedSrc: '/project-previews/pacachef.gif', alt: 'PacaChef demo showing the cookbook, a recipe, and step-by-step cooking.', caption: 'Cookbook → recipe → cook along. Sample recipes.' },
    image: '/pacachef-house.png',
    summary: 'A cozy personal cookbook for saving recipes, creating new dishes with AI, and cooking step by step with Panchita.',
    href: 'https://cook.courtneyko.com/',
    features: ['Save recipes from links, photos, or pasted text.', 'Dream up new dishes with AI and organize your cookbook.', 'Cook step by step with timers, serving adjustments, and Panchita by your side.'],
  },
];
