import { allSpots } from "../../store/spots"
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from "react";
import './LandingPage.css'

function LandingPage() { 
    const dispatch = useDispatch();
    const spots = useSelector(state => state.spots)

    useEffect(() => { 
        dispatch(allSpots(spots))
    },[]);

    if(!spots.Spots) return null;


    return ( 
        <>
        <div className="landing-page">
          <ul className="spot-card">
          {spots.Spots.map((spot) => 
          <li key={spot.id}>
            <img className="spot-image" src={spot.previewImage} alt="previewimages"></img>
            <h3>{spot.name}</h3>
            <h4 className="city-text">{spot.city}</h4>
            <h4>${spot.price} Night</h4>
          </li>
          )}
          </ul>
        </div>    
        </>
    )
}

export default LandingPage
