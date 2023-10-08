import { useAuth } from '@/hooks';
import { Navigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { ROUTES } from './routes';

function PrivateRoutes() {
  const { authenticated } = useAuth() ?? {};

  return authenticated ? <Outlet /> : <Navigate to={ROUTES.auth.login} />;
}
export default PrivateRoutes;
