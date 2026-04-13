import {
  FooterBadgesMarquee,
  getRemoteFooterBadges,
  getRemoteFooterMeta,
} from '@luolink/footer-badges';
import { FOOTER_BADGES_FALLBACK } from '../config/footer-badges';

const DEFAULT_BADGES_CONFIG_URL =
  'https://abel-yelin.github.io/footer-badges-hub/badges.json';

function formatUSDate(date: Date) {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const year = date.getFullYear();
  return `${month}/${day}/${year}`;
}

export async function FooterBadgesSlotServer() {
  const configUrl = process.env.FOOTER_BADGES_CONFIG_URL ?? DEFAULT_BADGES_CONFIG_URL;
  const projectId = process.env.FOOTER_BADGES_PROJECT_ID ?? 'googlies';
  const revalidateSeconds = Number(
    process.env.FOOTER_BADGES_REVALIDATE_SECONDS ?? 3600
  );

  const badges = await getRemoteFooterBadges({
    configUrl,
    projectId,
    fallbackBadges: FOOTER_BADGES_FALLBACK,
    revalidateSeconds,
  });

  const footerMeta = await getRemoteFooterMeta({
    configUrl,
    projectId,
    fallbackMeta: {},
    revalidateSeconds,
  });

  if (badges.length === 0) {
    return null;
  }

  const now = new Date();
  const defaultBrand = 'googlies';
  const copyrightText =
    process.env.FOOTER_BADGES_COPYRIGHT ??
    footerMeta.copyright ??
    `© ${now.getFullYear()} ${defaultBrand}. All Rights Reserved.`;
  const lastUpdatedText =
    process.env.FOOTER_BADGES_LAST_UPDATED ??
    footerMeta.lastUpdated ??
    formatUSDate(now);

  return (
    <section className="border-t border-white/10 bg-[#070a10] text-white">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 px-4 py-4 sm:px-6 lg:px-8">
        <p className="text-sm text-white/75">
          {copyrightText}
          <span className="mx-2 text-white/40">·</span>
          Last updated: {lastUpdatedText}
        </p>
        <div className="rounded-xl border border-white/15 bg-[#0d121c] px-2 py-2">
          <FooterBadgesMarquee
            badges={badges}
            className="w-full"
          />
        </div>
      </div>
    </section>
  );
}
