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
        <h4 style={{ color: "#9D4FE0", fontWeight: "bold" }}>
          안녕하세요! 🤭
        </h4>
        <br></br>
        <p style={{ fontWeight: "bold", color: "black", fontSize: "20px" }}>
          어떤 동화의 주인공이 되고 싶나요?
        </p>
        <button type="submit" className="connect" onClick={GoBooks}>
          책장 둘러보기
        </button>
        <br></br>
        <p style={{ fontWeight: "bold", color: "black", fontSize: "20px" }}>
          동화 속 여행 떠날 준비를 해봐요.
        </p>
        <button type="submit" className="connect" onClick={GoConnect}>
          기기 연결하기
        </button>
      </div>
    </Wrapper>
  );
}
