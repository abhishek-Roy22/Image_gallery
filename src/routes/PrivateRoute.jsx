import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hook/useAuth';

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/signup" replace={true} />;
  }

  return children;
};

export default PrivateRoute;
