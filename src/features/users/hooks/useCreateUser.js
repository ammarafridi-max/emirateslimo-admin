import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createUserApi } from '../services/userApi';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export function useCreateUser() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: createUser, isPending: isCreating } = useMutation({
    mutationFn: createUserApi,
    onSuccess: () => {
      toast.success('User created successfully!');
      queryClient.invalidateQueries(['users']);
      navigate('/users');
    },
    onError: () => {
      toast.error('User could not be created');
    },
  });

  return { createUser, isCreating };
}
