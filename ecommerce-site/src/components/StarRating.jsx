// Renders filled / half / empty stars based on a 0-5 rating
function StarRating({ rate = 0, count = 0 }) {
    const stars = Array.from({ length: 5 }, (_, i) => {
        const filled = rate >= i + 1;
        const half = !filled && rate >= i + 0.5;
        return { filled, half };
    });

    return (
        <div className="star-rating" aria-label={`Rating: ${rate} out of 5`}>
            <span className="stars" aria-hidden="true">
                {stars.map((star, i) => (
                    <span
                        key={i}
                        className={`star ${star.filled ? 'star-filled' : star.half ? 'star-half' : 'star-empty'}`}
                    >
                        {star.filled ? '★' : star.half ? '⯨' : '☆'}
                    </span>
                ))}
            </span>
            <span className="star-count">({count})</span>
        </div>
    );
}

export default StarRating;
