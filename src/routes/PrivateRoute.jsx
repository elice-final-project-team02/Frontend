import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { isLoggedInState } from 'recoil/isLoggedInStateAtom';
import { roleState } from 'recoil/roleStateAtom';

export const PrivateRoute = ({ role, children }) => {
  const loginStatus = useRecoilValue(isLoggedInState);
  const userRole = useRecoilValue(roleState);

  useEffect(() => {
    if (loginStatus === 'LOGGED_OUT') {
      alert('로그인된 유저만 이용 가능한 서비스입니다.');
    }
  }, [loginStatus]);

  if (loginStatus === 'LOADING') {
    return;
  } else if (loginStatus === 'LOGGED_IN' && (!role || userRole === role)) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
};
