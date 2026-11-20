import type { Metadata } from "next";
import Link from "next/link";
import { Baloo_2, Be_Vietnam_Pro, Noto_Sans_SC, Quicksand, ZCOOL_KuaiLe } from "next/font/google";
import { InkDefs } from "@/components/InkDefs";
import { Panda } from "@/components/Panda";
import { SiteNav } from "@/components/SiteNav";
import "./globals.css";

const body = Be_Vietnam_Pro({
  variable: "--font-body",
  subsets: ["latin", "latin-ext", "vietnamese"],
  weight: ["400", "500", "600"],
});

// Round, friendly headings with full Vietnamese diacritics.
const display = Baloo_2({
  variable: "--font-display",
  subsets: ["latin", "latin-ext", "vietnamese"],
});

// Pinyin needs its own font: Baloo 2 draws ā ē ī ō ū with a detached macron.
const pinyinFont = Quicksand({
  variable: "--font-pinyin",
  subsets: ["latin", "latin-ext", "vietnamese"],
  weight: ["600", "700"],
});

// CJK fonts are split by Google into many unicode-range files; preloading them all would be wasteful.
const han = Noto_Sans_SC({
  variable: "--font-han",
  weight: ["400", "700"],
  preload: false,
});

// Playful Chinese lettering, decoration only.
const cute = ZCOOL_KuaiLe({
  variable: "--font-cute",
  weight: "400",
  preload: false,
});

export const metadata: Metadata = {
  title: "Luyện nói cùng XiaoQiao",
  description: "Luyện phát âm, thanh điệu và giao tiếp tiếng Trung cho người Việt",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="vi"
      className={`${body.variable} ${display.variable} ${han.variable} ${cute.variable} ${pinyinFont.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <InkDefs />
        <header className="mx-auto flex w-full max-w-5xl flex-wrap items-center justify-between gap-x-6 gap-y-3 px-4 pt-6 sm:px-8">
          <Link href="/" className="group flex items-center gap-2">
            <Panda size={46} className="transition-transform group-hover:-rotate-6" />
            <span className="font-serif text-xl leading-none font-bold">
              Luyện nói cùng <span className="text-seal">XiaoQiao</span>
            </span>
          </Link>
          <SiteNav />
        </header>
        <main className="mx-auto w-full max-w-5xl flex-1 overflow-x-clip px-4 py-10 sm:px-8">{children}</main>
        <footer className="mx-auto w-full max-w-5xl px-4 pb-8 text-xs text-ink-soft sm:px-8">
          <div className="flex flex-wrap justify-between gap-3 border-t-2 border-dashed border-rule pt-4">
            <span>Luyện nói cùng XiaoQiao</span>
            <span>
              Từ vựng HSK: complete-hsk-vocabulary (MIT), CC-CEDICT (CC BY-SA 4.0) ·{" "}
              <Link href="/lab" className="underline decoration-rule underline-offset-4 hover:decoration-ink">
                Phòng thử nghiệm
              </Link>
            </span>
          </div>
        </footer>
      </body>
    </html>
  );
}
