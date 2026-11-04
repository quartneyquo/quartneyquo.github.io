/** The portfolio is statically exported. Shared notes live in a separate shared notes service. */
export const gardenServiceUrl = process.env.NEXT_PUBLIC_PACA_GARDEN_API_URL || 'https://paca-holiday-village.courtneythko.chatgpt.site';
let sessionVisitor = '';
function visitorId() {
  if (sessionVisitor) return sessionVisitor;
  try {
    const saved = localStorage.getItem('paca-garden-visitor');
    if (saved && /^[a-f0-9-]{36}$/.test(saved)) return sessionVisitor = saved;
    sessionVisitor = crypto.randomUUID();
    localStorage.setItem('paca-garden-visitor', sessionVisitor);
  } catch { sessionVisitor ||= crypto.randomUUID(); }
  return sessionVisitor;
}
export function gardenRequest(path: string, options: RequestInit = {}) {
  const headers = new Headers(options.headers);
  headers.set('X-Paca-Visitor', visitorId());
  return fetch(`${gardenServiceUrl}${path}`, { ...options, headers, credentials: 'omit' });
}
