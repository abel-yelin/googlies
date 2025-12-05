import Link from 'next/link'

const metrics = [
  { label: 'Active days', value: '328', detail: 'messages landed' },
  { label: 'Checkpoints', value: '21', detail: 'spikes captured' },
  { label: 'Top mentions', value: '42', detail: 'people that defined the year' },
]

const highlights = [
  {
    title: 'Story-first recap',
    description:
      'Auto-build Spotify-Wrapped style story cards with timelines, heatmaps, and quotable moments you can post without edits.',
  },
  {
    title: 'Privacy-first analytics',
    description:
      'Runs in your browser, keeps sensitive channels redacted, and drops data when you close the tab—no bots left behind.',
  },
  {
    title: 'SaaS-grade reliability',
    description:
      'Versioned templates, export to PNG or share link, and custom brand colors so your Discord Wrapped looks on-brand every time.',
  },
]

const steps = [
  {
    title: 'Checkpoint your Discord Wrapped',
    description:
      'Upload a server export or connect a temporary read-only viewer to snapshot the year without installing a bot.',
  },
  {
    title: 'See Discord Wrapped insights in seconds',
    description:
      'Instant charts for busiest days, streaks, top channels, reaction ratios, and the people who shaped your conversations.',
  },
  {
    title: 'Share or embed anywhere',
    description:
      'Download story cards, copy a 24-hour share link, or embed the recap inside your site or newsletter.',
  },
]

const useCases = [
  {
    title: 'Community leads',
    description:
      'Highlight milestones, reward moderators, and kick off your January town hall with data-backed wins.',
  },
  {
    title: 'Creators and streamers',
    description:
      'Turn Discord energy into sponsor-ready slides, hero stats for socials, and a quick “thank you” post that feels bespoke.',
  },
  {
    title: 'Product and support teams',
    description:
      'Spot channels that need love, celebrate response times, and keep a lightweight archive of the year’s themes.',
  },
]

const faqs = [
  {
    question: 'checkpoint discord wrapped',
    answer:
      'Use the checkpoint flow on this page: upload a Discord export or connect a temporary read-only viewer, and we lock in the year’s highlights without persisting your data.',
  },
  {
    question: 'see discord wrapped',
    answer:
      'Open this page on desktop, tap “Launch Discord Wrapped,” and you’ll see a live preview with your top channels, streaks, and share-ready cards.',
  },
  {
    question: 'how to check discord wrapped',
    answer:
      'Prepare your server export, start the flow, and review the generated cards. You can adjust redactions, regenerate visuals, and download everything as PNGs.',
  },
  {
    question: 'discord wrapped where',
    answer:
      'Your recap lives here at /discord-wrapped. The share link we generate points to the same path and stays live for 24 hours unless you revoke it sooner.',
  },
  {
    question: 'my discord wrapped',
    answer:
      'Each recap is personalized to your servers and DMs. Swap between workspaces, pick the timeframe you want, and keep separate share links for each audience.',
  },
  {
    question: 'how to get to discord wrapped',
    answer:
      'Bookmark https://tiktokwrapped.app/discord-wrapped, hit the CTA, and follow the three-step checklist—no bot installs or code required.',
  },
]

