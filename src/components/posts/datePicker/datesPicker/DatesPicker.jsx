import React from 'react';
import styles from './DatesPicker.module.scss';
import cs from 'classnames/bind';
import { ko } from 'date-fns/esm/locale';
import DatePicker from 'react-datepicker';
const cx = cs.bind(styles);

export default function DatesPicker({ postContent, setPostContent }) {
  const ExampleCustomInput = React.forwardRef(({ value, onClick }, ref) => (
    <button className={cx('example-custom-input')} onClick={onClick} ref={ref}>
      {value}
    </button>
  ));
  return (
    <DatePicker
      selected={postContent.longTerm.startDate}
      onChange={(date) => setPostContent({ ...postContent, longTerm: { ...postContent.longTerm, startDate: date } })}
      customInput={<ExampleCustomInput />}
      locale={ko}
      minDate={new Date()}
      dateFormat="yyyy/MM/dd"
    />
  );
}
