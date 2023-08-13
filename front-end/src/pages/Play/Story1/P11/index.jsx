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
  }, [navigate])
  
  const mission = (e) => {
    axios
      .post("/api/devices/mission", {
        flag: "1", // 해당페이지는 미션은 없으나 카메라 구동준비를 위해 flag 1로 지정
      })
      .then((res) => {
        // console.log(res.data.mission);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Wrapper>
      <img className="back-ground" src={image} alt="" onLoad={mission} />
      <audio autoPlay>
        <source src={audio11} type="audio/mp3" />
      </audio>
    </Wrapper>
  );
}

export default P11;
