import { ArrowUpRight, FileText, Github, Instagram, Linkedin, Mail } from 'lucide-react';
import styles from './contactPostOffice.module.css';

function XIcon() {
  return <svg width="21" height="21" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.74l7.73-8.835L1.254 2.25H8.08l4.259 5.63 5.905-5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>;
}

const links = [
  { label: 'LinkedIn', detail: 'Courtney Ko', href: 'https://www.linkedin.com/in/courtney-ko-720b63103/', Icon: Linkedin },
  { label: 'Twitter / X', detail: '@courtneythko', href: 'https://x.com/Courtneythko', Icon: XIcon },
  { label: 'Instagram', detail: '@courtneythko', href: 'https://instagram.com/courtneythko', Icon: Instagram },
  { label: 'GitHub', detail: '@quartneyquo', href: 'https://github.com/quartneyquo', Icon: Github },
  { label: 'Résumé', detail: 'Experience & background · PDF', href: '/Courtney_Ko_Resume.pdf', Icon: FileText },
];

export default function ContactPostOffice() {
  return <section className={styles.postOffice} aria-labelledby="post-office-title" data-placement="contact-popup">
    <div className={styles.intro}>
      <span className={styles.stamp} aria-hidden="true"><Mail size={28} /></span>
      <p className={styles.eyebrow}>A little note goes a long way</p>
      <h2 id="post-office-title">Let’s stay connected.</h2>
      <p>Say hello, find me around the internet, or get to know my work.</p>
    </div>
    <a className={styles.email} href="mailto:courtneythko@gmail.com">
      <Mail size={22} aria-hidden="true" />
      <span><strong>Email Courtney</strong><span>courtneythko@gmail.com</span></span>
      <ArrowUpRight size={20} aria-hidden="true" />
    </a>
    <ul className={styles.links}>
      {links.map(({ label, detail, href, Icon }) => <li key={label}>
        <a href={href} target="_blank" rel="noopener noreferrer">
          <span className={styles.icon}><Icon size={21} aria-hidden="true" /></span>
          <span className={styles.linkText}><strong>{label}</strong><span>{detail}</span></span>
          <ArrowUpRight size={18} aria-hidden="true" />
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      </li>)}
    </ul>
    <p className={styles.note}>Thanks for stopping by my little corner of the world.</p>
  </section>;
}
