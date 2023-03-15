import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom';
import { oneSpot } from '../../store/spots';
import { useEffect, useState} from 'react';
import './spotdetail.css'
import '../BookingDetails/Booking.css'
import { reviewDetail } from '../../store/reviews';
import PostReviews from '../ReviewDetails/postReviews';
import OpenModalButton from '../OpenModalButton';
import DeleteReviewBox from '../ConfirmModal/deleteReview';
import { createBooking } from '../../store/booking';


function SpotDetail(){ 
    const dispatch = useDispatch();
    const { spotId } = useParams(); 
    const spots = useSelector(state => state.spots.spotDetail); 
    const reviews = useSelector(state => state.reviews.Reviews)
    const sessionUser = useSelector(state => state.session.user);
    
    
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [errors, setErrors] = useState([])

    const createStartDate = (e) => setStartDate(e.target.value);
    const createEndDate = (e) => setEndDate(e.target.value);
  
  
    const handleSubmit = async (e) => {
      e.preventDefault();

        setErrors([])

      const payload = { 
        startDate,
        endDate,
      }

      try{
        const newBooking = await dispatch(createBooking(payload, spotId))
        if(newBooking){ 
            console.log(newBooking)
            return window.alert('book success')
        }
    } catch (e) { 
        const data = await e.json()
        if(data && data.errors){ 
            setErrors(data.errors)
        }
    }

    };
 
    useEffect(() => { 
        dispatch(oneSpot(spotId))
        dispatch(reviewDetail(spotId))
    }, [])

    if(!spots) return null;

    const reviewFunction = () => { 
        if(spots.numReviews > 1){ 
            return <h3>&#9733;{fixedDecimal(spots.avgRating)} · {spots.numReviews} Reviews</h3>
        }else if(spots.numReviews === 1) { 
            return <h3>&#9733;{fixedDecimal(spots.avgRating)} · {spots.numReviews} Review</h3>
        }else {
        return <h3>&#9733;{fixedDecimal(spots.avgRating)}</h3>
    }
}


const fixedDecimal = (num) => { 
    if(num === 0) { 
        return '0.0'
    }
    // if(typeof num !== 'number' || num === 0){ 
        //   return 'New'
        else if (num % 1 === 0) {
              return num.toString() + '.0'
            }
                //   return num
                // }
                return Math.floor(num * 100) / 100
            }
            
            let reviewed = false; 
            if(reviews && sessionUser){
                reviews.forEach(review => { 
                    if(review.userId === sessionUser.id){ 
                        reviewed = true
                    }
                })
            }
            
            let ownSpot = false;
            if(sessionUser){
                if(spots.ownerId === sessionUser.id){ 
                    ownSpot = true
                }
            }
            
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
    
    const noReivews = () => { 
        if(spots.numReviews === 0){ 
            return <p>&#9733;New</p>
        }else if(spots.numReviews === 1) { 
            return <p>&#9733;{fixedDecimal(spots.avgRating)} · {spots.numReviews} Review</p>
        }else { 
            return <p>&#9733;{fixedDecimal(spots.avgRating)} · {spots.numReviews} Reviews</p>
        }
    }



    return ( 
        <div className='spot-detail-page'>
            <div className='spot-detail-header'>
            <h1>{spots.name}&nbsp;&nbsp;</h1>
            <h2>
             {spots.city},
             &nbsp;
             {spots.state},
             &nbsp;
             {spots.country}</h2>
             </div>
            <div>
            {spots.SpotImages.map(image => 
            <div key={image.id} className="spot-image-datailpage">
            <div className='spot-image-container'>
            <img 
            alt="spotdetail-image"
            src={image.url}
            className="spot-image-spot-page"
            >
            </img>
            </div>
            </div>)}
            </div>
            <div className='spot-detail-info'>
            <h3 className='host-text'>Hosted By:{spots.Owner.firstName}&nbsp;{spots.Owner.lastName}</h3>
            <h3>{spots.description}</h3>
            <div className='spot-reserve-box'>
                <h3>${spots.price} night {noReivews()}</h3>

            <form onSubmit={handleSubmit} className="spot-page-booking-box">
            <div>
              <label>Start Date:</label>
              <input type="date" 
              id="startDate" 
              name="startDate" 
              value={startDate} 
              onChange={createStartDate} />
            </div>
            <div>
              <label >End Date:</label>
              <input type="date" 
              id="endDate"
              name="endDate"
              value={endDate} 
              onChange={createEndDate} />
            </div>
            <button type="submit">Reserve</button>
           </form>

            </div>
            <div className='spot-detail-reviews'>
                <h3>Reviews</h3>
                {reviewed && 
                <h3
                style={{color: 'red'}}
                >Already Reviwed
                </h3>}
                {ownSpot && 
                <h3
                style={{color: 'red'}}
                >OwnSpot Cant not review
                </h3>}
                {!reviewed && !ownSpot && sessionUser &&   
                <div className={reviewed ? reviewed : undefined}>
                <OpenModalButton 
                 buttonText="Create A Review"
                 modalComponent={<PostReviews props={spotId}/>}
                />
                </div>
                 
                }
                {reviewFunction()}
                <div>
                {reviews && !reviews.length ? 'Be first to post a review!' : undefined}
                {reviews && reviews.map(review =>  
                <h4 key={review.id}>
                {review.User.firstName}&nbsp;: &nbsp;
                Date:&nbsp;{review.createdAt.slice(0,7)}&nbsp;,
                Comment: &nbsp;{review.review}&nbsp;
                Stars: &nbsp;{review.stars}
                {sessionUser && sessionUser.id === review.User.id ?
                <div className='delete-review-button-container'>
                 {deleteReviewButton(review.id, spots.id)}
                 </div>
                 : undefined}
                </h4>
                )}
                </div>
            </div>  
            </div>
        </div>
    )
}


export default SpotDetail
