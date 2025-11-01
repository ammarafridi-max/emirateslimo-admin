import { useMutation } from '@tanstack/react-query';
import { deleteUserApi } from '../services/userApi';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export function useDeleteUser(id) {
  const navigate = useNavigate();
  const { mutate: deleteUser, isLoading: isDeleting } = useMutation({
    mutationFn: (id) => {
      if (!confirm('Are you sure you want to delete this user?')) return;
      return deleteUserApi(id);
    },
    onSuccess: () => {
      toast.success('User deleted successfully!');
      navigate('/users');
    },
    onError: () => {
      toast.error('User could not be deleted');
    },
  });

  return { deleteUser, isDeleting };
}
