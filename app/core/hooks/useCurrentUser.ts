import { useQuery } from 'blitz';
import getCurrentUser from '../../users/queries/getCurrentUser';

export const useCurrentUser = () => {
    const [user] = useQuery(getCurrentUser, null);
    return user;
};
