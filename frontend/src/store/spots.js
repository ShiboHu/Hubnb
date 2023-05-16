import { csrfFetch } from './csrf';

const LOAD_SPOTS = 'spots/LOADSPOTS';
const SPOT_DETAILS = 'spots/SPOTDETAILS';
const CREATE_SPOTS = 'spots/CREATESPOTS'; 
const LOAD_USERSPOTS = 'spots/LOADUSERSPOTS';
const DELETE_SPOT = 'spots/DELETESPOTS';
const UPDATE_SPOT = 'spots/UPDATESPOTS';

export const loadSpots = (payload) => ({ 
    type: LOAD_SPOTS,
    payload
})

export const spotDetail = (payload) => ({ 
    type: SPOT_DETAILS,
    payload
})

export const createSpot = (payload) => ({ 
    type: CREATE_SPOTS,
    payload
})

export const loaduserSpot = (payload) => ({ 
    type: LOAD_USERSPOTS,
    payload
})

export const deleteUserSpot = (payload, spotId) => ({ 
    type: DELETE_SPOT,
    payload,
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


const intialState = {spots: [], userSpots: [], singleSpot: {}}
const spotsReducer = (state = intialState, action) => { 
    switch(action.type){
        case LOAD_SPOTS:  
             return { 
                ...state, 
                spots: action.payload
             }
        case SPOT_DETAILS:
             return { 
                ...state, 
                singleSpot: action.payload
             }
        case CREATE_SPOTS: 
            return { 
                ...state, 
                spots: [...state.spots, action.payload]
            }
        case LOAD_USERSPOTS: 
            return { 
                ...state, 
                userSpots: action.payload
            }
        case DELETE_SPOT: 
            return state
        case UPDATE_SPOT: 
            
        default:
            return state;
    }
}


export default spotsReducer
