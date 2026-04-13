import { handleFooterBadgesRevalidate } from '@luolink/footer-badges';
import { revalidateTag } from 'next/cache';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  return handleFooterBadgesRevalidate(request, NextResponse, {
    revalidate: (tag) => revalidateTag(tag),
  });
}
