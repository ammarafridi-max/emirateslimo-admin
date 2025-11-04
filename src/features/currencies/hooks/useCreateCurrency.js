import { useMutation } from '@tanstack/react-query';
import { createCurrencyApi } from '../services/currencyApi';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export function useCreateCurrency() {
  const navigate = useNavigate();
  const { mutate: createCurrency, isPending: isCreatingCurrency } = useMutation(
    {
      mutationFn: createCurrencyApi,
      onSuccess: () => {
        toast.success('Currency created successfully!');
        navigate('/currencies');
      },
      onError: () => {
        toast.error('Currency could not be created');
      },
    }
  );

  return { createCurrency, isCreatingCurrency };
}
