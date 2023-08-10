import Wrapper from "./styles";
import image17 from "../../../../play-background/엄마는 카멜레온_17.gif";
import audio17 from "../../../../play-background/ske_17.mp3";
import axios from "axios";

// mp3 18초?
// 미션 끝나면 동화 종료 직전에 모달창 뜨게하기 !

function P17() {
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
      <img src={image17} alt="" />
      <audio autoPlay>
        <source src={audio17} type="audio/mp3" />
      </audio>
    </Wrapper>
  );
}

export default P17;
