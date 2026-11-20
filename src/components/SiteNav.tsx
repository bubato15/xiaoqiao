"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/tones", label: "Thanh điệu" },
  { href: "/hsk", label: "Bài học" },
  { href: "/practice", label: "Bài tập" },
  { href: "/talk", label: "Hội thoại" },
  { href: "/level", label: "Đo trình độ" },
];

export function SiteNav() {
  const path = usePathname();
  return (
    <nav aria-label="Chính" className="flex flex-wrap gap-1 text-sm font-medium sm:gap-2">
      {LINKS.map((l) => {
        const active = path === l.href || path.startsWith(`${l.href}/`);
        return (
          <Link
            key={l.href}
            href={l.href}
            aria-current={active ? "page" : undefined}
            className={`rounded-full border-2 px-2.5 py-1.5 whitespace-nowrap transition-colors sm:px-4 ${
              active ? "border-ink bg-peach" : "border-transparent hover:border-rule hover:bg-paper-deep"
            }`}
          >
            {l.label}
          </Link>
        );
      })}
    </nav>
  );
}
