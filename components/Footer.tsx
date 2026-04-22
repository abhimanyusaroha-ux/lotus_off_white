import Link from "next/link";
import { LotusLogoMark } from "./LotusLogoMark";
import LineReveal from "./LineReveal";

const linkColumns = [
  {
    heading: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Portfolio", href: "/portfolio" },
      { label: "Investors", href: "/investors" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    heading: "Investments",
    links: [
      { label: "Completed Projects", href: "/portfolio" },
      { label: "Pre-Development", href: "/portfolio" },
      { label: "Investor Portal", href: "/investors" },
      { label: "Deal Submissions", href: "/contact" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy Policy", href: "/" },
      { label: "Terms of Use", href: "/" },
      { label: "Disclosures", href: "/" },
      { label: "Accredited Investor Notice", href: "/" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="pt-[160px] pb-20 max-[640px]:pt-24 border-t border-gray-200" style={{ paddingBottom: "max(3.5rem, env(safe-area-inset-bottom))" }}>
      <div className="max-w-[1440px] mx-auto px-[120px] max-[1024px]:px-12 max-[640px]:px-6">

        {/* Large wordmark */}
        <div className="grid grid-cols-12 max-[1024px]:grid-cols-1">
          <LineReveal
            as="h2"
            className="col-span-10 max-[1024px]:col-span-1 display-lg font-sans font-bold text-ink"
            stagger={0.08}
            duration={1.1}
          >
            Lotus Property Group
          </LineReveal>
        </div>

        {/* Link columns */}
        <div className="mt-16 grid grid-cols-3 gap-x-8 gap-y-10 max-[640px]:grid-cols-1">
          {linkColumns.map((col) => (
            <div key={col.heading}>
              <p className="caption font-sans text-gray-400 uppercase tracking-[0.1em] mb-5">
                {col.heading}
              </p>
              <ul className="space-y-[10px]">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="body-sm font-sans text-gray-600 hover:text-ink transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="mt-20 max-[640px]:mt-14 border-t border-gray-200" />

        {/* Bottom strip */}
        <div className="mt-8 flex items-center justify-between gap-6 max-[640px]:flex-col max-[640px]:items-start">
          <div className="flex items-start gap-3">
            <LotusLogoMark size={16} className="text-gray-400 flex-shrink-0 mt-[2px]" />
            <p className="body-sm font-sans text-gray-400">
              © 2026 Lotus Property Group LLC · Real Estate Investment Firm · Chicago, IL
            </p>
          </div>
          <div className="flex items-center gap-5 flex-shrink-0">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-gray-400 hover:text-ink transition-colors duration-200"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <rect x="1.5" y="1.5" width="15" height="15" rx="4" stroke="currentColor" strokeWidth="1" />
                <circle cx="9" cy="9" r="3.25" stroke="currentColor" strokeWidth="1" />
                <circle cx="13.25" cy="4.75" r="0.625" fill="currentColor" />
              </svg>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-gray-400 hover:text-ink transition-colors duration-200"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <rect x="1.5" y="1.5" width="15" height="15" rx="2" stroke="currentColor" strokeWidth="1" />
                <line x1="5.5" y1="8" x2="5.5" y2="13" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
                <circle cx="5.5" cy="5.5" r="0.75" fill="currentColor" />
                <path d="M8.5 13V10.5C8.5 9.4 9.3 8.5 10.5 8.5C11.7 8.5 12.5 9.4 12.5 10.5V13" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
