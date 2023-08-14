import Wrapper from "./styles";
import image1 from "../../../../play-background/엄마는 카멜레온_7.gif";
import png1 from "../../../../play-png/7_잔소리1_숙제해.png";
import png2 from "../../../../play-png/7_잔소리3_빨리빨리.png";
import png3 from "../../../../play-png/7_잔소리5_씻어라.png";

import audio7 from "../../../../play-background/ske_7.mp3";
import axios from "axios";
// import Livecam from "../../../../components/Livecam";
import { useEffect, useState } from "react";

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
  const [bottom, setBottom] = useState(0);
  const [left, setLeft] = useState(0);

  const Charactercam = () => {
    const [characterUrl, setcharacterUrl] = useState();
    let email;
    axios
      .get("/api/devices/position")
      .then((res) => {
        email = res.data.email;
        // 카메라 화면 : "user/[user_email]/image.jpg"
        // 캐릭터 : user/[user_email]/assemble.png
        const x_diff = parseFloat(res.data.x_diff);
        const y_diff = parseFloat(res.data.y_diff);

        setBottom((prevBottom) => prevBottom + y_diff);
        setLeft((prevLeft) => prevLeft + x_diff);
      })
      .catch((err) => {
        return console.log("에러입니다.", err);
      });

    const fetchNewImage = () => {
      const timestamp = new Date().getTime();
      setcharacterUrl(`/assets/assemble.png?timestamp=${timestamp}`); //local
      // setcharacterUrl(`/user/${email}/assemble.png?timestamp=${timestamp}`); // 배포
    };

    useEffect(() => {
      fetchNewImage(); // 컴포넌트가 마운트될 때 이미지 가져오기
      const interval = setInterval(fetchNewImage, 10000); // 200ms마다 이미지 업데이트
      return () => clearInterval(interval); // 컴포넌트 언마운트 시 인터벌 클리어
    });

    console.log(left);

    return <img src={characterUrl} alt="" />;
  };

  return (
    <Wrapper >
      <img className="back-ground" src={image1} alt="" onLoad={mission} />
      <div className="character-cam" style={{ left: `${left}px`, bottom: `${bottom}px`, position: "absolute", zIndex: 1 }} >
        <Charactercam />
      </div>

      <img className="balloon study" src={png1} alt="숙제해" />
      <img className="balloon hurry" src={png2} alt="빨리빨리" />
      <img className="balloon wash" src={png3} alt="씻어라" />

      <audio autoPlay>
        <source src={audio7} type="audio/mp3" />
      </audio>
    </Wrapper>
  );
}

export default P7;