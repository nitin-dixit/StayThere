import { Link } from 'react-router-dom';

import api from '@/api';
import { useAuth } from '@/components/AuthProvider';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Separator,
} from '@/components/ui';
import { getImageUrl } from '@/lib/utils/images';
import { SquarePen } from 'lucide-react';
import { HeartPlus } from 'lucide-react';
import { User } from 'lucide-react';
import { LogOut } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';
import { useSelector } from 'react-redux';
import { Badge } from '@/components/ui/badge';

const NavBar = () => {
  const { setToken, setUser, user } = useAuth();
  const favoriteListingIds = useSelector(
    (state) => state.listings.favoriteListingIds,
  );

  const handleSignOut = async () => {
    try {
      await api.post('/api/signout');

      setToken(null);
      setUser(null);
    } catch {
      setToken(null);
      setUser(null);
    }
  };

  return (
    <>
      <div className='flex flex-row flex-wrap items-center justify-between gap-8 px-8 py-4'>
        <Tooltip>
          <TooltipTrigger>
            <Link
              to='/'
              aria-describedby='home'
              aria-description='home'
              aria-label='home'
            >
              <Avatar className={'h-15 w-15'}>
                <AvatarImage src={getImageUrl('logo.png')} alt={'logo'} />
                <AvatarFallback className='bg-secondary h-10 w-10'>
                  {'logo'}
                </AvatarFallback>
              </Avatar>
            </Link>
          </TooltipTrigger>

          <TooltipContent>Home</TooltipContent>
        </Tooltip>

        <div className='flex-end flex flex-row items-center gap-8'>
          <Tooltip>
            <TooltipTrigger>
              <Link to='/listings/post'>
                <SquarePen />
              </Link>
            </TooltipTrigger>
            <TooltipContent>Post a Listing</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger>
              <Link to='/favorites'>
                <HeartPlus className='relative' />
                {favoriteListingIds.length ? (
                  <Badge className='absolute top-6 right-21 h-5 min-w-5 rounded-full px-1 font-mono tabular-nums'>
                    {favoriteListingIds.length}
                  </Badge>
                ) : (
                  <></>
                )}
              </Link>
            </TooltipTrigger>
            <TooltipContent>Favorite Listings</TooltipContent>
          </Tooltip>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Link>
                <Avatar className={'h-10 w-10'}>
                  <AvatarImage
                    src={user.avatarUrl}
                    alt={'signed in user avatar'}
                  />
                  <AvatarFallback className='bg-secondary h-10 w-10'>
                    {'user'}
                  </AvatarFallback>
                </Avatar>
              </Link>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <Link to='/profile'>
                <DropdownMenuItem>
                  <User className='pr-1' /> Profile
                </DropdownMenuItem>
              </Link>
              <DropdownMenuItem onClick={handleSignOut}>
                <LogOut className='pr-1' />
                Log Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <Separator />
    </>
  );
};

export default NavBar;
