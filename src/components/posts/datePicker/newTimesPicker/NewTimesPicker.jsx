import React from 'react';
import styles from './NewTimesPicker.module.scss';
import cs from 'classnames/bind';
import DatePicker from 'react-datepicker';
import { ko } from 'date-fns/locale';
import * as date from 'lib';
import { setHours, setMinutes } from 'date-fns';
const cx = cs.bind(styles);

export default function NewTimesPicker({ time, setTime, minzTime }) {
  console.log(minzTime);
  return (
    <DatePicker
      selected={time}
      onChange={(date) => setTime(date)}
      showTimeSelect
      showTimeSelectOnly
      timeIntervals={60}
      timeCaption="시간"
      dateFormat="HH:00"
      locale={ko}
      minTime={minzTime ? minzTime : null}
      maxTime={minzTime ? setHours(setMinutes(new Date(), 0), 24) : null}
    />
  );
}
