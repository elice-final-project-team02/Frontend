import React, { useState } from 'react';
import { BsEnvelope, BsEnvelopeFill } from 'react-icons/bs';
import styles from './MessageButton.module.scss';
import cs from 'classnames/bind';

const cx = cs.bind(styles);

const MessageButton = () => {
  const [isHover, setIsHover] = useState(false);

  const mouseHoverHandler = () => {
    setIsHover(!isHover);
  };
  return (
    <div className={cx('wrapper')}>
      <div className={cx('messageIcon')}>
        {isHover ? <BsEnvelopeFill onMouseOut={mouseHoverHandler} /> : <BsEnvelope onMouseOver={mouseHoverHandler} />}
      </div>
    </div>
  );
};

export default MessageButton;
