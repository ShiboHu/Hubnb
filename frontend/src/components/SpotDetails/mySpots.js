import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom";
import { userSpot } from "../../store/spots";
import OpenModalButton from "../OpenModalButton";
import EditSpotForm from "./editSpotForm";
import ConfirmBox from "../ConfirmModal";
import { reviewDetail } from "../../store/reviews";
import { GoogleMap, useJsApiLoader, Marker, InfoWindow, OverlayView } from '@react-google-maps/api';
import { getKey } from '../../store/map';
import hubnbimage from '../Navigation/hubnblogo.png'
import './spotdetail.css'
import ReactLoading from "react-loading";

function ManageMySpots() { 
  const dispatch = useDispatch();
  const history = useHistory();
  const userSpots = useSelector(state => state.spots.userSpots);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const key = useSelector((state) => state.maps.key);
  const [isLoaded, setIsLoaded] = useState(false)


  useEffect(() => { 

    dispatch(userSpot());


    setTimeout(() => { 
      setIsLoaded(true)
    }, 1500)

    if (!key) {
      dispatch(getKey());
    }

  }, [dispatch, key]);

  const deleteSpotButton = (id) => { 
    return ( 
      <div> 
        <OpenModalButton 
          buttonText="Delete Spot"
          modalComponent={<ConfirmBox props={id}/>}
        />
      </div>
    );
  }
   
  const fixedDecimal = (num) => { 
    if(num === 0 || num === null || num === 'null'){ 
      return 'New';
    } else if (num % 1 === 0) {
      return num.toString() + '.0';
    } else { 
      return Math.floor(num * 100) / 100;
    }
  }
  let locations = userSpots?.Spots ? userSpots.Spots.map(spot => ({ lat: +spot.lat, lng: +spot.lng })) : [];

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
            <OverlayView 
            key={index}
            position={location}
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
            >
            <div className="spot-marker">
            <button className="button-23" onClick={() => setSelectedPlace(location)}>
            HuBnB
             </button>
               </div>
            </OverlayView>
          ))}
          {selectedPlace && (
            <InfoWindow
              position={selectedPlace}
              onCloseClick={handleInfoWindowClose}
            >
              {userSpots &&(
              <div>
                <h3>Place Details</h3>
                <div>
                  <img
                    alt="myspotdetail-image"
                    src={userSpots?.Spots?.find(spot => spot?.lat === selectedPlace?.lat)?.previewImage}
                    className="myspotdetail-image"
                    onClick={() => history.push(`/spots/${userSpots?.Spots?.find(spot => spot?.lat === selectedPlace?.lat)?.id}`)}
                    style={{cursor:'pointer'}}
                  />
                </div>
                <p>HuBnB</p>
              </div>
                )}
            </InfoWindow>
          )}
        </GoogleMap>
      )}
    </>
  );
};

  
  return (
    <div className="myspot-homepage">
      {isLoaded ? (
        <>
      <div className="myspot-left-container">
        <div className="headers">
          <h1>Manage Your Spots</h1>
        </div>

        <div className='myspot-card'>
          <ul className='myspot-ul-card'>
            {userSpots?.Spots?.map((spot) => (
              <div key={spot.id} className="myspot-card-column">

                <div key={spot.id} className="myspot-card-column">

                  <div className="image-containered">
                <div className="myspot-buttons">
                  {deleteSpotButton(spot.id)}
                  <button className="button-23" onClick={() => history.push(`/spot/edit/${spot.id}`)}> 
                    Edit Spot
                  </button>
                </div>
                  <img 
                    onClick={()=> {history.push(`/spots/${spot.id}`)}}
                    className="myspot-image" 
                    src={spot.previewImage.includes('not') ? hubnbimage : spot.previewImage} 
                    alt="previewimages"
                    />
                    </div>
                    
                  <div className="landing-firstline-container">
                    <h4 className="title-text"> {spot.name}</h4>
                    <h4> &#x2605;{fixedDecimal(spot.avgRating)}</h4>
                  </div>
                    
                  <div className="landing-secondline-container">
                    <p>{spot.city}</p>
                    <p>{spot.country}</p>
                  </div>
                    
                  <div>
                    <h4>${spot.price} night</h4>
                  </div>
                </div>
              </div>
            ))}
          </ul>
        </div>
      </div>

      <div className="myspot-right-container" > 
        <Maps apiKey={key} userSpots={userSpots}/>
      </div>
      </>
      ) : (
        <div style={{marginLeft:'50%', marginTop:'20%'}}>
        <ReactLoading type="spokes" color="#888"
        height={100} width={50} />
      </div>
      )}
    </div>
  );
}


export default ManageMySpots;
