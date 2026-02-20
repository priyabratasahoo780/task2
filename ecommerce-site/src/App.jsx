import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState, useCallback } from 'react';
import { CartProvider } from './context/CartContext';
import { ThemeProvider } from './context/ThemeContext';
import { WishlistProvider } from './context/WishlistContext';
import { ToastProvider } from './context/ToastContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import RouteScrollTop from './components/RouteScrollTop';
import SplashScreen from './components/SplashScreen';
import Products from './pages/Products';
import Cart from './pages/Cart';
import About from './pages/About';
import Wishlist from './pages/Wishlist';
import './styles.css';

function App() {
  const [splashDone, setSplashDone] = useState(false);
  const handleSplashDone = useCallback(() => setSplashDone(true), []);

  return (
    <ThemeProvider>
      <WishlistProvider>
        <CartProvider>
          <ToastProvider>
            {/* Splash screen — shown once on first load */}
            {!splashDone && <SplashScreen onDone={handleSplashDone} />}

            <BrowserRouter>
              <RouteScrollTop />
              <Navbar />
              <main className="main-content">
                <Routes>
                  <Route path="/" element={<Products />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/wishlist" element={<Wishlist />} />
                  <Route path="/about" element={<About />} />
                </Routes>
              </main>
              <Footer />
              <ScrollToTop />
            </BrowserRouter>
          </ToastProvider>
        </CartProvider>
      </WishlistProvider>
    </ThemeProvider>
  );
}

export default App;
