// import React, {useState} from 'react';
import React from 'react';
import styles from './MessageList.module.scss';
import { ChildHat, DesabledBathchair, NewMessageImage, ProfileImage, SeniorYarn } from 'assets/images';
import cs from 'classnames/bind';
const cx = cs.bind(styles);



// 메시지함 리스트 컴포넌트 (채팅형식 UI - 레이어 팝업 형태)
export default function MessageList(props) {

  return (
      <div className={cx('wrapper')}>
        {/* 메시지함 전체 영역 */}
        <div className={cx('message-box')}>
          
          {/* 메시지 리스트 상단 영역 */}
          <div className={cx('message-header')}>
            <h1>MESSAGE</h1>
            <img className={cx('hat')} src={ChildHat} alt="타이틀 모자 이미지" />
            <img className={cx('yarn')} src={SeniorYarn} alt="타이틀 털실 이미지" />
            <img className={cx('bathchair')} src={DesabledBathchair} alt="타이틀 휠체어 이미지" />
            
          </div>
          
          {/* 메시지함 리스트 영역 */}
          <div className={cx('message-list')}>

            {/* 메시지 리스트 */}
            <ul className={cx('message-items')}>

              {/* 대화 상대별 채팅방(list item) */}
            <li className={cx('message-item')} onClick={() => {
              props.chatInfoSelect("a123")
              }}>
                
                {/* 프로필사진, n이미지 영역 */}
                <div className={cx('user-profilebox')}>
                  <img className={cx('img-profile')} src={ProfileImage} alt="상대유저 프로필이미지" />
                  <img className={cx('img-newmessage')} src={NewMessageImage} alt="새메시지이미지" />
                </div>

                {/* 이름, 키워드, 메시지 내용 영역 */}
              <div className={cx('user-itembox')}>
                  
                <p className={cx('post-title')}>
                  <span className={cx('post-num')}>#1 </span>
                  병원 동행해주실 메이트분 구합니다.</p>
                 
                  <span className={cx('username')}>홍길동</span>
                  <span className={cx('keyword')}>노인</span>
                  <p className={cx('message-text')}>가지고 계신 지병이 있나요?</p>
                </div>

                {/* 1차 기능 구현 목표 - 날짜/시분 모두 표시예정.
                추가기능 - 오늘날짜가 아니면 날짜로 표시, 오늘 날짜로 받은 채팅이면 시간 표시 예정. */}

                {/* 날짜, 시분표시 영역 */}
                <div className={cx('date-box')}>
                  <p className={cx('last-date')}>2023-11-20</p>
                  <p className={cx('last-time')}>오후 2:30</p>
                </div>
              </li>
             
              {/* 2 - ui 확인용 */}
              <li className={cx('message-item')}>
                <div className={cx('user-profilebox')}>
                  <img className={cx('img-profile')} src={ProfileImage} alt="상대유저 프로필이미지" />
                  <img className={cx('img-newmessage')} src={NewMessageImage} alt="새메시지이미지" />
                </div>

                <div className={cx('user-itembox')}>
                  <span className={cx('username')}>김영희</span>
                  <span className={cx('keyword')}>아동</span>
                  <p className={cx('message-text')}>아이가 몇시에 등원하나요?</p>
                </div>
                <div className={cx('date-box')}>
                  <p className={cx('last-date')}>2023-11-15</p>
                  <p className={cx('last-time')}>오전 7:00</p>
                </div>
              </li>

              <li className={cx('message-item')}>
                <div className={cx('user-profilebox')}>
                  <img className={cx('img-profile')} src={ProfileImage} alt="상대유저 프로필이미지" />
                  <img className={cx('img-newmessage')} src={NewMessageImage} alt="새메시지이미지" />
                </div>

                <div className={cx('user-itembox')}>
                  <span className={cx('username')}>윤철수</span>
                  <span className={cx('keyword')}>장애인</span>
                  <p className={cx('message-text')}>안녕하세요! 돌봄메이트 윤철수입니다. 혹시 살고 계신 위치가 어디신가요?</p>
                </div>
                {/* 1차 기능 구현 목표 - 날짜/시분 모두 표시예정.
                추가기능 - 오늘날짜가 아니면 날짜로 표시, 오늘 날짜로 받은 채팅이면 시간 표시 예정. */}
                <div className={cx('date-box')}>
                  <p className={cx('last-date')}>2023-11-01</p>
                  <p className={cx('last-time')}>오후 2:30</p>
                </div>
              </li>

              <li className={cx('message-item')}>

                <div className={cx('user-profilebox')}>
                  <img className={cx('img-profile')} src={ProfileImage} alt="상대유저 프로필이미지" />
                  <img className={cx('img-newmessage')} src={NewMessageImage} alt="새메시지이미지" />
                </div>

                <div className={cx('user-itembox')}>
                  <span className={cx('username')}>안미나</span>
                  <span className={cx('keyword')}>노인</span>
                  <p className={cx('message-text')}>할머니 연세가 어떻게되시나요?</p>
                </div>
                
                <div className={cx('date-box')}>
                  <p className={cx('last-date')}>2023-10-19</p>
                  <p className={cx('last-time')}>오후 8:00</p>
                </div>
              </li>

              <li className={cx('message-item')}>

                <div className={cx('user-profilebox')}>
                  <img className={cx('img-profile')} src={ProfileImage} alt="상대유저 프로필이미지" />
                  <img className={cx('img-newmessage')} src={NewMessageImage} alt="새메시지이미지" />
                </div>

                <div className={cx('user-itembox')}>
                  <span className={cx('username')}>서미정</span>
                  <span className={cx('keyword')}>아동</span>
                  <p className={cx('message-text')}>혹시 시급 협의가 될까요?</p>
                </div>
                
                <div className={cx('date-box')}>
                  <p className={cx('last-date')}>2023-10-07</p>
                  <p className={cx('last-time')}>오전: 9:00 </p>
                </div>
              </li>

              <li className={cx('message-item')}>

                <div className={cx('user-profilebox')}>
                  <img className={cx('img-profile')} src={ProfileImage} alt="상대유저 프로필이미지" />
                  <img className={cx('img-newmessage')} src={NewMessageImage} alt="새메시지이미지" />
                </div>

                <div className={cx('user-itembox')}>
                  <span className={cx('username')}>박정철</span>
                  <span className={cx('keyword')}>장애인</span>
                  <p className={cx('message-text')}>안녕하세요. 돌봄메이트 박정철입니다.</p>
                </div>
                
                <div className={cx('date-box')}>
                  <p className={cx('last-date')}>2023-10-04</p>
                  <p className={cx('last-time')}>오전: 9:00 </p>
                </div>
              </li>

            </ul>
          </div>
        </div>
     </div>
    
  )
}