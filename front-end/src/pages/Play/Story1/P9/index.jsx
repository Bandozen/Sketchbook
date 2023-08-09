import Wrapper from "./styles";
import image1 from "../../../../play-background/엄마는 카멜레온_9.gif";
import audio9 from "../../../../play-background/ske_9.mp3";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function P9() {
  const navigate = useNavigate();
  setTimeout(() => {
    navigate("/play/story1/p10");
  }, 11000);

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
      <img src={image1} alt="" />
      <audio autoPlay>
        <source src={audio9} type="audio/mp3" />
      </audio>
    </Wrapper>
  );
}

export default P9;
