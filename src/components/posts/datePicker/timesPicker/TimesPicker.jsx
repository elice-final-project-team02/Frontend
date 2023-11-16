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
        } else {
          setValues({ ...values, endTime: new Date(date) });
        }
      }}
      selected={type === 'startTime' ? values.startTime : values.endTime}
      showTimeSelect
      showTimeSelectOnly
      timeIntervals={60}
      timeCaption="시간"
      dateFormat="HH:mm"
      locale={ko}
    />
  );
}
