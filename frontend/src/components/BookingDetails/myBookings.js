import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentBooking } from "../../store/booking";
import DeleteBookingModal from "../ConfirmModal/deleteBooking";
import OpenModalButton from "../OpenModalButton";

function ManageMyBookings(){ 
    const dispatch = useDispatch();
    const mybookings = useSelector(state => state.bookings.Bookings);
    const spots = useSelector(state => state.spots.Spots)

    console.log(spots)
    const spotName = (id) => { 
       return spots.find(spot => spot.id === id).name
    }

    const spotImage = (id) => { 
        return spots.find(spot => spot.id === id).previewImage
    }

    useEffect(() => { 
        dispatch(getCurrentBooking())
        // dispatch(allSpots())
    }, [])

    const deleteBookButton = () => { 


        return (
        <OpenModalButton 
        buttonText="Delete"
        modalComponent={<DeleteBookingModal />}
        />
        )
    }

    if(!mybookings || !spots) return null 

    return(
        <div>
        <h1 className="manage-booking-title">Manage Bookings</h1>
        {mybookings && mybookings.map(book => 
        <div className="bookings-page-container">
        <h3>Spot Name: {spotName(book.id)}</h3>
        <img className="booking-spot-image" src={spotImage(book.id)}></img>
        <h3>Start Date: {book.startDate}</h3>
        <h3>End Date: {book.endDate}</h3>
        <div className="deletebookbutton">{deleteBookButton()}</div>
        <h1>-----------------------------------------------------------------------</h1>
        </div>
        )
    }
        </div>
    )
}


export default ManageMyBookings;