export default function DiscordWrappedPage() {
  return (
    <div className="relative overflow-hidden bg-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 top-0 h-72 w-72 rounded-full bg-cyan-300 opacity-30 blur-3xl" />
        <div className="absolute right-0 top-40 h-80 w-80 rounded-full bg-emerald-200 opacity-40 blur-3xl" />
        <div className="absolute -bottom-24 left-10 h-72 w-72 rounded-full bg-slate-900 opacity-20 blur-3xl" />
      </div>

      <section className="relative container mx-auto px-6 pb-16 pt-12 lg:pt-20">
        <div className="relative grid items-center gap-12 rounded-3xl bg-slate-950 px-8 py-12 text-white shadow-2xl lg:grid-cols-[1.1fr_0.9fr] lg:px-14">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white">
              <span className="h-2 w-2 rounded-full bg-emerald-300" />
              Discord Wrapped 2024 · Private preview
            </div>
            <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Bring the Spotify Wrapped magic to Discord—without bots or friction
            </h1>
            <p className="text-lg text-slate-200">
              Generate a premium, share-ready Discord Wrapped with highlights, story cards, and CTA-ready stats. Everything runs
              in-browser, so your data stays yours.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#get-started"
                className="rounded-full bg-cyan-300 px-6 py-3 text-base font-semibold text-slate-900 shadow-lg transition-transform duration-150 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Launch Discord Wrapped
              </a>
              <Link
                href="#faq"
                className="rounded-full border border-white/30 px-6 py-3 text-base font-semibold text-white transition hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Read the FAQ
              </Link>
            </div>
            <div className="flex flex-wrap gap-3 text-sm text-slate-300">
              <span className="rounded-full bg-white/10 px-3 py-1">No bot installation</span>
              <span className="rounded-full bg-white/10 px-3 py-1">Share-ready cards</span>
              <span className="rounded-full bg-white/10 px-3 py-1">Data drops after export</span>
            </div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur">
            <div className="flex items-center justify-between text-sm text-slate-200">
              <span>Preview</span>
              <span className="rounded-full bg-emerald-300/20 px-3 py-1 text-emerald-100">Story ready</span>
            </div>
            <div className="mt-4 space-y-4">
              <div className="rounded-xl bg-white/5 p-4">
                <p className="text-xs uppercase tracking-wide text-slate-400">Top channel</p>
                <p className="text-lg font-semibold">#checkpoints</p>
                <p className="text-sm text-slate-300">Most active at 9:00 PM UTC · 18% boost vs last month</p>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {metrics.map((metric) => (
                  <div key={metric.label} className="rounded-xl bg-white/5 p-3">
                    <p className="text-sm font-semibold">{metric.value}</p>
                    <p className="text-xs text-slate-300">{metric.label}</p>
                    <p className="text-[11px] text-slate-400">{metric.detail}</p>
                  </div>
                ))}
              </div>
              <div className="rounded-xl bg-white/5 p-4">
                <p className="text-xs uppercase tracking-wide text-slate-400">Share link</p>
                <p className="text-sm text-slate-200">tiktokwrapped.app/discord-wrapped</p>
                <p className="text-xs text-slate-400">Copy once, valid for 24 hours</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-6 pb-16">
        <div className="max-w-3xl space-y-4">
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">Built for modern teams</p>
          <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">A boutique SaaS flow for Discord Wrapped</h2>
          <p className="text-lg text-slate-600">
            Flexible enough for community leads, creators, and product teams—polished enough for sponsors and press. Keep the
            Spotify Wrapped energy while protecting your members.
          </p>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {highlights.map((item) => (
            <div key={item.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
              <h3 className="text-xl font-semibold text-slate-900">{item.title}</h3>
              <p className="mt-3 text-slate-600">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="get-started" className="bg-slate-50 py-16">
        <div className="container mx-auto grid gap-12 px-6 lg:grid-cols-[1fr_0.9fr]">
          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">How it works</p>
            <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">Checkpoint your Discord Wrapped in three steps</h2>
            <p className="text-lg text-slate-600">
              Make it feel like a premium SaaS onboarding: quick, transparent, and privacy-first.
            </p>
            <div className="space-y-5">
              {steps.map((step, index) => (
                <div key={step.title} className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <span className="mt-1 flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 text-sm font-bold text-white">
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">{step.title}</h3>
                    <p className="text-slate-600">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href="#faq"
                className="rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-900 transition hover:-translate-y-0.5 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900"
              >
                Explore common questions
              </a>
              <a
                href="#cta"
                className="rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900"
              >
                Get my recap
              </a>
            </div>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-lg">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-500">Use cases</p>
                <p className="text-2xl font-bold text-slate-900">Where Discord Wrapped shines</p>
              </div>
              <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">Private</span>
            </div>
            <div className="mt-6 space-y-5">
              {useCases.map((useCase) => (
                <div key={useCase.title} className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-sm font-semibold text-slate-900">{useCase.title}</p>
                  <p className="text-sm text-slate-600">{useCase.description}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-2xl bg-slate-900 p-5 text-white">
              <p className="text-sm font-semibold uppercase tracking-wide text-emerald-200">Security</p>
              <p className="mt-2 text-lg font-semibold">No data left behind</p>
              <p className="text-sm text-slate-200">
                Exports stay client-side, and share links expire automatically. Revoke access anytime from your recap dashboard.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-6 py-16">
        <div className="rounded-3xl border border-slate-200 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 px-8 py-12 text-white shadow-2xl lg:px-12">
          <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-center">
            <div className="space-y-4">
              <p className="text-sm font-semibold uppercase tracking-wide text-emerald-200">Share-ready CTA</p>
              <h2 className="text-3xl font-bold sm:text-4xl">
                Turn your Discord Wrapped into a conversion-ready landing card
              </h2>
              <p className="text-lg text-slate-200">
                Export branded hero images, add a CTA button that matches your link-in-bio, and ship the recap to your community in
                minutes.
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href="#cta"
                  className="rounded-full bg-emerald-300 px-6 py-3 text-sm font-semibold text-slate-900 shadow-lg transition hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  Create my share card
                </a>
                <Link
                  href="#faq"
                  className="rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  View FAQ
                </Link>
              </div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur">
              <div className="flex items-center justify-between">
                <p className="text-sm text-slate-200">Share card preview</p>
                <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white">PNG + Link</span>
              </div>
              <div className="mt-4 space-y-3 text-sm text-slate-200">
                <div className="flex items-center justify-between rounded-xl bg-white/5 p-4">
                  <span>Hero stat</span>
                  <span className="font-semibold text-emerald-200">143k reactions</span>
                </div>
                <div className="flex items-center justify-between rounded-xl bg-white/5 p-4">
                  <span>Prime time</span>
                  <span className="font-semibold text-emerald-200">9 PM UTC</span>
                </div>
                <div className="flex items-center justify-between rounded-xl bg-white/5 p-4">
                  <span>CTA</span>
                  <span className="font-semibold text-emerald-200">Join the recap</span>
                </div>
                <p className="text-xs text-slate-300">
                  Copy it to Twitter, Instagram, or your sponsor deck—no resizing needed.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="faq" className="container mx-auto px-6 pb-20">
        <div className="max-w-3xl space-y-3">
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">FAQ</p>
          <p className="text-3xl font-bold text-slate-900 sm:text-4xl">Everything you need to know before sharing</p>
          <p className="text-lg text-slate-600">
            Short answers to the biggest questions about finding, seeing, and sharing your Discord Wrapped.
          </p>
        </div>
        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          {faqs.map((item) => (
            <div key={item.question} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-slate-900">{item.question}</h2>
              <p className="mt-3 text-slate-600">{item.answer}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="cta" className="container mx-auto px-6 pb-24">
        <div className="rounded-3xl border border-slate-200 bg-white px-8 py-12 text-center shadow-lg">
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">Ready to recap?</p>
          <h2 className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">See your Discord Wrapped now</h2>
          <p className="mt-3 text-lg text-slate-600">
            Two-minute setup, no bot required, and a shareable recap you can send to your community today.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <a
              href="#get-started"
              className="rounded-full bg-slate-900 px-6 py-3 text-base font-semibold text-white shadow-lg transition hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900"
            >
              Launch Discord Wrapped
            </a>
            <Link
              href="#faq"
              className="rounded-full border border-slate-300 px-6 py-3 text-base font-semibold text-slate-900 transition hover:-translate-y-0.5 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900"
            >
              Questions? Read the FAQ
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
