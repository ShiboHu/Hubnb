import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom';
import { oneSpot } from '../../store/spots';
import { useEffect} from 'react';
import './spotdetail.css'
import { reviewDetail } from '../../store/reviews';

function SpotDetail(){ 
    const dispatch = useDispatch();
    const { spotId } = useParams(); 
    const spots = useSelector(state => state.spots.spotDetail); 
    const reviews = useSelector(state => state.reviews.Reviews)

    useEffect(() => { 
        dispatch(oneSpot(spotId))
        dispatch(reviewDetail(spotId))
    }, [])

    if(!spots) return null;

    const reviewFunction = () => { 
        if(spots.numReviews > 1){ 
            return <h3>&#9733;{spots.avgRating} · {spots.numReviews} Reviews</h3>
        }else if(spots.numReviews === 1) { 
            return <h3>&#9733;{spots.avgRating} · {spots.numReviews} Review</h3>
        }else {
        return <h3>&#9733;{spots.avgRating}</h3>
    }
}

    return ( 
        <div className='spotDetail-content'>
            <h1>{spots.name}&nbsp;&nbsp;</h1>
            <h2>
             &#9733;
             {spots.avgRating}
             &nbsp;&nbsp;
             {spots.city},
             &nbsp;
             {spots.address},
             &nbsp;
             {spots.state},
             &nbsp;
             {spots.country}</h2>
            <div className='spot-image-container'>
            {spots.SpotImages.map(image => 
            <div key={spots.id} className="spot-image-datailpage">
            <img 
            alt="spotdetail-image"
            src={image.url}
            className='image'>
            </img>
            </div>)}
            </div>
            <h3>Hosted By:{spots.Owner.firstName}&nbsp;{spots.Owner.lastName}</h3>
            <h3>{spots.description}</h3>
            <div className='spot-reverse-box'>
                <h3>${spots.price} night</h3>
                <button>Reserve</button>
            </div>
            <div className='review-summary-box'>
                <h3>Reviews</h3>
                {reviewFunction()}
                <h4>
                {reviews && !reviews.length ? 'Be first to post a review!' : null}
                {reviews && reviews.map(review =>  
                <h4 key={review.id}>
                {review.User.firstName}&nbsp;
                {review.createdAt.slice(0,7)}&nbsp;
                {review.review}&nbsp;
                </h4>
                )}
                </h4>
            </div>  
        </div>
    )
}


export default SpotDetail
