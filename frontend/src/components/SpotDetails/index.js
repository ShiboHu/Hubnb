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
import hubnbimage from '../Navigation/hubnblogo.png'
import Skeleton from 'react-loading-skeleton'



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
        },700)
        
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

const headlinefunction = () => { 
  if(spots.numReviews > 1){ 
      return <p>&#9733;{fixedDecimal(spots.avgRating)} · {spots.numReviews} Reviews  · <i class="fa-solid fa-award"></i> Superhost · {spots.city}, {spots.country} </p>
  }else if(spots.numReviews === 1) { 
      return <p>&#9733;{fixedDecimal(spots.avgRating)} · {spots.numReviews} Review  · <i class="fa-solid fa-award"></i> Superhost · {spots.city}, {spots.country} </p>
  }else {
    return <p>&#9733;{fixedDecimal(spots.avgRating)} · {spots.numReviews} Review  · <i class="fa-solid fa-award"></i> Superhost · {spots.city}, {spots.country} </p>
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
  
      
      
      const handleMarkerClick = (place) => {
        setSelectedPlace(place);
      };
      
      const handleInfoWindowClose = () => {
        setSelectedPlace(null);
      };

    const containerStyle = {
        width: '100%',
        height: '500px',
      };
      
      const center = { 
        lat: +spots.lat,
        lng: +spots.lng
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
                    style={{width: '200px'}}
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
     
      if (!key) {
          return null;
        }
      console.log(spots)
      return (
        <div className='listing-container'>
          {isLoaded ? (
            <div className='listing-left-container'>
              <h1>{spots.name}</h1>
              
              <div className='spot-headline'>
                <p>{headlinefunction()}</p>
              </div>
      
              <div className='listing-images'>
               
                  <img
                    alt="spotdetail-image"
                    src={spots.SpotImages.includes('Current') ? hubnbimage : spots.SpotImages[0].url}
                    className="listing-image"
                  />
            
              </div>
      
              <div className='listing-info-container'>
                <div className='listing-info'>
                  <h3 className='host-text'>Hosted By: {spots.Owner.firstName}, {spots.Owner.lastName} </h3>
                  <h4><i className="fas fa-home"></i> Room in a rental unit</h4>
                  <h4><i className="far fa-calendar-alt"></i> Free cancellation for 48 hours</h4>
                  <h4><i className="fas fa-door-open"></i> Self check-in</h4>
                  <h4><i class="fa-solid fa-water-ladder"></i> This is one of the few places in the area with a pool</h4>
                  <h4><i class="fa-solid fa-briefcase"></i> A common area with wifi that's well-suited for working</h4>
                </div>
      
                <div className='listing-reserve-box'>
                  <div className='listing-revserve-top'>
                    <h3>${spots.price}/night</h3>
                    {reviewFunction()} 
                  </div>
      
                  <div>
                    <CreateBooking props={spots.price} />
                  </div>
                </div>
              </div>
                  
                  <div style={{borderTop: '1px solid gray', marginTop: '40px'}}> </div>
              <p>{spots.description}</p>
      
                  <div style={{borderTop: '1px solid gray'}}> </div>


            <div>
                  <h4>Where you will be</h4>
                  <Maps apiKey={key}/>
            </div>



            <div style={{borderTop: '1px solid gray', marginTop: '40px'}}> </div>










              <div className='listing-reviews'>
                <h3>Reviews</h3>
                {reviewed && <h3 style={{ color: 'red' }}>Already Reviewed</h3>}
                {ownSpot && <h3 style={{ color: 'red' }}>OwnSpot Cannot Review</h3>}
                {!reviewed && !ownSpot && sessionUser && (
                  <div className={reviewed ? reviewed : undefined}>
                    <OpenModalButton
                      buttonText="Create A Review"
                      modalComponent={<PostReviews props={spotId} />}
                    />
                  </div>
                )}





                {reviewFunction()}
      
                <div className='review'>
                  {reviews && !reviews.length ? 'Be the first to post a review!' : undefined}
                  {reviews &&
                    reviews?.map((review) => (
                      <div className='review-content' key={review.id}>
                        <h4>{review.User.firstName}-{convertDate(review.createdAt)}</h4>
                        <p>{review.review}</p>
                          {sessionUser && sessionUser.id === review.User.id ? (
                            <div className='delete-review-button-container'>
                              {deleteReviewButton(review.id, spots.id)}
                            </div>
                          ) : undefined}
                      </div>
                    ))}
                </div>
              </div>
            </div>
          ) : ( 
            <div className='listing-left-container'>
              <Skeleton width={200} height={40} baseColor="grey" highlightColor="white"></Skeleton>

              <div className='spot-headline' style={{marginTop:'20px'}}>
                <Skeleton width={500} height={30} baseColor="grey" highlightColor="white"></Skeleton>
              </div>
              
              <div className='listing-images'>
                <Skeleton className='listing-image' height={600} baseColor="grey" highlightColor="white"/>
              </div>

              <div className='listing-info-container'>
                <div className='listing-info'>
                  <Skeleton className='host-text'  width={400} baseColor="grey" highlightColor="white"/>
                  <Skeleton className='host-text' count={5} width={300} baseColor="grey" highlightColor="white"/>
                </div>

             
                <Skeleton width={285} height={500} baseColor="grey" highlightColor="white"></Skeleton>
            
              </div>

            </div>
          )}
        </div>
      );
      
        
}


export const convertDate = (date) => { 
  const newDate = new Date(date); 
  const options = {year: 'numeric', month: 'long'}
  return newDate.toLocaleString('en-US', options)
}



export const renderStars = (rating) => {
  const filledStars = Math.round(rating);
  const emptyStars = 5 - filledStars;
  const stars = [];

  for (let i = 1; i <= filledStars; i++) {
     stars.push(<i key={i} className="fa fa-star"></i>);
   }

  for (let i = 1; i <= emptyStars; i++) {
      stars.push(<i key={filledStars + i} className="fa fa-star-o"></i>);
   }

return stars;
};



export default SpotDetail
