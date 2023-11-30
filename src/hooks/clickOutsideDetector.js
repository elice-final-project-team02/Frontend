// 대화방 바깥쪽 클릭 감지
import { useEffect, useRef } from 'react';

export function useClickOutsideDetector(callback) {
  const outsideRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (outsideRef.current && !outsideRef.current.contains(e.target)) {
        callback();
      }
    };

    document.addEventListener('click', handleClickOutside);

    // 컴포넌트 언마운트 => 제거
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [callback]);

  return outsideRef;
}
