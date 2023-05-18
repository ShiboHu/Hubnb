import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { deleteSpot } from "../../store/spots";

function ConfirmBox(id){ 
    const history = useHistory()
    const dispatch = useDispatch();
    const { closeModal } = useModal()

    const sumbit = e => { 
        e.preventDefault(); 

        dispatch(deleteSpot(id.props))
        closeModal()
        return history.push('/user/current/spots')
    } 
    return ( 
        <div>
            <h1>Confirm Delete</h1>
            <h3>Are you sure you want to remove this spot from the listsings</h3>
            <button className="button-23"
            onClick={sumbit}
            >Yes(Delete Spot)</button>
            <button className="button-23"
            onClick={closeModal}
            >No(Keep Spot)</button>
        </div>
    )
}


export default ConfirmBox;
