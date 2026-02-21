function SkeletonCard() {
    return (
        <div className="skeleton-card">
            <div className="skeleton-img skeleton-line" />
            <div className="skeleton-body">
                <div className="skeleton-line short" />
                <div className="skeleton-line medium" />
                <div className="skeleton-line long" />
                <div className="skeleton-line short" />
                <div className="skeleton-line long" style={{ height: '36px', borderRadius: '8px', marginTop: '0.25rem' }} />
            </div>
        </div>
    );
}

export default SkeletonCard;
