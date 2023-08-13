import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Wrapper from "./styles";
import image2 from "../../../../play-background/엄마는 카멜레온_2.gif";
import audio2 from "../../../../play-background/ske_2.mp3";
import axios from "axios";

function P2() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/play/story2/p3");
    }, 16000);

    return () => clearTimeout(timer); // 컴포넌트가 언마운트되면 타이머 취소
  }, [navigate]); // 빈 의존성 배열을 사용하여 마운트 시에만 타이머 설정

  return (
    <Wrapper>
      <img className="back-ground" src={image2} alt="" />

      <audio autoPlay>
        <source src={audio2} type="audio/mp3" />
      </audio>
    </Wrapper>
  );
}

export default P2;
