import React, { useState } from 'react';
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import styles from './WishButton.module.scss';
import cs from 'classnames/bind';

const cx = cs.bind(styles);

export default function WishButton(isBookmarked) {
  const [isWish, setIsWish] = useState(isBookmarked);

  const handleClick = () => {
    setIsWish(!isWish);
  };
  return (
    <div className={cx('wrapper')}>
      <div className={cx('heartIcons')}>
        {isWish ? (
          <FaHeart
            onClick={(e) => {
              e.preventDefault();
              handleClick();
            }}
          />
        ) : (
          <FaRegHeart
            onClick={(e) => {
              e.preventDefault();
              handleClick();
            }}
          />
        )}
      </div>
    </div>
  );
};
