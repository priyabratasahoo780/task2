import { Link } from 'react-router-dom';

/**
 * AnimatedLogo — Nexora brand mark
 * Pure CSS animations: fade-up on load, hover glow + scale, sliding gradient underline.
 * No external animation libraries.
 */
function AnimatedLogo() {
    return (
        <Link to="/" className="alogo" aria-label="Nexora — Go to home">
            {/* Animated shopping bag icon */}
            <span className="alogo-icon" aria-hidden="true">
                <svg
                    className="alogo-svg"
                    viewBox="0 0 36 36"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    {/* Bag body */}
                    <path
                        d="M7 13h22l-2.8 16H9.8L7 13Z"
                        fill="url(#nexGrad)"
                        opacity="0.92"
                    />
                    {/* Handle */}
                    <path
                        d="M13 13V11a5 5 0 0 1 10 0v2"
                        stroke="url(#nexGrad)"
                        strokeWidth="2.4"
                        strokeLinecap="round"
                        fill="none"
                    />
                    {/* Shine dot */}
                    <ellipse cx="14.5" cy="20" rx="2.2" ry="1.4" fill="white" opacity="0.2" />
                    <defs>
                        <linearGradient id="nexGrad" x1="7" y1="9" x2="29" y2="29" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#6C5CE7" />
                            <stop offset="1" stopColor="#00B894" />
                        </linearGradient>
                    </defs>
                </svg>
            </span>

            {/* Brand name + animated underline */}
            <span className="alogo-text-wrap">
                <span className="alogo-brand">Nexora</span>
                <span className="alogo-underline" aria-hidden="true" />
            </span>
        </Link>
    );
}

export default AnimatedLogo;
