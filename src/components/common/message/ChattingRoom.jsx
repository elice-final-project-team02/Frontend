import React, { useState, useEffect } from 'react';
import styles from './ChattingRoom.module.scss';
import { ChatBackHat,ChatBackBath, ChatBackYarn, ProfileImage } from 'assets/images';
import { FaUser, FaMapMarkerAlt } from "react-icons/fa";
import { IoReturnUpBackOutline } from "react-icons/io5";
import cs from 'classnames/bind';
import { FiSend } from 'react-icons/fi';

const cx = cs.bind(styles); 

// 채팅(메시지)방 컴포넌트
export default function ChattingRoom(props) {


  const [showFlag, setShowFlag] = useState(false);
  const [postUrl, setPostUrl] = useState(""); // 채팅방 내 게시글 주소
  const [chatRoomInfo, setChatRoomInfo] = useState({});

  
  // 채팅방 정보 조회 메서드
  const getChatRoom = () => {
    console.log(chatRoomInfo) // eslint 에러 방지용
    setChatRoomInfo({ postId: "123" })
    
      setPostUrl("/posts/" + "123")
    
  }


  // 채팅창 보임 메서드 (애니메이션 처리를 위한)
  const showChatRoom = (flag) => {
    if (flag) {
      getChatRoom(); //  채팅방 정보 조회

      setTimeout(() => { // 채팅창 띄움.
        setShowFlag(flag);
      }, 0)
    } else {
      setShowFlag(flag); //숨긴 후
      setTimeout(() => {
        //엘리먼트 제거
        props.chatInfoSelect("");
      },200)
    }
    
  }

  useEffect(() => {
    if (props.selectedChatId === "") {
      showChatRoom(false)
    } else {
      showChatRoom(true)
    }
  }, [props.selectedChatId])

    // 돌봄메이트 확정 메서드
    const careMateConfirm = () => {
      // 검증 로직은 추후에..
      if (window.confirm(`돌봄메이트를 확정하면 되돌릴 수 없으며\n매칭된 게시글은 내려갑니다.\n\n돌봄메이트를 최종 확정하시겠습니까?`)) {
        return alert("해당 게시글의 돌봄메이트가 확정되었습니다!\n돌봄메이트의 연락처는 채팅창에서 확인해주세요!");
      }
      return;
    }
  
    // 대화 종료하기 메서드
    const chatRoomOut = () => {
      // 검증 로직은 추후에..
      if (window.confirm(`대화를 종료하면 채팅방 및 모든 채팅내용이 사라집니다.\n 그래도 대화를 종료하시겠습니까?`)) {
        return showChatRoom(false);
      }
      return;
    }
    

  return (
      <div className={cx('wrapper', {on: showFlag})}>

        {/* 채팅창 영역 */}
        <div className={cx('chat-roombox')}>
          {/* 헤더 영역 */}
          <div className={cx('chat-room-header')}>

          <button onClick={() => showChatRoom(false)}
            className={cx('backbtn')}><IoReturnUpBackOutline size="30" color="var(--crl-blue-900)" /></button>

            <div className={cx('mate-photobox')}>
              <img className={cx('profile-photo')} src={ProfileImage} alt="돌봄메이트 프로필사진이미지" />
            </div>

            {/* 돌봄메이트 - 이름, 키워드, 자격, 성별, 지역 */}
          <div className={cx('mateinfo-leftbox')}>
            <a href={postUrl} target="_blank" className={cx('post-title')} rel="noreferrer">

              <span className={cx('post-num')}> #123 </span>
              병원 동행해주실 친절한 돌봄메이트분 구합니다. 
            </a>

            
              <span className={cx('matename')}>홍길동</span>
                <span className={cx('keyword')}>장애인</span>
              {/* react-icons */}
              
              
            
              <div className={cx('icons-box')}>

              <div className={cx('box1')}>
               <span> <FaUser size="15" color="#999" /></span>
              
                <span className={cx('genderinfo')}>20대 남성</span>
                <span><FaMapMarkerAlt size="15" color="#999" /></span>
                <span className={cx('areainfo')}>서울특별시 강남구</span>
                
              </div>
              
              
              <button onClick={careMateConfirm}
                className={cx('mate-confirmed')}>돌봄메이트 확정</button>
              <button onClick={chatRoomOut}
                className={cx('chatroom-out')}>대화 종료하기</button>
              
            </div>

              
            </div>
          </div>

          {/* 메시지 내용들 */}
          <div className={cx('chat-room-contents')}>     

            {/* 채팅 내용(texts)들 영역 */}
          <ul className={cx('chat-textsbox')}>
            {/* 채팅 일자 */}
            <li className={cx('chat-date')}>2023-11-20</li>

              {/* 1번 유저 */}
              <li className={cx('text-item', {me: false})}> {/* TODO. 개발용 false. 데이터 받아오면 userId 비교하여 내가 아닐때 false가 되도록.*/}
                <div className={cx('user-imgbox')}>
                  <img className={cx('img-user1')} src={ProfileImage} alt="채팅창 유저1이미지" />
                </div>

                <div>
                  <p className={cx('username1')}>홍길동</p>

                  <p className={cx('chat-text')}>
                    가지고 계신 지병이 있나요?</p>
                </div>

                <p className={cx('chat-time')}>11:20</p>
                <p className={cx('chat-read')}>읽음</p>
              

              </li>

              {/* 2번 유저 */}
              <li className={cx('text-item', {me: true})}>  {/* TODO. 개발용 true. 데이터 받아오면 userId 비교하여 나 일때만 true가 되도록.*/}

                <div className={cx('user-imgbox')}>
                  <img className={cx('img-user2')} src={ProfileImage} alt="채팅창 유저2이미지" />
                </div>

                <div>
                  <p className={cx('username2')}>나</p>
                  <p className={cx('chat-text')}>
                    네..고혈압을 가지고 계십니다.네..고혈압을 가지고 계십니다.네..고혈압을 가지고 계십니다.</p>
                </div>

                <p className={cx('chat-time')}>13:10</p>
                {/* <p className={cx('chat-read')}>읽음</p> */}
            </li>
            
            {/* 1번 유저 */}
            <li className={cx('text-item', {me: false})}>
                <div className={cx('user-imgbox')}>
                  <img className={cx('img-user1')} src={ProfileImage} alt="채팅창 유저1이미지" />
                </div>

                <div>
                  <p className={cx('username1')}>홍길동</p>

                  <p className={cx('chat-text')}>
                    가지고 계신 지병이 있나요?가지고 계신 지병이 있나요?가지고 계신 지병이 있나요?가지고 계신 지병이 있나요?</p>
                  
                </div>

                <p className={cx('chat-time')}>11:20</p>
                <p className={cx('chat-read')}>읽음</p>
              

              </li>

              {/* 2번 유저 */}
              <li className={cx('text-item', {me: true})}>

                <div className={cx('user-imgbox')}>
                  <img className={cx('img-user2')} src={ProfileImage} alt="채팅창 유저2이미지" />
                </div>

                <div>
                  <p className={cx('username2')}>나</p>
                  <p className={cx('chat-text')}>
                    네.. 고혈압을 가지고 계십니다.</p>
                </div>

                <p className={cx('chat-time')}>13:10</p>
                {/* <p className={cx('chat-read')}>읽음</p> */}
            </li>
            
           
            <li className={cx('text-item', {me: false})}>
                <div className={cx('user-imgbox')}>
                  <img className={cx('img-user1')} src={ProfileImage} alt="채팅창 유저1이미지" />
                </div>

                <div>
                  <p className={cx('username1')}>홍길동</p>

                  <p className={cx('chat-text')}>
                    가지고 계신 지병이 있나요?</p>
                  
                </div>

                <p className={cx('chat-time')}>11:20</p>
                <p className={cx('chat-read')}>읽음</p>
              

              </li>

              {/* 2번 유저 */}
              <li className={cx('text-item', {me: true})}> 
                <div className={cx('user-imgbox')}>
                  <img className={cx('img-user2')} src={ProfileImage} alt="채팅창 유저2이미지" />
                </div>

                <div>
                  <p className={cx('username2')}>나</p>
                  <p className={cx('chat-text')}>
                    네.. 고혈압을 가지고 계십니다.</p>
                </div>

                <p className={cx('chat-time')}>13:10</p>
                {/* <p className={cx('chat-read')}>읽음</p> */}
            </li>
            
           

          </ul>
          
          <img className={cx('backimg-hat')} src={ChatBackHat} alt="채팅창 배경 모자이미지" />
          <img className={cx('backimg-yarn')}  src={ChatBackYarn} alt="채팅창 배경 털실이미지" />
          <img className={cx('backimg-bath')}  src={ChatBackBath} alt="채팅창 배경 휠체어이미지" />
            
          </div>

          {/* 푸터 영역 */}
          <div className={cx('chat-room-footer')}>
            {/* <input type="text" placeholder="메시지를 입력해주세요." /> */}
          <textarea className={cx('inputbox')}
            placeholder="메시지를 입력해주세요." maxlength="100"></textarea>
            <button className={cx('send-message')}>
              <FiSend size="30" color="var(--crl-blue-900) "/>
            </button>
          </div>

        </div>
      </div>
  );
}

