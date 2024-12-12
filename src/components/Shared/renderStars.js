import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

export const renderRatingStars = (rating) => {
  const stars = [];

  if (!rating || rating === 0) {
    for (let i = 1; i <= 5; i++) {
      stars.push(<FaRegStar key={i} className="text-yellow-400" />);
    }
  } else {
    for (let i = 1; i <= 5; i++) {
      if (i <= Math.floor(rating)) {
        stars.push(<FaStar key={i} className="text-yellow-400" />);
      } else if (i === Math.ceil(rating) && rating % 1 !== 0) {
        stars.push(<FaStarHalfAlt key={i} className="text-yellow-400" />);
      } else {
        stars.push(<FaRegStar key={i} className="text-yellow-400" />);
      }
    }
  }

  return <div className="flex">{stars}</div>;
};


