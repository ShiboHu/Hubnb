import { allSpots } from "../../store/spots"
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from "react";
import './LandingPage.css'
import { useHistory } from "react-router-dom";

function LandingPage() { 
    const history = useHistory();
    const dispatch = useDispatch();
    const spots = useSelector(state => state.spots.spots)

    console.log(spots)
    useEffect(() => { 
        dispatch(allSpots(spots))
    },[]);

    if(!spots.Spots) return null;

    const fixedDecimal = (num) => { 
      if(num === 0){ 
        return 'New'
      }
        else if (num % 1 === 0) {
          // console.log(num.toString().match(/^\d+(?:\.\d{0,2})?/))
            return num.toString().match(/^\d+(?:\.\d{0,1})?/)
          }
      //   return num
      // }
      else { 
      return Math.floor(num * 100) / 100
      }
    }

    return ( 
        <div className="landing-page">

          <ul className="spot-card" >
          {spots.Spots.map((spot) => 

          <div key={spot.id} className="spot-card-column">

            <img 
            onClick={()=> {history.push(`/spots/${spot.id}`)}}
            className="spot-image" 
            src={spot.previewImage} 
            alt="previewimages">
            </img>


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
          )}
          </ul>
        </div>    

    )
}

export default LandingPage
