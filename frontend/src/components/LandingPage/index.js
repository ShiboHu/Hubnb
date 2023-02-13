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
        <div>
          <ul>
          {spots.Spots.map((spot) => 
          <li key={spot.id}>
            <img className="spot-image" src={spot.previewImage}></img>
            <h3>{spot.name}</h3>
            <h4>{spot.city} {spot.country}</h4>
            <h4>${spot.price} Night</h4>
          </li>
          )}
          </ul>
        </div>    
        </>
    )
}

export default LandingPage
