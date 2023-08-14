import Wrapper from "./styles";
import image from "../../../../play-background/엄마는 카멜레온_12.gif";
import audio12 from "../../../../play-background/ske_12.mp3";
import { useNavigate } from "react-router";
import axios from "axios";
import { useEffect } from "react";

function P12() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/play/story1/p13");
    }, 24000);

    return () => {clearTimeout(timer)}
  }, [navigate])
  
  return (
    <Wrapper>
      <img className="back-ground" src={image} alt="" />
      <audio autoPlay>
        <source src={audio12} type="audio/mp3" />
      </audio>
    </Wrapper>
  );
}

export default P12;
