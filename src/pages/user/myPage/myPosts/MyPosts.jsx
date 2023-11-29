import React, { useState, useEffect } from 'react';
import styles from './MyPosts.module.scss';
import cs from 'classnames/bind';
import { MyTitle, MySideBar, SearchBar, MyList, Pagination, LoadingModal } from 'components';
import { useGetUserPostList } from 'hooks';

const cx = cs.bind(styles);

export default function MyPosts() {
  const role = '일반';
  const [searchText, setSearchText] = useState('');
  const [currPage, setCurrPage] = useState(0);
  const { data, isLoading, error } = useGetUserPostList(currPage + 1);
  const [postList, setPostList] = useState([]);

  useEffect(() => {
    if (data) {
      const mapPostList = data.posts.map((post) => ({
        _id: post._id,
        title: post.title,
      }));
      setPostList(mapPostList);
    }
  }, [data]);

  const handleSearchChange = (text) => {
    setSearchText(text);
  };

  if (error) return;

  return (
    <div className={cx('wrapper')}>
      <div className={cx('mypage')}>
        <div className={cx('sidebar')}>
          <MySideBar />
        </div>
        <main>
          <MyTitle text="MY 등록 게시물" />
          <SearchBar className={cx('my-page-style')} searchInput={searchText} onSearchChange={handleSearchChange} />
          {isLoading ? (
            <LoadingModal message="로딩중..." />
          ) : (
            <div className={cx('content')}>
              {postList.length === 0 ? (
                <div>등록된 게시물이 없습니다.</div>
              ) : (
                <MyList postList={postList} pageNumber={currPage + 1} searchText={searchText} role={role} />
              )}
              <Pagination currPage={currPage} onClickPage={setCurrPage} pageCount={Math.ceil(data.totalCount / 7)} />
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
