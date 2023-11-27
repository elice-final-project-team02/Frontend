import React, { useState, useEffect } from 'react';
import styles from './MyMatching.module.scss';
import cs from 'classnames/bind';
import { MyTitle, MySideBar, SearchBar, MyList, Pagination } from 'components';
import { useGetCompletedPostList } from 'hooks';

const cx = cs.bind(styles);

const postList = [
  {
    matched: 'user1',
    _id: '1234',
    title: '8시부터 10시까지 돌봄 서비스 요청합니다.',
  },
  {
    matched: 'user1',
    _id: '12345',
    title: '등하원 시터 구합니다.',
  },
  {
    matched: 'user1',
    _id: '12346',
    title: '8시부터 10시까지 돌봄 서비스 요청합니다.',
  },
  {
    matched: 'user1',
    _id: '12347',
    title: '등하원 시터 구합니다.',
  },
  {
    matched: 'user1',
    _id: '12348',
    title: '8시부터 10시까지 돌봄 서비스 요청합니다.',
  },
  {
    matched: 'user1',
    _id: '12349',
    title: '등하원 시터 구합니다.',
  },
  {
    matched: 'user1',
    _id: '123410',
    title: '8시부터 10시까지 돌봄 서비스 요청합니다.',
  },
];

export default function MyMatching() {
  const role = '일반';
  const [searchText, setSearchText] = useState('');
  const [currPage, setCurrPage] = useState(0);
  const { data, isLoading } = useGetCompletedPostList();
  // const [postList, setPostList] = useState([]);

  // useEffect(() => {
  //   if (data) {
  //     const mapPostList = data.posts.map((post) => ({
  //       _id: post._id,
  //       title: post.title,
  //     }));
  //     setPostList(mapPostList);
  //   }
  // }, [data]);

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
          <MyTitle text="매칭 완료된 리스트" />
          <SearchBar className={cx('my-page-style')} searchInput={searchText} onSearchChange={handleSearchChange} />
          {isLoading ? (
            <div className={cx('loading')}>로딩중...</div>
          ) : (
            <div className={cx('content')}>
              {postList.length === 0 ? (
                <div>매칭 완료된 리스트가 없습니다.</div>
              ) : (
                <MyList postList={postList} searchText={searchText} role={role} matching />
              )}
              <Pagination currPage={currPage} onClickPage={setCurrPage} pageCount={Math.ceil(data.totalCount / 7)} />
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
