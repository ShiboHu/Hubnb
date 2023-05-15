import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentBooking } from "../../store/booking";
import DeleteBookingModal from "../ConfirmModal/deleteBooking";
import OpenModalButton from "../OpenModalButton";

function ManageMyBookings(){ 
    const dispatch = useDispatch();
    const mybookings = useSelector(state => state.bookings.bookings);

    console.log(mybookings)

    useEffect(() => { 
        dispatch(getCurrentBooking())
        }, [dispatch])


    if(!mybookings.Bookings) return null; 

    return(
        <div className="bookings-page-container">
        <h1 className="manage-booking-title">Manage Bookings</h1>

        <ul className="bookings-page-left-container">
        {mybookings?.Bookings.map(book => 
        <div>
        
        <div>
        <h3>{book.Spot.name}</h3>
        <OpenModalButton 
        buttonText="Delete"
        modalComponent={<DeleteBookingModal props={book.id}/>}
        />
        </div>

        <img className="bookings-image" alt="spotimage" src={book.Spot.previewImage}></img>
        <li>Start Date: {book.startDate}</li>
        <li>End Date: {book.endDate}</li>
        </div>

        )}
        </ul>

        </div>
    )
}


export default ManageMyBookings;
