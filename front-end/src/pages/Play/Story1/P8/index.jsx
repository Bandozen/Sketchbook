import Wrapper from "./styles";
import image1 from "../../../../play-background/엄마는 카멜레온_8.gif";
import audio8 from "../../../../play-background/ske_8.mp3";
import axios from "axios";

// mp3 2초+1초 (더이상 나도 못 참겠어요!)
function P8() {
  return (
    <Wrapper>
      <img className="back-ground" src={image1} alt="" />
      <audio autoPlay>
        <source src={audio8} type="audio/mp3" />
      </audio>
    </Wrapper>
  );
}

export default P8;
