import Wrapper from "./styles";
import image1 from "../../../../play-background/엄마는 카멜레온_7.gif";
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

  const Charactercam = () => {
    const [characterUrl, setcharacterUrl] = useState();
    let email;
    axios
      .get("/api/devices/position")
      .then((res) => {
        email = res.data.email;
        // 카메라 화면 : "user/[user_email]/image.jpg"
        // 캐릭터 : user/[user_email]/assemble.png
      })
      .catch((err) => {
        return console.log(err);
      });

    const fetchNewImage = () => {
      const timestamp = new Date().getTime();
      setcharacterUrl(`/assets/assemble.png?timestamp=${timestamp}`); //local
    // setcharacterUrl(`/user/${email}/assemble.png?timestamp=${timestamp}`); // 배포
    };

    useEffect(() => {
      fetchNewImage(email); // 컴포넌트가 마운트될 때 이미지 가져오기
      const interval = setInterval(fetchNewImage, 200); // 200ms마다 이미지 업데이트
      return () => clearInterval(interval); // 컴포넌트 언마운트 시 인터벌 클리어
    }, []);

    return <img src={characterUrl}  />;
  };

  return (
    <Wrapper onLoad={mission}>
      <img className="back-ground" src={image1} alt="" />
      {/* 캐릭터 : user/[user_email]/assemble.png */}
      {/* <Livecam imageName = {"assemble.png"}/> */}
      <div className="character-cam">
        <Charactercam />
      </div>
      <audio autoPlay>
        <source src={audio7} type="audio/mp3" />
      </audio>
    </Wrapper>
  );
}

export default P7;