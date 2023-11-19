import React from 'react';
import styles from './WritePost.module.scss';
import cs from 'classnames/bind';
import { DatesPicker, SeparateDatesPicker, ShowSelectedDateList, TimesPicker } from '../../../components';
import { region } from '../../../lib';
const cx = cs.bind(styles);

export default function WritePost() {
  const [mainTime, setMainTime] = React.useState({
    mainStartTime: new Date(2020, 0, 0, 8),
    mainEndTime: new Date(2020, 0, 0, 20),
  });

  const [values, setValues] = React.useState({
    title: '',
    content: '',
    careTarget: '',
    longTerm: {
      startDate: new Date(),
      schedule: [
        {
          careDay: '',
          startTime: mainTime.mainStartTime,
          endTime: mainTime.mainEndTime,
        },
      ],
    },
    shortTerm: [
      {
        careDate: new Date(99, 1),
        startTime: mainTime.mainStartTime,
        endTime: mainTime.mainEndTime,
      },
    ],
    careTerm: 'short',
    careDays: [],
    hourlyRate: 9620,
    negotiableRate: false,
    targetFeatures: '',
    cautionNotes: '',
    careDate: null,
    shortCareDates: [],
    region: '',
    subRegion: '',
    preferredMateAge: [],
    preferredMateGender: '',
  });

  const ageList = ['20대', '30대', '40대', '50대', '60대', '성별무관'];
  const [checkedAgeList, setCheckedAgeList] = React.useState([]);
  const [isAgeChecked, setIsAgeChecked] = React.useState(false);
  const careDaysList = ['월', '화', '수', '목', '금', '토', '일'];
  const [checkedDaysList, setCheckedDaysList] = React.useState([]);
  const [isDayChecked, setIsDayChecked] = React.useState(false);

  const checkAgeHandler = makeCheckHandler(checkedAgeList, setCheckedAgeList, isAgeChecked, setIsAgeChecked);
  const checkDayHandler = makeCheckHandler(checkedDaysList, setCheckedDaysList, isDayChecked, setIsDayChecked);

  function makeCheckHandler(checkedList, setCheckedList, isChecked, setIsChecked) {
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

  React.useEffect(() => {
    return setValues({ ...values, preferredMateAge: checkedAgeList });
  }, [checkedAgeList]);

  React.useEffect(() => {
    return setValues({
      ...values,
      longTerm: {
        ...values.longTerm,
        schedule: checkedDaysList.map((item, index) => ({
          ...values.longTerm.schedule[index],
          careDay: item,
          startTime: mainTime.mainStartTime,
          endTime: mainTime.mainEndTime,
        })),
      },
    });
  }, [checkedDaysList]);

  React.useEffect(() => {
    setCheckedDaysList([]);
    setValues({
      ...values,
      longTerm: {
        startDate: new Date(),
        schedule: [
          {
            careDay: '',
            startTime: mainTime.mainStartTime,
            endTime: mainTime.mainEndTime,
          },
        ],
      },
      shortTerm: [
        {
          careDate: new Date(99, 1),
          startTime: mainTime.mainStartTime,
          endTime: mainTime.mainEndTime,
        },
      ],
      careDates: [],
      shortCareDates: [],
      careDays: [],
    });
    setMainTime({ mainStartTime: new Date(2020, 0, 0, 8), mainEndTime: new Date(2020, 0, 0, 20) });
  }, [values.careTerm]);
  React.useEffect(() => {
    setValues({
      ...values,
      shortTerm: values.shortTerm.map((obj) => ({
        ...obj,
        startTime: mainTime.mainStartTime,
        endTime: mainTime.mainEndTime,
      })),
      longTerm: {
        ...values.longTerm,
        schedule: values.longTerm.schedule.map((obj) => ({
          ...obj,
          startTime: mainTime.mainStartTime,
          endTime: mainTime.mainEndTime,
        })),
      },
    });
  }, [mainTime]);
  function handleChange(e) {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  }
  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <div className={cx('wrapper')}>
      <form onSubmit={handleSubmit}>
        <div className={cx('title-wrapper')}>
          <label>제목</label>
          <input
            type="text"
            onChange={handleChange}
            value={values.title}
            name="title"
            placeholder="ex) 5세 남아 등하원 도우미 구합니다."
          />
        </div>
        <div>
          <textarea
            value={values.content}
            onChange={handleChange}
            placeholder="내용 작성 칸"
            name="content"
            cols="100"
            rows="7"
          ></textarea>
        </div>
        <div className={cx('region-wrapper')}>
          <span>지역</span>
          <select value={values.region} name="region" onChange={handleChange}>
            <option value="">시/도 선택</option>
            {region[0].map((area, index) => (
              <option key={index} value={area}>
                {area}
              </option>
            ))}
          </select>
          <select value={values.subRegion} name="subRegion" onChange={handleChange}>
            <option value="">구/군 선택</option>
            {values.region &&
              region[region[0].indexOf(values.region) + 1]?.map((area, index) => (
                <option key={index} value={area}>
                  {area}
                </option>
              ))}
          </select>
        </div>
        <div>
          <span>돌봄 대상</span>
          <select name="careTarget" onChange={handleChange}>
            <option value="child">어린이</option>
            <option value="older">노인</option>
            <option value="disabled">장애인</option>
          </select>
        </div>
        <div className={cx('care-term-wrapper')}>
          <input
            type="radio"
            name="careTerm"
            value="short"
            onChange={handleChange}
            id="careTermShort"
            checked={values.careTerm === 'short'}
          />
          <label htmlFor="careTermShort">단기</label>
          <input type="radio" name="careTerm" value="long" onChange={handleChange} id="careTermLong" />
          <label htmlFor="careTermLong">정기</label>
        </div>
        {values.careTerm === 'long' && (
          <div className={cx('care-days-wrapper')}>
            <p>돌봄 시작일</p>
            <div className={cx('calendar-wrapper')}>
              <DatesPicker values={values} setValues={setValues} />
            </div>
            <span>돌봄 요일</span>
            {careDaysList.map((day, index) => (
              <span key={index}>
                <input
                  type="checkbox"
                  name="careDays"
                  checked={checkedDaysList.includes(day)}
                  onChange={(e) => {
                    checkDayHandler(e, day);
                  }}
                  id={`day${index}`}
                />
                <label htmlFor={`day${index}`}>{day}</label>
              </span>
            ))}
          </div>
        )}
        <div className={cx('care-dates-wrapper')}>
          {values.careTerm === 'short' && (
            <SeparateDatesPicker values={values} setValues={setValues} mainTime={mainTime} />
          )}

          <div>
            <label htmlFor="">시작 시간</label>
            <TimesPicker
              mainTime={mainTime}
              setMainTime={setMainTime}
              values={values}
              type="startTime"
              setValues={setValues}
            />
            <label htmlFor="">종료 시간</label>
            <TimesPicker
              mainTime={mainTime}
              setMainTime={setMainTime}
              values={values}
              type="endTime"
              setValues={setValues}
            />
            <div>
              {values.careTerm === 'short' ? (
                <ShowSelectedDateList
                  type="short"
                  mainTime={mainTime}
                  array={values.shortTerm.map((obj) => obj.careDate)}
                  setValues={setValues}
                  values={values}
                />
              ) : (
                !!checkedDaysList.length && (
                  <ShowSelectedDateList
                    type="long"
                    mainTime={mainTime}
                    array={values.longTerm.schedule.map((item) => item.careDay)}
                    values={values}
                    setValues={setValues}
                  />
                )
              )}
            </div>
          </div>
        </div>
        <div className={cx('preferred-mate-wrapper')}>
          <p>선호 메이트</p>
          <div className={cx('preferred-mate-gender-wrapper')}>
            <label htmlFor="mateWoman">
              여자
              <input type="radio" onChange={handleChange} name="preferredMateGender" id="mateWoman" value="여자" />
              <span className={cx('radio-on')}></span>
            </label>
            <label htmlFor="mateMan">
              남자
              <input type="radio" onChange={handleChange} name="preferredMateGender" id="mateMan" value="남자" />
              <span className={cx('radio-on')}></span>
            </label>
            <label htmlFor="mateGenderFree">
              성별무관
              <input
                type="radio"
                onChange={handleChange}
                name="preferred-mate-gender"
                id="mateGenderFree"
                value="성별무관"
              />
              <span className={cx('radio-on')}></span>
            </label>
          </div>

          <div className={cx('preferred-mate-age-wrapper')}>
            {ageList.map((age, index) => (
              <span key={index}>
                <label htmlFor={age}>{age}</label>
                <input
                  id={age}
                  type="checkbox"
                  checked={checkedAgeList.includes(age)}
                  onChange={(e) => {
                    checkAgeHandler(e, age);
                    return setValues({ ...values, preferredMateAge: checkedAgeList });
                  }}
                />
              </span>
            ))}
          </div>
        </div>
        <div className={cx('hourly-rate-wrapper')}>
          <label htmlFor="">시급(원)</label>
          <input
            type="text"
            name="hourlyRate"
            value={Number(values.hourlyRate)}
            onChange={handleChange}
            placeholder="숫자만 입력"
          />
          <input
            type="checkbox"
            name="negotiableRate"
            value={values.negotiableRate}
            onChange={() => {
              setValues({ ...values, negotiableRate: !values.negotiableRate });
            }}
          />
          <label htmlFor="">시급 협의 가능</label>
        </div>
        <div className={cx('caution-note-wrapper')}>
          <span htmlFor="">돌봄 대상 특징</span>
          <textarea name="targetFeatures" onChange={handleChange} value={values.targetFeatures}></textarea>
          <span htmlFor="">돌봄 대상 유의사항</span>
          <textarea name="cautionNotes" onChange={handleChange} value={values.cautionNotes}></textarea>
        </div>
        <div className={cx('button-wrapper')}>
          <button>취소</button>
          <button>작성하기</button>
        </div>
      </form>
    </div>
  );
}
