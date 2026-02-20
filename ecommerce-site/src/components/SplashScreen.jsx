import { useState, useEffect } from 'react';

const QUOTES = [
    { text: "Style isn't what you wear — it's how you live.", author: "NEXORA" },
];

function SplashScreen({ onDone }) {
    const [fading, setFading] = useState(false);

    useEffect(() => {
        // Start fade-out at 2s, fully gone at 2.5s
        const fadeTimer = setTimeout(() => setFading(true), 2000);
        const doneTimer = setTimeout(() => onDone(), 2600);
        return () => {
            clearTimeout(fadeTimer);
            clearTimeout(doneTimer);
        };
    }, [onDone]);

    const { text, author } = QUOTES[0];

    return (
        <div className={`splash-screen ${fading ? 'splash-fade-out' : ''}`} aria-live="polite">
            <div className="splash-content">
                {/* Brand mark */}
                <div className="splash-brand">
                    <svg className="splash-logo-icon" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <path d="M6 11h20l-2.5 14H8.5L6 11Z" fill="url(#splashGrad)" opacity="0.92" />
                        <path d="M11 11V9a5 5 0 0 1 10 0v2" stroke="url(#splashGrad)" strokeWidth="2.2" strokeLinecap="round" fill="none" />
                        <defs>
                            <linearGradient id="splashGrad" x1="6" y1="9" x2="26" y2="25" gradientUnits="userSpaceOnUse">
                                <stop stopColor="#7c6fff" />
                                <stop offset="1" stopColor="#ff6584" />
                            </linearGradient>
                        </defs>
                    </svg>
                    <span className="splash-brand-name">NEXORA</span>
                </div>

                {/* Quote */}
                <blockquote className="splash-quote">
                    <p className="splash-quote-text">"{text}"</p>
                    <cite className="splash-quote-author">— {author}</cite>
                </blockquote>

                {/* Progress bar */}
                <div className="splash-progress">
                    <div className="splash-progress-bar" />
                </div>
            </div>

            {/* Background decoration */}
            <div className="splash-bg" aria-hidden="true">
                <div className="splash-blob splash-blob-1" />
                <div className="splash-blob splash-blob-2" />
            </div>
        </div>
    );
}

export default SplashScreen;
