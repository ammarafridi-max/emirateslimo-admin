import { Navigate, Outlet } from 'react-router-dom';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export default function PrivateRoutes({ children }) {
  const jwtToken = cookies.get('jwt');

  if (!jwtToken) {
    return <Navigate to="/login" replace />;
  }

  return children || <Outlet />;
}
