import React, { useState } from 'react';
import styles from './MyPosts.module.scss';
import cs from 'classnames/bind';
import { MyTitle, MySideBar, MySearch, MyList, Pagination } from 'components';

const cx = cs.bind(styles);

export default function MyPosts() {
  // list (id, title), role (돌봄, 일반)
  const postList = [
    {
      _id: '1234',
      title: '8시부터 10시까지 돌봄 서비스 요청합니다.',
    },
    {
      _id: '12345',
      title: '등하원 시터 구합니다.',
    },
    {
      _id: '12346',
      title: '8시부터 10시까지 돌봄 서비스 요청합니다.',
    },
    {
      _id: '12347',
      title: '등하원 시터 구합니다.',
    },
    {
      _id: '12348',
      title: '8시부터 10시까지 돌봄 서비스 요청합니다.',
    },
    {
      _id: '12349',
      title: '등하원 시터 구합니다.',
    },
    {
      _id: '123410',
      title: '8시부터 10시까지 돌봄 서비스 요청합니다.',
    },
  ];
  const role = '일반';
  const [searchText, setSearchText] = useState('');
  const [currPage, setCurrPage] = useState(0);
  // const [postData, setPostData] = useState([]);  // 추후에 get 요청으로 받아올 리스트
  // const [totalPostCount, setTotalPostCount] = useState(0); // 총 리스트 개수

  const handleSearchChange = (text) => {
    setSearchText(text);
  };

  return (
    <div className={cx('wrapper')}>
      <div className={cx('mypage')}>
        <div className={cx('sidebar')}>
          <MySideBar />
        </div>
        <main>
          <MyTitle text="MY 등록 게시물" />
          <MySearch onSearchChange={handleSearchChange} />
          <div className={cx('content')}>
            <MyList postList={postList} searchText={searchText} role={role} />
            <Pagination currPage={currPage} onClickPage={setCurrPage} pageCount={10} />
          </div>
        </main>
      </div>
    </div>
  );
}
