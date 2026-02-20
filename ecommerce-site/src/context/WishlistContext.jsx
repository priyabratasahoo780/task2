import { createContext, useState, useEffect, useContext } from 'react';

export const WishlistContext = createContext();

export function WishlistProvider({ children }) {
    const [wishlist, setWishlist] = useState(() => {
        try {
            const stored = localStorage.getItem('wishlist');
            return stored ? JSON.parse(stored) : [];
        } catch {
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
    }, [wishlist]);

    const toggleWishlist = (product) => {
        setWishlist((prev) => {
            const exists = prev.some((item) => item.id === product.id);
            if (exists) return prev.filter((item) => item.id !== product.id);
            return [...prev, { id: product.id, title: product.title, image: product.image, price: product.price }];
        });
    };

    const isWishlisted = (id) => wishlist.some((item) => item.id === id);
    const totalWishlisted = wishlist.length;

    return (
        <WishlistContext.Provider value={{ wishlist, toggleWishlist, isWishlisted, totalWishlisted }}>
            {children}
        </WishlistContext.Provider>
    );
}

export function useWishlist() {
    return useContext(WishlistContext);
}
