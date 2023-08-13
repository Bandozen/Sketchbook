import Wrapper from "./styles";
import image15 from "../../../../play-background/엄마는 카멜레온_15.gif";
import audio15 from "../../../../play-background/ske_15.mp3";
import { useNavigate } from "react-router";
import axios from "axios";
import { useEffect } from "react";

function P15() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
    navigate("/play/story1/p16");
  }, 12000);

  return () => {clearTimeout(timer);}
}, [navigate])
  

  const mission = (e) => {
    axios
      .post("/api/devices/mission", {
        flag: "0", // mission이 없으면 0 있으면 1
      })
      .then((res) => {
        // console.log(res.data.mission);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Wrapper onLoad={mission}>
      <img className="back-ground" src={image15} alt="" />
      <audio autoPlay>
        <source src={audio15} type="audio/mp3" />
      </audio>
    </Wrapper>
  );
}

export default P15;
