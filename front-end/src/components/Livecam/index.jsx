import Wrapper from './styles';
import { useState, useEffect } from 'react';

const Livecam = () => {
  const [imageUrl, setImageUrl] = useState("/user/image.jpg");

  const fetchNewImage = () => {
    const timestamp = new Date().getTime();
    setImageUrl(`/assets/arrow.png?timestamp=${timestamp}`);
  };

  useEffect(() => {
    fetchNewImage(); // 컴포넌트가 마운트될 때 이미지 가져오기
    const interval = setInterval(fetchNewImage, 200); // 200ms마다 이미지 업데이트
    return () => clearInterval(interval); // 컴포넌트 언마운트 시 인터벌 클리어
  }, []);

  return (
    <Wrapper>
      <img src={imageUrl} alt="Random Image" />
      {/* <img src={imageUrl} alt="Random Image" style={{ width:'640px', height:'480px'}} /> */}
    </Wrapper>
  );
};

export default Livecam;