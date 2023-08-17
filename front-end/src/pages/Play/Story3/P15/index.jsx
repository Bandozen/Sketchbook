import Wrapper from "./styles";
import image15 from "../../../../play-background/엄마는 카멜레온_15.gif";
import audio15 from "../../../../play-background/ske_15.mp3";
import { useNavigate } from "react-router";
import { useEffect } from "react";

function P15() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
    navigate("/play/story3/p16");
  }, 12000);

  return () => {
    clearTimeout(timer);
  }
}, [navigate])
  
  return (
    <Wrapper>
      <img className="back-ground" src={image15} alt="" onLoad={mission} />
      <audio autoPlay>
        <source src={audio15} type="audio/mp3" />
      </audio>
    </Wrapper>
  );
}

export default P15;
