import React from 'react';
import styles from './ChattingRoom.module.scss';
import cs from 'classnames/bind';

const cx = cs.bind(styles);

export default function ChatMessage({ message, isMe, name, image, exchangeHtml }) {
  return (
    <div>
      <li className={cx('text-item', { me: isMe })}>
        <div className={cx('user-imgbox')}>
          <img className={cx(isMe ? 'img-user2' : 'img-user1')} src={image} alt="채팅창 유저이미지" />
        </div>
        <div>
          <p className={cx(isMe ? 'username2' : 'username1')}>{isMe ? '나' : name}</p>
          <p className={cx('chat-text')} dangerouslySetInnerHTML={{ __html: exchangeHtml(message.content) }}></p>
        </div>
        <p className={cx('chat-time')}>
          {new Date(message.createdAt).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
            timeZone: 'UTC',
          })}
        </p>
        <p className={cx('chat-read')}>{message.isRead ? '읽음' : ''}</p>
      </li>
    </div>
  );
}
