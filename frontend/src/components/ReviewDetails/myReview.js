import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getCurrentReview } from "../../store/reviews";
import { allSpots } from "../../store/spots";
import DeleteReviewBox from "../ConfirmModal/deleteReview";
import OpenModalButton from "../OpenModalButton";

function ManageMyReviews(){ 
    const dispatch = useDispatch()
    const myReview = useSelector(state => state.reviews.Reviews);
    const spots = useSelector(state => state.spots.Spots);
    

    const spotName = (id) => { 
        return spots.find(spot => spot.id === id).name
    }

    const spotId = (id) => { 
        return spots.find(spot => spot.id === id).id
    }

    const spotImage = (id) => { 
        return spots.find(spot => spot.id === id).previewImage
    }

    useEffect(() => { 
        dispatch(getCurrentReview())
        dispatch(allSpots())
    }, [])

    const deleteReviewButton = (id, spotId) => { 
        let props = { 
            id, 
            spotId
        }
        
        return ( 
            <div> 
    <OpenModalButton 
    buttonText="Delete"
    modalComponent={<DeleteReviewBox  props={props} />}
    />
  </div>
)
}
    
    if(!myReview || !spots) return null
    return(
        <div className="my-review-page">
        <h1 className="my-review-header-text">Manage Reviews</h1>
        <div>
         {myReview && myReview.map(reviews =>
                <div className="review-cards">
                <h2>Spot Name:{spotName(reviews.spotId)}</h2>
                <img className="my-review-image"src={spotImage(reviews.spotId)}></img>
                <h2>Stars:{reviews.stars}</h2>
                <h2>Review: {reviews.review}</h2>  
                {deleteReviewButton(reviews.id, spotId(reviews.spotId))}
                </div>   
         )}    
        </div>
        </div>
    )
 }


export default ManageMyReviews;
