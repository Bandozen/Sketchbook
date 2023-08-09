import Wrapper from "./styles";
import image1 from "../../../../play-background/엄마는 카멜레온_7.gif";
import audio7 from "../../../../play-background/ske_7.mp3";
import axios from "axios";

function P7() {
  const mission = (e) => {
    axios
      .post("/api/devices/mission", {
        flag: "1", // mission이 없으면 0 있으면 1
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
        <source src={audio7} type="audio/mp3" />
      </audio>
    </Wrapper>
  );
}

export default P7;
