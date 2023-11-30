// 신청하기 모달 창 영역 hooks
import axios from 'axios';
import { useMutation } from 'react-query';
import { errorHandler } from 'lib';


// 신청하기(send) 함수
export const postApplicate = async ({postId, content}) => {

  const res = await axios.post(`/api/chat/applicate`, { postId: postId, content: content  });
  return res.data;

}

export function usePostApplicate() {
  return useMutation(postApplicate, {
    onSuccess: (response) => {
      alert(response.message)
      console.log(response)
    },
    onError: (error) => {
      errorHandler(error);
    },
    retry: 0,
  });
}
