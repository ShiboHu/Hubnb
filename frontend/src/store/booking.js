import { csrfFetch } from "./csrf";
import { allSpots } from "./spots";


const CREATE_BOOKING = 'bookings/CREATEBOOKINGS'
const CURRENT_BOOKING = 'bookings/CURRENTBOOK';

export const createBooking = (payload) => ({
    type: CREATE_BOOKING,
    payload
});

export const currentBooking = (book) => ({ 
    type: CURRENT_BOOKING,
    book
})


export const createBookings = (payload, spotId) => async dispatch => { 
    const res = await csrfFetch(`/api/spots/${spotId}/bookings`, { 
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(payload)
    })

    if(res.ok){ 
        const booking = await res.json();
        dispatch(createBooking(booking))
    }
    return res 
}


export const getCurrentBooking = () => async dispatch => { 
    const res = await csrfFetch('/api/bookings/current');

    if(res.ok){ 
        const currentbook = await res.json(); 
        dispatch(currentBooking(currentbook))
        dispatch(allSpots())
        return currentbook
    }
}

const bookingReducer = (state = {}, action) => { 
    let newState = {...state};
    switch(action.type){ 
        case CURRENT_BOOKING:
            newState = action.book
            return newState
        case CREATE_BOOKING:
            return {...newState, book: action.payload}
        default:
            return state;
    }
}

export default bookingReducer;
