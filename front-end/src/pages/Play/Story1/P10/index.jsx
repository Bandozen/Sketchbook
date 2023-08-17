import image1 from "../../../../play-background/엄마는 카멜레온_10.gif";
import audio10 from "../../../../play-background/ske_10.mp3";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function P10() {
  const navigate = useNavigate();
  
  useEffect(() => {
    const timer = setTimeout(() => {
    navigate("/play/story1/p11");
  }, 6000);

  return () => {clearTimeout(timer)}
  }, [navigate])
  
  return (
    <div>
      <img className="back-ground" src={image1} alt="" />
      <audio autoPlay>
        <source src={audio10} type="audio/mp3" />
      </audio>
    </div>
  );
}

export default P10;
