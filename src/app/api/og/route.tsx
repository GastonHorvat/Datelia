import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const title = (searchParams.get('title') ?? 'Datelia').slice(0, 120);
  const subtitle = (searchParams.get('subtitle') ?? '').slice(0, 160);

  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#121212',
          backgroundImage:
            'radial-gradient(ellipse at top right, rgba(45,153,219,0.18), transparent 60%)',
          padding: '80px',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', fontSize: 40, fontWeight: 700, color: '#ffffff' }}>
          datel<span style={{ color: '#2d99db' }}>ia</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div style={{ display: 'flex', width: 72, height: 6, backgroundColor: '#2d99db', borderRadius: 3 }} />
          <div style={{ display: 'flex', fontSize: 58, fontWeight: 700, color: '#ffffff', lineHeight: 1.15, maxWidth: 980 }}>
            {title}
          </div>
          {subtitle && (
            <div style={{ display: 'flex', fontSize: 28, color: 'rgba(255,255,255,0.65)', maxWidth: 900 }}>
              {subtitle}
            </div>
          )}
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
