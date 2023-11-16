import React from 'react';
import styles from './SeparateDatesPicker.module.scss';
import cs from 'classnames/bind';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/esm/locale';
const cx = cs.bind(styles);

export default function SeparateDatesPicker({ values, setValues }) {
  function handleDateChange(date) {
    const isDateSelected = values.shortCareDates.some((selectedDate) => selectedDate.getTime() === date.getTime());

    // 이미 선택된 날짜라면 제거, 아니면 추가
    if (isDateSelected) {
      setValues({
        ...values,
        shortCareDates: values.shortCareDates.filter((selectedDate) => selectedDate.getTime() !== date.getTime()),
      });
    } else {
      setValues({ ...values, shortCareDates: [...values.shortCareDates, date] });
    }
  }
  React.useEffect(() => {
    console.log(values);
  }, [values]);
  return (
    <DatePicker
      highlightDates={[...values.shortCareDates]}
      onChange={(date) => {
        handleDateChange(date);
        // setValues({ ...values, shortCareDates: [...values.shortCareDates, date] });
        return;
      }}
      minDate={new Date()}
      selectsDisabledDaysInRange
      disabledKeyboardNavigation
      locale={ko}
      inline
    />
  );
}
