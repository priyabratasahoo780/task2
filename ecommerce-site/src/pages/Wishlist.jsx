import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

// Wishlist page — simple, dedicated page showing all wishlisted items
import { useWishlist } from '../context/WishlistContext';
import { useToast } from '../context/ToastContext';

function Wishlist() {
    const { wishlist, toggleWishlist } = useWishlist();
    const { addToCart } = useCart();
    const { showToast } = useToast();

    const handleAddToCart = (item) => {
        addToCart(item);
        showToast(`Added to cart — ${item.title.slice(0, 28)}…`, 'success');
    };

    const handleRemove = (item) => {
        toggleWishlist(item);
        showToast('Removed from wishlist', 'wishlist');
    };

    if (wishlist.length === 0) {
        return (
            <div className="cart-empty">
                <span className="empty-icon">♡</span>
                <h2>Your wishlist is empty</h2>
                <p>Save items you love and come back to them anytime.</p>
                <Link to="/" className="btn-shop-now">Browse Products</Link>
            </div>
        );
    }

    return (
        <div className="wishlist-page">
            <h1 className="page-title">My Wishlist ({wishlist.length})</h1>
            <div className="wishlist-grid">
                {wishlist.map((item) => (
                    <div key={item.id} className="wishlist-item">
                        <img src={item.image} alt={item.title} className="wishlist-item-img" />
                        <div className="wishlist-item-info">
                            <p className="wishlist-item-title">{item.title}</p>
                            <p className="wishlist-item-price">${item.price.toFixed(2)}</p>
                        </div>
                        <div className="wishlist-item-actions">
                            <button className="btn-add-to-cart" style={{ margin: 0, padding: '0.5rem 1rem', fontSize: '0.82rem' }} onClick={() => handleAddToCart(item)}>Add to Cart</button>
                            <button className="btn-remove" onClick={() => handleRemove(item)}>Remove</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Wishlist;
