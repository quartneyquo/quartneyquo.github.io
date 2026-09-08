export function portfolioLinkAction(href: string) {
  if (href.includes('Courtney_Ko_Resume.pdf')) return 'resume_click';
  if (href.startsWith('mailto:')) return 'email_click';
  if (href.includes('linkedin.com')) return 'linkedin_click';
  if (href === 'https://x.com/Courtneythko') return 'x_click';
  if (href.includes('/trips/ai-valley-events') || href === 'https://aivalley.io/events') return 'events_click';
  if (['#ai-valley', '#nvidia', '#pearle', '#case-studies'].includes(href)) return 'case_study_click';
  return null;
}
