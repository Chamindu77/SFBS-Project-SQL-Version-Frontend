import axios from 'axios';
import { FETCH_REVIEWS_BY_COACH, ADD_REVIEW } from './types';
import { toast } from 'react-toastify';

export const fetchReviewsByCoach = (coachProfileId) => async (dispatch, getState) => {
    try {
        const token = getState().auth.token;
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': token,
            },
        };

        const res = await axios.get(`http://localhost:5000/api/v1/reviews/${coachProfileId}`, config);

        dispatch({
            type: FETCH_REVIEWS_BY_COACH,
            payload: {
                coachProfileId,
                avgRating: res.data.avgRating,
                reviews: res.data.reviews,
            },
        });
    } catch (err) {
        console.error(err);
    }
};


// Add a new review
export const addReview = (coachProfileId, rating, comment, navigate, setSubmitError) => async (dispatch, getState) => {
    try {
        const token = getState().auth.token;
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': token,
            },
        };

        const res = await axios.post(`http://localhost:5000/api/v1/reviews`, {
            coachProfileId,
            rating,
            comment
        }, config);

        dispatch({
            type: ADD_REVIEW,
            payload: res.data
        });

        // Fetch the updated list of reviews after adding a new one
        dispatch(fetchReviewsByCoach(coachProfileId));

        toast.success('Review submitted successfully!');

        setTimeout(() => {
            navigate('/coach-page');
          }, 1000); 
        
    } catch (err) {
        console.error(err);
        setSubmitError('Failed to submit the review. Please try again.');
    }
};