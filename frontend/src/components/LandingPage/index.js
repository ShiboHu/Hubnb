import { allSpots } from "../../store/spots"
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from "react";
import './LandingPage.css'
import { Link } from "react-router-dom";

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
          <ul className="spot-card" >
          {spots.Spots.map((spot) => 
          <div className="spot-card-column" >
          <li key={spot.id}>
            <Link to={`/spots/${spot.id}`} className="link">
            <img 
            className="spot-image" 
            src={spot.previewImage} 
            alt="previewimages">
            </img>
            <h3>{spot.name}&nbsp;&nbsp;&#9733;{spot.avgRating}</h3>
            <h4>{spot.city},&nbsp;&nbsp;{spot.country}</h4>
            <h4>${spot.price}&nbsp;night</h4>
            </Link>
          </li>
          </div>
          )}
          </ul>
        </div>    
        </>
    )
}

export default LandingPage
