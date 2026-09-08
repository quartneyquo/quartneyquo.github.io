// Run with Playwright: await page.evaluate(require('./tests/journey-layout-audit.cjs')).
module.exports = function auditJourneyLayout() {
  const root = document.querySelector('.continuous-journey').getBoundingClientRect();
  const outlines = [...document.querySelectorAll('.journey-trail [data-trail-verge] > path')];
  const points = outlines.flatMap(path => (path.getAttribute('d').match(/[ML][\d.-]+,[\d.-]+/g) || []).map(pair => {
    const [x, y] = pair.slice(1).split(',').map(Number);
    return { x: x + root.left, y: y + root.top };
  }));
  const failures = [];
  for (const link of document.querySelectorAll('.journey-sign')) {
    const box = link.getBoundingClientRect();
    if (box.height < 44) failures.push(`${link.textContent}: tap target under 44px`);
    if (box.left < 0 || box.right > innerWidth) failures.push(`${link.textContent}: outside viewport`);
    if (points.some(point => point.x > box.left - 16 && point.x < box.right + 16 && point.y > box.top - 16 && point.y < box.bottom + 16)) {
      failures.push(`${link.textContent}: trail within 16px`);
    }
    const style = getComputedStyle(link);
    if (style.position === 'absolute') failures.push(`${link.textContent}: link is outside document flow`);
    if (link.getAttribute('href').startsWith('#') && !document.getElementById(link.hash.slice(1))) {
      failures.push(`${link.textContent}: missing destination`);
    }
  }
  if (document.documentElement.scrollWidth > innerWidth) failures.push('Horizontal overflow');
  if (failures.length) throw new Error(failures.join('\n'));
  return { width: innerWidth, destinations: document.querySelectorAll('.journey-sign').length, passed: true };
};
