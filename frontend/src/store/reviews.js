import { csrfFetch} from "./csrf";
import { oneSpot } from "./spots";

const LOAD_REVIEWS = 'reviews/LOADREVIEWS'; 
const CREATE_REVIEWS = 'reviews/CREATEREVIEWS';
const DELETE_REVIEWS = 'reviews/DELETEREVIEWS';
const LOAD_USER_REVIEWS = 'reviews/USERREVIEWS';

export const loadReviews = (reviews) => ({ 
    type: LOAD_REVIEWS,
    reviews
});

export const postReviews = (reviews) => ({ 
    type: CREATE_REVIEWS,
    reviews
});

export const deleteReviews = (reviews) => ({ 
    type: DELETE_REVIEWS,
    reviews
})

export const loadUserReviews = (reviews) => ({ 
    type: LOAD_USER_REVIEWS,
    reviews
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
        dispatch(reviewDetail(spotId))
        dispatch(oneSpot(spotId))
    }
}

export const deleteCurrentReview = (reviewId, spotId) => async dispatch => { 
    const res = await csrfFetch(`/api/reviews/${reviewId}`, { 
        method: 'DELETE'
    })
    if(res.ok){ 
        dispatch(deleteReviews(reviewId))
        dispatch(reviewDetail(spotId))
        dispatch(oneSpot(spotId))
  
    }
    return res
}

export const getCurrentReview = () => async dispatch => { 
    const res = await csrfFetch('/api/reviews/current')
    if(res.ok){ 
        const allReview = await res.json()
        dispatch(loadUserReviews(allReview))
        return allReview
    }
}


const reviewReducer = (state = {}, action) => { 
    let newState = {...state};
    switch(action.type){ 
        case LOAD_REVIEWS:
            newState = action.reviews
            return newState
        case DELETE_REVIEWS:   
            return newState = action.reviews
        case LOAD_USER_REVIEWS:
            newState = action.reviews
            return newState
        default:
            return state;
    }
}

export default reviewReducer
