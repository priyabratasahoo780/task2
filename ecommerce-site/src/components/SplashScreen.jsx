import { useState, useEffect } from 'react';

function SplashScreen({ onDone }) {
    const [fading, setFading] = useState(false);

    useEffect(() => {
        const fadeTimer = setTimeout(() => setFading(true), 1800);
        const doneTimer = setTimeout(() => onDone(), 2300);
        return () => {
            clearTimeout(fadeTimer);
            clearTimeout(doneTimer);
        };
    }, [onDone]);

    return (
        <div
            className="splash-screen"
            style={{
                position: 'fixed', inset: 0, zIndex: 9999,
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center',
                background: 'var(--bg)',
                transition: 'opacity 0.5s ease',
                opacity: fading ? 0 : 1,
                pointerEvents: fading ? 'none' : 'all',
            }}
            aria-live="polite"
        >
            <div className="splash-logo">NEXORA</div>
            <div className="splash-spinner" />
            <p style={{ marginTop: '1.5rem', color: 'var(--text-faint)', fontSize: '0.8rem', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                Style isn't what you wear — it's how you live.
            </p>
        </div>
    );
}

export default SplashScreen;
