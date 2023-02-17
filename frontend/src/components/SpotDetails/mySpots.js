import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom";
import { userSpot } from "../../store/spots";
import OpenModalButton from "../OpenModalButton";
import EditSpotForm from "./editSpotForm";
import ConfirmBox from "../ConfirmModal";
import { reviewDetail } from "../../store/reviews";

function ManageMySpots() { 
    const dispatch = useDispatch();
    const history = useHistory();
    const userSpots = useSelector(state => state.spots.userSpot);
    const reviews = useSelector(state => state.reviews.Reviews)


    useEffect(() => { 
        dispatch(userSpot())
        dispatch(reviewDetail())
    }, [])


    
    const editSpotButton = (id) => { 
      return <div>
        <OpenModalButton
        buttonText="Edit Spot"
        modalComponent={<EditSpotForm props={id}/>}
        />
      </div>
    }

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
   
    
    if(!userSpots) return( 
      <div>
      <div className="headers">
      <h1>Manage Your Spots</h1>
      </div>
      <div className="my-spot-create-spotbutton">
      </div>
      </div>
    );

    return (
        <div className="myspot-homepage">
        <div className="headers">
        <h1>Manage Your Spots</h1>
        <div className="my-spot-create-spotbutton">
        </div>
        </div>
        <div >
          <ul className="myspot-card" >
          {userSpots.Spots.map((spot) => 
          <div key={spot.id}className="myspot-card-column" >
          {deleteSpotButton(spot.id)}
           {editSpotButton(spot.id)}
          <li key={spot.id}>
            <img 
            onClick={()=> {history.push(`/spots/${spot.id}`)}}
            className="spot-image" 
            src={spot.previewImage} 
            alt="previewimages">
            </img>
           
            <h3 className="title-text">{spot.name}</h3>
            
            <h4 className="city-text">{spot.city},&nbsp;&nbsp;{spot.country}</h4>
            <h4 className="spotprice-text">${spot.price}&nbsp;night
            </h4>
          </li>
          </div>
          )}
          </ul>
        </div>    
        </div>
    )
}

export default ManageMySpots
