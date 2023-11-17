import React from 'react';
import styles from './ShowSelectedDateList.module.scss';
import cs from 'classnames/bind';
import { dateFormatter } from '../../../../lib';
import { v4 as uuidv4 } from 'uuid';
const cx = cs.bind(styles);

export default function ShowSelectedDateList(props) {
  /** 요일를 숫자로 변환 */
  function changeDayOfWeekToNumber(day) {
    switch (day) {
      case '월':
        return 0;
      case '화':
        return 1;
      case '수':
        return 2;
      case '목':
        return 3;
      case '금':
        return 4;
      case '토':
        return 5;
      case '일':
        return 6;
      default:
        break;
    }
  }
  /** 숫자를 요일로 변환 */
  function changeNumberToDay(number) {
    switch (number) {
      case 0:
        return '월';
      case 1:
        return '화';
      case 2:
        return '수';
      case 3:
        return '목';
      case 4:
        return '금';
      case 5:
        return '토';
      case 6:
        return '일';
      default:
        break;
    }
  }

  return (
    <>
      <ul className={cx('wrapper')}>
        {props.type === 'short'
          ? props.array
              .filter((value, index) => index !== 0)
              .sort((a, b) => a - b)
              .map((item) => (
                <li key={uuidv4()}>
                  {`${dateFormatter.changeDateToMonthAndDateAndDayOfTheWeek(item)} ${dateFormatter.changeDateToHHMM(
                    props.mainTime.mainStartTime
                  )}-${dateFormatter.changeDateToHHMM(props.mainTime.mainEndTime)}`}
                  <p>+시간 수정</p>
                </li>
              ))
          : props.array
              .map((day) => changeDayOfWeekToNumber(day))
              .sort()
              .map((number) => changeNumberToDay(number))
              .map((item, index) => (
                <li key={uuidv4()}>
                  {`${item}요일 ${dateFormatter.changeDateToHHMM(
                    props.mainTime.mainStartTime
                  )}-${dateFormatter.changeDateToHHMM(props.mainTime.mainEndTime)}`}
                  <p>+ 시간 수정</p>
                </li>
              ))}
      </ul>
    </>
  );
}
