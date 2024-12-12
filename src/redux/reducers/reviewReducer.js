import { FETCH_REVIEWS_BY_COACH, ADD_REVIEW } from '../actions/types';

const initialState = {
    reviewsByCoach: {}, 
};

function reviewReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_REVIEWS_BY_COACH:
            return {
                ...state,
                reviewsByCoach: {
                    ...state.reviewsByCoach,
                    [action.payload.coachProfileId]: {
                        avgRating: action.payload.avgRating,
                        reviews: action.payload.reviews,
                    },
                },
            };
        case ADD_REVIEW:
            return state;
        default:
            return state;
    }
}

export default reviewReducer;


