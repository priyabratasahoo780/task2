function About() {
    return (
        <div className="about-page">
            <div className="about-hero">
                <h1 className="about-title">About Nexora</h1>
                <p className="about-subtitle">
                    A production-ready Mini eCommerce experience — modern, fast, and beautiful.
                </p>
            </div>

            <div className="about-cards">
                <div className="about-card">
                    <span className="about-icon">🌐</span>
                    <h2>FakeStore API</h2>
                    <p>
                        All product data is fetched in real-time from{' '}
                        <a
                            href="https://fakestoreapi.com"
                            target="_blank"
                            rel="noreferrer"
                            className="about-link"
                        >
                            FakeStore API
                        </a>
                        . It provides realistic e-commerce data including products,
                        categories, prices, and images — perfect for prototyping.
                    </p>
                </div>

                <div className="about-card">
                    <span className="about-icon">⚛️</span>
                    <h2>React Context API</h2>
                    <p>
                        The shopping cart is managed globally using React's built-in{' '}
                        <strong>Context API</strong> with <code>createContext</code> and{' '}
                        <code>useContext</code>. This allows any component to access and
                        modify the cart without prop-drilling.
                    </p>
                </div>

                <div className="about-card">
                    <span className="about-icon">💾</span>
                    <h2>localStorage Persistence</h2>
                    <p>
                        Your cart is automatically saved to <strong>localStorage</strong>{' '}
                        and restored on every page load. Add items, refresh the browser —
                        your cart will always be there waiting for you.
                    </p>
                </div>

                <div className="about-card">
                    <span className="about-icon">🗺️</span>
                    <h2>React Router v6</h2>
                    <p>
                        Navigation is handled by <strong>React Router v6</strong> using{' '}
                        <code>BrowserRouter</code>, <code>Routes</code>, <code>Route</code>,
                        and <code>NavLink</code>. Pages switch instantly without any full
                        page refresh.
                    </p>
                </div>

                <div className="about-card">
                    <span className="about-icon">🎣</span>
                    <h2>React Hooks</h2>
                    <p>
                        Built exclusively with functional components and hooks:{' '}
                        <code>useState</code>, <code>useEffect</code>,{' '}
                        <code>useContext</code>, and <code>createContext</code>. No class
                        components, no Redux — clean and modern React.
                    </p>
                </div>

                <div className="about-card">
                    <span className="about-icon">🛡️</span>
                    <h2>Stability & Quality</h2>
                    <p>
                        Defensive coding throughout: proper <code>useEffect</code>{' '}
                        dependencies, optional chaining, loading and error states, and
                        graceful handling of empty localStorage — production-quality code.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default About;
