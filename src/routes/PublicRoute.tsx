import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const PublicRoute = ({ children }: { children: JSX.Element }) => {
  console.log('public');
  const user = useSelector((state: RootState) => state.auth.user);
  return user ? <Navigate to="/profile" /> : children;
};

export default PublicRoute;
