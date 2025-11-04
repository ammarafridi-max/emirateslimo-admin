import { useQuery } from '@tanstack/react-query';
import { getCurrencyApi } from '../services/currencyApi';
import toast from 'react-hot-toast';

export function useCurrency(id) {
  const {
    data: currency = null,
    isLoading: isLoadingCurrency,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ['currency', id],
    queryFn: () => getCurrencyApi(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
    retry: 1,
    onError: (err) => {
      console.error('Currency fetch failed:', err);
      toast.error('Failed to fetch currency');
    },
  });

  return { currency, isLoadingCurrency, isError, error, refetch };
}
