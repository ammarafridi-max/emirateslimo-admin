import { useMutation } from '@tanstack/react-query';
import { deleteCurrencyApi } from '../services/currencyApi';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export function useDeleteCurrency(id) {
  const navigate = useNavigate();
  const { mutate: deleteCurrency, isPending: isDeletingCurrency } = useMutation(
    {
      mutationFn: () => {
        confirm('Are you sure you want to delete this currency?');
        deleteCurrencyApi(id);
      },
      onSuccess: () => {
        toast.success('Currency deleted successfully!');
        navigate('/currencies');
      },
      onError: () => {
        toast.error('Currency could not be deleted');
      },
    }
  );

  return { deleteCurrency, isDeletingCurrency };
}
