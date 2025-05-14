import { Star } from 'lucide-react';

import { cn } from '@/lib/utils/cn';

const ListingRatingStars = ({ className, listing }) => {
  return (
    <div
      className={cn(
        'bg-background inline-flex flex-row items-center rounded-md px-2 py-1',
        className,
      )}
    >
      <Star className='text-secondary h-4 w-4 fill-yellow-400' />
      <span className='ml-2'>{listing.rating}</span>
    </div>
  );
};

export default ListingRatingStars;
