import React, { useState, useEffect } from 'react';
import styles from './MessageList.module.scss';
import { ChildHat, DesabledBathchair, NewMessageImage, ProfileImage, SeniorYarn } from 'assets/images';
import cs from 'classnames/bind';
import { useGetChatRooms } from 'hooks';
import { useRecoilValue } from 'recoil';
import { roleState } from 'recoil/roleStateAtom';
import * as date from 'lib';
import { LoadingModal } from 'components';
const cx = cs.bind(styles);

// 메시지함 리스트 컴포넌트 (채팅형식 UI - 레이어 팝업 형태)
export default function MessageList({ chatInfoSelect }) {
  const role = useRecoilValue(roleState);
  const [chatList, setChatList] = useState([]);
  const { data: roomData, isLoading } = useGetChatRooms();

  useEffect(() => {
    if (!isLoading && roomData) {
      const existChatList = roomData.chats.filter(
        (room) => !room.leaveRoom.includes(room.userId) && room.post !== null
      );
      setChatList(existChatList);
    }
  }, [roomData, isLoading]);

  const matchedPostNumbers = chatList
    .filter((chatItem) => chatItem.status === '매칭완료')
    .map((matchedChatItem) => matchedChatItem.postNumber);

  return (
    <div className={cx('wrapper')}>
      {/* 메시지함 전체 영역 */}

      {isLoading ? (
        <LoadingModal message="접속 중입니다..." isLoading={isLoading} />
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
              {chatList.map((chatItem) => {
                const isMatched =
                  matchedPostNumbers.includes(chatItem.post.postNumber) && chatItem.status !== '매칭완료';
                const messageItem = cx('message-item', {
                  confirmed: chatItem.status === '매칭완료',
                  disabled: chatItem?.leaveRoom.length,
                  mathed: isMatched,
                });
                return (
                  <li
                    className={messageItem}
                    onClick={() => {
                      chatInfoSelect(chatItem._id);
                    }}
                    key={chatItem._id}
                  >
                    {/* 프로필사진, n이미지 영역 */}
                    <div className={cx('user-profilebox')}>
                      <img
                        className={cx('img-profile')}
                        src={
                          role === 'user'
                            ? chatItem?.applicant.profileUrl || ProfileImage
                            : chatItem?.author.profileUrl || ProfileImage
                        }
                        alt="상대유저 프로필이미지"
                      />
                      <div className={cx('newSign-box')}>
                        {chatItem.message?.sender === chatItem.userId ? null : chatItem.message?.sender ? null : (
                          <img className={cx('img-newmessage')} src={NewMessageImage} alt="새메시지이미지" />
                        )}
                      </div>
                    </div>

                    {/* 이름, 키워드, 메시지 내용 영역 */}
                    <div className={cx('user-itembox')}>
                      <p className={cx('post-title')}>
                        <span className={cx('post-num')}>#{chatItem.post.postNumber} </span>
                        {chatItem.post.title}
                      </p>
                      <div className={cx('name-icon-wrapper')}>
                        <span className={cx('username')}>
                          {role === 'user' ? chatItem.applicant.name : chatItem.author.name}
                        </span>
                        <span
                          className={cx('care-target-icon', {
                            child: chatItem.post.careInformation.careTarget === '아동',
                            senior: chatItem.post.careInformation.careTarget === '노인',
                            disabled: chatItem.post.careInformation.careTarget === '장애인',
                          })}
                        >
                          {chatItem.post.careInformation.careTarget}
                        </span>
                        {chatItem.status === '매칭완료' ? <span className={cx('matching')}>매칭완료</span> : null}
                      </div>

                      <div className={cx('message-container')}>
                        {isMatched ? (
                          <p className={cx('matched-message')}>이미 매칭이 완료되었습니다.</p>
                        ) : (
                          <p className={cx('message-text')}>{chatItem.message?.content}</p>
                        )}
                      </div>
                    </div>
                    {/* 날짜, 시분표시 영역 */}
                    <div className={cx('date-box')}>
                      <p className={cx('last-date')}>
                        {date.changeDateToYearAndMonthAndDate(chatItem.message?.createdAt)}
                      </p>
                      <p className={cx('last-time')}>
                        {new Date(chatItem.message?.createdAt).toLocaleTimeString('en-US', {
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
