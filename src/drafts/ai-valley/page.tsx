import type { Metadata } from 'next';
import Link from 'next/link';
import { WatercolorSprite } from '@/components/WatercolorSprite';
import styles from './case-study.module.css';

const title = 'AI Valley: AI Partnerships & Community Programs | Courtney Ko';
const description = 'How Courtney Ko leads AI Valley partnerships, technical programming, and community operations: 15K+ builders connected, 70+ events, and 500+ hackathon registrations.';

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: '/work/ai-valley/' },
  openGraph: {
    title, description, url: '/work/ai-valley/', type: 'article',
    images: [{ url: '/aivalley-lounge-event.jpg', width: 1800, height: 1221, alt: 'Builders connecting at an AI Valley community event' }],
  },
  twitter: { card: 'summary_large_image', title, description, images: ['/aivalley-lounge-event.jpg'] },
};

export default function AIValleyCaseStudy() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <Link className={styles.wordmark} href="/">Courtney Ko</Link>
        <nav aria-label="Case study navigation"><Link href="/#work">Back to the village</Link><a href="mailto:courtneythko@gmail.com">Let’s work together →</a></nav>
      </header>
      <main className={styles.main}>
        <section className={styles.hero} aria-labelledby="case-title">
          <div><p className={styles.eyebrow}>AI Valley · Community &amp; partnerships</p>
            <h1 id="case-title">Bringing AI builders<br />and partners together.</h1>
            <p className={styles.intro}>I lead partnerships, technical programming, and community operations at AI Valley — creating hands-on places for engineers and founders to meet, explore AI tools, and build.</p>
            <p className={styles.role}>My role: COO &amp; community builder · San Francisco</p>
          </div>
          <div className={styles.house}><WatercolorSprite tile={1} /><span>AI Valley Hub</span></div>
        </section>
        <dl className={styles.metrics} aria-label="AI Valley community results">
          <div><dt>Engineers and founders connected</dt><dd>15K+</dd></div>
          <div><dt>Events hosted</dt><dd>70+</dd></div>
          <div><dt>All-women AI hackathon registrations</dt><dd>500+</dd></div>
        </dl>
        <figure className={styles.photo}><img src="/aivalley-lounge-event.jpg" width="1800" height="1221" alt="People meeting and talking at an AI Valley builder gathering" /><figcaption>Community begins with people making connections.</figcaption></figure>
        <section className={styles.section}><h2>The challenge</h2><p>Builders need opportunities to try AI tools with peers. Partners need hands-on settings where developers can explore their products and APIs. My work brings those needs into the same program, with a clear experience for builders and coordinated execution for partners.</p></section>
        <section className={styles.section}><h2>What I own</h2><div><h3>Partner coordination</h3><p>I coordinate sponsors, partners, organizers, and builders so that programming serves the people attending and the teams supporting it.</p><h3>Technical programming</h3><p>I design hackathons, workshops, demos, and founder gatherings around what builders want to explore and create.</p><h3>Community operations</h3><p>I build repeatable operating rhythms for outreach, events, and community follow-through, connecting program design with the details needed to deliver it.</p></div></section>
        <section className={styles.section}><h2>How I approach a program</h2><ol><li><strong>Start with builder needs.</strong> Shape the program around hands-on exploration, practical AI tools, and opportunities to connect with peers.</li><li><strong>Bring the right people together.</strong> Align partners, sponsors, and organizers around the experience and coordinate their contributions.</li><li><strong>Make execution repeatable.</strong> Support the program with clear outreach, event operations, and consistent working rhythms.</li></ol></section>
        <section className={styles.section}><h2>A program in practice</h2><div><h3>An all-women AI hackathon</h3><p>One example is an all-women AI hackathon in San Francisco with more than 500 registrations. It sits within a wider community program spanning technical workshops, hackathons, and founder events.</p><p>Across AI Valley’s programming, the community has connected more than 15,000 engineers and founders through over 70 events. These figures describe community reach and participation.</p><a className={styles.link} href="https://aivalley.io/events" target="_blank" rel="noopener noreferrer">Explore AI Valley events ↗</a></div></section>
        <footer className={styles.footer}><h2>Building an AI community<br />or partner program?</h2><p>I’m open to AI partnerships and community roles.</p><a className={styles.button} href="mailto:courtneythko@gmail.com">Let’s work together →</a><Link className={styles.link} href="/">Back to Courtney’s village</Link></footer>
      </main>
    </div>
  );
}
