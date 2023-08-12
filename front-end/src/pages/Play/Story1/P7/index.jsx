import Wrapper from "./styles";
import image1 from "../../../../play-background/엄마는 카멜레온_7.gif";
import audio7 from "../../../../play-background/ske_7.mp3";
import axios from "axios";
import { useState, useEffect } from "react";

function P7() {
  const mission = (e) => {
    axios
      .post("/api/devices/mission", {
        flag: "1", // mission이 없으면 0 있으면 1
      })
      .then((res) => {
        // console.log(res.data.mission);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const Character = () => {
    const [imageUrl, setImageUrl] = useState("/user/image.jpg");
  
    const fetchNewImage = () => {
      const timestamp = new Date().getTime();
      setImageUrl(`/assets/assemble.png?timestamp=${timestamp}`);
    };
  
    useEffect(() => {
      fetchNewImage(); // 컴포넌트가 마운트될 때 이미지 가져오기
      const interval = setInterval(fetchNewImage, 200); // 200ms마다 이미지 업데이트
      return () => clearInterval(interval); // 컴포넌트 언마운트 시 인터벌 클리어
    }, []);
  
    return (
        <img className="character" src={imageUrl} alt="Random Image"/>
    );
  };

  return (
    <Wrapper onLoad={mission}>
      <img src={image1} alt="" />
      <Character />

      <audio autoPlay>
        <source src={audio7} type="audio/mp3" />
      </audio>
    </Wrapper>
  );
}

export default P7;
