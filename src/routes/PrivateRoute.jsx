import { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { isLoggedInState } from 'recoil/isLoggedInState';
import { roleState } from 'recoil/roleState';
import { useGetUser } from 'hooks';

export const PrivateRoute = ({ children }) => {
  const setIsLoggedIn = useSetRecoilState(isLoggedInState);
  const setRole = useSetRecoilState(roleState);
  const { data } = useGetUser();

  useEffect(() => {
    if (data) {
      setIsLoggedIn(true);
      setRole(data.role.role);
    } else {
      setIsLoggedIn(false);
      setRole('');
    }
  }, [data, setIsLoggedIn, setRole]);

  const isLoggedIn = useRecoilValue(isLoggedInState);
  const role = useRecoilValue(roleState);

  // console.log(isLoggedIn, role);

  return data ? children : null;
};
