import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight, Github, Instagram, Linkedin, Mail } from 'lucide-react';
import { WatercolorSprite } from '@/components/WatercolorSprite';
import styles from './page.module.css';

const title = 'Courtney Ko | Links';
const description = 'Find Courtney Ko on Twitter / X, LinkedIn, Instagram, and GitHub. Get in touch or explore her work.';

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: 'https://courtneyko.com/links/' },
  openGraph: { title, description, url: 'https://courtneyko.com/links/', type: 'website', images: [{ url: '/courtney-opaca-thumbnail.png', width: 1254, height: 1254, alt: 'Courtney Ko and Opaca' }] },
  twitter: { card: 'summary_large_image', title, description, images: ['/courtney-opaca-thumbnail.png'] },
};

function XIcon() {
  return <svg width="23" height="23" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.74l7.73-8.835L1.254 2.25H8.08l4.259 5.63 5.905-5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>;
}

const socials = [
  { label: 'Twitter / X', handle: '@courtneythko', href: 'https://x.com/Courtneythko', Icon: XIcon },
  { label: 'LinkedIn', handle: 'Courtney Ko', href: 'https://www.linkedin.com/in/courtney-ko-720b63103/', Icon: Linkedin },
  { label: 'Instagram', handle: '@courtneythko', href: 'https://instagram.com/courtneythko', Icon: Instagram },
  { label: 'GitHub', handle: '@quartneyquo', href: 'https://github.com/quartneyquo', Icon: Github },
];

export default function LinksPage() {
  return (
    <div className={styles.page}>
      <a className={styles.skip} href="#links">Skip to links</a>
      <header className={styles.header}>
        <Link href="/" aria-label="Courtney Ko home" className={styles.wordmark}>Courtney Ko</Link>
        <Link href="/"><ArrowLeft size={15} aria-hidden="true" /> Back to my world</Link>
      </header>
      <main id="links" className={styles.main}>
        <section className={styles.intro} aria-labelledby="links-title">
          <img className={styles.portrait} src="/profile.jpeg" alt="Courtney Ko" width="1050" height="1350" />
          <p className={styles.eyebrow}>A little corner of the internet</p>
          <h1 id="links-title">Hi, I’m Courtney.</h1>
          <p className={styles.bio}>Building communities, partnerships,<br />and product experiences for AI.</p>
          <p className={styles.note}>Let’s stay connected.</p>
          <div className={styles.landscape} aria-hidden="true" />
          <div className={styles.companions}>
            <figure className={styles.companion}>
              <span role="img" aria-label="Opaca, a fluffy alpaca wearing a green bandana"><WatercolorSprite tile={7} /></span>
            </figure>
            <figure className={styles.companion}>
              <img src="/panchita-watercolor.webp" alt="Panchita, a fluffy cream alpaca with a pink bow, painted in watercolor" width="116" height="116" />
            </figure>
          </div>
        </section>
        <section className={styles.destinations} aria-labelledby="social-title">
          <div className={styles.sectionHeading}><h2 id="social-title">Find me around the internet</h2><span aria-hidden="true">↗</span></div>
          <ul className={styles.socials}>
            {socials.map(({ label, handle, href, Icon }) => (
              <li key={label}>
                <a href={href} target="_blank" rel="noopener noreferrer">
                  <span className={styles.icon}><Icon size={23} aria-hidden="true" /></span>
                  <span className={styles.linkText}><strong>{label}</strong><span>{handle}</span></span>
                  <ArrowUpRight className={styles.arrow} size={20} aria-hidden="true" />
                  <span className={styles.srOnly}> (opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
          <a className={styles.email} href="mailto:courtneythko@gmail.com"><Mail size={20} aria-hidden="true" /><span>Say hello<span>courtneythko@gmail.com</span></span><ArrowUpRight size={20} aria-hidden="true" /></a>
          <nav className={styles.explore} aria-label="More from Courtney">
            <Link href="/">Explore my work <ArrowUpRight size={15} aria-hidden="true" /></Link>
            <Link href="/paca-village/">Visit Paca Village <ArrowUpRight size={15} aria-hidden="true" /></Link>
          </nav>
        </section>
      </main>
      <footer className={styles.footer}><span>Courtney Ko</span><Link href="/">courtneyko.com</Link></footer>
    </div>
  );
}
