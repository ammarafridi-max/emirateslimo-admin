import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateUserApi } from '../services/userApi';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export function useUpdateUser() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: updateUser, isLoading: isUpdating } = useMutation({
    mutationFn: ({ id, data }) => updateUserApi(id, data),
    onSuccess: () => {
      toast.success('User updated successfully');
      queryClient.invalidateQueries(['users']);
      navigate('/users');
    },
    onError: () => {
      toast.error('User could not be updated');
    },
  });

  return { updateUser, isUpdating };
}
