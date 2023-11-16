import React from 'react';
import styles from './TimesPicker.module.scss';
import cs from 'classnames/bind';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import { ko } from 'date-fns/esm/locale';
import moment from 'moment';

const cx = cs.bind(styles);

export default function TimesPicker({ values, setValues, type }) {
  const [startDate, setStartDate] = React.useState();

  return (
    <DatePicker
      // selected={selectedTime}
      onChange={(date) => {
        setStartDate(date);
        if (type === 'startTime') {
          setValues({ ...values, startTime: new Date(date) });
        } else if (type === 'endTime') {
          setValues({ ...values, endTime: new Date(date) });
        } else {
          alert('type지정이 잘못되었습니다');
          return;
        }
      }}
      showTimeSelect
      showTimeSelectOnly
      timeIntervals={60}
      timeCaption="Time"
      dateFormat="HH:mm"
      locale={ko}
    />
  );
}
