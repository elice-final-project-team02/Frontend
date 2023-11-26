import React from 'react';
import styles from './EditPost.module.scss';
import cs from 'classnames/bind';
import { useParams } from 'react-router-dom';
import { WritePost } from 'pages';
import { useGetRequest } from 'hooks';
const cx = cs.bind(styles);

export default function EditPost() {
  let { id } = useParams();
  const { data: requestData, isLoading: isRequestLoading } = useGetRequest(id);
  return (
    <div className={cx('wrapper')}>
      <WritePost params={id} beforeData={requestData} />
    </div>
  );
}
