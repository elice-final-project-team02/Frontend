import React from 'react';
import styles from './ShowSelectedDateList.module.scss';
import cs from 'classnames/bind';
import { dateFormatter } from 'lib';
import { v4 as uuidv4 } from 'uuid';
import { NewTimesPicker } from 'components';
import { BiSolidPencil } from 'react-icons/bi';
const cx = cs.bind(styles);

export default function ShowSelectedDateList({ postContent, setPostContent, array, type }) {
  /** 정해진 시간을 정보에 업데이트  */
  function patchDateToPostContentState(type, date, property, scheduleArray, selectedTimeIndex) {
    if (type === 'longTerm') {
      setPostContent({
        ...postContent,
        longTerm: {
          ...postContent.longTerm,
          schedule: inputDateToObjectInArray(date, property, scheduleArray, selectedTimeIndex),
        },
      });
    } else if (type === 'shortTerm') {
      setPostContent({
        ...postContent,
        shortTerm: inputDateToObjectInArray(date, property, scheduleArray, selectedTimeIndex),
      });
    }
  }

  /** 배열객체에 날짜를 주입함 */
  function inputDateToObjectInArray(date, property, scheduleArray, selectedTimeIndex) {
    return scheduleArray.map((obj, index) => {
      if (index === selectedTimeIndex && property === 'startTime') {
        return { ...obj, startTime: date };
      } else if (index === selectedTimeIndex && property === 'endTime') {
        return { ...obj, endTime: date };
      }
      return obj;
    });
  }

  const [isIndivisualTimeControll, setIsIndivisualTimeControll] = React.useState(
    new Array((array.length || 1) - 1).fill(false)
  );

  React.useEffect(() => {
    setIsIndivisualTimeControll(new Array((array.length || 1) - 1).fill(false));
  }, [postContent.careTerm]);

  function handleItemClick(index) {
    const newStates = [...isIndivisualTimeControll];
    newStates[index] = !newStates[index];
    setIsIndivisualTimeControll(newStates);
  }
  return (
    <ul className={cx('wrapper')}>
      {type === 'short'
        ? array
            .filter((value, index) => index !== 0)
            .sort((a, b) => a - b)
            .map((item, index) => (
              <li key={uuidv4()}>
                <div className={cx('selected-time-wrapper')}>
                  <span>
                    {`${dateFormatter.changeDateToMonthAndDateAndDayOfTheWeek(item)} ${dateFormatter.changeDateToHHMM(
                      postContent.shortTerm[index].startTime
                    )}-${dateFormatter.changeDateToHHMM(postContent.shortTerm[index].endTime)}`}
                  </span>
                  <button onClick={() => handleItemClick(index)}>
                    <BiSolidPencil />
                  </button>
                </div>
                {isIndivisualTimeControll[index] && (
                  <span className={cx('indivisual-time-controll-wrapper')}>
                    <span>시작시간</span>
                    <NewTimesPicker
                      time={postContent.shortTerm[index].startTime}
                      setTime={(date) => {
                        patchDateToPostContentState('shortTerm', date, 'startTime', postContent.shortTerm, index);
                      }}
                    />
                    <span>종료시간</span>
                    <NewTimesPicker
                      time={postContent.shortTerm[index].endTime}
                      setTime={(date) => {
                        patchDateToPostContentState('shortTerm', date, 'endTime', postContent.shortTerm, index);
                      }}
                    />
                  </span>
                )}
              </li>
            ))
        : array
            .map((day) => dateFormatter.changeKoreaDayOfWeekToNumber(day))
            .sort()
            .map((number) => dateFormatter.changeNumberToKoreaDayOfWeek(number))
            .map((item, index) => (
              <li key={uuidv4()}>
                <div className={cx('selected-time-wrapper')}>
                  <span>
                    {`${item}요일 ${postContent.longTerm.schedule[
                      index
                    ].startTime.getHours()}:00-${postContent.longTerm.schedule[index].endTime.getHours()}:00`}
                  </span>
                  <button onClick={() => handleItemClick(index)}>
                    <BiSolidPencil />
                  </button>
                </div>
                {isIndivisualTimeControll[index] && (
                  <span className={cx('indivisual-time-controll-wrapper')}>
                    <span>시작시간</span>
                    <NewTimesPicker
                      time={postContent.longTerm.schedule[index].startTime}
                      setTime={(date) => {
                        patchDateToPostContentState(
                          'longTerm',
                          date,
                          'startTime',
                          postContent.longTerm.schedule,
                          index
                        );
                      }}
                    />
                    <span>종료시간</span>
                    <NewTimesPicker
                      time={postContent.longTerm.schedule[index].endTime}
                      setTime={(date) => {
                        patchDateToPostContentState('longTerm', date, 'endTime', postContent.longTerm.schedule, index);
                      }}
                    />
                  </span>
                )}
              </li>
            ))}
    </ul>
  );
}
