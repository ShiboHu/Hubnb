import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom";
import { userSpot } from "../../store/spots";
import OpenModalButton from "../OpenModalButton";
import EditSpotForm from "./editSpotForm";
import ConfirmBox from "../ConfirmModal";
import { reviewDetail } from "../../store/reviews";
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import { getKey } from '../../store/map'


function ManageMySpots() { 
    const dispatch = useDispatch();
    const history = useHistory();
    const userSpots = useSelector(state => state.spots.userSpots);

  console.log(userSpots)
    useEffect(() => { 
        dispatch(userSpot())


    }, [dispatch])

    const deleteSpotButton = (id) => { 
      return ( 
        <div> 
          <OpenModalButton 
          buttonText="Delete Spot"
          modalComponent={<ConfirmBox props={id}/>}
          />
        </div>
      )
    }
   
    const fixedDecimal = (num) => { 
      if(num === 0 || num === null || num === 'null'){ 
        return 'New'
      }
        else if (num % 1 === 0) {

          // console.log(num.toString().match(/^\d+(?:\.\d{0,2})?/))
            // return num.toString().match(/^\d+(?:\.\d{0,2})?/)
            return num.toString() + '.0'
          }
      //   return num
      // }
      else { 
      return Math.floor(num * 100) / 100
      }
    }


    return (
        <div className="myspot-homepage">

          <div className="myspot-left-container">
        <div className="headers">
        <h1>Manage Your Spots</h1>
        </div>


        <div>
          <ul className="myspot-card" >
          {userSpots?.Spots?.map((spot) => 
          <div key={spot.id}className="myspot-card-column" >

          <div className="myspot-buttons">
          {deleteSpotButton(spot.id)}
           <button className="button-23" onClick={() => history.push(`/spot/edit/${spot.id}`)}> 
            Edit
           </button>
           </div>

          <li key={spot.id}>
            <img 
            onClick={()=> {history.push(`/spots/${spot.id}`)}}
            className="myspot-image" 
            src={spot.previewImage} 
            alt="previewimages">
            </img>
           
            <h3 className="title-text">{spot.name}, &nbsp;&nbsp;
            &#9733;{fixedDecimal(spot.avgRating)}
            </h3>
            <h4 className="city-text">{spot.city},&nbsp;&nbsp;{spot.country}</h4>
            <h4 className="spotprice-text">${spot.price}&nbsp;night
            </h4>
          </li>
          </div>
          )}
          </ul>
        </div>    
        </div>

        <div className="myspot-right-container"> 
        </div>

        </div>
    )
}

export default ManageMySpots
