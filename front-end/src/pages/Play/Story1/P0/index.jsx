import React, { useState, useEffect } from 'react';

const ImageComponent = () => {
  const [imageUrl, setImageUrl] = useState("/user/image.jpg"); // 이미지의 실제 URL을 넣으세요

  const fetchNewImage = () => {
    const timestamp = new Date().getTime();
    setImageUrl(`/user/image.jpg?timestamp=${timestamp}`);
  };

  const animateFetch = () => {
    fetchNewImage();
    requestAnimationFrame(animateFetch); // 다음 리플로우 주기에서 호출
  };

  useEffect(() => {
    fetchNewImage(); // 컴포넌트가 마운트될 때 이미지 가져오기
    animateFetch(); // 이미지 업데이트 애니메이션 시작
    return () => {
      cancelAnimationFrame(animateFetch); // 컴포넌트 언마운트 시 애니메이션 중단
    };
  }, []);

  return (
    <div>
      <img src={imageUrl} alt="Random Image" />
    </div>
  );
};

export default ImageComponent;
