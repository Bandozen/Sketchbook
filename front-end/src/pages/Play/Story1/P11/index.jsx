import Wrapper from "./styles";
import image from "../../../../play-background/엄마는 카멜레온_11.gif";
import audio11 from "../../../../play-background/ske_11.mp3";
import { useNavigate } from "react-router";
import { useEffect } from "react";

function P11() {
  const navigate = useNavigate();  

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/play/story1/p12");
    }, 6000);    

    return () => {
      clearTimeout(timer);
    }
  }, [navigate])
  
  return (
    <Wrapper>
      <img className="back-ground" src={image} alt="" />
      <audio autoPlay>
        <source src={audio11} type="audio/mp3" />
      </audio>
    </Wrapper>
  );
}

export default P11;
