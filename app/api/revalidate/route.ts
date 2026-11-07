import { revalidateTag, revalidatePath } from 'next/cache';
import { type NextRequest, NextResponse } from 'next/server';

/**
 * On-Demand Revalidation Webhook Handler
 * Menerima webhook dari Sanity saat ada konten yang dipublish / diedit / dihapus.
 *
 * Penggunaan:
 * - POST /api/revalidate (Webhook Sanity dengan Body dokumen)
 * - GET  /api/revalidate?secret=YOUR_SECRET (Manual purge test dari browser)
 */
export async function POST(req: NextRequest) {
  try {
    const secret = req.nextUrl.searchParams.get('secret') || req.headers.get('x-webhook-secret');
    const expectedSecret = process.env.SANITY_REVALIDATE_SECRET;

    // Verifikasi secret token jika disetel di environment
    if (expectedSecret && secret !== expectedSecret) {
      return NextResponse.json({ message: 'Invalid secret token' }, { status: 401 });
    }

    let body: any = null;
    try {
      body = await req.json();
    } catch {}

    const documentType = body?._type;

    // 1. Revalidasi tag global portfolio-content
    revalidateTag('portfolio-content');

    // 2. Revalidasi tag spesifik berdasarkan tipe dokumen jika ada
    if (documentType) {
      revalidateTag(documentType);
    }

    // 3. Purge cache path halaman utama dan arsip proyek
    revalidatePath('/');
    revalidatePath('/proyek');

    return NextResponse.json({
      revalidated: true,
      now: Date.now(),
      documentType: documentType || 'all',
      message: 'Cache successfully purged for portfolio-content and routes / and /proyek',
    });
  } catch (err: any) {
    return NextResponse.json(
      { message: 'Error revalidating', error: err?.message || 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get('secret');
  const expectedSecret = process.env.SANITY_REVALIDATE_SECRET;

  if (expectedSecret && secret !== expectedSecret) {
    return NextResponse.json({ message: 'Invalid secret token' }, { status: 401 });
  }

  revalidateTag('portfolio-content');
  revalidatePath('/');
  revalidatePath('/proyek');

  return NextResponse.json({
    revalidated: true,
    now: Date.now(),
    message: 'Cache successfully purged on-demand via GET',
  });
}
