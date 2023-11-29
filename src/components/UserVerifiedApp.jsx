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
import { useRecoilState } from 'recoil';
import { getUser } from '../hooks/getUser';

export default function UserVerifiedApp() {
  const location = useLocation();
  const [loginStatus, setLoginStatus] = useRecoilState(isLoggedInState);

  useEffect(() => {
    getUser()
      .then(() => setLoginStatus('LOGGED_IN'))
      .catch(() => setLoginStatus('LOGGED_OUT'));
  }, []);

  useEffect(() => {
    const privateRoutes = location.pathname.startsWith('/mypage') || location.pathname.startsWith('/posts');
    if (privateRoutes) {
      getUser()
        .then(() => setLoginStatus('LOGGED_IN'))
        .catch(() => setLoginStatus('LOGGED_OUT'));
    }
  }, [location]);

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
