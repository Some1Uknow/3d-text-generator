import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = '3D Text Generator - Create stunning 3D typography';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        {/* Main content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '80px',
          }}
        >
          {/* 3D Text Mockup */}
          <div
            style={{
              fontSize: 120,
              fontWeight: 900,
              background: 'linear-gradient(90deg, #fff 0%, #e0e7ff 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              textShadow: '4px 4px 0px rgba(0,0,0,0.1)',
              marginBottom: 40,
              letterSpacing: '-0.02em',
            }}
          >
            3D Text
          </div>

          {/* Title */}
          <div
            style={{
              fontSize: 48,
              fontWeight: 700,
              color: 'white',
              marginBottom: 20,
              textAlign: 'center',
            }}
          >
            3D Text Generator
          </div>

          {/* Subtitle */}
          <div
            style={{
              fontSize: 28,
              color: 'rgba(255,255,255,0.9)',
              textAlign: 'center',
              maxWidth: 800,
            }}
          >
            Create stunning 3D typography with customizable materials, lighting, and effects
          </div>

          {/* Features */}
          <div
            style={{
              display: 'flex',
              gap: 30,
              marginTop: 50,
              fontSize: 20,
              color: 'rgba(255,255,255,0.85)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: 'white',
                }}
              />
              Metallic & Glass Materials
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: 'white',
                }}
              />
              Neon Effects
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: 'white',
                }}
              />
              Export as PNG/JPEG
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
