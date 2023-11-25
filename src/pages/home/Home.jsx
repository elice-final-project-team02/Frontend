import React from 'react';
import styles from './Home.module.scss';
import cs from 'classnames/bind';
import InfantImage from '../../assets/images/infant.png';
import SeniorOneImage from '../../assets/images/SeniorOne.png';
// import DisabledImage from '../../assets/images/disabled.png';
import MainLogo from '../../assets/images/logo.png';
const cx = cs.bind(styles);

export default function Home() {
  return (
    <div className={cx('wrapper')}>
      <div className={cx('mainImage')}>
        <img src={MainLogo} alt="메인로고" />
      </div>
      <div className={cx('cardContainer')}>
        <div className={cx('card')}>
          <span>아동</span>
          <img src={InfantImage} alt="아동" />
        </div>
        <div className={cx('card')}>
          <span>노인</span>
          <img src={SeniorOneImage} alt="노인" />
        </div>
        <div className={cx('card')}>
          <span>장애인</span>
          {/* <img src={DisabledImage} alt="장애인" /> */}
        </div>
      </div>
    </div>
  );
}
