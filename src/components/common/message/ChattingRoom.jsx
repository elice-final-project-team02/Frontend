import React, { useState, useEffect, useRef } from 'react';
import styles from './ChattingRoom.module.scss';
import { ChatBackHat, ChatBackBath, ChatBackYarn, ProfileImage } from 'assets/images';
import { FaUser, FaMapMarkerAlt } from 'react-icons/fa';
import { IoReturnUpBackOutline } from 'react-icons/io5';
import cs from 'classnames/bind';
import { FiSend } from 'react-icons/fi';
import { useRecoilValue } from 'recoil';
import { roleState } from 'recoil/roleStateAtom';
import { useGetRoom, usePostSendMessage, usePutConfirmMate, useDeleteLeaveRoom } from 'hooks';
import { useQueryClient } from 'react-query';
import ChatMateConfirmAlert from './ChatMateConfirmAlert';
import { ChatLoadingModal } from 'components';
import ChatMessage from './ChatMessage';
import ChatFooter from './ChatFooter';

const cx = cs.bind(styles);
const keywordClass = {
  아동: 'child',
  노인: 'senior',
  장애인: 'disabled',
};
// 채팅(메시지)방 컴포넌트
export default function ChattingRoom({ chatInfoSelect, selectedChatId }) {
  const [showFlag, setShowFlag] = useState(false);
  const [postUrl, setPostUrl] = useState(''); // 채팅방 내 게시글 주소
  const [careTarget, setCareTarget] = useState('');
  const [message, setMessage] = useState([]);

  // 확정 버튼 disabeld
  const [disable, setDisable] = useState(false);

  // 채팅창 입력 시 저장될 state
  const [inputmessage, setInputMessage] = useState('');
  const unreadMessageRef = useRef(null);
  const scrollRef = useRef(null);
  const queryClient = useQueryClient();
  const role = useRecoilValue(roleState);
  const { data, isLoading } = useGetRoom(selectedChatId);
  const { mutate } = useDeleteLeaveRoom();

  // mutate 변수 담기
  const postSendMutate = usePostSendMessage();
  const confirmMate = usePutConfirmMate();

  // 채팅 입력(textarea) 메서드
  const handleInputChange = (e) => {
    setInputMessage(e.target.value);
  };
  // 채팅 keyup 이벤트 (엔터만 구분)
  const handleInputSend = (e) => {
    if (e.key === 'Enter' && !e.shiftKey && inputmessage !== '') {
      postSendMutate.mutate({ chatId: selectedChatId, content: inputmessage });
      setInputMessage('');
    }
  };

  // 채팅 메시지 전송(send) 메서드
  const useSendMessageRequest = () => {
    postSendMutate.mutate({ chatId: selectedChatId, content: inputmessage });
  };
  useEffect(() => {
    // 채팅방에 진입하면 안읽은 메시지로 스크롤이 내려감
    if (unreadMessageRef.current) {
      unreadMessageRef.current.scrollIntoView({
        behavior: 'smooth',
      });
    } else if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
    if (data) {
      setPostUrl('/posts/' + data.chat.post._id);
      setCareTarget(data.chat.post.careInformation.careTarget);
      setMessage(data.chat.message);

      if (data.chat.status === '매칭완료') setDisable(true);
    }
  }, [data, message]);

  // 채팅창 보임 메서드 (애니메이션 처리를 위한)
  const showChatRoom = (flag) => {
    if (flag) {
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
    // 확정 로직
    if (
      window.confirm(
        `돌봄메이트를 확정하면 되돌릴 수 없으며\n매칭된 게시글은 내려갑니다.\n\n돌봄메이트를 최종 확정하시겠습니까?`
      )
    ) {
      confirmMate.mutate(
        { chatId: selectedChatId },
        {
          onSuccess: (res) => {
            if (res.data) {
              return setDisable(true);
            }
          },
        }
      );
    }
    return;
  };
  // 대화 종료하기 메서드
  const chatRoomOut = () => {
    // 검증 로직은 추후에..
    if (window.confirm(`대화를 종료하면 채팅방 및 모든 채팅내용이 사라집니다.\n 그래도 대화를 종료하시겠습니까?`)) {
      mutate(selectedChatId);
      moveChatList();
    }
  };

  const moveChatList = () => {
    queryClient.invalidateQueries('getChatRooms', { refetchActive: true });
    showChatRoom(false);
  };

  // 채팅 줄바꿈 치환
  const exchangeHtml = (content) => {
    return content.replace(/(?:\r\n|\r|\n)/g, '<br>');
  };
  return (
    <div className={cx('wrapper', { on: showFlag })}>
      {/* 채팅창 영역 */}
      {isLoading ? (
        <ChatLoadingModal message="접속 중입니다..." />
      ) : (
        <div className={cx('chat-roombox')}>
          {/* 헤더 영역 */}
          <div className={cx('chat-room-header')}>
            <button onClick={moveChatList} className={cx('backbtn')}>
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
                <span className={cx('post-num')}>#{data.chat.post.postNumber} </span>
                {data.chat.post.title}
              </a>

              <div className={cx('name-keyword-wrapper')}>
                <span className={cx('matename')}>{data.chat.applicant.name}</span>
                <span className={cx('keyword', keywordClass[careTarget])}>
                  {data.chat.post.careInformation.careTarget}
                </span>
              </div>
              {/* react-icons */}
              <div className={cx('icons-box')}>
                <div className={cx('box1')}>
                  <span>
                    {' '}
                    <FaUser size="13" color="#999" />
                  </span>
                  <span className={cx('genderinfo', 'gender-address')}>
                    {data.chat.applicant.age} {data.chat.applicant.gender}
                  </span>
                  <span>
                    <FaMapMarkerAlt size="13" color="#999" />
                  </span>
                  <span className={cx('areainfo', 'gender-address')}>
                    {data.chat.applicant.region} {data.chat.applicant.subRegion}
                  </span>
                </div>
                {role === 'user' && (
                  <button
                    disabled={disable}
                    onClick={careMateConfirm}
                    className={cx('mate-confirmed', { btndisable: disable })}
                  >
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
              {data.chat.message.map((message, index, array) => {
                // 사용자 id === sender : 2번유저(오른쪽)
                const isMe = message.sender === data.chat.userId;
                let image, name;
                if (role === 'user') {
                  if (isMe) {
                    image = data.chat.author.profileUrl;
                    name = data.chat.author.name;
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
                const messageDate = new Date(message.createdAt).toISOString().split('T')[0];
                const prevMessageDate =
                  index > 0 ? new Date(array[index - 1].createdAt).toISOString().split('T')[0] : null;

                return (
                  <div key={message._id}>
                    {/* 채팅 일자 => 이전 메시지 날짜와 해당 메시지 날짜 비교 */}
                    {index === 0 || (prevMessageDate && prevMessageDate !== messageDate) ? (
                      <li className={cx('chat-date')}>{messageDate}</li>
                    ) : null}
                    <ChatMessage message={message} isMe={isMe} name={name} image={image} exchangeHtml={exchangeHtml} />
                  </div>
                );
              })}
              <li>{data.chat.leaveRoom.length ? data.chat.author.name + '님이 나갔습니다.' : ''}</li>
              <div ref={scrollRef}></div>

              {/* 돌봄메이트 확정된 방 알림메시지 컴포넌트 */}
              {disable && (
                <li>
                  <ChatMateConfirmAlert />
                </li>
              )}
            </ul>
            <img className={cx('backimg-hat')} src={ChatBackHat} alt="채팅창 배경 모자이미지" />
            <img className={cx('backimg-yarn')} src={ChatBackYarn} alt="채팅창 배경 털실이미지" />
            <img className={cx('backimg-bath')} src={ChatBackBath} alt="채팅창 배경 휠체어이미지" />
          </div>
          {/* 푸터 영역 */}
          <ChatFooter
            isChatRoomClosed={data.chat.leaveRoom.length}
            inputmessage={inputmessage}
            handleInputChange={handleInputChange}
            handleInputSend={handleInputSend}
            useSendMessageRequest={useSendMessageRequest}
          />
        </div>
      )}
    </div>
  );
}
