import React from 'react';
import styles from './Card.module.scss';
import cs from 'classnames/bind';
import { BsPersonFill } from 'react-icons/bs';
import { FaMapMarkerAlt, FaCalendar, FaClock } from 'react-icons/fa';
import { PiMoneyFill } from 'react-icons/pi';
import targetImg from './draftImage.png';
import { WishButton } from 'components';
import { LongTerm, ShortTerm, Child, Senior1, Disabled } from 'assets/images';
import axios from 'axios';
import { useGetRequest } from 'hooks';

const cx = cs.bind(styles);

export default function Card({
  post_id,
  region,
  subRegion,
  careTarget,
  isLongTerm,
  preferredMateAge,
  preferredMateGender,
  author,
  timestamp,
  title,
  care_days,
  start_time,
  end_time,
  hourlyRate,
  negotiableRate,
  status,
  startDate,
  endDate,
}) {
  const titleContainer = cx('title', { 'centered-title': title.length < 10 });
  const formattedHourlyRate = hourlyRate.toLocaleString();
  const formattedMateAge = preferredMateAge.join(' ');

  const childString = 'child';
  const seniorString = 'senior';
  const disabledString = 'disabled';

  const currentCareTarget = cx('main-info', {
    [childString]: careTarget === '아동',
    [seniorString]: careTarget === '노인',
    [disabledString]: careTarget === '장애인',
  });

  console.log(currentCareTarget);

  return (
    <div className={cx('wrapper')}>
      <div className={cx('card')}>
        <div className={currentCareTarget}>
          <div className={cx('main-upper')}>
            <div className={cx('target-image-container')}>
              <img
                src={careTarget === '아동' ? Child : careTarget === '노인' ? Senior1 : Disabled}
                alt="targetImage"
                className={cx('target-image')}
              />
            </div>
            <div className={cx('upper-info')}>
              {isLongTerm ? <img src={LongTerm} alt="longTerm" /> : <img src={ShortTerm} alt="shortTerm" />}
              <h3 className={titleContainer}>{title}</h3>
            </div>
          </div>
          <div className={cx('main-bottom')}>
            <span className={cx('card-status')}>{status}</span>
            <span className={cx('time-stamp')}>등록일 {timestamp}</span>
            <WishButton />
          </div>
        </div>
        <div className={cx('extra-info')}>
          <ul>
            <li className={cx('location')}>
              <FaMapMarkerAlt color="#d3d3d3" className={cx('extra-info-icon')} />
              {region} {subRegion}
            </li>
            <li className={cx('date')}>
              <FaCalendar color="#d3d3d3" className={cx('extra-info-icon')} />
              {startDate}~ ({care_days})
            </li>
            <li className={cx('time')}>
              <FaClock color="#d3d3d3" className={cx('extra-info-icon')} />
              {start_time}, {end_time}
            </li>
            <li className={cx('prefer-mate')}>
              <BsPersonFill color="#d3d3d3" className={cx('extra-info-icon')} />
              {formattedMateAge}
              <br />
              {preferredMateGender}
            </li>
            <li className={cx('wage')}>
              <PiMoneyFill color="#d3d3d3" className={cx('extra-info-icon')} />
              {formattedHourlyRate} 원 {negotiableRate ? ' | 협의가능' : ''}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
