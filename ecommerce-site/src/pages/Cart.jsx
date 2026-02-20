import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const TAX_RATE = 0.05; // 5%

function Cart() {
    const {
        cart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        totalItems,
        totalPrice,
    } = useCart();

    const subtotal = parseFloat(totalPrice);
    const tax = parseFloat((subtotal * TAX_RATE).toFixed(2));
    const finalTotal = (subtotal + tax).toFixed(2);

    if (cart.length === 0) {
        return (
            <div className="cart-empty">
                <span className="empty-icon">🛒</span>
                <h2>Your cart is empty</h2>
                <p>Looks like you haven't added anything yet.</p>
                <Link to="/" className="btn-shop-now">Continue Shopping</Link>
            </div>
        );
    }

    return (
        <div className="cart-page">
            <div className="cart-header">
                <h1 className="page-title">Shopping Cart</h1>
                <button className="btn-clear-cart" onClick={clearCart}>🗑 Clear Cart</button>
            </div>

            <div className="cart-layout">
                {/* Cart items */}
                <div className="cart-items">
                    {cart.map((item) => (
                        <div key={item.id} className="cart-item">
                            <img src={item.image} alt={item.title} className="cart-item-image" />
                            <div className="cart-item-details">
                                <h3 className="cart-item-title">{item.title}</h3>
                                <p className="cart-item-price">${item.price.toFixed(2)} each</p>
                                <div className="quantity-controls">
                                    <button className="btn-qty" onClick={() => decreaseQuantity(item.id)} aria-label="Decrease quantity">−</button>
                                    <span className="qty-display">{item.quantity}</span>
                                    <button className="btn-qty" onClick={() => increaseQuantity(item.id)} aria-label="Increase quantity">+</button>
                                </div>
                            </div>
                            <div className="cart-item-right">
                                <p className="cart-item-subtotal">${(item.price * item.quantity).toFixed(2)}</p>
                                <button className="btn-remove" onClick={() => removeFromCart(item.id)} aria-label="Remove item">
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Order summary with tax */}
                <div className="cart-summary">
                    <h2 className="summary-title">Order Summary</h2>
                    <div className="summary-row">
                        <span>Total Items</span>
                        <span>{totalItems}</span>
                    </div>
                    <div className="summary-row">
                        <span>Subtotal</span>
                        <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="summary-row">
                        <span>Tax (5%)</span>
                        <span>${tax.toFixed(2)}</span>
                    </div>
                    <div className="summary-row total">
                        <span>Total</span>
                        <span>${finalTotal}</span>
                    </div>
                    <button className="btn-checkout">Proceed to Checkout</button>
                    <Link to="/" className="btn-continue">← Continue Shopping</Link>
                </div>
            </div>
        </div>
    );
}

export default Cart;
