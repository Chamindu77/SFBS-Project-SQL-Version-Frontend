import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCoachProfileById } from '../../../../redux/actions/coachActions';
import { fetchReviewsByCoach } from '../../../../redux/actions/reviewActions';
import CoachProfile from './CoachProfile';
import ReviewsSection from './ReviewsSection';
//import { FaPlay, FaPowerOff } from 'react-icons/fa';

const CoachProfilePage = ({ coachId, coachUserId }) => {  
  const dispatch = useDispatch();
  const coachProfile = useSelector(state => state.coaches.selectedCoach);
  const reviewsData = useSelector(state => state.reviews.reviewsByCoach[coachId]);

  const reviews = reviewsData?.reviews || [];
  const avgRating = reviewsData?.avgRating || 'No Ratings';

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    
    dispatch(fetchCoachProfileById(coachId)).then((result) => {
      setLoading(false);
    });

    
    dispatch(fetchReviewsByCoach(coachId));
  }, [dispatch, coachId]);

  
  

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!coachProfile) {
    return <div>Coach profile not found.</div>;
  }

  return (
    <div className="space-y-4">
      <CoachProfile coachProfile={coachProfile} avgRating={avgRating} />
      <ReviewsSection reviews={reviews} />
      
    </div>
  );
};

export default CoachProfilePage;
