import React, { useEffect, useState } from 'react';
import styles from './AllPosts.module.scss';
import cs from 'classnames/bind';
import { Pagination, FilterCareTarget, SearchBar, PostList, Card } from 'components';
import { useGetPostList } from 'hooks';
import { useSearchParams } from 'react-router-dom';
const cx = cs.bind(styles);

export default function AllPosts() {
  const [currPage, setCurrPage] = useState(0);
  const { data, isLoading } = useGetPostList(currPage + 1, '노인', 'true');
  const [postList, setPostList] = useState([]);

  React.useEffect(() => {
    if (data) {
    }
    console.log(data);
  }, [data, currPage]);

  return (
    <div className={cx('wrapper')}>
      <button onClick={() => console.log(postList)}>postList</button>
      <button onClick={() => console.log(currPage)}>currPage</button>
      <div className={cx('card-list-container')}>
        {postList &&
          postList.map((data, index) => (
            <span key={index}>
              <Card data={data} />
            </span>
          ))}
      </div>
      <Pagination currPage={currPage} onClickPage={setCurrPage} pageCount={Math.ceil(data.totalCount / 6)} />
    </div>
  );
}
