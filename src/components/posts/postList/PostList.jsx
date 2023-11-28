import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'components';
import styles from './PostList.module.scss';
import cs from 'classnames/bind';
const cx = cs.bind(styles);

export default function PostList({ postsData, searchInput, currentPage, onPageChange }) {
  const postsList = postsData.posts;
  const [searchedPostsList, setSearchedPostsList] = useState([]);
  useEffect(() => {
    if (!searchInput) {
      setSearchedPostsList(postsList);
    } else {
      const searchedPosts = postsList.filter((card) => card.title && card.title.includes(searchInput));
      setSearchedPostsList(searchedPosts);
    }
  }, [searchInput, postsList]);

  return (
    <div className={cx('wrapper')}>
      {searchedPostsList.length > 0 ? (
        <div className={cx('card-list-container')}>
          {searchedPostsList.map((data, index) => (
            <Link to={`/posts/${data._id}`} key={index}>
              {console.log(`data ${index}:`, data)}
              <Card data={data} />
            </Link>
          ))}
        </div>
      ) : (
        <div className={cx('none')}>검색결과가 없습니다.</div>
      )}
    </div>
  );
}
