import { csrfFetch} from "./csrf";

const LOAD_REVIEWS = 'reviews/LOADREVIEWS'; 
const CREATE_REVIEWS = 'reviews/CREATEREVIEWS';


export const loadReviews = (reviews) => ({ 
    type: LOAD_REVIEWS,
    reviews
});

export const postReviews = (reivews) => ({ 
    type: CREATE_REVIEWS,
    reivews
})


export const reviewDetail = (id) => async dispatch => { 
    const res = await csrfFetch(`/api/spots/${id}/reviews`);

    if(res.ok){ 
        const listReview = await res.json();
        dispatch(loadReviews(listReview))
    }
    return res
}

export const createReviews = (payload, spotId) => async dispatch => { 
    const res = await csrfFetch(`/api/spots/${spotId}/reviews`, { 
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(payload)
    })

    if(res.ok){ 
        const newReview = await res.json();
        // dispatch(postReviews(newReview));
        return newReview
    }
}

const reviewReducer = (state = {}, action) => { 
    let newState = {...state}
    switch(action.type){ 
        case LOAD_REVIEWS:
            newState = action.reviews
            return newState
            return newState
        // case CREATE_REVIEWS: 
        //     newState.Reviews = [...newState.Reviews, action.reivews]
        //     return newState
        default:
            return state;
    }
}

export default reviewReducer
