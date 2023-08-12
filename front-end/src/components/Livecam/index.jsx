import { useState, useEffect } from 'react';
import getUserEmail from "../../utils/getUserEmail";

const Livecam = (props) => {
  const userEmail = getUserEmail();

  // 카메라 화면 : "user/[user_email]/image.jpg"
  // 캐릭터 : user/[user_email]/assemble.png
  const [imageUrl, setImageUrl] = useState(`/user/${userEmail}/${props.imageName}`);

  const fetchNewImage = () => {
    const timestamp = new Date().getTime();
    setImageUrl(`/assets/arrow.png?timestamp=${timestamp}`);
    // 이미지 url 상위 컴포넌트로 전송하기
    props.getImageUrl(imageUrl);
  };

  useEffect(() => {
    fetchNewImage(); // 컴포넌트가 마운트될 때 이미지 가져오기
    const interval = setInterval(fetchNewImage, 200); // 200ms마다 이미지 업데이트
    return () => clearInterval(interval); // 컴포넌트 언마운트 시 인터벌 클리어
  }, []);

  return (
    <img src={imageUrl} alt="RandomImage" />
  );
};

export default Livecam;