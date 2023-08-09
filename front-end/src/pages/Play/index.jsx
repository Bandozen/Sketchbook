import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom'; // 필요한 모듈 import 추가
import Wrapper from './styles';

function Play() {
  const navigate = useNavigate(); // useNavigate 훅 사용

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        navigate('/books'); // "esc" 키 누르면 경로 변경
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [navigate]);

  return (
    <Wrapper>
      <Outlet />
    </Wrapper>
  );
}

export default Play;
