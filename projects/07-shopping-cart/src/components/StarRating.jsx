import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarEmpty } from '@fortawesome/free-regular-svg-icons';

const StarRating = ({ rating }) => {
  const roundedRating = Math.round(rating * 2) / 2;

  const stars = Array.from({ length: 5 }, (_, index) => {
    if (index < Math.floor(roundedRating)) {
      return 'full';
    } else if (index < roundedRating) {
      return 'half';
    } else {
      return 'empty';
    }
  });

  return (
    <div className="flex gap-6">
        <strong>{rating}</strong>
        <div className='flex gap-2'>
            {stars.map((type, index) => (
            <span key={index} className="text-yellow-500">
            <FontAwesomeIcon
                icon={type === 'full' ? faStar : type === 'half' ? faStarHalfAlt : faStarEmpty}
                size="lg"
            />
            </span>
            ))}
        </div>
    </div>
  );
};

export default StarRating;
