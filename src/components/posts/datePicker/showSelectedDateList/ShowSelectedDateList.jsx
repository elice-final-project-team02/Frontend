import React from 'react';
import styles from './ShowSelectedDateList.module.scss';
import cs from 'classnames/bind';
import { dateFormatter } from '../../../../lib';
import { v4 as uuidv4 } from 'uuid';
const cx = cs.bind(styles);

export default function ShowSelectedDateList(props) {
  React.useEffect(() => {}, []);
  return (
    <>
      <ul className={cx('wrapper')}>
        {props.array
          .filter((value, index) => index !== 0)
          .sort((a, b) => a - b)
          .map((item) => {
            if (props.type === 'short') {
              return (
                <li key={uuidv4()}>
                  {`${dateFormatter.changeDateToMonthAndDateAndDayOfTheWeek(item)} ${dateFormatter.changeDateToHHMM(
                    props.values.startTime
                  )}-${dateFormatter.changeDateToHHMM(props.values.endTime)}`}
                  <p>+시간 수정</p>
                </li>
              );
            } else {
              return (
                <li key={uuidv4()}>
                  {`${item}요일 ${dateFormatter.changeDateToHHMM(
                    props.values.startTime
                  )}-${dateFormatter.changeDateToHHMM(props.values.endTime)}`}
                  <p>+ 시간 수정</p>
                </li>
              );
            }
          })}
      </ul>
    </>
  );
}
