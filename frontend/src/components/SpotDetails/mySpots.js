import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom";
import { userSpot } from "../../store/spots";
import OpenModalButton from "../OpenModalButton";
import EditSpotForm from "./editSpotForm";
import ConfirmBox from "../ConfirmModal";
import { reviewDetail } from "../../store/reviews";
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import { getKey } from '../../store/map';


const containerStyle = {
  width: '100%',
  height: '100vh',
};

function ManageMySpots() { 
  const dispatch = useDispatch();
  const history = useHistory();
  const userSpots = useSelector(state => state.spots.userSpots);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const key = useSelector((state) => state.maps.key);

  console.log(userSpots);

  useEffect(() => { 
    dispatch(userSpot());

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
  let locations = userSpots.Spots.map(spot => ({ lat: spot.lat, lng: spot.lng }));

  if (!key) {
    return null;
  }
  



  const handleMarkerClick = (place) => {
    setSelectedPlace(place);
  };
  
  const handleInfoWindowClose = () => {
    setSelectedPlace(null);
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
          center={locations.length > 0 ? locations[0] : null}
          zoom={10}
        >
          {locations.map((location, index) => (
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
                    src={selectedPlace.previewImage}
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
          <h1>Manage Your Spots</h1>
        </div>

        <div className='myspot-card'>
          <ul className='myspot-ul-card'>
            {userSpots?.Spots?.map((spot) => (
              <div key={spot.id} className="myspot-card-column">
                <div className="myspot-buttons">
                  {deleteSpotButton(spot.id)}
                  <button className="button-23" onClick={() => history.push(`/spot/edit/${spot.id}`)}> 
                    Edit Spot
                  </button>
                </div>

                <div key={spot.id} className="myspot-card-column">
                  <img 
                    onClick={()=> {history.push(`/spots/${spot.id}`)}}
                    className="myspot-image" 
                    src={spot.previewImage} 
                    alt="previewimages"
                    />
                    
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

      <div className="myspot-right-container"> 
        <Maps apiKey={key} />
      </div>

    </div>
  );
}


export default ManageMySpots;
