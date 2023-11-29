import { useRecoilState, useSetRecoilState } from 'recoil';
import { isLoadingState } from 'recoil/isLoadingState';
import { isLoggedInState } from 'recoil/isLoggedInState';
import { roleState } from 'recoil/roleState';
import { useGetUser } from '../hooks/getUser';
import { useEffect, useState } from 'react';

export default function AuthProvider({ children }) {
  const setIsLoggedIn = useSetRecoilState(isLoggedInState);
  const setIsLoading = useSetRecoilState(isLoadingState);
  const setRole = useSetRecoilState(roleState);

  const [fetchUser, setFetchUser] = useState(true);

  const { data, isLoading, error } = useGetUser(fetchUser);

  useEffect(() => {
    if (data) {
      setIsLoggedIn(true);
      setRole(data.role.role);
      setFetchUser(false);
    } else if (error) {
      setIsLoggedIn(false);
      setRole('');
      setFetchUser(false);
    }
  }, [data, error]);

  return children;
}
