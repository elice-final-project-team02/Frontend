import React from 'react';
import styles from './ShowSelectedDateList.module.scss';
import cs from 'classnames/bind';
import { dateFormatter } from '../../../../lib';
import { v4 as uuidv4 } from 'uuid';
const cx = cs.bind(styles);

export default function ShowSelectedDateList(props) {
  return (
    <>
      <ul className={cx('wrapper')}>
        {props.array
          .sort((a, b) => a - b)
          .map((item) => (
            <li key={uuidv4()}> {dateFormatter.changeDateToMonthAndDateAndDayOfTheWeek(item)}</li>
          ))}
        {console.log(props.array)}
      </ul>
    </>
  );
}
