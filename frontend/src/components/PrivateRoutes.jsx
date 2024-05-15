import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import CurrentUserContext from '../contexts/current-user-context';

const PrivateRoutes = () => {
  const { currentUser } = useContext(CurrentUserContext);

  return currentUser ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
