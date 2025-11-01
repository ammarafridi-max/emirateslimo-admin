import { useQuery } from '@tanstack/react-query';
import { getUserApi } from '../services/userApi';
import toast from 'react-hot-toast';

export function useUser(id) {
  const {
    data: user = null,
    isLoading: isLoadingUser,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ['user', id],
    queryFn: () => getUserApi(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
    retry: 1,
    onError: (err) => {
      console.error('User fetch failed:', err);
      toast.error('Failed to fetch user');
    },
  });

  return { user, isLoadingUser, isError, error, refetch };
}
