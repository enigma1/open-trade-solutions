import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';

export async function GET({ url }: { url: URL }) {
  const src = url.searchParams.get('src');
  const width = parseInt(url.searchParams.get('width') || '300');

  if (!src) {
    return new Response('Missing src', { status: 400 });
  }

  try {
    const filePath = path.join(process.cwd(), 'public', src);
    const buffer = await fs.readFile(filePath);
    const resized = await sharp(buffer)
      .resize(width)
      .avif({ quality: 50 })
      .toBuffer();

    return new Response(new Uint8Array(resized), {
      headers: {
        'Content-Type': 'image/avif',
        'Cache-Control': 'public, max-age=31536000',
      },
    });
  } catch (err) {
    return new Response('Image error', { status: 500 });
  }
}
