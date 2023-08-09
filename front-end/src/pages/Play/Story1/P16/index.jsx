import { useState } from "react";
import Wrapper from "./styles";
import image from "../../../../play-background/엄마는 카멜레온_16.png";
import newImage from "../../../../play-background/엄마는 카멜레온_16_엄마손.png";
import audio16 from "../../../../play-background/ske_16.mp3";
import axios from "axios";

function P16() {
  const [currentImage, setCurrentImage] = useState(image);

  const handleImageChange = () => {
    // 이미지 변경 로직
    setCurrentImage(newImage);
  };

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

  return (
    <Wrapper onLoad={mission}>
      <img src={currentImage} alt="" />
      <audio autoPlay>
        <source src={audio16} type="audio/mp3" />
      </audio>
      <button onClick={handleImageChange}>이미지 변경</button>
    </Wrapper>
  );
}

export default P16;
