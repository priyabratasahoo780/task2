import { NavLink } from 'react-router-dom';

function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="footer-inner">
                {/* Brand */}
                <div className="footer-brand">
                    <span className="footer-logo">NEXORA</span>
                    <p className="footer-tagline">Shop the future. Wear tomorrow.</p>
                </div>

                {/* Links */}
                <div className="footer-links">
                    <div className="footer-col">
                        <h4 className="footer-col-title">Shop</h4>
                        <ul>
                            <li><NavLink to="/" end className="footer-link">All Products</NavLink></li>
                            <li><NavLink to="/cart" className="footer-link">My Cart</NavLink></li>
                            <li><NavLink to="/wishlist" className="footer-link">Wishlist</NavLink></li>
                        </ul>
                    </div>
                    <div className="footer-col">
                        <h4 className="footer-col-title">Company</h4>
                        <ul>
                            <li><NavLink to="/about" className="footer-link">About Us</NavLink></li>
                            <li><a href="https://fakestoreapi.com" target="_blank" rel="noreferrer" className="footer-link">FakeStore API</a></li>
                        </ul>
                    </div>
                    <div className="footer-col">
                        <h4 className="footer-col-title">Built With</h4>
                        <ul>
                            <li><span className="footer-tag">React 19</span></li>
                            <li><span className="footer-tag">React Router v6</span></li>
                            <li><span className="footer-tag">Context API</span></li>
                            <li><span className="footer-tag">localStorage</span></li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <p>© {year} NEXORA. Style isn't what you wear — it's how you live.</p>
            </div>
        </footer>
    );
}

export default Footer;
