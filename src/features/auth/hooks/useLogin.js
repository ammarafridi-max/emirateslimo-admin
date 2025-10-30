import { useMutation } from '@tanstack/react-query';
import { loginApi } from '../services/authApi';

export function useLogin() {
  const { mutate: login, isPending: isLoggingIn } = useMutation({
    mutationFn: (credentials) => loginApi(credentials),
  });

  return { login, isLoggingIn };
}
