import React, { useState } from 'react';
import styles from './AllPosts.module.scss';
import cs from 'classnames/bind';
import Card from '../../../components/posts/card/Card';
import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const cx = cs.bind(styles);
const sampleData = {
  post_id: 1,
  region: '부산시 어쩌구',
  care_target: 'child',
  target_features: 'Example Target Features',
  preferredmate_age: '20대, 30대',
  preferredmate_gender: '남성',
  author: 'John Doe',
  timestamp: '11/10',
  title: '5세 남아 등하원, 실내놀이실내놀이실내놀이 시터 구합니다.',
  care_term: '정기',
  care_days: '월 수 금',
  start_time: '09:00 AM',
  end_time: '05:00 PM',
  hourly_rate: '15,000',
  negotiable_rate: true,
  status: '예약 중',
  startDate: '2023-01-10',
  endDate: '2023-01-20',
};

const careTargets = ['아동', '노인', '장애인'];

export default function AllPosts() {
  return (
    <>
      <SearchBar />
      <div className={cx('recruitContainer')}>
        {/* <input type="text" value={search} onChange={onChange} /> */}
        <div className={cx('filterContainer')}>
          <FilterCareTarget />
        </div>
        <div className={cx('cardListContainer')}>
          {/* 임시링크 */}
          <Link to="./123">
            <Card {...sampleData} />
          </Link>
        </div>
      </div>
    </>
  );
}

const SearchBar = () => {
  const [searchInput, setSearchInput] = useState('');

  const handleChange = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
    console.log(e.target.value);
  };

  return (
    <div className={cx('searchBarContainer')}>
      <input
        type="text"
        className={cx('searchBar')}
        placeholder="검색어를 입력하세요"
        onChange={handleChange}
        value={searchInput}
      />
      <button className={cx('searchIcon')}>
        <FaSearch color="#d3d3d3" />
      </button>
    </div>
  );
};

const FilterCareTarget = () => {
  // const recruitingPost = [];
  return (
    <div className={cx('filterContainer')}>
      {careTargets.map((target) => (
        <label className={cx('filterTarget')}>
          <input type="checkbox" value={target} />
          {target}
        </label>
      ))}
    </div>
  );
};
