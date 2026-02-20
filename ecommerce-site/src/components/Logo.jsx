function Logo() {
    return (
        <div className="logo" aria-label="Lunexa home">
            <svg
                className="logo-icon"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
            >
                <path d="M6 11h20l-2.5 14H8.5L6 11Z" fill="url(#logoGrad)" opacity="0.92" />
                <path d="M11 11V9a5 5 0 0 1 10 0v2" stroke="url(#logoGrad)" strokeWidth="2.2" strokeLinecap="round" fill="none" />
                <ellipse cx="13" cy="17" rx="2" ry="1.2" fill="white" opacity="0.18" />
                <defs>
                    <linearGradient id="logoGrad" x1="6" y1="9" x2="26" y2="25" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#7c6fff" />
                        <stop offset="1" stopColor="#ff6584" />
                    </linearGradient>
                </defs>
            </svg>
            <span className="logo-wordmark">
                <span className="logo-accent">LUNEXA</span>
            </span>
        </div>
    );
}

export default Logo;
