import React from 'react';
import { BsEnvelope, BsPersonFill } from 'react-icons/bs';
import { FaRegHeart, FaMapMarkerAlt, FaCalendar, FaClock } from 'react-icons/fa';
import { PiMoneyFill } from 'react-icons/pi';
import targetImg from './draftImage.png';
import WishButton from '../wishButton/WishButton.jsx';
import MessageButton from '../messageButton/MessageButton.jsx';
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
  const titleContainer = cx('title', { centeredTitle: title.length < 10 });

  return (
    <div className={cx('card')}>
      <div className={cx('mainInfo')}>
        <div className={cx('mainUpper')}>
          <img src={targetImg} alt="targetImage" className={cx('targetImage')} />
          <div className={cx('upperInfo')}>
            <span className={cx('careTerm')}>{care_term}</span>
            <h3 className={titleContainer}>{title}</h3>
          </div>
        </div>
        <div className={cx('mainBottom')}>
          <span className={cx('timeStamp')}>등록일 {timestamp}</span>
          <span className={cx('cardStatus')}>{status}</span>
          <div className={cx('iconContainer')}>
            <MessageButton />
            <WishButton />
          </div>
        </div>
      </div>
      <div className={cx('extraInfo')}>
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
          <li className={cx('preferMate')}>
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
  );
};

export default Card;
