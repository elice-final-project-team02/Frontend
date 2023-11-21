import React from 'react';
import styles from './WritePost.module.scss';
import cs from 'classnames/bind';
import { DatesPicker, Button, SeparateDatesPicker, ShowSelectedDateList, NewTimesPicker, Toggle } from 'components';
import { region } from 'lib';
import InfantImage from 'assets/images/infant.png';
import SeniorOneImage from 'assets/images/senior1.png';
import DisabledImage from 'assets/images/disabled.png';
const cx = cs.bind(styles);

export default function WritePost() {
  const [mainTime, setMainTime] = React.useState({
    mainStartTime: new Date(2020, 0, 0, 8),
    mainEndTime: new Date(2020, 0, 0, 20),
  });

  const [postContent, setPostContent] = React.useState({
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

  function handleChange(e) {
    setPostContent({
      ...postContent,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
  }

  /** 단기, 정기 시작,종료 시간 일괄수정 */
  React.useEffect(() => {
    setPostContent({
      ...postContent,
      shortTerm: postContent.shortTerm.map((obj) => ({
        ...obj,
        startTime: mainTime.mainStartTime,
        endTime: mainTime.mainEndTime,
      })),
      longTerm: {
        ...postContent.longTerm,
        schedule: postContent.longTerm.schedule.map((obj) => ({
          ...obj,
          startTime: mainTime.mainStartTime,
          endTime: mainTime.mainEndTime,
        })),
      },
    });
  }, [mainTime]);

  /** 체크박스 기능함수 */
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
  const ageList = ['20대', '30대', '40대', '50대', '60대', '성별무관'];
  const [checkedAgeList, setCheckedAgeList] = React.useState([]);
  const [isAgeChecked, setIsAgeChecked] = React.useState(false);
  const checkAgeHandler = makeCheckHandler(checkedAgeList, setCheckedAgeList, isAgeChecked, setIsAgeChecked);

  /** 선호연령 체크박스 실시간 반영 */
  React.useEffect(() => {
    return setPostContent({ ...postContent, preferredMateAge: checkedAgeList });
  }, [checkedAgeList]);

  const careDaysList = ['월', '화', '수', '목', '금', '토', '일'];
  const [checkedDaysList, setCheckedDaysList] = React.useState([]);
  const [isDayChecked, setIsDayChecked] = React.useState(false);
  const checkDayHandler = makeCheckHandler(checkedDaysList, setCheckedDaysList, isDayChecked, setIsDayChecked);

  /** 정기일정 요일 체크박스 실시간 반영 */
  React.useEffect(() => {
    return setPostContent({
      ...postContent,
      longTerm: {
        ...postContent.longTerm,
        schedule: checkedDaysList.map((item, index) => ({
          ...postContent.longTerm.schedule[index],
          careDay: item,
          startTime: mainTime.mainStartTime,
          endTime: mainTime.mainEndTime,
        })),
      },
    });
  }, [checkedDaysList]);

  /** 단기, 정기일정 토글시마다 관련 데이터 초기화 */
  React.useEffect(() => {
    setCheckedDaysList([]);
    setPostContent({
      ...postContent,
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
  }, [postContent.careTerm]);

  return (
    <div className={cx('wrapper')}>
      <form onSubmit={handleSubmit}>
        <div className={cx('title-wrapper')}>
          <label>제목</label>
          <input
            type="text"
            onChange={handleChange}
            value={postContent.title}
            name="title"
            placeholder="ex) 5세 남아 등하원 도우미 구합니다."
          />
        </div>
        <div className={cx('content')}>
          <textarea
            value={postContent.content}
            onChange={handleChange}
            placeholder="ex) 유치원 등하원 시 케어해주시면 됩니다."
            name="content"
            rows="6"
          ></textarea>
        </div>
        <div className={cx('region-wrapper')}>
          <span>지역</span>
          <select value={postContent.region} name="region" onChange={handleChange}>
            <option value="">시</option>
            {region[0].map((area, index) => (
              <option key={index} value={area}>
                {area}
              </option>
            ))}
          </select>
          <select value={postContent.subRegion} name="subRegion" onChange={handleChange}>
            <option value="">구</option>
            {postContent.region &&
              region[region[0].indexOf(postContent.region) + 1]?.map((area, index) => (
                <option key={index} value={area}>
                  {area}
                </option>
              ))}
          </select>
        </div>
        <div className={cx('care-target-wrapper')}>
          <span>돌봄 대상</span>
          <div className={cx('targets-wrapper')}>
            <div className={cx('target-wrapper')}>
              <input type="radio" name="careTarget" id="target-infant" />
              <label htmlFor="target-infant">
                <span className={cx('target-image-wrapper')}>
                  <img src={InfantImage} alt="아동" />
                </span>
              </label>
              <span>아동</span>
            </div>
            <div className={cx('target-wrapper')}>
              <input type="radio" name="careTarget" id="target-senior" />
              <label htmlFor="target-senior">
                <span className={cx('target-image-wrapper')}>
                  <img src={SeniorOneImage} alt="노인" />
                </span>
              </label>
              <span>노인</span>
            </div>
            <div className={cx('target-wrapper')}>
              <input type="radio" name="careTarget" id="target-disabled" />
              <label htmlFor="target-disabled">
                <span className={cx('target-image-wrapper')}>
                  <img src={DisabledImage} alt="장애인" />
                </span>
              </label>
              <span>장애인</span>
            </div>
          </div>
        </div>
        <div className={cx('care-term-wrapper')}>
          <span>돌봄 기간</span>
          <Toggle
            onChange={(e) => {
              if (e.target.checked) {
                setPostContent({ ...postContent, careTerm: 'long' });
              } else {
                setPostContent({ ...postContent, careTerm: 'short' });
              }
            }}
          ></Toggle>
        </div>
        {postContent.careTerm === 'long' && (
          <div className={cx('care-days-wrapper')}>
            <span>돌봄 시작일</span>
            <span className={cx('calendar-wrapper')}>
              <DatesPicker postContent={postContent} setPostContent={setPostContent} />
            </span>
            <div className={cx('days-title-wrapper')}>
              <span>돌봄 요일</span>
              <div className={cx('days-wrapper')}>
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
            </div>
          </div>
        )}
        <div className={cx('care-dates-wrapper')}>
          {postContent.careTerm === 'short' && (
            <SeparateDatesPicker postContent={postContent} setPostContent={setPostContent} mainTime={mainTime} />
          )}

          <div className={cx('main-time-wrapper')}>
            <label htmlFor="">시작 시간</label>
            <div className={cx('time-wrapper')}>
              <NewTimesPicker
                time={mainTime.mainStartTime}
                setTime={(date) => {
                  setMainTime({ ...mainTime, mainStartTime: new Date(date) });
                }}
              />
            </div>
            <label htmlFor="">종료 시간</label>
            <div className={cx('time-wrapper')}>
              <NewTimesPicker
                time={mainTime.mainEndTime}
                setTime={(date) => {
                  setMainTime({ ...mainTime, mainEndTime: new Date(date) });
                }}
              />
            </div>
          </div>
          <div className={cx('selected-time-wrapper')}>
            {postContent.careTerm === 'short' ? (
              <ShowSelectedDateList
                type="short"
                mainTime={mainTime}
                array={postContent.shortTerm.map((obj) => obj.careDate)}
                setPostContent={setPostContent}
                postContent={postContent}
              />
            ) : (
              !!checkedDaysList.length && (
                <ShowSelectedDateList
                  type="long"
                  mainTime={mainTime}
                  array={postContent.longTerm.schedule.map((item) => item.careDay)}
                  postContent={postContent}
                  setPostContent={setPostContent}
                />
              )
            )}
          </div>
        </div>
        <div className={cx('preferred-mate-wrapper')}>
          <p>선호 메이트</p>
          <div className={cx('preferred-mate-gender-wrapper')}>
            <input type="radio" onChange={handleChange} name="preferredMateGender" id="mateWoman" value="여자" />
            <label htmlFor="mateWoman">여자</label>
            <input type="radio" onChange={handleChange} name="preferredMateGender" id="mateMan" value="남자" />
            <label htmlFor="mateMan">남자</label>
            <input
              type="radio"
              onChange={handleChange}
              name="preferred-mate-gender"
              id="mateGenderFree"
              value="성별무관"
            />
            <label htmlFor="mateGenderFree">성별무관</label>
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
                    return setPostContent({ ...postContent, preferredMateAge: checkedAgeList });
                  }}
                />
              </span>
            ))}
          </div>
        </div>
        <div className={cx('hourly-rate-wrapper')}>
          <label htmlFor="">시급</label>
          <input
            type="text"
            name="hourlyRate"
            // value={Number(postContent.hourlyRate)}
            onChange={handleChange}
            placeholder="숫자만 입력"
          />
          <input
            type="checkbox"
            name="negotiableRate"
            value={postContent.negotiableRate}
            onChange={() => {
              setPostContent({ ...postContent, negotiableRate: !postContent.negotiableRate });
            }}
          />
          <label htmlFor="">시급 협의 가능</label>
        </div>
        <div className={cx('caution-note-wrapper')}>
          <span htmlFor="">돌봄 대상 특징</span>
          <textarea
            name="targetFeatures"
            onChange={handleChange}
            value={postContent.targetFeatures}
            placeholder="ex) 나이, 성격, 좋아하는 것, 싫어하는 것 등"
          ></textarea>
          <span htmlFor="">돌봄 대상 유의사항</span>
          <textarea
            name="cautionNotes"
            onChange={handleChange}
            value={postContent.cautionNotes}
            placeholder="ex) 나이, 성격, 좋아하는 것, 싫어하는 것 등"
          ></textarea>
        </div>
        <div className={cx('button-wrapper')}>
          <Button type="cancel">취소</Button>
          <Button type="primary">작성하기</Button>
        </div>
      </form>
    </div>
  );
}
