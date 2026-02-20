import { useEffect, useCallback } from 'react';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import StarRating from './StarRating';

function QuickViewModal({ product, onClose }) {
    const { addToCart, cart } = useCart();
    const { showToast } = useToast();

    const alreadyInCart = cart.some((item) => item.id === product?.id);

    // Close on Escape key
    const handleKeyDown = useCallback(
        (e) => {
            if (e.key === 'Escape') onClose();
        },
        [onClose]
    );

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        // Prevent body scroll while modal is open
        document.body.style.overflow = 'hidden';
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = '';
        };
    }, [handleKeyDown]);

    if (!product) return null;

    const handleAdd = () => {
        addToCart(product);
        showToast(
            alreadyInCart
                ? `Quantity updated — ${product.title.slice(0, 28)}…`
                : `Added to cart — ${product.title.slice(0, 28)}…`,
            'success'
        );
    };

    return (
        <div
            className="modal-overlay"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-label={`Quick view: ${product.title}`}
        >
            <div
                className="modal-panel"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close button */}
                <button className="modal-close" onClick={onClose} aria-label="Close modal">
                    ×
                </button>

                {/* Image */}
                <div className="modal-image-wrap">
                    <img src={product.image} alt={product.title} className="modal-image" />
                </div>

                {/* Details */}
                <div className="modal-details">
                    <span className="product-category">{product.category}</span>
                    <h2 className="modal-title">{product.title}</h2>
                    <StarRating rate={product?.rating?.rate} count={product?.rating?.count} />
                    <p className="modal-price">${product.price.toFixed(2)}</p>
                    <p className="modal-description">{product.description}</p>
                    <button
                        className={`btn-add-to-cart modal-add-btn ${alreadyInCart ? 'in-cart' : ''}`}
                        onClick={handleAdd}
                    >
                        {alreadyInCart ? '✓ In Cart — Add More' : 'Add to Cart'}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default QuickViewModal;
