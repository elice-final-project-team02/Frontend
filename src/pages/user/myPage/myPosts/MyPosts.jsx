import React, { useState, useEffect } from 'react';
import styles from './MyPosts.module.scss';
import cs from 'classnames/bind';
import { MyTitle, MySideBar, MyList, Pagination, LoadingModal } from 'components';
import { useGetUserPostList } from 'hooks';
import { NotFoundCharacter } from 'assets/images';

const cx = cs.bind(styles);

export default function MyPosts() {
  const role = '일반';
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

  if (error) return;

  return (
    <div className={cx('wrapper')}>
      <div className={cx('mypage')}>
        <div className={cx('sidebar')}>
          <MySideBar />
        </div>
        <main>
          <MyTitle text="MY 등록 게시물" />
          {isLoading ? (
            <LoadingModal message="로딩중..." />
          ) : (
            <div className={cx('content')}>
              {postList.length === 0 ? (
                <div className={cx('not-found-wrapper')}>
                  <span className={cx('not-found')}>
                    <img src={NotFoundCharacter} alt="" />
                  </span>
                  등록된 게시물이 없습니다.
                </div>
              ) : (
                <MyList postList={postList} pageNumber={currPage + 1} role={role} />
              )}
              <Pagination currPage={currPage} onClickPage={setCurrPage} pageCount={Math.ceil(data.totalCount / 7)} />
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
