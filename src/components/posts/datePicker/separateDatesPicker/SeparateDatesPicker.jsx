import React from 'react';
import styles from './SeparateDatesPicker.module.scss';
import cs from 'classnames/bind';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/esm/locale';
const cx = cs.bind(styles);

export default function SeparateDatesPicker({ postContent, setPostContent, mainTime }) {
  const today = new Date();
  const oneMonthLater = new Date();
  oneMonthLater.setMonth(today.getMonth() + 1);
  function handleDateChange(date) {
    const isDateSelected = postContent.shortTerm.some(
      (selectedDateObj) => selectedDateObj.careDate.getTime() === date.getTime()
    );
    // 이미 선택된 날짜라면 제거, 아니면 추가
    if (isDateSelected) {
      setPostContent({
        ...postContent,
        shortTerm: postContent.shortTerm.filter(
          (selectedDateObj) => selectedDateObj.careDate.getTime() !== date.getTime()
        ),
      });
    } else {
      setPostContent({
        ...postContent,
        shortTerm: [
          ...postContent.shortTerm,
          { careDate: date, startTime: mainTime.mainStartTime, endTime: mainTime.mainEndTime },
        ],
      });
    }
  }
  return (
    <DatePicker
      highlightDates={[...postContent.shortTerm.map((obj) => obj.careDate)]}
      onChange={(date) => {
        handleDateChange(date);
        return;
      }}
      minDate={today}
      maxDate={oneMonthLater}
      selectsDisabledDaysInRange
      disabledKeyboardNavigation
      locale={ko}
      inline
    />
  );
}
