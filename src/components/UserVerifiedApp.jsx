// App.js 에서 로그인상태 확인을 위해 get 요청을 보내는 컴포넌트
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Footer } from './common/footer';
import { Header } from './common/header';
import { MaxWidth } from './common/maxWidth';
import MessageButton from './common/message/MessageButton';
import '../styles/index.scss';
import { Outlet } from 'react-router-dom';
import { isLoggedInState } from 'recoil/isLoggedInStateAtom';
import { roleState } from 'recoil/roleStateAtom';
import { useRecoilState } from 'recoil';
import { getUser } from '../hooks/useGetUser';
import { getCheckUpdateUser, getCheckUpdateCareUser } from '../hooks/useGetCheckUpdateMessage';

export default function UserVerifiedApp({ setMessageBoxState, setChatId }) {
  const location = useLocation();
  const [loginStatus, setLoginStatus] = useRecoilState(isLoggedInState);
  const [userRole, setUserRole] = useRecoilState(roleState);
  const [checkUpdateUser, setCheckUpdateUser] = useState(false);
  const [checkUpdateCareUser, setCheckUpdateCareUser] = useState(false);

  // 최초 렌더링 시 호출
  useEffect(() => {
    const verifyUser = async () => {
      try {
        const response = await getUser();
        setLoginStatus('LOGGED_IN');
        setUserRole(response.role.role);
      } catch {
        setLoginStatus('LOGGED_OUT');
        setUserRole('');
      }
    };
    verifyUser();
  }, []);

  // privateRoute 진입시 호출
  useEffect(() => {
    const privateRoutes = location.pathname.startsWith('/mypage') || location.pathname.startsWith('/posts');
    if (privateRoutes && loginStatus === 'LOGGED_OUT') {
      const verifyUser = async () => {
        try {
          const response = await getUser();
          setLoginStatus('LOGGED_IN');
          setUserRole(response.role.role);
        } catch {
          setLoginStatus('LOGGED_OUT');
          setUserRole('');
        }
      };
      verifyUser();
    }
  }, [location, loginStatus]);

  // location 이동 시, message update 확인 (role에 따라 다르게 처리)
  useEffect(() => {
    const checkUpdate = async () => {
      if (loginStatus === 'LOGGED_IN' && userRole === 'user') {
        try {
          const response = await getCheckUpdateUser();
          setCheckUpdateUser(response.isUpdated);
        } catch (e) {
          console.log(e);
        }
      } else if (loginStatus === 'LOGGED_IN' && userRole === 'careUser') {
        try {
          const response = await getCheckUpdateCareUser();
          setCheckUpdateCareUser(response.isUpdated);
        } catch (e) {
          console.log(e);
        }
      }
    };
    checkUpdate();
  }, [location, loginStatus, userRole]);

  return (
    <div className="entireWrapper">
      <Header />
      <main>
        <MaxWidth>
          <Outlet setMessageBoxState={setMessageBoxState} setChatId={setChatId} />
        </MaxWidth>
        {/* 메시지함(채팅방) 버튼 컴포넌트 - 회원한정 모든 페이지에서 보임 */}
        <MessageButton
          setMessageBoxState={setMessageBoxState}
          setChatId={setChatId}
          checkUpdateUser={checkUpdateUser}
          checkUpdateCareUser={checkUpdateCareUser}
        />
      </main>
      <Footer />
    </div>
  );
}
