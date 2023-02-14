import { csrfFetch } from './csrf';

const LOAD_SPOTS = 'spots/LOADSPOTS';
const SPOT_DETAILS = 'spots/SPOTDETAILS'

export const loadSpots = (spots) => ({ 
    type: LOAD_SPOTS,
    spots
})

export const spotDetail = (spot) => ({ 
    type: SPOT_DETAILS,
    spot
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


const spotsReducer = (state = {}, action) => { 
    let newState = {...state}
    switch(action.type){
        case LOAD_SPOTS:  
             newState = action.spots;
             return newState
        case SPOT_DETAILS:
             newState.spotDetail = action.spot;
             return newState
        default:
            return state;
    }
}


export default spotsReducer
