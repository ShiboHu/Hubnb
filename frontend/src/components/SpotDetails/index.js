import { useSelector, useDispatch } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom';
import { oneSpot } from '../../store/spots';
import { useEffect, useState} from 'react';
import './spotdetail.css'
import '../BookingDetails/Booking.css'
import { reviewDetail } from '../../store/reviews';
import PostReviews from '../ReviewDetails/postReviews';
import OpenModalButton from '../OpenModalButton';
import DeleteReviewBox from '../ConfirmModal/deleteReview';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import { getKey } from '../../store/map'
import CreateBooking from '../BookingDetails';



function SpotDetail(){ 
    const dispatch = useDispatch();
    const { spotId } = useParams(); 
    const spots = useSelector(state => state.spots.singleSpot); 
    const reviews = useSelector(state => state.reviews.Reviews)
    const key = useSelector((state) => state.maps.key);
    const sessionUser = useSelector(state => state.session.user);
    const [isLoaded, setIsLoaded] = useState(false)
    const [selectedPlace, setSelectedPlace] = useState(null);


    useEffect(() => { 
        dispatch(oneSpot(spotId))
        dispatch(reviewDetail(spotId))
        if (!key) {
            dispatch(getKey());
          }

        setTimeout(() => { 
            setIsLoaded(true)
        },500)
        
    }, [dispatch, key])

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

  
if (!key) {
    return null;
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


    const handleMarkerClick = (place) => {
        setSelectedPlace(place);
      };
    
      const handleInfoWindowClose = () => {
        setSelectedPlace(null);
      };

    const containerStyle = {
        width: '800px',
        height: '100%',
      };

    const center = { 
        lat: spots.lat,
        lng: spots.lng
    }

    const Maps = ({ apiKey }) => {
        const { isLoaded } = useJsApiLoader({
          id: 'google-map-script',
          googleMapsApiKey: apiKey,
        });
      
        return (
          <>
            {isLoaded && (
              <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={10}
                >
                 <Marker position={center} onClick={() => handleMarkerClick(center)}/>
            {selectedPlace && (
            <InfoWindow
              position={selectedPlace}
              onCloseClick={handleInfoWindowClose}
            >
              <div>
                <h3>Place Details</h3>
                <div>
                {spots.SpotImages.map(image => (
                  <img
                    alt="spotdetail-image"
                    src={image.url}
                    className="map-spot-image"
                  />
                ))}
              </div>
                <p>${spots.price}/night</p>
              </div>
            </InfoWindow>
          )}
                </GoogleMap>
              )}
          </>
        );
      };

      return (
        <div className='spot-detail-page'>
          {isLoaded ? (
            <div className='spot-detail-leftside-container'>
              <h1>{spots.name}</h1>
              <h2>
                {spots.city},&nbsp;
                {spots.state},&nbsp;
                {spots.country}
              </h2>
      
              <div>
                {spots.SpotImages.map(image => (
                  <img
                    alt="spotdetail-image"
                    src={image.url}
                    className="spot-image-spot-page"
                  />
                ))}
              </div>
      
              <div className='spot-detail-info-container'>
                <div className='spot-detail-info'>
                  <h3 className='host-text'>Hosted By:</h3>
                  <h3 className='host-text'>{spots.Owner.firstName}</h3>
                  <h3 className='host-text'>{spots.Owner.lastName}</h3>
                </div>
      
                <div className='spot-reserve-box'>
                  <h3>${spots.price}/night</h3>
                  <CreateBooking />
                </div>
              </div>
      
              <p>{spots.description}</p>
      
              <div className='spot-detail-reviews'>
                <h3>Reviews</h3>
                {reviewed && (
                  <h3 style={{ color: 'red' }}>Already Reviewed</h3>
                )}
                {ownSpot && (
                  <h3 style={{ color: 'red' }}>OwnSpot Cannot Review</h3>
                )}
                {!reviewed && !ownSpot && sessionUser && (
                  <div className={reviewed ? reviewed : undefined}>
                    <OpenModalButton
                      buttonText="Create A Review"
                      modalComponent={<PostReviews props={spotId} />}
                    />
                  </div>
                )}
      
                {reviewFunction()}
      
                <div>
                  {reviews && !reviews.length ? 'Be the first to post a review!' : undefined}
                  {reviews &&
                    reviews?.map(review => (
                      <h4 key={review.id}>
                        {review.User.firstName}&nbsp;: &nbsp;
                        Date:&nbsp;{review.createdAt.slice(0, 7)}&nbsp;,
                        Comment: &nbsp;{review.review}&nbsp;
                        Stars: &nbsp;{review.stars}
                        {sessionUser && sessionUser.id === review.User.id ? (
                          <div className='delete-review-button-container'>
                            {deleteReviewButton(review.id, spots.id)}
                          </div>
                        ) : undefined}
                      </h4>
                    ))}
                </div>
              </div>
            </div>
          ) : null}
          <div className='spot-detail-rightside-container'>
            <Maps apiKey={key}/>
          </div>
        </div>
      );
        
}


export default SpotDetail
