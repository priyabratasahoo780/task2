// Shimmer skeleton placeholder while products are loading
function SkeletonCard() {
    return (
        <div className="skeleton-card" aria-hidden="true">
            <div className="skeleton skeleton-image" />
            <div className="skeleton-body">
                <div className="skeleton skeleton-line short" />
                <div className="skeleton skeleton-line" />
                <div className="skeleton skeleton-line medium" />
                <div className="skeleton skeleton-price" />
                <div className="skeleton skeleton-btn" />
            </div>
        </div>
    );
}

export default SkeletonCard;
