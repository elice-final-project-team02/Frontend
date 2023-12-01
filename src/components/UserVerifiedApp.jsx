// App.js 에서 로그인상태 확인을 위해 get 요청을 보내는 컴포넌트
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Footer } from './common/footer';
import { Header } from './common/header';
import { MaxWidth } from './common/maxWidth';
import MessageButton from './common/message/MessageButton';
import '../styles/index.scss';
import { Outlet } from 'react-router-dom';
import { isLoggedInState } from 'recoil/isLoggedInState';
import { roleState } from 'recoil/roleState';
import { useRecoilState } from 'recoil';
import { getUser } from '../hooks/getUser';

export default function UserVerifiedApp() {
  const location = useLocation();
  const [loginStatus, setLoginStatus] = useRecoilState(isLoggedInState);
  const [userRole, setUserRole] = useRecoilState(roleState);

  useEffect(() => {
    getUser()
      .then((response) => {
        setLoginStatus('LOGGED_IN');
        setUserRole(response.role.role);
      })
      .catch(() => {
        setLoginStatus('LOGGED_OUT');
        setUserRole('');
      });
  }, []);

  useEffect(() => {
    const privateRoutes = location.pathname.startsWith('/mypage') || location.pathname.startsWith('/posts');
    if (privateRoutes && loginStatus === 'LOGGED_OUT') {
      getUser()
        .then((response) => {
          setLoginStatus('LOGGED_IN');
          setUserRole(response.role.role);
        })
        .catch(() => {
          setLoginStatus('LOGGED_OUT');
          setUserRole('');
        });
    }
  }, [location, loginStatus]);

  return (
    <div className="entireWrapper">
      <Header />
      <main>
        <MaxWidth>
          <Outlet />
        </MaxWidth>
        {/* 메시지함(채팅방) 버튼 컴포넌트 - 회원한정 모든 페이지에서 보임 */}
        <MessageButton />
      </main>
      <Footer />
    </div>
  );
}
