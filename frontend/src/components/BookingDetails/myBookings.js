import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentBooking } from "../../store/booking";
import DeleteBookingModal from "../ConfirmModal/deleteBooking";
import OpenModalButton from "../OpenModalButton";
import { userSpot } from "../../store/spots";
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import { getKey } from '../../store/map';
import hubnbimage from '../Navigation/hubnblogo.png'
import { useHistory } from "react-router-dom";


function ManageMyBookings(){ 
    const dispatch = useDispatch();
    const history = useHistory();
    const mybookings = useSelector(state => state.bookings.bookings);
    const [selectedPlace, setSelectedPlace] = useState(null);
    const key = useSelector((state) => state.maps.key);
    const [isLoaded, setIsLoaded] = useState(false)


    useEffect(() => { 
        dispatch(getCurrentBooking())

        setTimeout(() => { 
            setIsLoaded(true)
        }, 800)

        if (!key) {
            dispatch(getKey());
          }
        }, [dispatch, key])


        const fixedDecimal = (num) => { 
            if(num === 0 || num === null || num === 'null'){ 
              return 'New';
            } else if (num % 1 === 0) {
              return num.toString() + '.0';
            } else { 
              return Math.floor(num * 100) / 100;
            }
          }
        
          let locations = mybookings?.booking?.map(spot => ({ lat: +spot.Spot.lat, lng: +spot.Spot.lng }));

          console.log(mybookings)
          if (!key) {
            return null;
          }
          
        
          const handleMarkerClick = (place) => {
            setSelectedPlace(place);
          };
          
          const handleInfoWindowClose = () => {
            setSelectedPlace(null);
          };
        
          const containerStyle = {
            width: '100%',
            height: '100%',
          };
          
        
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
                  center={locations?.length > 0 ? locations[0] : null}
                  zoom={10}
                >
                  {locations?.map((location, index) => (
                    <Marker key={index} position={location} onClick={() => handleMarkerClick(location)} />
                  ))}
                  {selectedPlace && (
                    <InfoWindow
                      position={selectedPlace}
                      onCloseClick={handleInfoWindowClose}
                    >
                      <div>
                        <h3>Place Details</h3>
                        <div>
                          <img
                            alt="myspotdetail-image"
                            src={mybookings?.Spots?.filter(spot=> spot.lat === selectedPlace.lat).previewImage}
                            className="myspotdetail-image"
                          />
                        </div>
                        <p>${selectedPlace.price}/night</p>
                      </div>
                    </InfoWindow>
                  )}
                </GoogleMap>
              )}
            </>
          );
        };
        

    return (
        <div className="myspot-homepage">
    
          <div className="myspot-left-container">
            <div className="headers">
              <h1>Manage Your Bookings</h1>
            </div>
    
            <div className='myspot-card'>
              <ul className='myspot-ul-card'>
                {mybookings?.booking?.map((spot) => (
                    <div key={spot.Spot.id} className="myspot-card-column">

    
                    <div key={spot.Spot.id} className="myspot-card-column">
                        <h3>{spot.startDate} To {spot.endDate}</h3>
                    
                        <div className="image-container">
                        <OpenModalButton 
                          buttonText="Cancel Booking"
                          modalComponent={<DeleteBookingModal props={spot.id}/>}
                        />
                        <img
                          onClick={() => { history.push(`/spots/${spot.Spot.id}`) }}
                          className="myspot-image" 
                          src={spot.Spot.previewImage.includes('not') ? hubnbimage : spot.Spot.previewImage} 
                          alt="previewimages"
                        />
                        </div>

                      <div className="landing-firstline-container">
                        <h4 className="title-text"> {spot.Spot.name}</h4>
                        <h4> &#x2605;{fixedDecimal(spot.Spot.avgRating)}</h4>
                      </div>
                        
                      <div className="landing-secondline-container">
                        <p>{spot.Spot.city}</p>
                        <p>{spot.Spot.country}</p>
                      </div>
                        
                      <div>
                        <h4>${spot.Spot.price} night</h4>
                      </div>
                    </div>
                  </div>
                ))}
              </ul>
            </div>
          </div>
    
          <div className="myspot-right-container" > 
            <Maps apiKey={key}/>
          </div>
    
        </div>
      );
}


export default ManageMyBookings;
