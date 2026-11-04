"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";

const GA_ID = "G-NCMQCSCFZP";

export default function SiteAnalytics() {
  const pathname = usePathname();
  // Personal gratitude cards carry their content in the URL fragment.
  // Never load analytics on their composer or recipient page.
  if (!pathname || pathname.startsWith("/paca-village/holiday/gratitude-garden/thanks")) return null;
  return <>
    <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
    <Script id="ga-init" strategy="afterInteractive">{`
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${GA_ID}', {
        page_location: window.location.origin + window.location.pathname + window.location.search
      });
    `}</Script>
  </>;
}
