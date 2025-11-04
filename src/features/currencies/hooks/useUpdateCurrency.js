import { useMutation } from '@tanstack/react-query';
import { updateCurrencyApi } from '../services/currencyApi';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export function useUpdateCurrency() {
  const navigate = useNavigate();
  const { mutate: updateCurrency, isPending: isUpdatingCurrency } = useMutation(
    {
      mutationFn: ({ id, currencyData }) => updateCurrencyApi(id, currencyData),
      onSuccess: () => {
        toast.success('Currency updated successfully');
        navigate('/currencies');
      },
      onError: () => {
        toast.error('Currency could not be updated');
      },
    }
  );

  return { updateCurrency, isUpdatingCurrency };
}
