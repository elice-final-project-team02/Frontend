import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { isLoggedInState } from 'recoil/isLoggedInState';

export const PrivateRoute = ({ children }) => {
  const loginStatus = useRecoilValue(isLoggedInState);

  useEffect(() => {
    if (loginStatus === 'LOGGED_OUT') {
      alert('로그인된 유저만 이용 가능한 서비스입니다.');
    }
  }, [loginStatus]);

  if (loginStatus === 'LOADING') {
    return;
  } else if (loginStatus === 'LOGGED_IN') {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
};
