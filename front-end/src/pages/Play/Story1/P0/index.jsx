import React, { useState, useEffect } from "react";
import Wrapper from "./styles";

function LiveCam() {
  const [url, setUrl] = useState("");
  
  useEffect(() => {
    const intervalId = setInterval(() => {
      // 주기적으로 실행될 작업      
      // const newUrl = "/assets/arrow.png"; // 새로운 url
      const newUrl = "/user/image.jpg?${Date.now()}"; // 새로운 url
      setUrl(newUrl); // 상태 업데이트
      {/* <img src="/assets/arrow.png" alt="" /> */}

    }, 100); // 3초마다 작업 실행

    return () => {
      clearInterval(intervalId);
    };

  });

  return (
    <img src={url} alt="" />
  );
}

function P0() {
  return (
    <Wrapper>
      <LiveCam />
    </ Wrapper>
  );
}

export default P0;
