import Wrapper from "./styles";
import image from "../../../../play-background/엄마는 카멜레온_11.gif";
import audio11 from "../../../../play-background/ske_11.mp3";
import { useNavigate } from "react-router";
import axios from "axios";
import { useEffect } from "react";

function P11() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/play/story1/p12");
    }, 6000);

    return () => {clearTimeout(timer)}
  }, [])
  
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
      <img src={image} alt="" />
      <audio autoPlay>
        <source src={audio11} type="audio/mp3" />
      </audio>
    </Wrapper>
  );
}

export default P11;
