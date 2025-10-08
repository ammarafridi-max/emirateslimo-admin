import { useMutation } from '@tanstack/react-query';
import { deleteVehicleImageApi } from '../services/vehicleApi';
import { toast } from 'react-hot-toast';

export function useDeleteImage() {
  const { mutate: deleteImage, isPending: isDeleting } = useMutation({
    mutationFn: ({ id, imageUrl }) => deleteVehicleImageApi(id, imageUrl),
    onSuccess: () => {
      toast.success('Image deleted successfully');
    },
    onError: () => {
      toast.error('Image could not be deleted');
    },
  });

  return { deleteImage, isDeleting };
}
