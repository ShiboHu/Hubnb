import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";


function DeleteBookingModal(){ 
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const submit = e => { 
        e.preventDefault();
      
        closeModal();
    }
    return (
        <div>
        <h1>Confirm Delete</h1>
        <h3>Are you sure you want to delete this Booking?</h3>
        <button className="delete-button"
        onClick={submit}
        >Yes(Delete Booking)</button>
        <button className="delete-button"
        onClick={closeModal}
        >No(Keep Booking)</button>
    </div>
    )
}

export default DeleteBookingModal;
