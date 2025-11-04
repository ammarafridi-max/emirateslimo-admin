import { useMutation } from '@tanstack/react-query';
import { loginApi } from '../services/authApi';
import toast from 'react-hot-toast';
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router-dom';

const cookies = new Cookies();

export function useLogin() {
  const navigate = useNavigate();
  const { mutate: login, isPending: isLoggingIn } = useMutation({
    mutationFn: (credentials) => {
      if (credentials.username && credentials.password) {
        return loginApi(credentials);
      } else {
        throw new Error('Invalid or missing credentials');
      }
    },
    onSuccess: (res) => {
      if (res?.token) {
        cookies.set('jwt', res.token, {
          path: '/',
          secure: true,
          sameSite: 'strict',
        });
        toast.success('Login successful');
        navigate('/');
      } else {
        throw new Error('Invalid or missing credentials');
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { login, isLoggingIn };
}
