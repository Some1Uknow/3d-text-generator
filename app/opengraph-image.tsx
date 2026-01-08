import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = '3D Text Generator - Create stunning 3D typography with customizable materials and effects';
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
          background: '#fafafa',
          position: 'relative',
          fontFamily: 'system-ui, -apple-system, sans-serif',
        }}
      >
        {/* Gradient orbs background */}
        <div
          style={{
            position: 'absolute',
            top: -100,
            left: -100,
            width: 500,
            height: 500,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%)',
            filter: 'blur(40px)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: -150,
            right: -150,
            width: 600,
            height: 600,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(236, 72, 153, 0.12) 0%, transparent 70%)',
            filter: 'blur(50px)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            height: 400,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(168, 85, 247, 0.08) 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />

        {/* Main content container */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '60px',
            position: 'relative',
            zIndex: 1,
          }}
        >
          {/* Logo/Icon */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 80,
              height: 80,
              borderRadius: 20,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              marginBottom: 40,
              boxShadow: '0 20px 40px rgba(102, 126, 234, 0.3)',
            }}
          >
            <div
              style={{
                fontSize: 40,
                fontWeight: 900,
                color: 'white',
                letterSpacing: '-0.02em',
              }}
            >
              3D
            </div>
          </div>

          {/* Main 3D Text Display */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 32,
              position: 'relative',
            }}
          >
          
            {/* Main text with gradient */}
            <div
              style={{
                fontSize: 100,
                fontWeight: 900,
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
                letterSpacing: '-0.04em',
                position: 'relative',
              }}
            >
              3D Text Generator
            </div>
          </div>

          {/* Title */}
          <div
            style={{
              fontSize: 42,
              fontWeight: 700,
              color: '#111827',
              marginBottom: 16,
              textAlign: 'center',
              letterSpacing: '-0.02em',
            }}
          >
            Client side and fully private
          </div>

          {/* Subtitle */}
          <div
            style={{
              fontSize: 22,
              color: '#6b7280',
              textAlign: 'center',
              maxWidth: 700,
              lineHeight: 1.4,
              marginBottom: 40,
            }}
          >
            Create stunning 3D typography with customizable materials, lighting, and real-time preview
          </div>

          {/* Feature pills */}
          <div
            style={{
              display: 'flex',
              gap: 12,
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
          >
            {[
              { icon: '✨', text: 'Metallic & Glass', gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
              { icon: '💫', text: 'Neon Effects', gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' },
              { icon: '🎨', text: 'Custom Colors', gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' },
              { icon: '📸', text: 'Export HD', gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' },
            ].map((feature, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '12px 20px',
                  borderRadius: 12,
                  background: 'white',
                  border: '1px solid #e5e7eb',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
                }}
              >
                <div style={{ fontSize: 20 }}>{feature.icon}</div>
                <div
                  style={{
                    fontSize: 16,
                    fontWeight: 600,
                    background: feature.gradient,
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    color: 'transparent',
                  }}
                >
                  {feature.text}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom branding */}
        <div
          style={{
            position: 'absolute',
            bottom: 30,
            left: 0,
            right: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            fontSize: 16,
            color: '#9ca3af',
          }}
        >
          <div
            style={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            }}
          />
          <div>Powered by Three.js & React</div>
        </div>

        {/* Decorative grid pattern */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `
              linear-gradient(rgba(229, 231, 235, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(229, 231, 235, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
            opacity: 0.5,
            pointerEvents: 'none',
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  );
}
