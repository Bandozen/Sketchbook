import React, { useState, useEffect } from "react";
import Wrapper from "./styles";

function LiveCam() {
  const [url, setUrl] = useState("");
  
  useEffect(() => {
    const intervalId = setInterval(async () => {
      try {
        const response = await fetch("/api/devices/getImage"); // 서버에서 이미지를 가져오는 API 호출
        if (response.ok) {
          const newImageUrl = await response.text();
          setUrl(newImageUrl); // 상태 업데이트
        }
      } catch (error) {
        console.error("Error fetching image:", error);
      }
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

