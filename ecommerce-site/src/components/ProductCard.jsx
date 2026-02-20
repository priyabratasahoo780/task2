import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useToast } from '../context/ToastContext';
import StarRating from './StarRating';
import QuickViewModal from './QuickViewModal';

function ProductCard({ product, onRecentlyViewed }) {
    const { addToCart, cart } = useCart();
    const { toggleWishlist, isWishlisted } = useWishlist();
    const { showToast } = useToast();

    const [justAdded, setJustAdded] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const alreadyInCart = cart.some((item) => item.id === product.id);
    const wishlisted = isWishlisted(product.id);

    const truncate = (text, maxLen = 48) =>
        text?.length > maxLen ? text.slice(0, maxLen) + '…' : text;

    const handleAddToCart = () => {
        addToCart(product);
        showToast(
            alreadyInCart
                ? `Quantity updated — ${truncate(product.title, 28)}`
                : `Added to cart — ${truncate(product.title, 28)}`,
            'success'
        );
        // Trigger "Added ✓" animation — revert after 1.5s
        if (!alreadyInCart) {
            setJustAdded(true);
            setTimeout(() => setJustAdded(false), 1500);
        }
    };

    const handleWishlist = (e) => {
        e.stopPropagation();
        toggleWishlist(product);
        showToast(
            wishlisted ? 'Removed from wishlist' : 'Added to wishlist ♥',
            'wishlist'
        );
    };

    const handleQuickView = (e) => {
        e.stopPropagation();
        setShowModal(true);
        // Track recently viewed
        onRecentlyViewed?.(product);
    };

    const btnLabel = justAdded ? 'Added ✓' : alreadyInCart ? '✓ In Cart' : 'Add to Cart';
    const btnClass = `btn-add-to-cart ${alreadyInCart ? 'in-cart' : ''} ${justAdded ? 'just-added' : ''}`;

    return (
        <>
            <div className="product-card">
                {/* Wishlist heart */}
                <button
                    className={`btn-wishlist ${wishlisted ? 'wishlisted' : ''}`}
                    onClick={handleWishlist}
                    aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
                >
                    {wishlisted ? '♥' : '♡'}
                </button>

                {/* Image + hover overlay */}
                <div className="product-image-wrapper">
                    <img
                        src={product.image}
                        alt={product.title}
                        className="product-image"
                        loading="lazy"
                    />
                    <div className="product-overlay">
                        <button className="btn-quick-view" onClick={handleQuickView}>
                            Quick View
                        </button>
                    </div>
                </div>

                {/* Info */}
                <div className="product-info">
                    <span className="product-category">{product.category}</span>
                    <h3 className="product-title">{truncate(product.title)}</h3>
                    <StarRating rate={product?.rating?.rate} count={product?.rating?.count} />
                    <p className="product-price">${product.price.toFixed(2)}</p>
                </div>

                <button className={btnClass} onClick={handleAddToCart}>
                    {btnLabel}
                </button>
            </div>

            {/* Quick View Modal (portal-like, rendered in-place — CSS positions it fixed) */}
            {showModal && (
                <QuickViewModal product={product} onClose={() => setShowModal(false)} />
            )}
        </>
    );
}

export default ProductCard;
