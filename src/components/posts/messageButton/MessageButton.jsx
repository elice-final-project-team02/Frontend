import React from 'react';
import { BsEnvelope, BsEnvelopeFill } from 'react-icons/bs';
import styles from './MessageButton.module.scss';
import cs from 'classnames/bind';

const cx = cs.bind(styles);

const MessageButton = () => {
  return (
    <div className={cx('wrapper')}>
      <div className={cx('message-icon')}>
        <BsEnvelope className={cx('envelope-icon')} />
        <BsEnvelopeFill className={cx('envelope-fill-icon')} />
      </div>
    </div>
  );
};

export default MessageButton;
