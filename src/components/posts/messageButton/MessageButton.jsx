import React from 'react';
import { BsEnvelope, BsEnvelopeFill } from 'react-icons/bs';
import styles from './MessageButton.module.scss';
import cs from 'classnames/bind';

const cx = cs.bind(styles);

const MessageButton = () => {
  return (
    <div className={cx('wrapper')}>
      <div className={cx('messageIcon')}>
        <BsEnvelope className={cx('envelopeIcon')} />
        <BsEnvelopeFill className={cx('envelopeFillIcon')} />
      </div>
    </div>
  );
};

export default MessageButton;
