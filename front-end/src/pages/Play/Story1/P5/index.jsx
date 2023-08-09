import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Wrapper from "./styles";
import image1 from "../../../../play-background/엄마는 카멜레온_5.gif";
import audio5 from "../../../../play-background/ske_5.mp3";
import axios from "axios";

function P5() {
  let navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/Play/story1/P6");
    }, 24000);

    return () => clearTimeout(timer); // 컴포넌트가 언마운트되면 타이머 취소
  }, []); // 빈 의존성 배열을 사용하여 마운트 시에만 타이머 설정

  const mission = (e) => {
    axios
      .post("/api/devices/mission", {
        flag: "0", // mission이 없으면 0 있으면 1
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
      <img src={image1} alt="" />

      <audio autoPlay>
        <source src={audio5} type="audio/mp3" />
      </audio>
    </Wrapper>
  );
}

export default P5;
