import React from 'react';
import styles from './NewTimesPicker.module.scss';
import cs from 'classnames/bind';
import DatePicker from 'react-datepicker';
import { ko } from 'date-fns/locale';
const cx = cs.bind(styles);

export default function NewTimesPicker({ time, setTime }) {
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
    />
  );
}
