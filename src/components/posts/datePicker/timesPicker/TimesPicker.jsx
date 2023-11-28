import React from 'react';
import styles from './TimesPicker.module.scss';
import cs from 'classnames/bind';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import { ko } from 'date-fns/esm/locale';

const cx = cs.bind(styles);

export default function TimesPicker({ postContent, setPostContent, type, mainTime, setMainTime }) {
  /** 단기 타입 */
  if (postContent.careTerm === 'short') {
    return (
      <DatePicker
        // selected={selectedTime}
        onChange={(date) => {
          if (type === 'startTime') {
            setMainTime({ ...mainTime, mainStartTime: new Date(date) });
          } else {
            setMainTime({ ...mainTime, mainEndTime: new Date(date) });
          }
        }}
        selected={type === 'startTime' ? mainTime.mainStartTime : mainTime.mainEndTime}
        showTimeSelect
        showTimeSelectOnly
        timeIntervals={60}
        timeCaption="시간"
        dateFormat="HH:00"
        locale={ko}
      />
    );
  } else {
    /** 정기 타입 */
    return (
      <DatePicker
        // selected={selectedTime}
        onChange={(date) => {
          if (type === 'startTime') {
            setMainTime({ ...mainTime, mainStartTime: new Date(date) });
          } else {
            setMainTime({ ...mainTime, mainEndTime: new Date(date) });
          }
        }}
        selected={type === 'startTime' ? mainTime.mainStartTime : mainTime.mainEndTime}
        showTimeSelect
        showTimeSelectOnly
        timeIntervals={60}
        timeCaption="시간"
        dateFormat="HH:00"
        locale={ko}
      />
    );
  }
}
