import React, { useState, useEffect } from 'react';
import styles from './MessageList.module.scss';
import { ChildHat, DesabledBathchair, NewMessageImage, ProfileImage, SeniorYarn } from 'assets/images';
import cs from 'classnames/bind';
import { useGetChatRooms } from 'hooks';
import { useRecoilValue } from 'recoil';
import { roleState } from 'recoil/roleState';
import * as date from 'lib';
import { ChatLoadingModal } from 'components';
const cx = cs.bind(styles);

// 메시지함 리스트 컴포넌트 (채팅형식 UI - 레이어 팝업 형태)
export default function MessageList({ chatInfoSelect }) {
  const role = useRecoilValue(roleState);

  const [chatList, setChatList] = useState([]);
  const { data: roomData, isLoading } = useGetChatRooms();

  useEffect(() => {
    if (roomData) {
      const mapRoomsList = roomData.chats
        .filter((room) => room.deletedAt === null)
        .map((room) => ({
          chatId: room._id,
          postNumber: room.post.postNumber,
          careUsername: room.applicant.name,
          username: room.author.name,
          careTarget: room.post.careInformation.careTarget,
          postTitle: room.post.title,
          messagetext: room.message.content,
          updateDate: room.message.createdAt,
          isRead: room.message.isRead,
          sender: room.message.sender,
          receiver: room.message.receiver,
          careUserProfileImage: room.applicant.profileUrl,
          userProfileImage: room.author.profileUrl,
          currentStatus: room.status,
          deleted: room.deletedAt,
          userId: room.userId,
        }));
      setChatList(mapRoomsList);
    }
  }, [roomData]);

  return (
    <div className={cx('wrapper')}>
      {/* 메시지함 전체 영역 */}
      {isLoading ? (
        <ChatLoadingModal message="접속 중입니다..." />
      ) : (
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
                const messageItem = cx('message-item', {
                  confirmed: chatItem.currentStatus === '매칭완료',
                });
                return (
                  <li
                    className={messageItem}
                    onClick={() => {
                      chatInfoSelect(chatItem.chatId);
                    }}
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
                      <div className={cx('newSign-box')}>
                        {chatItem.sender === chatItem.userId ? null : chatItem.isRead ? null : (
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
                      <div className={cx('name-icon-wrapper')}>
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
                      </div>

                      {chatItem.currentStatus === '매칭완료' ? <span className={cx('matching')}>매칭완료</span> : null}
                      <div className={cx('message-container')}>
                        <p className={cx('message-text')}>{chatItem.messagetext}</p>
                      </div>
                    </div>
                    {/* 날짜, 시분표시 영역 */}
                    <div className={cx('date-box')}>
                      <p className={cx('last-date')}>{date.changeDateToYearAndMonthAndDate(chatItem.updateDate)}</p>
                      <p className={cx('last-time')}>
                        {new Date(chatItem.updateDate).toLocaleTimeString('en-US', {
                          hour: '2-digit',
                          minute: '2-digit',
                          hour12: true,
                          timeZone: 'UTC',
                        })}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
