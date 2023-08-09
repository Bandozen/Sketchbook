import Wrapper from "./styles";
import image1 from '../../../../play-background/엄마는 카멜레온_8.gif';
import audio8 from '../../../../play-background/ske_8.mp3';
import axios from "axios";

// mp3 2초+1초 (더이상 나도 못 참겠어요!)
function P8() {
    const mission = (e) => {
      
        axios
          .post("/api/devices/mission", {
            flag: "1" // mission이 없으면 0 있으면 1
          })
          .then((res) => {
            console.log(res.data.mission)
          })
          .catch((err) => {
            console.log(err)
          })
        }

    return (
        <Wrapper onLoad={mission}>
            <img src={image1} alt="" />
            <audio autoPlay>
                <source src={audio8} type="audio/mp3" />
            </audio>            
            
        </Wrapper>
    )
}

export default P8;
