import React, { useState, useEffect } from 'react';

const P0 = () => {
  const [imageUrl, setImageUrl] = useState("/user/image.jpg"); // 이미지의 실제 URL을 넣으세요

  const getRandomQuery = () => {
    return `?random=${Math.random()}`;
  };

  const fetchNewImage = () => {
    setImageUrl(prevImageUrl => prevImageUrl + getRandomQuery());
  };

  useEffect(() => {
    const interval = setInterval(fetchNewImage, 100); // 100ms마다 이미지 업데이트
    return () => clearInterval(interval); // 컴포넌트 언마운트 시 인터벌 클리어
  }, []);

  return (
    <div>
      <img src={imageUrl} alt="Random Image" />
    </div>
  );
};

export default P0;
