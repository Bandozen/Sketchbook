import image1 from "../../../../play-background/엄마는 카멜레온_6.gif";
import audio6 from "../../../../play-background/ske_6.mp3";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function P6() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/play/story3/p7");
    }, 17000);

    return () => {
      clearTimeout(timer);
    }
  }, [navigate])  

  return (
    <div>
      <img className="back-ground" src={image1} alt="" onLoad={mission} />

      <audio autoPlay>
        <source src={audio6} type="audio/mp3" />
      </audio>
    </div>
  );
}

export default P6;
