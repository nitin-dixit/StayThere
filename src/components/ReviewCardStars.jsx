import { Star } from 'lucide-react';

import { cn } from '@/lib/utils/cn';

const ReviewCardStars = ({ className, review }) => {
  return (
    <div className={cn('inline-flex flex-row items-center', className)}>
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={cn('fill-secondary text-secondary h-5 w-5', {
            'fill-yellow-400': i < review.rating,
          })}
        />
      ))}
    </div>
  );
};

export default ReviewCardStars;
