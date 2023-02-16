import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteCurrentReview } from "../../store/reviews";


function DeleteReviewBox(props){ 
    const dispatch = useDispatch();
    const { closeModal } = useModal();

  

    const submit = e => { 
        e.preventDefault();
      
        dispatch(deleteCurrentReview(props.props.id, props.props.spotId));
        closeModal();
    }
    return (
        <div>
        <h1>Confirm Delete</h1>
        <h3>Are you sure you want to delete this review?</h3>
        <button className="delete-button"
        onClick={submit}
        >Yes(Delete Review)</button>
        <button className="delete-button"
        onClick={closeModal}
        >No(Keep Review)</button>
    </div>
    )
}

export default DeleteReviewBox;
