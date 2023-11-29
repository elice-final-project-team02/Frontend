import { Navigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { isLoggedInState } from 'recoil/isLoggedInState';

export const PublicRoute = ({ children }) => {
  const loginStatus = useRecoilValue(isLoggedInState);

  if (loginStatus === 'LOADING') {
    return;
  } else if (loginStatus === 'LOGGED_IN') {
    return <Navigate to="/" />;
  } else {
    return children;
  }
};
