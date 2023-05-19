import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteBooking } from "../../store/booking";
import { useState } from "react";


function DeleteBookingModal( { props } ){ 
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const [errors, setErrors] = useState('');
  
    const submit = async e => { 
        e.preventDefault();
      
        try{
         await dispatch(deleteBooking(props))
         closeModal();
        }
        catch (e) { 
            const data = await e.json();
            console.log(data)
            if(data && data.message){ 
                setErrors(data.message)
            }
        }

    }
    return (
        <div>

            <ul>
                {errors}
            </ul>
        <h1>Confirm Delete</h1>
        <h3>Are you sure you want to delete this Booking?</h3>
        <button className="button-23"
        onClick={submit}
        >Yes(Delete Booking)</button>
        <button className="button-23"
        onClick={closeModal}
        >No(Keep Booking)</button>
    </div>
    )
}

export default DeleteBookingModal;
