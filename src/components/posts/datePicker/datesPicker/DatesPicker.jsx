import React from 'react';
import styles from './DatesPicker.module.scss';
import cs from 'classnames/bind';
import { ko } from 'date-fns/esm/locale';
import DatePicker from 'react-datepicker';
const cx = cs.bind(styles);

export default function DatesPicker(props) {
  const { values, setValues } = props;
  const ExampleCustomInput = React.forwardRef(({ value, onClick }, ref) => (
    <button className={cx('example-custom-input')} onClick={onClick} ref={ref}>
      {value}
    </button>
  ));
  return (
    <DatePicker
      selected={values.longTerm.startDate}
      onChange={(date) => setValues({ ...values, longTerm: { ...values.longTerm, startDate: date } })}
      customInput={<ExampleCustomInput />}
      locale={ko}
      minDate={new Date()}
      dateFormat="yyyy/MM/dd"
    />
  );
}
