import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { createReviews } from "../../store/reviews";
import { useModal } from "../../context/Modal";
import './reviews.css'

function PostReviews({ spotId }) { 
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const [review, setReview] = useState('');
  const [error, setErrors] = useState([]);
  const [rating, setRating] = useState(1);
  const [hoverRating, setHoverRating] = useState(null);

  useEffect(() => { 
    const errors = [];
       
    if (!review) errors.push('Review cannot be empty');
    if (review.length < 10) errors.push('Review cannot be less than 10 characters');

    setErrors(errors);
  }, [review]);
    

  const submit = async (e) => { 
    e.preventDefault();
        
    const payload = { 
      review,
      rating
    };
        
    await dispatch(createReviews(payload, spotId.props));
    closeModal();
  }



  return ( 
    <div className="create-review-form">
      <form onSubmit={submit}>
        <ul className="create-review-Errors">
          {error.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <h1>How was your stay?</h1>
        <label>
          <textarea 
            id="descrip"
            rows={4}
            placeholder="What do you think"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            required
          />
        </label>
        <label>
                <div className="stars">
                    {[...Array(5)].map((star, index) => {
                        const ratingValue = index + 1;
                        return (
                            <span 
                                key={ratingValue} 
                                onClick={() => setRating(ratingValue)} 
                                onMouseEnter={() => setHoverRating(ratingValue)}
                                onMouseLeave={() => setHoverRating(null)}
                            >
                                <i className={ratingValue <= (hoverRating || rating) ? "fas fa-star" : "far fa-star"}></i>
                            </span>
                        );
                    })}
                </div>
            </label>
        <button
          className="button-23"
          type="submit"
          onClick={submit}
          disabled={!!error.length}
        >
          Submit Your Review
        </button>
      </form>
    </div>
  );
}

export default PostReviews
