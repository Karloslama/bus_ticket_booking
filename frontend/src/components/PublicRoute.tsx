import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '../redux/store';

const PublicRoute: React.FC = () => {
  const { user, token } = useSelector((state: RootState) => state.auth);

  if (token && user) {
    return <Navigate to={`/${user.role}/dashboard`} />;
  }

  return <Outlet />;
};

export default PublicRoute;