import Cookies from 'universal-cookie';

export function useLogout() {
  const cookies = new Cookies();

  function logout() {
    cookies.remove('jwt', { path: '/' });
    window.location.href = '/login';
  }

  return { logout };
}
