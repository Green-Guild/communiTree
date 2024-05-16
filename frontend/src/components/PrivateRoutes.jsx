import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import CurrentUserContext from '../contexts/current-user-context';

const PrivateRoutes = ({ userLoading }) => {
  const { currentUser } = useContext(CurrentUserContext);

  if (userLoading) {
    return null;
  }

  return currentUser ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
