'use client'

import { useMemo, useState } from 'react'
import {
  AlertTriangle,
  CheckCircle2,
  Link2,
  ShieldAlert,
  Sparkles,
  Zap,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

type Severity = 'low' | 'medium' | 'high'

type Signal = {
  title: string
  detail: string
  severity: Severity
}

type ScanResult = {
  url: string
  domain: string
  protocol: string
  verdict: 'Likely safe to preview' | 'Use caution' | 'Probably risky'
  score: number
  signals: Signal[]
  keywordHits: string[]
  paramsCount: number
  pathDepth: number
  recommendations: string[]
}

const presets = [
  'https://stealabrainrot.games/brainrot-link-scanner',
  'https://click-skibidi.biz/claim?utm=shock&giveaway=true',
  'http://198.51.100.42/free-drop',
  'https://bit.ly/viral-surprise',
]

const suspiciousTlds = [
  '.zip',
  '.xyz',
  '.click',
  '.buzz',
  '.top',
  '.monster',
  '.live',
  '.cam',
  '.rest',
  '.work',
  '.ru',
  '.su',
]

const shorteners = ['bit.ly', 't.ly', 'tinyurl.com', 'cutt.ly', 'rb.gy', 'ow.ly']

const brainrotWords = [
  'brainrot',
  'skibidi',
  'rizz',
  'sigma',
  'gyatt',
  'fanum',
  'viral',
  'shock',
  'leak',
  'drop',
  'free',
  'giveaway',
  'exclusive',
  'secret',
  'meme',
]

function clampScore(score: number) {
  return Math.max(5, Math.min(100, Math.round(score)))
}

function analyzeLink(raw: string): ScanResult | { error: string } {
  const normalized = raw.trim()
  if (!normalized) {
    return { error: 'Paste a link to scan.' }
  }

  const hydrated = /^https?:\/\//i.test(normalized) ? normalized : `https://${normalized}`

  let parsed: URL
  try {
    parsed = new URL(hydrated)
  } catch {
    return { error: 'Enter a valid URL with a domain name.' }
  }

  const domain = parsed.hostname.toLowerCase()
  const protocol = parsed.protocol.replace(':', '')
  const paramsCount = Array.from(parsed.searchParams.keys()).length
  const pathDepth = parsed.pathname.split('/').filter(Boolean).length
  const tld = domain.includes('.') ? domain.slice(domain.lastIndexOf('.')) : ''
  const keywordHits = brainrotWords.filter((word) => parsed.href.toLowerCase().includes(word))

  let score = 100
  const signals: Signal[] = []

  const addSignal = (condition: boolean, severity: Severity, title: string, detail: string, penalty: number) => {
    if (condition) {
      signals.push({ title, detail, severity })
      score -= penalty
    }
  }

  addSignal(protocol !== 'https', 'high', 'Not using HTTPS', 'HTTP links are easier to spoof and lack TLS protection.', 15)
  addSignal(suspiciousTlds.includes(tld), 'high', `High-risk TLD (${tld || 'unknown'})`, 'Uncommon endings are frequently used in spam or throwaway redirects.', 18)
  addSignal(
    shorteners.some((short) => domain === short || domain.endsWith(`.${short}`)),
    'medium',
    'Shortener or redirect in front',
    'Shorteners mask the destination and can chain multiple redirects.',
    12,
  )
  addSignal(
    /^\d{1,3}(\.\d{1,3}){3}$/.test(domain),
    'high',
    'Bare IP address as host',
    'Numeric hosts remove human-readable context and often hide behind quick-spun servers.',
    14,
  )
  addSignal(paramsCount > 3, 'medium', 'Heavy tracking parameters', 'Overloaded query strings suggest copied promo or affiliate spam.', 10)
  addSignal(pathDepth > 4, 'medium', 'Deeply nested path', 'Extra path segments are a common sign of link cloaking or churn.', 8)
  addSignal(domain.length > 24, 'low', 'Very long hostname', 'Overly long hosts can impersonate legitimate services with lookalike text.', 6)
  addSignal(
    (domain.match(/-/g) || []).length > 3,
    'low',
    'Hyphen-heavy hostname',
    'Stacked hyphens often appear in throwaway or spoofed domains.',
    5,
  )
  addSignal(/(.)\1\1/.test(domain.replace(/\./g, '')), 'low', 'Repeating characters in host', 'Repetition is a hallmark of spammy hosts and typo domains.', 4)
  addSignal(keywordHits.length > 0, 'medium', 'Viral bait keywords detected', `Spotted: ${keywordHits.slice(0, 6).join(', ')}`, 12)
  addSignal(
    Boolean(parsed.hash) && parsed.hash.length > 8,
    'low',
    'Hash fragment included',
    'Hash fragments can be used to track or auto-scroll into hidden content.',
    4,
  )
  addSignal(Boolean(parsed.username || parsed.password), 'high', 'Contains inline credentials', 'URLs with usernames or passwords are almost always malicious.', 16)

  const finalScore = clampScore(score)

  const verdict =
    finalScore >= 75 ? 'Likely safe to preview' : finalScore >= 55 ? 'Use caution' : 'Probably risky'

  const recommendations: string[] = [
    'Hover before clicking to confirm the landing domain.',
    'Open suspicious links in a throwaway browser profile.',
    'Ask the sender for a plain-text, non-shortened URL.',
  ]

  if (protocol !== 'https') {
    recommendations.unshift('Request an HTTPS version of the link before opening.')
  }
  if (keywordHits.length > 0) {
    recommendations.unshift('Ignore “too good to be true” language and verify the source independently.')
  }
  if (finalScore < 55) {
    recommendations.unshift('Do not log in or enter credentials on this destination.')
  }

  return {
    url: parsed.href,
    domain,
    protocol,
    verdict,
    score: finalScore,
    signals,
    keywordHits,
    paramsCount,
    pathDepth,
    recommendations,
  }
}

const severityStyles: Record<Severity, string> = {
  high: 'bg-red-50 text-red-700 border-red-100',
  medium: 'bg-amber-50 text-amber-700 border-amber-100',
  low: 'bg-emerald-50 text-emerald-700 border-emerald-100',
}

const verdictStyles = {
  'Likely safe to preview': {
    bg: 'from-emerald-100 via-emerald-50 to-white',
    text: 'text-emerald-900',
    icon: CheckCircle2,
  },
  'Use caution': {
    bg: 'from-amber-100 via-amber-50 to-white',
    text: 'text-amber-900',
    icon: AlertTriangle,
  },
  'Probably risky': {
    bg: 'from-red-100 via-red-50 to-white',
    text: 'text-red-900',
    icon: ShieldAlert,
  },
}

export function BrainrotScanner() {
  const [input, setInput] = useState('')
  const [result, setResult] = useState<ScanResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const statusColor = useMemo(() => {
    if (!result) return 'bg-slate-200'
    if (result.score >= 75) return 'bg-emerald-500'
    if (result.score >= 55) return 'bg-amber-500'
    return 'bg-red-500'
  }, [result])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const analysis = analyzeLink(input)
    if ('error' in analysis) {
      setError(analysis.error)
      setResult(null)
      return
    }
    setError(null)
    setResult(analysis)
  }

  return (
    <div className="space-y-6" id="scanner">
      <Card className="rounded-3xl border-slate-200 bg-white/90 shadow-2xl backdrop-blur">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-700">
            <Sparkles className="h-4 w-4 text-indigo-500" aria-hidden />
            In-browser analysis
          </div>
          <CardTitle className="text-2xl font-bold text-slate-900">Scan a link before you click</CardTitle>
          <p className="text-sm text-slate-600">
            Nothing is sent to a server. We parse the URL locally, check for sketchy patterns, and explain the verdict
            in plain language.
          </p>
        </CardHeader>
        <CardContent className="space-y-5">
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="flex flex-col gap-3 md:flex-row">
              <div className="flex-1">
                <label htmlFor="brainrot-link" className="sr-only">
                  Link to scan
                </label>
                <Input
                  id="brainrot-link"
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  placeholder="https://example.com/brainrot-link"
                  className="h-12 text-base"
                  inputMode="url"
                  autoComplete="off"
                />
              </div>
              <Button type="submit" size="lg" className="h-12 min-w-[140px] text-base">
                Scan link
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 text-xs text-slate-600">
              <span className="mr-1 inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 font-semibold uppercase tracking-[0.12em] text-slate-700">
                Try samples
              </span>
              {presets.map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setInput(preset)}
                  className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 transition hover:border-slate-300 hover:bg-white"
                >
                  {preset.replace(/^https?:\/\//, '')}
                </button>
              ))}
            </div>
          </form>
          {error && (
            <div className="flex items-center gap-2 rounded-xl border border-red-100 bg-red-50 px-3 py-2 text-sm text-red-700">
              <AlertTriangle className="h-4 w-4" aria-hidden />
              <span>{error}</span>
            </div>
          )}
        </CardContent>
      </Card>

      {result && (
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <Card className="rounded-3xl border-slate-200 bg-gradient-to-br shadow-xl backdrop-blur">
            <CardHeader className="space-y-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-600">Verdict</p>
                  <div className="flex items-center gap-3">
                    {(() => {
                      const config = verdictStyles[result.verdict]
                      const Icon = config.icon
                      return (
                        <span
                          className={cn(
                            'inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-semibold shadow-sm',
                            config.text,
                            'bg-gradient-to-r',
                            config.bg,
                          )}
                        >
                          <Icon className="h-4 w-4" aria-hidden />
                          {result.verdict}
                        </span>
                      )
                    })()}
                    <span className="text-sm text-slate-600">{result.domain}</span>
                  </div>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white/70 px-4 py-3 text-right shadow-sm backdrop-blur">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-600">Score</p>
                  <p className="text-3xl font-bold text-slate-900">{result.score}</p>
                  <p className="text-xs text-slate-600">Higher is safer</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-3 w-full rounded-full bg-slate-200">
                  <div
                    className={cn('h-3 rounded-full transition-all', statusColor)}
                    style={{ width: `${result.score}%` }}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-valuenow={result.score}
                    role="progressbar"
                  />
                </div>
                <div className="flex justify-between text-xs text-slate-500">
                  <span>0</span>
                  <span>50</span>
                  <span>100</span>
                </div>
              </div>
              <p className="text-sm text-slate-700">
                This scan surfaced {result.signals.length} signal{result.signals.length === 1 ? '' : 's'} across the
                domain, path, and query string. Use the notes below to brief your friends before they click.
              </p>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                <InfoStat label="Protocol" value={result.protocol.toUpperCase()} />
                <InfoStat label="Query params" value={String(result.paramsCount)} />
                <InfoStat label="Path depth" value={String(result.pathDepth)} />
                <InfoStat label="Keywords hit" value={result.keywordHits.length ? result.keywordHits.slice(0, 3).join(', ') : 'None'} />
              </div>

              {result.keywordHits.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {result.keywordHits.map((word) => (
                    <span
                      key={word}
                      className="inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-800"
                    >
                      <Zap className="h-3 w-3" aria-hidden />
                      {word}
                    </span>
                  ))}
                </div>
              )}

              <div className="space-y-2">
                <p className="text-sm font-semibold text-slate-900">Next steps</p>
                <ul className="grid gap-2 sm:grid-cols-2">
                  {result.recommendations.map((tip) => (
                    <li
                      key={tip}
                      className="flex items-start gap-2 rounded-xl border border-slate-200/80 bg-white/80 px-3 py-2 text-sm text-slate-700 shadow-sm"
                    >
                      <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-500" aria-hidden />
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-3xl border-slate-200 bg-white/90 shadow-xl backdrop-blur">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-700">
                <Link2 className="h-4 w-4 text-indigo-500" aria-hidden />
                Signals spotted
              </div>
              <CardTitle className="text-xl font-semibold text-slate-900">Why this verdict?</CardTitle>
              <p className="text-sm text-slate-600">
                Each signal is weighted. High severity items cut the score the most; low severity items nudge it down
                for awareness.
              </p>
            </CardHeader>
            <CardContent className="space-y-3">
              {result.signals.length === 0 && (
                <div className="flex items-center gap-2 rounded-xl border border-emerald-100 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
                  <CheckCircle2 className="h-4 w-4" aria-hidden />
                  <span>No risky patterns detected. Still, double-check the sender before you click.</span>
                </div>
              )}
              {result.signals.map((signal, index) => (
                <div
                  key={`${signal.title}-${index}`}
                  className={cn(
                    'flex items-start gap-3 rounded-2xl border px-4 py-3 shadow-sm',
                    severityStyles[signal.severity],
                  )}
                >
                  <span className="mt-1 inline-flex h-6 min-w-[24px] items-center justify-center rounded-full bg-white/60 px-2 text-xs font-semibold text-slate-900">
                    {index + 1}
                  </span>
                  <div>
                    <p className="font-semibold">{signal.title}</p>
                    <p className="text-sm opacity-90">{signal.detail}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}

function InfoStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 shadow-sm backdrop-blur">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-600">{label}</p>
      <p className="text-base font-semibold text-slate-900">{value}</p>
    </div>
  )
}
