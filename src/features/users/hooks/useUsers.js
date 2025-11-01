import { useQuery } from '@tanstack/react-query';
import { getUsersApi } from '../services/userApi';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export function useUsers() {
  const navigate = useNavigate();
  const {
    data: users,
    isLoading: isLoadingUsers,
    error,
  } = useQuery({
    queryKey: ['users'],
    queryFn: () => getUsersApi(),
    onError: (error) => {
      toast.error(error.message);
      setTimeout(() => {
        navigate('/');
      }, 3000);
    },
  });

  return {
    users,
    isLoadingUsers,
    error,
  };
}
