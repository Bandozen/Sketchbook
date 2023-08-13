import React, { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import Wrapper from "./styles";
import image1 from "../../../../play-background/엄마는 카멜레온_3.gif";
import audio3 from "../../../../play-background/ske_3.mp3";
import axios from "axios";

function P3() {
  // let navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      // navigate("/play/story1/p4");
    }, 19000);

    return () => clearTimeout(timer); // 컴포넌트가 언마운트되면 타이머 취소
  }, []); // 빈 의존성 배열을 사용하여 마운트 시에만 타이머 설정

  return (
    <Wrapper>
      <img className="back-ground" src={image1} alt="" />

      <audio autoPlay>
        <source src={audio3} type="audio/mp3" />
      </audio>
    </Wrapper>
  );
}

export default P3;
