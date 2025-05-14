import { DollarSign, Pin } from 'lucide-react';
import { useSelector } from 'react-redux';

import ListingDetailsCardImages from '@/components/ListingDetailsCardImages';
import ListingFavoriteButton from '@/components/ListingFavoriteButton';
import ListingRatingStars from '@/components/ListingRatingStars';
import { Card, Separator } from '@/components/ui';
import UserAvatar from '@/components/UserAvatar';

const ListingDetailsCard = ({ listing }) => {
  const { users } = useSelector((state) => state.users);

  const listingUser = users[listing.userId];

  return (
    <Card className='mx-auto p-4'>
      <ListingDetailsCardImages listing={listing} />
      <Separator className='my-4' />
      <div className='flex justify-between'>
        <div>
          <h1 className='mb-2 text-xl font-bold sm:text-2xl'>{listing.name}</h1>
          <div className='mb-2 flex items-center gap-2'>
            <Pin className='text-primary h-4 w-4' />
            <span className='text-muted-foreground'>
              {listing.location.name}
            </span>
          </div>
          <div className='mb-4 flex items-center'>
            <DollarSign className='text-primary mr-2 h-4 w-4' />
            <span className='text-muted-foreground'>
              <span className='text-foreground font-bold'>{listing.price}</span>{' '}
              / night
            </span>
          </div>
        </div>
        <div className='flex items-center justify-between'>
          <ListingRatingStars
            className='mr-2 bg-transparent px-0 py-0'
            listing={listing}
          />
          <ListingFavoriteButton listing={listing} />
        </div>
      </div>
      <Separator className='mb-4' />
      {listingUser && (
        <>
          <UserAvatar user={listingUser} />
          <Separator className='my-4' />
        </>
      )}
      <div className='whitespace-pre-line'>{listing.description}</div>
    </Card>
  );
};

export default ListingDetailsCard;
