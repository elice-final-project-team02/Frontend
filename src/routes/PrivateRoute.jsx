import React from 'react';
import { Navigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { isLoggedInState } from 'recoil/isLoggedInState';

export const PrivateRoute = ({ children }) => {
  const isLoggedIn = useRecoilValue(isLoggedInState);
  return isLoggedIn ? children : <Navigate to="/login" />;
};
