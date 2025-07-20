import React from 'react';
import { Star } from 'lucide-react';

export function StarRating({
  rating,
  maxRating = 5,
  size = 'md',
  showValue = false,
  interactive = false,
  onChange
}) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  const handleStarClick = (starRating) => {
    if (interactive && onChange) {
      onChange(starRating);
    }
  };

  return (
    <div className="flex items-center space-x-1">
      <div className="flex items-center">
        {Array.from({ length: maxRating }, (_, index) => {
          const starValue = index + 1;
          const isFilled = starValue <= rating;
          const isPartial = starValue > rating && starValue - 1 < rating;

          return (
            <button
              key={index}
              type="button"
              className={`${interactive ? 'cursor-pointer hover:scale-110' : 'cursor-default'} transition-transform duration-150`}
              onClick={() => handleStarClick(starValue)}
              disabled={!interactive}
            >
              <Star
                className={`${sizeClasses[size]} transition-colors duration-150 ${
                  isFilled
                    ? 'text-yellow-400 fill-current'
                    : isPartial
                    ? 'text-yellow-400 fill-current opacity-50'
                    : 'text-gray-300 dark:text-gray-600'
                }`}
              />
            </button>
          );
        })}
      </div>

      {showValue && (
        <span className="text-sm font-medium text-gray-600 dark:text-gray-400 ml-2">
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
}
