import Wrapper from "./styles";
import image from "../../../../play-background/엄마는 카멜레온_13.gif";
import audio13 from "../../../../play-background/ske_13.mp3";
import { useNavigate } from "react-router";
import axios from "axios";
import { useEffect } from "react";

function P13() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/play/story1/p14");
    }, 8000);

    return () => {clearTimeout(timer)};
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
      <img className="back-ground" src={image} alt="" />
      <audio autoPlay>
        <source src={audio13} type="audio/mp3" />
      </audio>
    </Wrapper>
  );
}

export default P13;
