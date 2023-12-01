// App.js 에서 로그인상태 확인을 위해 get 요청을 보내는 컴포넌트
import React, { useEffect, useState } from 'react';
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
import { getCheckUpdateMessage } from '../hooks/getCheckUpdateMessage';

export default function UserVerifiedApp({ setMessageBoxState, setChatId }) {
  const location = useLocation();
  const [loginStatus, setLoginStatus] = useRecoilState(isLoggedInState);
  const [userRole, setUserRole] = useRecoilState(roleState);
  const [checkUpdate, setCheckUpdate] = useState(false);

  // 최초 렌더링 시 호출
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

  // privateRoute 진입시 호출
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

  // location 이동 시, message update 확인
  useEffect(() => {
    if (loginStatus === 'LOGGED_IN') {
      getCheckUpdateMessage()
        .then((response) => {
          setCheckUpdate(response.isUpdated);
        })
        .catch((e) => console.log(e)); // 임시로 콘솔에 찍음
    }
  }, [location, loginStatus]);

  return (
    <div className="entireWrapper">
      <Header />
      <main>
        <MaxWidth>
          <Outlet setMessageBoxState={setMessageBoxState} setChatId={setChatId} />
        </MaxWidth>
        {/* 메시지함(채팅방) 버튼 컴포넌트 - 회원한정 모든 페이지에서 보임 */}
        <MessageButton setMessageBoxState={setMessageBoxState} setChatId={setChatId} checkUpdate={checkUpdate} />
      </main>
      <Footer />
    </div>
  );
}
