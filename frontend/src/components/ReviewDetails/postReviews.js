import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { createReviews } from "../../store/reviews";
import { useModal } from "../../context/Modal";
import './reviews.css'

function PostReviews ( spotId ) { 
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const [review, setReivew] = useState('');
    const [stars, setStars] = useState(3);
    const [error, setErrors] = useState([]);


    useEffect(() => { 
        const errors = [];
       
        if(!review) errors.push('Review cant not be empty')
        if(review.length < 10) errors.push('Review cant not be less than 10 characters')

        setErrors(errors)
    
    }, [review, stars])
    

   const sumbit = async (e) => { 
        e.preventDefault();
        
        const payload = { 
            review,
            stars
        }
        

        await dispatch(createReviews(payload, spotId.props));
         closeModal();
       
   }



//star!
  
    return ( 
        <div className="create-review-form">
        <form onSubmit={sumbit}>
        <ul className="create-review-Errors">
        {error.map((error, idx) => 
          <li key={idx}>{error}</li>
          )}
        </ul>
        <h1>How was your stay</h1>
        <label>
        <textarea 
        id="descrip"
        rows={4}
        placeholder="What do you think"
        value={review}
        onChange={(e) => setReivew(e.target.value)}
        required
        >
        </textarea>
        </label>
        <label>
        <input
         id="stars"
         type="range"
         min={1}
         step={0.5}
         max={5}
         onInput="num.value = this.value"
         placeholder="number 1 - 5"
         onChange={(e) => setStars(e.target.value)}
         value={stars}
         required
          />
        <output id="num">{stars}</output>
        </label>
        </form>
        <button type="submit" onClick={sumbit}
        disabled={!!error.length}
        >Submit Your Review</button>
        </div>
    )
}



export default PostReviews
