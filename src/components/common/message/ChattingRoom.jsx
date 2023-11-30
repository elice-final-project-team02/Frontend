import React, { useState, useEffect } from 'react';
import styles from './ChattingRoom.module.scss';
import { ChatBackHat, ChatBackBath, ChatBackYarn, ProfileImage } from 'assets/images';
import { FaUser, FaMapMarkerAlt } from 'react-icons/fa';
import { IoReturnUpBackOutline } from 'react-icons/io5';
import cs from 'classnames/bind';
import { FiSend } from 'react-icons/fi';
import { useRecoilValue } from 'recoil';
import { roleState } from 'recoil/roleState';
import { useGetRoom } from 'hooks';

const cx = cs.bind(styles);

const keywordClass = {
  아동: 'child',
  노인: 'senior',
  장애인: 'disabled',
};

// 채팅(메시지)방 컴포넌트
export default function ChattingRoom({ selectedChatId, chatInfoSelect }) {
  const [showFlag, setShowFlag] = useState(false);
  const [postUrl, setPostUrl] = useState(''); // 채팅방 내 게시글 주소
  const [careTarget, setCareTarget] = useState('');
  const [chatRoomInfo, setChatRoomInfo] = useState({});

  const role = useRecoilValue(roleState);

  const { data, isLoading } = useGetRoom('6567ee52b6cc5053f4b4148f'); // 임시 id (selectedChatId)

  useEffect(() => {
    if (data) {
      console.log(data.chat);
      setPostUrl('/posts/' + data.chat.post._id);
      setCareTarget(data.chat.post.careInformation.careTarget);
    }
  }, [data]);

  // 채팅방 정보 조회 메서드
  // const getChatRoom = () => {
  //   console.log(chatRoomInfo); // eslint 에러 방지용
  //   setChatRoomInfo({ postId: '123' });

  //   setPostUrl('/posts/' + '123');
  // };

  // 채팅창 보임 메서드 (애니메이션 처리를 위한)
  const showChatRoom = (flag) => {
    if (flag) {
      // getChatRoom(); //  채팅방 정보 조회

      setTimeout(() => {
        // 채팅창 띄움.
        setShowFlag(flag);
      }, 0);
    } else {
      setShowFlag(flag); //숨긴 후
      setTimeout(() => {
        //엘리먼트 제거
        chatInfoSelect('');
      }, 200);
    }
  };

  useEffect(() => {
    if (selectedChatId === '') {
      showChatRoom(false);
    } else {
      showChatRoom(true);
    }
  }, [selectedChatId]);

  // 돌봄메이트 확정 메서드
  const careMateConfirm = () => {
    // 검증 로직은 추후에..
    if (
      window.confirm(
        `돌봄메이트를 확정하면 되돌릴 수 없으며\n매칭된 게시글은 내려갑니다.\n\n돌봄메이트를 최종 확정하시겠습니까?`
      )
    ) {
      return alert('해당 게시글의 돌봄메이트가 확정되었습니다!\n돌봄메이트의 연락처는 채팅창에서 확인해주세요!');
    }
    return;
  };

  // 대화 종료하기 메서드
  const chatRoomOut = () => {
    // 검증 로직은 추후에..
    if (window.confirm(`대화를 종료하면 채팅방 및 모든 채팅내용이 사라집니다.\n 그래도 대화를 종료하시겠습니까?`)) {
      return showChatRoom(false);
    }
    return;
  };

  return (
    <div className={cx('wrapper', { on: showFlag })}>
      {/* 채팅창 영역 */}
      {isLoading ? (
        <div className={cx('loading')}>로딩중...</div>
      ) : (
        <div className={cx('chat-roombox')}>
          {/* 헤더 영역 */}
          <div className={cx('chat-room-header')}>
            <button onClick={() => showChatRoom(false)} className={cx('backbtn')}>
              <IoReturnUpBackOutline size="30" color="var(--crl-blue-900)" />
            </button>

            <div className={cx('mate-photobox')}>
              <img
                className={cx('profile-photo')}
                src={data.chat.applicant.profileUrl || ProfileImage}
                alt="돌봄메이트 프로필사진이미지"
              />
            </div>

            {/* 돌봄메이트 - 이름, 키워드, 자격, 성별, 지역 */}
            <div className={cx('mateinfo-leftbox')}>
              <a href={postUrl} target="_blank" className={cx('post-title')} rel="noreferrer">
                {/* <span className={cx('post-num')}>#4 </span>
                병원 동행해주실 친절한 돌봄메이트분 구합니다. */}
                <span className={cx('post-num')}>#{data.chat.post.postNumber} </span>
                {data.chat.post.title}
              </a>

              <span className={cx('matename')}>{data.chat.applicant.name}</span>
              {/* <span className={cx('keyword')}>장애인</span> */}
              <span className={cx('keyword', keywordClass[careTarget])}>
                {data.chat.post.careInformation.careTarget}
              </span>
              {/* react-icons */}

              <div className={cx('icons-box')}>
                <div className={cx('box1')}>
                  <span>
                    {' '}
                    <FaUser size="15" color="#999" />
                  </span>
                  {/* <span className={cx('genderinfo')}>20대 남성</span> */}
                  <span className={cx('genderinfo')}>
                    {data.chat.applicant.age} {data.chat.applicant.gender}
                  </span>
                  <span>
                    <FaMapMarkerAlt size="15" color="#999" />
                  </span>
                  {/* <span className={cx('areainfo')}>서울특별시 강남구</span> */}
                  <span className={cx('areainfo')}>
                    {data.chat.applicant.region} {data.chat.applicant.subRegion}
                  </span>
                </div>

                {role === 'user' && (
                  <button onClick={careMateConfirm} className={cx('mate-confirmed')}>
                    돌봄메이트 확정
                  </button>
                )}
                <button onClick={chatRoomOut} className={cx('chatroom-out')}>
                  대화 종료하기
                </button>
              </div>
            </div>
          </div>

          {/* 메시지 내용들 */}
          <div className={cx('chat-room-contents')}>
            {/* 채팅 내용(texts)들 영역 */}
            <ul className={cx('chat-textsbox')}>
              {/* 채팅 일자 */}
              {/* <li className={cx('chat-date')}>2023-11-20</li> */}
              <li className={cx('chat-date')}>{data.chat.createdAt.split('T')[0]}</li>

              {/* 선우 메시지 */}
              {data.chat.message.map((message, index) => {
                const isMe = message.sender === data.chat.userId; // 사용자 id === sender : 2번유저(오른쪽)

                let image, name;

                if (role === 'user') {
                  if (isMe) {
                    image = data.chat.author.profileUrl;
                    name = data.chat.author.profileUrl;
                  } else {
                    image = data.chat.applicant.profileUrl;
                    name = data.chat.applicant.name;
                  }
                } else {
                  // role === 'careUser'
                  if (isMe) {
                    image = data.chat.applicant.profileUrl;
                    name = data.chat.applicant.name;
                  } else {
                    image = data.chat.author.profileUrl;
                    name = data.chat.author.name;
                  }
                }

                return (
                  <li key={index} className={cx('text-item', { me: isMe })}>
                    <div className={cx('user-imgbox')}>
                      <img
                        className={cx(isMe ? 'img-user2' : 'img-user1')}
                        src={image || ProfileImage}
                        alt="채팅창 유저이미지"
                      />
                    </div>
                    <div>
                      <p className={cx(isMe ? 'username2' : 'username1')}>{isMe ? '나' : name}</p>
                      <p className={cx('chat-text')}>{message.content}</p>
                    </div>
                    <p className={cx('chat-time')}>
                      {new Date(message.createdAt).toLocaleTimeString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: false,
                        timeZone: 'UTC',
                      })}
                    </p>
                    <p className={cx('chat-read')}>{message.isRead ? '읽음' : '안읽음'}</p>
                  </li>
                );
              })}
              {/* 선우 메시지 끝 */}

              {/* 1번 유저 */}
              <li className={cx('text-item', { me: false })}>
                {' '}
                {/* TODO. 개발용 false. 데이터 받아오면 userId 비교하여 내가 아닐때 false가 되도록.*/}
                <div className={cx('user-imgbox')}>
                  <img className={cx('img-user1')} src={ProfileImage} alt="채팅창 유저1이미지" />
                </div>
                <div>
                  <p className={cx('username1')}>홍길동</p>

                  <p className={cx('chat-text')}>가지고 계신 지병이 있나요?</p>
                </div>
                <p className={cx('chat-time')}>11:20</p>
                <p className={cx('chat-read')}>읽음</p>
              </li>

              {/* 2번 유저 */}
              <li className={cx('text-item', { me: true })}>
                {' '}
                {/* TODO. 개발용 true. 데이터 받아오면 userId 비교하여 나 일때만 true가 되도록.*/}
                <div className={cx('user-imgbox')}>
                  <img className={cx('img-user2')} src={ProfileImage} alt="채팅창 유저2이미지" />
                </div>
                <div>
                  <p className={cx('username2')}>나</p>
                  <p className={cx('chat-text')}>
                    네..고혈압을 가지고 계십니다.네..고혈압을 가지고 계십니다.네..고혈압을 가지고 계십니다.
                  </p>
                </div>
                <p className={cx('chat-time')}>13:10</p>
                {/* <p className={cx('chat-read')}>읽음</p> */}
              </li>

              {/* 1번 유저 */}
              <li className={cx('text-item', { me: false })}>
                <div className={cx('user-imgbox')}>
                  <img className={cx('img-user1')} src={ProfileImage} alt="채팅창 유저1이미지" />
                </div>

                <div>
                  <p className={cx('username1')}>홍길동</p>

                  <p className={cx('chat-text')}>
                    가지고 계신 지병이 있나요?가지고 계신 지병이 있나요?가지고 계신 지병이 있나요?가지고 계신 지병이
                    있나요?
                  </p>
                </div>

                <p className={cx('chat-time')}>11:20</p>
                <p className={cx('chat-read')}>읽음</p>
              </li>

              {/* 2번 유저 */}
              <li className={cx('text-item', { me: true })}>
                <div className={cx('user-imgbox')}>
                  <img className={cx('img-user2')} src={ProfileImage} alt="채팅창 유저2이미지" />
                </div>

                <div>
                  <p className={cx('username2')}>나</p>
                  <p className={cx('chat-text')}>네.. 고혈압을 가지고 계십니다.</p>
                </div>

                <p className={cx('chat-time')}>13:10</p>
                {/* <p className={cx('chat-read')}>읽음</p> */}
              </li>

              <li className={cx('text-item', { me: false })}>
                <div className={cx('user-imgbox')}>
                  <img className={cx('img-user1')} src={ProfileImage} alt="채팅창 유저1이미지" />
                </div>

                <div>
                  <p className={cx('username1')}>홍길동</p>

                  <p className={cx('chat-text')}>가지고 계신 지병이 있나요?</p>
                </div>

                <p className={cx('chat-time')}>11:20</p>
                <p className={cx('chat-read')}>읽음</p>
              </li>

              {/* 2번 유저 */}
              <li className={cx('text-item', { me: true })}>
                <div className={cx('user-imgbox')}>
                  <img className={cx('img-user2')} src={ProfileImage} alt="채팅창 유저2이미지" />
                </div>

                <div>
                  <p className={cx('username2')}>나</p>
                  <p className={cx('chat-text')}>네.. 고혈압을 가지고 계십니다.</p>
                </div>

                <p className={cx('chat-time')}>13:10</p>
                {/* <p className={cx('chat-read')}>읽음</p> */}
              </li>
            </ul>

            <img className={cx('backimg-hat')} src={ChatBackHat} alt="채팅창 배경 모자이미지" />
            <img className={cx('backimg-yarn')} src={ChatBackYarn} alt="채팅창 배경 털실이미지" />
            <img className={cx('backimg-bath')} src={ChatBackBath} alt="채팅창 배경 휠체어이미지" />
          </div>

          {/* 푸터 영역 */}
          <div className={cx('chat-room-footer')}>
            {/* <input type="text" placeholder="메시지를 입력해주세요." /> */}
            <textarea className={cx('inputbox')} placeholder="메시지를 입력해주세요." maxlength="100"></textarea>
            <button className={cx('send-message')}>
              <FiSend size="30" color="var(--crl-blue-900) " />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
