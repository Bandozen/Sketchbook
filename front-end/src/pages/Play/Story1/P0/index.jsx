import React, { useState, useEffect } from 'react';

const P0 = () => {
  const [imageUrl, setImageUrl] = useState("/user/image.jpg"); // 이미지의 실제 URL을 넣으세요

  const fetchNewImage = () => {
    const timestamp = new Date().getTime();
    setImageUrl(`/user/image.jpg?timestamp=${timestamp}`);
  };

  useEffect(() => {
    fetchNewImage(); // 컴포넌트가 마운트될 때 이미지 가져오기
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
