import { csrfFetch } from './csrf';

const LOAD_SPOTS = 'spots/LOADSPOTS';


export const loadSpots = (spots) => ({ 
    type: LOAD_SPOTS,
    spots
})


export const allSpots = () => async dispatch => { 
    const res = await csrfFetch('/api/spots');

    if(res.ok){ 
        const listSpot = await res.json();
        dispatch(loadSpots(listSpot))
    }
}


const spotsReducer = (state = {}, action) => { 
    let newState = {...state}
    switch(action.type){
        case LOAD_SPOTS:  
            return newState = action.spots
        default:
            return state;
    }
}


export default spotsReducer
