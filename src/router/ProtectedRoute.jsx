import React from 'react';
import { useGetCurrentUser } from '../Api/authApi';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const  user  = useGetCurrentUser();
  console.log("user", user)
  if (!user) {
    return <Navigate to="/auth" replace />;
  }
  return <Outlet />;
};

export default ProtectedRoute;