import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { isLoggedInState } from 'recoil/isLoggedInState';
import { isLoadingState } from 'recoil/isLoadingState';

export const PrivateRoute = ({ children }) => {
  const isLoggedIn = useRecoilValue(isLoggedInState);
  const isLoading = useRecoilValue(isLoadingState);

  useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      alert('로그인된 유저만 이용 가능한 서비스입니다.');
    }
  }, [isLoggedIn, isLoading]);

  if (isLoading) {
    return;
  }

  return isLoggedIn ? children : <Navigate to="/login" />;
};
