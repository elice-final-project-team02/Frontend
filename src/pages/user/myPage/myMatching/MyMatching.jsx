import React, { useState, useEffect } from 'react';
import styles from './MyMatching.module.scss';
import cs from 'classnames/bind';
import { MyTitle, MySideBar, MyList, Pagination, LoadingModal } from 'components';
import { useGetCompletedPostList } from 'hooks';
import { useRecoilValue } from 'recoil';
import { roleState } from 'recoil/roleState';
import { NotFoundCharacter } from 'assets/images';

const cx = cs.bind(styles);

export default function MyMatching() {
  const role = useRecoilValue(roleState);
  const [currPage, setCurrPage] = useState(0);
  const { data, isLoading } = useGetCompletedPostList(role, currPage + 1);
  const [postList, setPostList] = useState([]);

  useEffect(() => {
    if (data) {
      const mapPostList = data.posts.map((post) => ({
        _id: post._id,
        title: post.title,
        matched: role === 'user' ? post.careInformation.careUser[1] : post.author[1],
      }));
      setPostList(mapPostList);
    }
  }, [data, role]);

  return (
    <div className={cx('wrapper')}>
      <div className={cx('mypage')}>
        <div className={cx('sidebar')}>
          <MySideBar />
        </div>
        <main>
          <MyTitle text="매칭 완료된 리스트" />
          {isLoading ? (
            <LoadingModal message="로딩중..." />
          ) : (
            <div className={cx('content')}>
              {postList.length === 0 ? (
                <div className={cx('not-found-wrapper')}>
                  <span className={cx('not-found')}>
                    <img src={NotFoundCharacter} alt="" />
                  </span>
                  매칭 완료된 리스트가 없습니다.
                </div>
              ) : (
                <MyList postList={postList} matching />
              )}
              <Pagination currPage={currPage} onClickPage={setCurrPage} pageCount={Math.ceil(data.totalCount / 7)} />
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
