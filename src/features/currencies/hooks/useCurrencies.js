import { useQuery } from '@tanstack/react-query';
import { getCurrenciesApi } from '../services/currencyApi';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export function useCurrencies() {
  const navigate = useNavigate();
  const {
    data: currencies,
    isLoading: isLoadingCurrencies,
    error,
  } = useQuery({
    queryKey: ['currencies'],
    queryFn: () => getCurrenciesApi(),
    onError: (error) => {
      toast.error(error.message);
      setTimeout(() => {
        navigate('/');
      }, 3000);
    },
  });

  return {
    currencies,
    isLoadingCurrencies,
    error,
  };
}
