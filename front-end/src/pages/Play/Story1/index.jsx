import { Outlet } from 'react-router';
import { useEffect } from 'react';

function Story1() {
  useEffect(() => {
    const handleKeyDown = (event) => {
      // 페이지 이동 로직 구현
      const currentPath = window.location.pathname;
      const pageNumber = Number(currentPath.split('/').pop().slice(1));
      let nextPageNumber;

      if (event.key === 'ArrowLeft') {
        nextPageNumber = Math.max(1, pageNumber - 1);
      } else if (event.key === 'ArrowRight') {
        nextPageNumber = Math.min(17, pageNumber + 1);
      } else {
        return;
      }

      // 이동할 페이지 경로 생성
      const nextPagePath = `/Play/story1/p${nextPageNumber}`;

      // 페이지 이동
      window.location.href = nextPagePath;
    };

    // 이벤트 리스너 추가
    window.addEventListener('keydown', handleKeyDown);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div>
      <Outlet />
    </div>
  );
}

export default Story1;
