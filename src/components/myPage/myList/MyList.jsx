import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './MyList.module.scss';
import { FaHeart } from 'react-icons/fa';
import { CiCircleCheck } from 'react-icons/ci';
import cs from 'classnames/bind';
const cx = cs.bind(styles);

export default function MyList(props) {
  const [filteredPostList, setFilteredPostList] = useState([]);

  useEffect(() => {
    const filteredList = props.postList.filter((post) => post.title.includes(props.searchText));
    setFilteredPostList(filteredList);
  }, [props.searchText, props.postList]);

  const handleDeletePost = (id) => {
    // id로 del 요청 > 데이터 get 요청
    if (window.confirm('해당 게시글을 삭제하시겠습니까?')) {
    }
  };

  const handleChangeCheckbox = (id) => {
    if (props.setCheckedId) {
      const isChecked = props.checkedId.includes(id);
      let newCheckedId = [];

      if (isChecked) {
        newCheckedId = props.checkedId.filter((checked) => checked !== id);
      } else {
        newCheckedId = [...props.checkedId, id];
      }
      props.setCheckedId(newCheckedId);
    }
  };

  return (
    <div className={cx('wrapper')}>
      {filteredPostList.length > 0 ? (
        filteredPostList.map((post, idx) => (
          <div key={`${post._id}-${idx}`} className={cx('post')}>
            {props.edit && (
              <input
                type="checkbox"
                checked={props.checkedId && props.checkedId.includes(post._id)}
                onChange={() => handleChangeCheckbox(post._id)}
              />
            )}
            <Link to={`/posts/${post._id}`}>
              <span>{post.title}</span>
            </Link>
            {props.matching ? (
              <CiCircleCheck className={cx('whole')} />
            ) : props.role === '일반' ? (
              <button className={cx('deleteBtn')} onClick={() => handleDeletePost(post._id)}>
                삭제
              </button>
            ) : (
              <FaHeart className={cx('heart')} />
            )}
          </div>
        ))
      ) : (
        <div className={cx('nothing')}>검색결과가 없습니다.</div>
      )}
    </div>
  );
}
