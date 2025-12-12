import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Daniel Oriazowan | Senior Frontend Engineer';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
    // Font loading (Standard fetch)
    // We'll use system fonts or a standard Google Font if we can fetch it.
    // For reliability in edge, we often just use basic flexbox and system fonts or standard built-in.

    return new ImageResponse(
        (
            <div
                style={{
                    background: '#0a0a0a',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'sans-serif',
                    position: 'relative',
                }}
            >
                {/* Abstract Background Mesh */}
                <div style={{
                    position: 'absolute',
                    top: '-20%',
                    left: '-20%',
                    width: '140%',
                    height: '140%',
                    background: 'radial-gradient(circle at 50% 50%, rgba(56, 189, 248, 0.1), transparent 60%)',
                    filter: 'blur(80px)',
                    zIndex: 0,
                }} />

                {/* Content */}
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 10,
                    border: '1px solid rgba(255,255,255,0.1)',
                    padding: '60px 100px',
                    borderRadius: '24px',
                    background: 'rgba(0,0,0,0.4)',
                    boxShadow: '0 0 80px rgba(56, 189, 248, 0.1)',
                }}>
                    {/* Initials / Logo */}
                    <div style={{
                        fontSize: 60,
                        fontWeight: 900,
                        color: '#38bdf8', // primary-400
                        marginBottom: 20,
                        letterSpacing: '-2px',
                    }}>
                        DO
                    </div>

                    {/* Name */}
                    <div style={{
                        fontSize: 72,
                        fontWeight: 800,
                        color: 'white',
                        marginBottom: 10,
                        textAlign: 'center',
                        letterSpacing: '-1px',
                    }}>
                        Daniel Oriazowan
                    </div>

                    {/* Role */}
                    <div style={{
                        fontSize: 32,
                        color: '#94a3b8', // slate-400
                        textAlign: 'center',
                        letterSpacing: '4px',
                        textTransform: 'uppercase',
                    }}>
                        Senior Frontend Engineer
                    </div>

                    {/* Tagline */}
                    <div style={{
                        fontSize: 24,
                        color: '#38bdf8',
                        marginTop: 40,
                        opacity: 0.8,
                    }}>
                        danieloriazowan.com
                    </div>
                </div>
            </div>
        ),
        {
            ...size,
        }
    );
}
