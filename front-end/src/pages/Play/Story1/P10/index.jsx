import image1 from "../../../../play-background/엄마는 카멜레온_10.gif";
import audio10 from "../../../../play-background/ske_10.mp3";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

function P10() {
  const navigate = useNavigate();
  
  useEffect(() => {
    const timer = setTimeout(() => {
    navigate("/play/story1/p11");
  }, 6000);

  const axiosTimer = setTimeout(() => {
    axios
    .post("/api/devices/mission", {
      flag: "1", // mission이 없으면 0 있으면 1
    })
    .then((res) => {
    })
    .catch((err) => {
      console.log(err);
    });
  }, 3000)

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
