import React from 'react';
import { BsPersonFill } from 'react-icons/bs';
import { FaMapMarkerAlt, FaCalendar, FaClock } from 'react-icons/fa';
import { PiMoneyFill } from 'react-icons/pi';
import targetImg from './draftImage.png';
import { MessageButton, WishButton } from 'components';
// import LongTerm from 'assets/images/long-term.png';
// import ShortTerm from 'assets/images/short-term.png';
import { LongTerm, ShortTerm } from 'assets/images';
import styles from './Card.module.scss';
import cs from 'classnames/bind';

const cx = cs.bind(styles);

const Card = ({
  post_id,
  region,
  care_target,
  target_features,
  preferredmate_age,
  preferredmate_gender,
  timestamp,
  title,
  care_term,
  care_days,
  start_time,
  end_time,
  hourly_rate,
  negotiable_rate,
  status,
  startDate,
  endDate,
}) => {
  const titleContainer = cx('title', { 'centered-title': title.length < 10 });

  return (
    <div className={cx('wrapper')}>
      <div className={cx('card')}>
        <div className={cx('main-info')}>
          <div className={cx('main-upper')}>
            <img src={targetImg} alt="targetImage" className={cx('target-image')} />
            <div className={cx('upper-info')}>
              <img src={LongTerm} alt="longTerm" className={cx('long-term-icon')} />
              <h3 className={titleContainer}>{title}</h3>
            </div>
          </div>
          <div className={cx('main-bottom')}>
            <span className={cx('time-stamp')}>등록일 {timestamp}</span>
            <span className={cx('card-status')}>{status}</span>
            <div className={cx('icon-container')}>
              <MessageButton />
              <WishButton />
            </div>
          </div>
        </div>
        <div className={cx('extra-info')}>
          <ul>
            <li className={cx('location')}>
              <FaMapMarkerAlt color="#d3d3d3" />
              {region}
            </li>
            <li className={cx('date')}>
              <FaCalendar color="#d3d3d3" />
              {startDate}~ {care_days}
            </li>
            <li className={cx('time')}>
              <FaClock color="#d3d3d3" />
              {start_time}, {end_time}
            </li>
            <li className={cx('prefer-mate')}>
              <BsPersonFill color="#d3d3d3" />
              {preferredmate_age} {preferredmate_gender}
            </li>
            <li className={cx('wage')}>
              <PiMoneyFill color="#d3d3d3" />
              {hourly_rate}원 {negotiable_rate}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Card;
