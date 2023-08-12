import React, { useEffect } from "react";
import Wrapper from "./styles";

function LiveCam() {
  let url = ""
  useEffect(() => {
    const intervalId = setInterval(() => {
      // 주기적으로 실행될 작업
      
      url = "/assets/arrow.png"
      console.log(url);
      {/* <img src="/assets/arrow.png" alt="" /> */}

    }, 100); // 3초마다 작업 실행

  });
  return (
    <Wrapper>
    <div className="container">
      <img src={url} alt="Character" className="character" />
    </div>      
    </Wrapper>
  );
}

function P0() {
  return (
      <LiveCam />
  );
}

export default P0;
