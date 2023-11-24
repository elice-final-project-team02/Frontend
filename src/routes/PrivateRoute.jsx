import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { isLoggedInState } from 'recoil/storage';

export const PrivateRoute = ({ children }) => {
  const isLoggedIn = useRecoilValue(isLoggedInState);

  useEffect(() => {
    if (!isLoggedIn) {
      alert('로그인된 유저만 이용 가능한 서비스입니다.');
    }
  }, [isLoggedIn]);
  return isLoggedIn ? children : <Navigate to="/login" />;
};
