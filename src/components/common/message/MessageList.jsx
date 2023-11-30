import React, { useState, useEffect } from 'react';
import styles from './MessageList.module.scss';
import { ChildHat, DesabledBathchair, NewMessageImage, ProfileImage, SeniorYarn } from 'assets/images';
import cs from 'classnames/bind';
import { useGetChatRooms } from 'hooks';
import { useRecoilValue } from 'recoil';
import { roleState } from 'recoil/roleState';
import * as date from 'lib';
const cx = cs.bind(styles);

// 메시지함 리스트 컴포넌트 (채팅형식 UI - 레이어 팝업 형태)
export default function MessageList(props) {
  const role = useRecoilValue(roleState);

  const [chatList, setChatList] = useState([]);
  const [currentPage, setCurrentPage] = useState([]);
  const { data: roomData } = useGetChatRooms(currentPage + 1);

  useEffect(() => {
    if (roomData) {
      const mapRoomsList = roomData.chats.map((room) => ({
        chatId: room._id,
        postNumber: room.post.postNumber,
        careUsername: room.applicant.name,
        username: room.author.name,
        careTarget: room.post.careInformation.careTarget,
        postTitle: room.post.title,
        messagetext: room.message.content,
        updateDate: room.message.createdAt,
        isRead: room.message.isRead,
        careUserProfileImage: room.applicant.profileUrl,
        userProfileImage: room.author.profileUrl,
      }));
      setChatList(mapRoomsList);
    }
  }, [roomData]);

  function handleNewSignImage(chatItem) {
    const updatedChatList = chatList.map((item) => {
      if (item.chatId === chatItem.chatId) {
        return { ...item, isRead: true };
      }
      return item;
    });
    setChatList(updatedChatList);
  }

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
            {chatList.map((chatItem, index) => {
              return (
                <li
                  className={cx('message-item')}
                  onClick={() => {
                    props.chatInfoSelect(chatItem.chatId);
                    handleNewSignImage(chatItem);
                  }}
                  key={index}
                >
                  {/* 프로필사진, n이미지 영역 */}
                  <div className={cx('user-profilebox')}>
                    <img
                      className={cx('img-profile')}
                      src={
                        role === 'user'
                          ? chatItem?.careUserProfileImage || ProfileImage
                          : chatItem?.userProfileImage || ProfileImage
                      }
                      alt="상대유저 프로필이미지"
                    />
                    <div>
                      {chatItem.isRead ? null : (
                        <img className={cx('img-newmessage')} src={NewMessageImage} alt="새메시지이미지" />
                      )}
                    </div>
                  </div>

                  {/* 이름, 키워드, 메시지 내용 영역 */}
                  <div className={cx('user-itembox')}>
                    <p className={cx('post-title')}>
                      <span className={cx('post-num')}>#{chatItem.postNumber} </span>
                      {chatItem.postTitle}
                    </p>

                    <span className={cx('username')}>
                      {role === 'user' ? chatItem.careUsername : chatItem.username}
                    </span>
                    <span
                      className={cx('care-target-icon', {
                        child: chatItem.careTarget === '아동',
                        senior: chatItem.careTarget === '노인',
                        disabled: chatItem.careTarget === '장애인',
                      })}
                    >
                      {chatItem.careTarget}
                    </span>
                    <div className={cx('message-container')}>
                      <p className={cx('message-text')}>{chatItem.messagetext}</p>
                    </div>
                  </div>

                  {/* 1차 기능 구현 목표 - 날짜/시분 모두 표시예정.
                      추가기능 - 오늘날짜가 아니면 날짜로 표시, 오늘 날짜로 받은 채팅이면 시간 표시 예정. */}

                  {/* 날짜, 시분표시 영역 */}
                  <div className={cx('date-box')}>
                    <p className={cx('last-date')}>{date.changeDateToYearAndMonthAndDate(chatItem.updateDate)}</p>
                    <p className={cx('last-time')}>{date.changeDateToAmPmAndHHMM(chatItem.updateDate)}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
