import { useState, useEffect, useMemo, useCallback } from 'react';
import ProductCard from '../components/ProductCard';
import SkeletonCard from '../components/SkeletonCard';

const SORT_OPTIONS = [
    { value: 'default', label: 'Featured' },
    { value: 'price-asc', label: 'Price: Low → High' },
    { value: 'price-desc', label: 'Price: High → Low' },
    { value: 'rating', label: 'Top Rated' },
    { value: 'name-asc', label: 'Name: A → Z' },
    { value: 'name-desc', label: 'Name: Z → A' },
];

const MAX_RECENTLY_VIEWED = 4;

function Products() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');
    const [sortBy, setSortBy] = useState('default');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    // Price range
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [appliedMin, setAppliedMin] = useState('');
    const [appliedMax, setAppliedMax] = useState('');
    // Recently viewed
    const [recentlyViewed, setRecentlyViewed] = useState(() => {
        try {
            const stored = localStorage.getItem('recentlyViewed');
            return stored ? JSON.parse(stored) : [];
        } catch { return []; }
    });

    // Debounce search by 300ms
    useEffect(() => {
        const t = setTimeout(() => setDebouncedSearch(searchQuery), 300);
        return () => clearTimeout(t);
    }, [searchQuery]);

    // Fetch once
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                setError(null);
                const response = await fetch('https://fakestoreapi.com/products');
                if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
                const data = await response.json();
                setProducts(data);
                const uniqueCategories = ['all', ...new Set(data.map((p) => p.category))];
                setCategories(uniqueCategories);
            } catch (err) {
                setError(err.message || 'Failed to fetch products. Please try again.');
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    // Track recently viewed — stable callback
    const handleRecentlyViewed = useCallback((product) => {
        setRecentlyViewed((prev) => {
            const filtered = prev.filter((p) => p.id !== product.id);
            const updated = [product, ...filtered].slice(0, MAX_RECENTLY_VIEWED);
            localStorage.setItem('recentlyViewed', JSON.stringify(updated));
            return updated;
        });
    }, []);

    const applyPriceFilter = () => {
        setAppliedMin(minPrice);
        setAppliedMax(maxPrice);
    };

    const resetAllFilters = () => {
        setSearchQuery('');
        setSelectedCategory('all');
        setSortBy('default');
        setMinPrice('');
        setMaxPrice('');
        setAppliedMin('');
        setAppliedMax('');
    };

    // All filters + sort — in-memory, no refetch
    const displayedProducts = useMemo(() => {
        let result = [...products];

        if (selectedCategory !== 'all') {
            result = result.filter((p) => p.category === selectedCategory);
        }

        if (debouncedSearch.trim()) {
            const q = debouncedSearch.toLowerCase();
            result = result.filter(
                (p) =>
                    p.title.toLowerCase().includes(q) ||
                    p.category.toLowerCase().includes(q)
            );
        }

        const min = parseFloat(appliedMin);
        const max = parseFloat(appliedMax);
        if (!isNaN(min)) result = result.filter((p) => p.price >= min);
        if (!isNaN(max)) result = result.filter((p) => p.price <= max);

        switch (sortBy) {
            case 'price-asc': result.sort((a, b) => a.price - b.price); break;
            case 'price-desc': result.sort((a, b) => b.price - a.price); break;
            case 'rating': result.sort((a, b) => (b.rating?.rate ?? 0) - (a.rating?.rate ?? 0)); break;
            case 'name-asc': result.sort((a, b) => a.title.localeCompare(b.title)); break;
            case 'name-desc': result.sort((a, b) => b.title.localeCompare(a.title)); break;
            default: break;
        }

        return result;
    }, [products, selectedCategory, debouncedSearch, sortBy, appliedMin, appliedMax]);

    const isFiltered = debouncedSearch || selectedCategory !== 'all' || appliedMin || appliedMax;

    return (
        <div className="products-page">
            {/* ── Hero Banner ── */}
            <section className="hero-banner" id="hero">
                <div className="hero-content">
                    <p className="hero-eyebrow">New Season · New Drops</p>
                    <h1 className="hero-title">
                        Discover <span className="hero-highlight">Amazing</span> Products
                    </h1>
                    <p className="hero-subtitle">
                        Search, filter, sort — find exactly what you need.
                    </p>
                    <a href="#products" className="hero-cta">
                        Shop Now
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                    </a>
                </div>
                <div className="hero-decoration" aria-hidden="true">
                    <div className="hero-blob hero-blob-1" />
                    <div className="hero-blob hero-blob-2" />
                    <div className="hero-blob hero-blob-3" />
                </div>
            </section>

            {/* ── Controls ── */}
            <section className="products-controls" id="products">
                {/* Search */}
                <div className="search-wrapper">
                    <svg className="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
                    <input
                        type="search"
                        className="search-input"
                        placeholder="Search products…"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        aria-label="Search products"
                    />
                    {searchQuery && (
                        <button className="search-clear" onClick={() => setSearchQuery('')} aria-label="Clear search">×</button>
                    )}
                </div>

                {/* Category + Sort */}
                <div className="filters-row">
                    <div className="filter-wrapper">
                        <label htmlFor="category-filter" className="filter-label">Category</label>
                        <select id="category-filter" className="category-select" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                            {categories.map((cat) => (
                                <option key={cat} value={cat}>
                                    {cat === 'all' ? 'All Categories' : cat.charAt(0).toUpperCase() + cat.slice(1)}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="filter-wrapper">
                        <label htmlFor="sort-select" className="filter-label">Sort by</label>
                        <select id="sort-select" className="category-select" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                            {SORT_OPTIONS.map((opt) => (
                                <option key={opt.value} value={opt.value}>{opt.label}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Price Range Filter */}
                <div className="price-range-row">
                    <span className="filter-label">Price Range:</span>
                    <div className="price-inputs">
                        <div className="price-input-wrap">
                            <span className="price-symbol">$</span>
                            <input
                                type="number"
                                className="price-input"
                                placeholder="Min"
                                min="0"
                                value={minPrice}
                                onChange={(e) => setMinPrice(e.target.value)}
                                aria-label="Minimum price"
                            />
                        </div>
                        <span className="price-dash">—</span>
                        <div className="price-input-wrap">
                            <span className="price-symbol">$</span>
                            <input
                                type="number"
                                className="price-input"
                                placeholder="Max"
                                min="0"
                                value={maxPrice}
                                onChange={(e) => setMaxPrice(e.target.value)}
                                aria-label="Maximum price"
                            />
                        </div>
                        <button className="btn-apply-price" onClick={applyPriceFilter}>Apply</button>
                        {(appliedMin || appliedMax) && (
                            <button className="btn-clear-price" onClick={() => { setMinPrice(''); setMaxPrice(''); setAppliedMin(''); setAppliedMax(''); }}>
                                Clear
                            </button>
                        )}
                    </div>
                </div>
            </section>

            {/* Product count */}
            {!loading && !error && (
                <div className="product-count">
                    {isFiltered
                        ? `Showing ${displayedProducts.length} of ${products.length} products`
                        : `${products.length} products`}
                </div>
            )}

            {/* Error */}
            {error && (
                <div className="status-container error-container">
                    <span className="error-icon">⚠️</span>
                    <p className="status-text error-text">{error}</p>
                </div>
            )}

            {/* Loading — text shown as required + skeleton cards for visual feedback */}
            {loading && (
                <>
                    <p className="loading-text">Loading products…</p>
                    <div className="products-grid">
                        {Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)}
                    </div>
                </>
            )}

            {/* Products grid */}
            {!loading && !error && (
                displayedProducts.length === 0 ? (
                    <div className="no-results">
                        <span className="no-results-icon">🔍</span>
                        <h3>No products found</h3>
                        <p>Try a different search term, category, or price range.</p>
                        <button className="btn-reset" onClick={resetAllFilters}>Clear All Filters</button>
                    </div>
                ) : (
                    <div className="products-grid">
                        {displayedProducts.map((product) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                onRecentlyViewed={handleRecentlyViewed}
                            />
                        ))}
                    </div>
                )
            )}

            {/* Recently Viewed */}
            {!loading && recentlyViewed.length > 0 && (
                <section className="recently-viewed">
                    <h2 className="section-title">Recently Viewed</h2>
                    <div className="recently-grid">
                        {recentlyViewed.map((product) => (
                            <ProductCard
                                key={`rv-${product.id}`}
                                product={product}
                                onRecentlyViewed={handleRecentlyViewed}
                            />
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
}

export default Products;
