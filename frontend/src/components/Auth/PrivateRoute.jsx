import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  console.log('PrivateRoute', { user, loading });

  if (loading) {
    // You can remove this block if you don't want any loading UI on page open
    return null; // or a spinner/loading UI if you prefer
  }

  // Check that user is a valid object (not null, not string, etc)
  const isValidUser = user && typeof user === 'object' && !Array.isArray(user);

  return isValidUser ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
