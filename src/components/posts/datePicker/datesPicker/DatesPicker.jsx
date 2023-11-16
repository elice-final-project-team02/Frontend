import React from 'react';
import styles from './DatesPicker.module.scss';
import cs from 'classnames/bind';
import DatePicker from 'react-datepicker';
const cx = cs.bind(styles);

export default function DatesPicker() {
  const [startDate, setStartDate] = React.useState(new Date());
  const ExampleCustomInput = React.forwardRef(({ value, onClick }, ref) => (
    <button className={cx('example-custom-input')} onClick={onClick} ref={ref}>
      {value}
    </button>
  ));
  return (
    <DatePicker
      selected={startDate}
      onChange={(date) => setStartDate(date)}
      customInput={<ExampleCustomInput />}
      minDate={new Date()}
    />
  );
}
