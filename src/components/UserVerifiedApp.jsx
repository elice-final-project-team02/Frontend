// App.js 에서 로그인상태 확인을 위해 get 요청을 보내는 컴포넌트
import React, { useEffect } from 'react';
import { Footer } from './common/footer';
import { Header } from './common/header';
import { MaxWidth } from './common/maxWidth';
import MessageButton from './common/message/MessageButton';
import '../styles/index.scss';
import { Outlet } from 'react-router-dom';
import { isLoggedInState } from 'recoil/isLoggedInState';
import { useSetRecoilState } from 'recoil';
import { useGetUser } from '../hooks/getUser';

export default function UserVerifiedApp() {
  const setIsLoggedIn = useSetRecoilState(isLoggedInState);
  const { data, error } = useGetUser();

  useEffect(() => {
    if (data) {
      setIsLoggedIn(true);
    } else if (error && error.response && error.response.status === 403) {
      setIsLoggedIn(false);
    }
  }, [data, error, setIsLoggedIn]);

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
