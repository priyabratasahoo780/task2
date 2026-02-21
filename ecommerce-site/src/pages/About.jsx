function About() {
    const features = [
        { icon: '🌐', title: 'FakeStore API', desc: 'All product data is fetched in real-time from FakeStore API — realistic e-commerce data with categories, prices, and images.' },
        { icon: '⚛️', title: 'React Context API', desc: 'Cart, Wishlist, Theme, and Toast are managed globally using React Context API — no prop-drilling, no Redux.' },
        { icon: '💾', title: 'localStorage Persistence', desc: 'Your cart and wishlist are automatically saved and restored on every page load — your data is always there.' },
        { icon: '🗺️', title: 'React Router v6', desc: 'Client-side navigation with BrowserRouter, Routes, and NavLink — instant page transitions without full reloads.' },
        { icon: '🎣', title: 'React Hooks', desc: 'Built exclusively with functional components and hooks: useState, useEffect, useMemo, useCallback, and useContext.' },
        { icon: '🛡️', title: 'Production Quality', desc: 'Defensive coding throughout: proper useEffect dependencies, optional chaining, loading/error states, and graceful fallbacks.' },
    ];

    const techStack = ['React 19', 'React Router v6', 'Context API', 'Vite', 'localStorage', 'FakeStore API', 'Inter · Poppins'];

    return (
        <div className="about-page">
            <div className="about-hero">
                <h1>About <span style={{ background: 'var(--accent-grad)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>NEXORA</span></h1>
                <p>A production-ready e-commerce experience — modern, fast, and beautifully crafted with React.</p>
            </div>

            <div className="features-grid">
                {features.map((f) => (
                    <div key={f.title} className="feature-card">
                        <div className="feature-icon">{f.icon}</div>
                        <h3>{f.title}</h3>
                        <p>{f.desc}</p>
                    </div>
                ))}
            </div>

            <div className="tech-stack">
                <h2>Built With</h2>
                <div className="tech-badges">
                    {techStack.map((t) => (
                        <span key={t} className="tech-badge">{t}</span>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default About;
