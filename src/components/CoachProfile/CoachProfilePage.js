import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { fetchCoachProfileById } from '../../redux/actions/coachActions';
import { fetchReviewsByCoach, addReview } from '../../redux/actions/reviewActions';
import LogoutNavbar from '../Layout/LogoutNavbar';
import Footer from '../Layout/Footer';
import CoachProfile from './CoachProfile';
import ReviewsSection from './ReviewsSection';
import AddReviewForm from './AddReviewForm';

const CoachProfilePage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const coachProfile = useSelector(state => state.coaches.selectedCoach);
  const reviewsData = useSelector(state => state.reviews.reviewsByCoach[id]);

  const reviews = reviewsData?.reviews || [];
  const avgRating = reviewsData?.avgRating || 'No Ratings';

  const [submitError, setSubmitError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (location.state?.message) {
      setSuccessMessage(location.state.message);
    }

    dispatch(fetchCoachProfileById(id)).then(() => setLoading(false));
    dispatch(fetchReviewsByCoach(id));
  }, [dispatch, id, location.state]);

  const handleSubmitReview = (rating, comment) => {
    if (rating < 0 || rating > 5) {
      setSubmitError('Rating must be between 0 and 5.');
      return;
    }

    if (!rating || !comment) {
      setSubmitError('Please provide both a rating and a comment.');
      return;
    }

    dispatch(addReview(id, rating, comment, navigate, setSubmitError));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!coachProfile) {
    return <div>Coach profile not found.</div>;
  }

  return (
    <div>
      <LogoutNavbar />
      <div className="bg-gray-100 min-h-screen p-6">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-12">
          {successMessage && <p className="text-green-500 text-center mb-4">{successMessage}</p>}

          <CoachProfile coachProfile={coachProfile} avgRating={avgRating} />
          <ReviewsSection reviews={reviews} />
          <AddReviewForm onSubmitReview={handleSubmitReview} submitError={submitError} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CoachProfilePage;
