import { csrfFetch } from "./csrf";
import { allSpots } from "./spots";


const CREATE_BOOKING = 'bookings/CREATEBOOKINGS'
const CURRENT_BOOKING = 'bookings/CURRENTBOOK';
const DELETE_BOOKINGS = 'booings/DELETE'


export const createBooking = (payload) => ({
    type: CREATE_BOOKING,
    payload
});

export const currentBooking = (book) => ({ 
    type: CURRENT_BOOKING,
    book
})

const deletebook = (id) => ({ 
    type: CURRENT_BOOKING,
    id
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
        return currentbook
    }
}

export const deleteBooking = (id) => async dispatch => { 
    const res = await csrfFetch(`/api/bookings/${id}`, { 
        method: 'DELETE'
    })
    if(res.ok){ 
        const data = await res.json()
        dispatch(deletebook(data.id))
        dispatch(getCurrentBooking())
    }
}

const initialState = {bookings: []}
const bookingReducer = (state = initialState, action) => { 
    switch(action.type){ 
        case CURRENT_BOOKING:
            return { 
                ...state, 
                bookings: action.book
            }
        case CREATE_BOOKING:
            return {
                ...state,
                bookings: [...state.bookings, action.payload]
                }
        default:
            return state;
    }
}

export default bookingReducer;
