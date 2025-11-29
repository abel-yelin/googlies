import type { Metadata } from 'next'
import { BrainrotScanner } from './scanner-client'

export const metadata: Metadata = {
  title: 'Brainrot Link Scanner | Check viral links safely',
  description:
    'Scan suspicious shortlinks and viral bait URLs before you click. Spot risky domains, overloaded tracking params, and brainrot buzzwords in seconds.',
  keywords: [
    'brainrot link scanner',
    'viral link checker',
    'shortlink safety',
    'malicious link detector',
    'safe browsing',
  ],
  alternates: { canonical: '/brainrot-link-scanner' },
  openGraph: {
    title: 'Brainrot Link Scanner | Check viral links safely',
    description:
      'Viral link? Drop it in the Brainrot Link Scanner and get a quick risk readout before you click.',
    url: 'https://googlies.xyz/brainrot-link-scanner',
    siteName: 'Googlies',
    type: 'website',
  },
}

export default function BrainrotLinkScannerPage() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-100">
      <div
        className="pointer-events-none absolute inset-x-0 -top-24 -z-10 h-64 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.25),transparent_35%),radial-gradient(circle_at_80%_30%,rgba(99,102,241,0.25),transparent_30%),radial-gradient(circle_at_50%_60%,rgba(14,165,233,0.2),transparent_25%)] blur-3xl"
        aria-hidden
      />
      <div className="container mx-auto space-y-16 px-4 py-16 md:px-6 lg:py-20">
        <section className="grid items-center gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div className="space-y-6">
            <p className="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-700 shadow-sm ring-1 ring-slate-200">
              Brainrot defense mode
            </p>
            <div className="space-y-4">
              <h1 className="text-4xl font-bold leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
                Brainrot Link Scanner
              </h1>
              <p className="max-w-2xl text-lg text-slate-700">
                Drop any viral-looking link and get a rapid, human-readable safety verdict. We spotlight risky
                domains, shady tracking parameters, and click-bait language before you commit.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-sm backdrop-blur">
                <p className="text-sm font-semibold text-slate-900">What we flag</p>
                <p className="mt-2 text-sm text-slate-600">
                  Suspicious TLDs, overloaded query strings, meme-bait keywords, and bare IP redirects.
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-blue-600 via-indigo-500 to-sky-400 p-[1px] shadow-sm">
                <div className="h-full rounded-[14px] bg-white/90 p-4">
                  <p className="text-sm font-semibold text-slate-900">SEO-friendly snapshot</p>
                  <p className="mt-2 text-sm text-slate-600">
                    Clear headings, rich copy, and a shareable report designed to surface in search.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative rounded-3xl border border-slate-200 bg-white/80 p-8 shadow-xl backdrop-blur">
            <div className="absolute inset-x-6 -top-10 h-20 rounded-full bg-gradient-to-r from-sky-400/50 via-indigo-500/50 to-fuchsia-400/40 blur-2xl" />
            <div className="relative space-y-4">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-700">Live checker</p>
              <p className="text-3xl font-bold text-slate-900">Drop a link. Watch the verdict.</p>
              <p className="text-sm text-slate-600">
                Built for social DMs and chaotic group chats. No downloads, no guessing—just a fast risk readout.
              </p>
              <ul className="grid gap-3 text-sm text-slate-700">
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-2 w-2 rounded-full bg-emerald-500" aria-hidden />
                  <span>Scans for high-risk endings like .zip, .click, .xyz, and .buzz.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-2 w-2 rounded-full bg-amber-500" aria-hidden />
                  <span>Counts tracking params and messy redirects so you can spot bait.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-2 w-2 rounded-full bg-blue-500" aria-hidden />
                  <span>Highlights meme-driven keywords that drive the latest brainrot clicks.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <BrainrotScanner />

        <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6 rounded-3xl border border-slate-200 bg-white/90 p-8 shadow-lg backdrop-blur">
            <h2 className="text-2xl font-bold text-slate-900">What makes a link feel brainrot?</h2>
            <p className="text-slate-700">
              Brainrot links thrive on urgency, novelty, and odd phrasing. They often hide behind shorteners, odd
              TLDs, or query strings that look like marketing spaghetti. This page favors descriptive headings,
              actionable copy, and dense semantic text to stay visible to people and search engines.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { title: 'Keyword stuffing', body: 'Phrases like “free drop”, “shock meme”, or “secret leak” show up in the URL path.' },
                { title: 'Shortener dependence', body: 'bit.ly, t.ly, and other redirectors conceal where a click will end.' },
                { title: 'Overbuilt params', body: 'More than three tracking parameters usually signals a hastily copied promo link.' },
                { title: 'Bare IP redirects', body: 'If the host is only numbers, you lose context and certificate transparency.' },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-slate-200/80 bg-slate-50/80 p-4 shadow-sm"
                >
                  <p className="text-sm font-semibold text-slate-900">{item.title}</p>
                  <p className="mt-2 text-sm text-slate-700">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-5 rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 p-8 text-white shadow-2xl">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <h3 className="text-lg font-semibold">SEO-minded layout</h3>
              <p className="mt-2 text-sm text-slate-200">
                Semantic headings, descriptive alt text, and focused copy make this tool discoverable for searches like
                “brainrot link scanner”, “viral link checker”, and “is this shortlink safe”.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                <p className="text-sm font-semibold text-white">Fast clarity</p>
                <p className="mt-1 text-sm text-slate-200">Clear verdicts and rationale mean people stay on-page.</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                <p className="text-sm font-semibold text-white">Sharable evidence</p>
                <p className="mt-1 text-sm text-slate-200">Each scan lists concrete signals you can paste in chat.</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                <p className="text-sm font-semibold text-white">Mobile-first</p>
                <p className="mt-1 text-sm text-slate-200">Responsive layout keeps reports readable on the go.</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                <p className="text-sm font-semibold text-white">Privacy-first</p>
                <p className="mt-1 text-sm text-slate-200">Analysis runs in-browser—no link is sent to a server.</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
