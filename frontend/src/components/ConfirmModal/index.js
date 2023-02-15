import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { deleteSpot } from "../../store/spots";

function ConfirmBox(id){ 
    const dispatch = useDispatch();
    const { closeModal } = useModal()

    return ( 
        <div>
            <h1>Confirm Delete</h1>
            <h3>Are you sure you want to remove this spot from the listsings</h3>
            <button className="delete-button"
            onClick={() => dispatch(deleteSpot(id.props))
            ? window.location.reload() : 'fail to delete'}
            >Yes(Delete Spot)</button>
            <button className="delete-button"
            onClick={closeModal}
            >No(Keep Spot)</button>
        </div>
    )
}


export default ConfirmBox;
