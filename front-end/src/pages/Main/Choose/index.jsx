import React from "react";
import { useNavigate } from "react-router-dom";
import Wrapper from "./styles";

export default function Choose() {
  const navigate = useNavigate();

  const GoConnect = () => {
    navigate("/connect");
  };

  const GoBooks = () => {
    navigate("/books");
  };

  return (
    <Wrapper>
      <div className="Choose">
        <br></br>
        <h4 style={{ color: "#A451F7", fontWeight: "bold" }}>
          안녕하세요! 스케치북입니다.
        </h4>
        <br></br>
        <p style={{ fontWeight: "bold", color: "black", fontSize: "20px" }}>
          동화 속 주인공이 되고 싶다면?
        </p>
        <button type="submit" className="connect" onClick={GoConnect}>
          기기 연결하기
        </button>
        <br></br>
        <p style={{ fontWeight: "bold", color: "black", fontSize: "20px" }}>
          기기 연결은 나중에 할래요.
        </p>
        <button type="submit" className="connect" onClick={GoBooks}>
          나중에 하기
        </button>
      </div>
    </Wrapper>
  );
}
