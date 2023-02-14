import { csrfFetch } from './csrf';

const LOAD_SPOTS = 'spots/LOADSPOTS';
const SPOT_DETAILS = 'spots/SPOTDETAILS';
const CREATE_SPOTS = 'spots/CREATESPOTS'; 


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

export const createNewSpot = (payload) => async dispatch => {  
    const res = await csrfFetch(`/api/spots`, { 
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(payload)
    });
    if(res.ok){ 
        const newSpot = await res.json();
        console.log(newSpot)
        dispatch(createSpot(newSpot));
        return newSpot
    }
}

export const createSpotImage = (spotImage, id) => async dispatch => { 
    const res = await csrfFetch(`/api/spots/${id}/images`, { 
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(spotImage)
    });
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
            newState.Spots = [...newState.Spots, ...action.spot]
            return newState
        default:
            return state;
    }
}


export default spotsReducer
