import React from 'react';
import styles from './ChattingRoom.module.scss';
import { ProfileImage } from 'assets/images';
import { FaUser, FaMapMarkerAlt } from "react-icons/fa";
import { IoReturnUpBackOutline } from "react-icons/io5";
import cs from 'classnames/bind';

const cx = cs.bind(styles); 

// 채팅(메시지)방 컴포넌트
export default function ChattingRoom () {
  return (
    <>
      <div className={cx('wrapper')}>

        {/* 채팅창 영역 */}
        <div className={cx('chat-roombox')}>
          {/* 헤더 영역 */}
          <div className={cx('chat-room-header')}>

          <button className={cx('backbtn')}><IoReturnUpBackOutline size="30" color="var(--crl-blue-900)"/></button>

            <div className={cx('mate-photobox')}>
              <img className={cx('profile-photo')} src={ProfileImage} alt="돌봄메이트 프로필사진이미지" />
            </div>

            {/* 돌봄메이트 - 이름, 키워드, 자격, 성별, 지역 */}
            <div className={cx('mateinfo-leftbox')}>
              <span className={cx('matename')}>홍길동</span>
              <span className={cx('keyword')}>장애인</span>
              <p className={cx('certificate')}>사회복지사 2급</p>
              {/* react-icons */}
              
              <div className={cx('icons-box')}>
                <FaUser size="15" color="#999" />
                <span className={cx('genderinfo')}>20대 남성</span>
                <FaMapMarkerAlt size="15" color="#999" />
                <span className={cx('areainfo')}>서울 강남</span>
              </div>
            </div>

            <div className={cx('mateinfo-rightbox')}>
              
              <span>Phone</span>
              <p className={cx('mate-phonenum')}>010-1234-5678</p>

              <button className={cx('mate-confirmed')}>돌봄메이트 확정</button>
              <button className={cx('chatroom-out')}>대화 종료하기</button>
            </div>
          </div>

          {/* 메시지 내용들 */}
          <div className={cx('chat-room-contents')}>

            {/* 채팅 일자 */}
            <div className={cx('chat-date')}>2023-11-20</div>

            {/* 채팅 내용(texts)들 영역 */}
            <ul className={cx('chat-textsbox')}>

              {/* 1번 유저 */}
              <li className={cx('text-item')}>
                <div className={cx('user-imgbox')}>
                  <img className={cx('img-user1')} src={ProfileImage} alt="채팅창 유저1이미지" />
                </div>

                <div>
                  <span className={cx('username1')}>홍길동</span>

                  <p className={cx('chat-text')}>
                    가지고 계신 지병이 있나요?</p>
                  
                </div>

                <p className={cx('chat-time')}>11:20</p>
                <p className={cx('chat-read')}>읽음</p>
              

              </li>

              {/* 2번 유저 */}
              <li className={cx('text-item')}>

                <p className={cx('chat-read')}>읽음</p>
                <p className={cx('chat-time')}>13:10</p>

                <div>
                  <span className={cx('username2')}>나</span>
                  <p className={cx('chat-text')}>
                    네.. 고혈압을 가지고 계십니다.</p>
                </div>

                <div className={cx('user-imgbox')}>
                  
                  <img className={cx('img-user2')} src={ProfileImage} alt="채팅창 유저1이미지" />
                </div>

              </li>
              

            </ul>
            
          </div>

          {/* 푸터 영역 */}
          <div className={cx('chat-room-footer')}>
            <input type="text" placeholder="메시지를 입력해주세요." />
            <button className={cx('send-message')}>
              보내기
            </button>
          </div>

        </div>
      </div>
    </>
  );
}

