import React, {useState} from 'react';
import styles from './MessageList.module.scss';
import { ChildHat, DesabledBathchair, NewMessageImage, ProfileImage, SeniorYarn } from 'assets/images';
import cs from 'classnames/bind';
const cx = cs.bind(styles);




// 메시지함 리스트 컴포넌트 (채팅형식 UI - 레이어 팝업 형태)
export default function MessageList(props) {

  // mock data 
  const [chatlist] = useState([
  {
    postId: 1,
    username: '홍길동',
    keyword: '노인',
    postTitle: '병원 동행해주실 메이트분 구합니다.',
    messagetext: '가지고 계신 지병이 있나요?',
    lastdate: "2023-11-20",
    lasttime: '오후 2:30'
    
  },
  {
    postId: 2,
    username: '김영희',
    keyword: '아동',
    postTitle: '등하원 시터 구합니다!',
    messagetext: '아이가 몇시에 등원하나요?',
    lastdate: "2023-11-15",
    lasttime: '오전 7:00'
    
  },
  {
    postId: 3,
    username: '윤철수',
    keyword: '장애인',
    postTitle: '게시글 제목입니다',
    messagetext: '안녕하세요! 돌봄메이트 윤철수입니다. 혹시 살고 계신 위치가 어디신가요?',
    lastdate: "2023-11-01",
    lasttime: '오후 2:30'
    
    },
    {
      postId: 4,
      username: '안미나',
      keyword: '노인',
      postTitle: '게시글 제목이에요',
      messagetext: '할머니 연세가 어떻게되시나요?',
      lastdate: "2023-10-19",
      lasttime: '오후 8:00'
      
    },
    {
      postId: 5,
      username: '서미정',
      keyword: '아동',
      postTitle: '게시글 제목입니당',
      messagetext: '혹시 시급 협의가 될까요?',
      lastdate: "2023-10-07",
      lasttime: '오전: 9:00'
      
    }
]);

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

            {/* 채팅 리스트 동적 생성 */}
            {chatlist.map((chatItem) => {
              return (
                  <li className={cx('message-item')} onClick={() => {
                    props.chatInfoSelect(chatItem.postId)
                    }}>
                      
                      {/* 프로필사진, n이미지 영역 */}
                      <div className={cx('user-profilebox')}>
                        <img className={cx('img-profile')} src={chatItem?.profileImage || ProfileImage} alt="상대유저 프로필이미지" />
                        <img className={cx('img-newmessage')} src={NewMessageImage} alt="새메시지이미지" />
                      </div>

                      {/* 이름, 키워드, 메시지 내용 영역 */}
                    <div className={cx('user-itembox')}>
                        
                      <p className={cx('post-title')}>
                        <span className={cx('post-num')}>#{chatItem.postId} </span>
                        {chatItem.postTitle}</p>
                      
                        <span className={cx('username')}>{chatItem.username}</span>
                        <span className={cx('keyword')}>{chatItem.keyword}</span>
                        <p className={cx('message-text')}>{chatItem.messagetext}</p>
                      </div>

                      {/* 1차 기능 구현 목표 - 날짜/시분 모두 표시예정.
                      추가기능 - 오늘날짜가 아니면 날짜로 표시, 오늘 날짜로 받은 채팅이면 시간 표시 예정. */}

                      {/* 날짜, 시분표시 영역 */}
                      <div className={cx('date-box')}>
                        <p className={cx('last-date')}>{chatItem.lastdate}</p>
                        <p className={cx('last-time')}>{chatItem.lasttime}</p>
                      </div>
                    </li>
              )
            })}

            
        

            </ul>
          </div>
        </div>
     </div>
    
  )
}