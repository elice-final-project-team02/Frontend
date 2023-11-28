import React from 'react';

//참조사이트 https://junheedot.tistory.com/11
export default function useMultiSelection(checkedList, setCheckedList, isChecked, setIsChecked) {
  function checkedItemHandler(value, isChecked) {
    if (isChecked) {
      setCheckedList((prev) => [...prev, value]);
      return;
    }
    if (!isChecked && checkedList.includes(value)) {
      setCheckedList(checkedList.filter((item) => item !== value));
      return;
    }
    return;
  }
  function checkHandler(e, value) {
    setIsChecked(!isChecked);
    checkedItemHandler(value, e.target.checked);
  }
  return checkHandler;
}
