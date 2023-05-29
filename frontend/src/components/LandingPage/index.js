import { allSpots } from "../../store/spots"
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from "react";
import './LandingPage.css'
import { useHistory } from "react-router-dom";
import { useState } from "react";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css';
import hubnbimage from '../Navigation/hubnblogo.png'

function LandingPage() { 
    const history = useHistory();
    const dispatch = useDispatch();
    const spots = useSelector(state => state.spots.spots)
    const [isLoaded, setisLoaded] = useState();

 console.log(spots)
    useEffect(() => { 
        dispatch(allSpots(spots))

        setTimeout(() => { 
            setisLoaded(true)
        }, 800)
        
    },[]);



    const fixedDecimal = (num) => { 
      if(num === 0){ 
        return 'New'
      }
        else if (num % 1 === 0) {
            return num.toString().match(/^\d+(?:\.\d{0,1})?/)
          }
      else { 
      return Math.floor(num * 100) / 100
      }
    }

    return ( 
      <>
        <div className="landing-page">
      {isLoaded? (

          <ul className="spot-card" >
          {spots.Spots.map((spot) => 

          <div key={spot.id} className="spot-card-column">

            <img 
            onClick={()=> {history.push(`/spots/${spot.id}`)}}
            className="spot-image" 
            src={spot.previewImage.includes('Current') ? hubnbimage : spot.previewImage} 
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
   ) : ( 
              <ul className="spot-card" style={{zIndex: 0}}>
              {[...Array(20)].map((_, index) => (
                <div className="spot-card-column" key={index}>
                    <Skeleton className="spot-image" baseColor="grey" highlightColor="white"  />
                    <Skeleton className="skeleton" height={20} width={400}  baseColor="grey" highlightColor="white" />
                    <Skeleton className="skeleton" height={20} width={200}  baseColor="grey" highlightColor="white" />
                    <Skeleton height={20} width={120}  baseColor="grey" highlightColor="white" />
                  </div>
              ))}
              </ul>
        )}
        </div>    
  
   
        </>
    )
}

export default LandingPage
