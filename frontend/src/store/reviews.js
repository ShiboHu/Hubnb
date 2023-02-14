import { csrfFetch} from "./csrf";

const LOAD_REVIEWS = 'reviews/LOADREVIEWS'; 


export const loadReviews = (reviews) => ({ 
    type: LOAD_REVIEWS,
    reviews
});


export const reviewDetail = (id) => async dispatch => { 
    const res = await csrfFetch(`/api/spots/${id}/reviews`);

    if(res.ok){ 
        const listReview = await res.json();
        dispatch(loadReviews(listReview))
    }
    return res
}

const reviewReducer = (state = {}, action) => { 
    let newState = {...state}
    switch(action.type){ 
        case LOAD_REVIEWS:
            newState = action.reviews
            return newState
        default:
            return state;
    }
}

export default reviewReducer
