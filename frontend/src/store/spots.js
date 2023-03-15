import { csrfFetch } from './csrf';

const LOAD_SPOTS = 'spots/LOADSPOTS';
const SPOT_DETAILS = 'spots/SPOTDETAILS';
const CREATE_SPOTS = 'spots/CREATESPOTS'; 
const LOAD_USERSPOTS = 'spots/LOADUSERSPOTS';
const DELETE_SPOT = 'spots/DELETESPOTS';
const UPDATE_SPOT = 'spots/UPDATESPOTS';

export const loadSpots = (spots) => ({ 
    type: LOAD_SPOTS,
    spots
})

export const spotDetail = (spot) => ({ 
    type: SPOT_DETAILS,
    spot
})

export const createSpot = (spot) => ({ 
    type: CREATE_SPOTS,
    spot
})

export const loaduserSpot = (spots) => ({ 
    type: LOAD_USERSPOTS,
    spots
})

export const deleteUserSpot = (spots, spotId) => ({ 
    type: DELETE_SPOT,
    spots,
    spotId
})


export const allSpots = () => async dispatch => { 
    const res = await csrfFetch('/api/spots');

    if(res.ok){ 
        const listSpot = await res.json();
        dispatch(loadSpots(listSpot))
    }
    return res
}

export const oneSpot = (id) => async dispatch => { 
    const res = await csrfFetch(`/api/spots/${id}`);

    if(res.ok){ 
        const spot = await res.json(); 
        dispatch(spotDetail(spot))
    }
    return res
}

export const userSpot = () => async dispatch => { 
    const res = await csrfFetch('/api/spots/current');
    if(res.ok){ 
        const userSpots = await res.json();
        dispatch(loaduserSpot(userSpots))
        return res
    }
}

export const createNewSpot = (payload, spotImage) => async dispatch => {  
    const res = await csrfFetch(`/api/spots`, { 
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(payload)
    });
    
    if(res.ok){ 
        const newSpot = await res.json();
        
        const newRes = await csrfFetch(`/api/spots/${newSpot.id}/images`, { 
           method: 'POST',
           body: JSON.stringify(spotImage)
        });
        
        if(newRes.ok)
        dispatch(createSpot(newSpot));
        dispatch(oneSpot(newSpot.id))
        return newSpot
    }
}

 


export const deleteSpot = (spotId) => async dispatch => { 
    const res = await csrfFetch(`/api/spots/${spotId}`, { 
        method: "DELETE"
    })
    if(res.ok){ 
        dispatch(deleteUserSpot(spotId))
        dispatch(userSpot())
    }
    return res
}

export const editSpot = (payload, spotId) => async dispatch => { 
    const res = await csrfFetch(`/api/spots/${spotId}`,{ 
        method: "PUT",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(payload)
    });
    if(res.ok){ 
        const data = res.json();
        dispatch(oneSpot(spotId))
        dispatch(editSpot(data))
    }
    return res
}

const spotsReducer = (state = {}, action) => { 
    let newState = {...state}
    switch(action.type){
        case LOAD_SPOTS:  
             newState = action.spots;
             return newState
        case SPOT_DETAILS:
             newState.spotDetail = action.spot;
             return newState
        case CREATE_SPOTS: 
            newState.newSpot = [...newState.Spots, action.spot]
            return newState
        case LOAD_USERSPOTS: 
            newState.userSpot = action.spots
            return newState
        case DELETE_SPOT: 
            newState.userSpot = null
            return newState
        case UPDATE_SPOT: 
            newState.newSpot = [...newState.Spots, action.spot]
        return newState
        default:
            return state;
    }
}


export default spotsReducer
