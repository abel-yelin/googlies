import type { Metadata } from 'next'
import type { ReactNode } from 'react'

const title = 'Discord Wrapped | Private, share-ready recap for your servers'
const description =
  'Run a Spotify-Wrapped style recap for your Discord activity with privacy-first analytics, highlight cards, and shareable links—no bot install required.'
const url = 'https://tiktokwrapped.app/discord-wrapped'
const ogImage = '/discord-wrapped/og-image.svg'

export const metadata: Metadata = {
  metadataBase: new URL('https://tiktokwrapped.app'),
  title,
  description,
  keywords: [
    'Discord Wrapped',
    'Discord recap',
    'Discord analytics',
    'Spotify Wrapped for Discord',
    'community insights',
    'checkpoint discord wrapped',
    'see discord wrapped',
  ],
  authors: [
    {
      name: 'Googlies Team',
      url: 'https://tiktokwrapped.app',
    },
  ],
  creator: 'Googlies Team',
  publisher: 'Googlies',
  alternates: {
    canonical: '/discord-wrapped',
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title,
    description,
    url,
    siteName: 'Googlies',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: 'Discord Wrapped dashboard preview with share-ready cards',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    site: '@Googlies',
    creator: '@Googlies',
    images: [ogImage],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function DiscordWrappedLayout({
  children,
}: {
  children: ReactNode
}) {
  return <>{children}</>
}
