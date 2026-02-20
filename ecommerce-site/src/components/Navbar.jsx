import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';
import { useWishlist } from '../context/WishlistContext';
import AnimatedLogo from './AnimatedLogo.jsx';

function Navbar() {
    const { totalItems } = useCart();
    const { theme, toggleTheme } = useTheme();
    const { totalWishlisted } = useWishlist();
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    // Scroll shadow effect
    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const closeMenu = () => setMenuOpen(false);

    return (
        <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
            {/* Brand / Logo */}
            <AnimatedLogo />

            {/* Desktop nav links */}
            <ul className={`nav-links ${menuOpen ? 'nav-open' : ''}`}>
                <li>
                    <NavLink to="/" end
                        className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
                        onClick={closeMenu}
                    >
                        Products
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/cart"
                        className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
                        onClick={closeMenu}
                    >
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
                            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                        </svg>
                        Cart
                        {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/wishlist"
                        className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
                        onClick={closeMenu}
                    >
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                        </svg>
                        Wishlist
                        {totalWishlisted > 0 && <span className="cart-badge wishlist-badge">{totalWishlisted}</span>}
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/about"
                        className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
                        onClick={closeMenu}
                    >
                        About
                    </NavLink>
                </li>
                <li className="nav-theme-item">
                    <button className="btn-theme-toggle" onClick={() => { toggleTheme(); closeMenu(); }}
                        aria-label="Toggle theme"
                        title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                    >
                        {theme === 'dark' ? '☀️' : '🌙'}
                    </button>
                </li>
            </ul>

            {/* Mobile: theme + hamburger */}
            <div className="navbar-mobile-actions">
                <button className="btn-theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
                    {theme === 'dark' ? '☀️' : '🌙'}
                </button>
                <button
                    className={`hamburger ${menuOpen ? 'open' : ''}`}
                    onClick={() => setMenuOpen((p) => !p)}
                    aria-label="Toggle navigation menu"
                    aria-expanded={menuOpen}
                >
                    <span /><span /><span />
                </button>
            </div>

            {menuOpen && <div className="nav-overlay" onClick={closeMenu} aria-hidden="true" />}
        </nav>
    );
}

export default Navbar;
