import React, { useState } from 'react';
import styles from './NewTwoTimesPicker.module.scss';
import cs from 'classnames/bind';
import { ko } from 'date-fns/locale';
import DatePicker from 'react-datepicker';
import { setHours } from 'date-fns';
import { setMinutes } from 'date-fns';
import { getHours } from 'date-fns';
import { getMinutes } from 'date-fns';
const cx = cs.bind(styles);

export default function NewTwoTimesPicker({ times, setTimes }) {
  const [startTime, setStartTime] = useState(times.mainStartTime);
  const [endTime, setEndTime] = useState(times.mainEndTime);
  return (
    <>
      <div>
        <DatePicker
          selected={startTime}
          onChange={(time) => setStartTime(time)}
          locale={ko}
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={60}
          minTime={setHours(setMinutes(new Date(), 0), 0)}
          maxTime={setHours(setMinutes(new Date(), 0), 23)}
          timeCaption="Time"
          dateFormat="aa h:mm"
        />
      </div>

      <div>
        <DatePicker
          selected={endTime}
          onChange={(time) => setEndTime(time)}
          locale={ko}
          showTimeSelect
          dateFormat="aa h:mm"
          showTimeSelectOnly
          timeIntervals={60}
          minTime={startTime}
          maxTime={setHours(setMinutes(new Date(), getMinutes(startTime)), getHours(startTime) + 20)}
        />
      </div>
    </>
  );
}
