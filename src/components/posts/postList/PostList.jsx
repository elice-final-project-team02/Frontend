import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Pagination, Card } from 'components';
import styles from './PostList.module.scss';
import cs from 'classnames/bind';
const cx = cs.bind(styles);

export default function PostList({ postsData, searchInput, target }) {
  const postsList = postsData.posts;
  const [currentPostsList, setCurrentPostsList] = useState([]);
  const [searchedPostsList, setSearchedPostsList] = useState([]);
  const [currPage, setCurrPage] = useState(0);

  useEffect(() => {
    if (!searchInput) {
      const currentTargetPosts = postsList.filter((post) => post.careInformation.careTarget === target);
      setCurrentPostsList(currentTargetPosts);
    } else {
      const searchedPosts = currentPostsList.filter((card) => card.title && card.title.includes(searchInput));
      setSearchedPostsList(searchedPosts);
    }
  }, [searchInput, postsList, target]);

  let totalPage = Math.ceil(searchedPostsList.totalCount / 6);

  return (
    <div className={cx('wrapper')}>
      {currentPostsList.length > 0 ? (
        <div className={cx('card-list-container')}>
          {currentPostsList.map((data, index) => (
            <Link to={`./${data._id}`} key={index}>
              <Card data={data} />
            </Link>
          ))}
        </div>
      ) : (
        <div className={cx('none')}>검색결과가 없습니다.</div>
      )}
      <div className={cx('pagination-container')}>
        <Pagination currPage={currPage} onClickPage={setCurrPage} pageCount={10} />
      </div>
    </div>
  );
}
