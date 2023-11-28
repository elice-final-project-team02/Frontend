import React from 'react';
import DatePicker from 'react-datepicker';
import { ko } from 'date-fns/locale';
import { setHours, setMinutes } from 'date-fns';

export default function NewTimesPicker({ time, setTime, minzTime }) {
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
