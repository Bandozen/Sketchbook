import Wrapper from "./styles";
import image1 from "../../../../play-background/엄마는 카멜레온_7.gif";
import png1 from "../../../../play-png/7_잔소리1_숙제해.png";
import png2 from "../../../../play-png/7_잔소리3_빨리빨리.png";
import png3 from "../../../../play-png/7_잔소리5_씻어라.png";

import audio7 from "../../../../play-background/ske_7.mp3";
import axios from "axios";
// import Livecam from "../../../../components/Livecam";
import { useEffect, useLayoutEffect, useState } from "react";
import { useNavigate } from "react-router";
let email;

const Charactercam = (props) => {
  const [characterUrl, setcharacterUrl] = useState();
  const { setBottom, setLeft } = props;

  useEffect(() => {
    // 위치 정보 업데이트 함수
    const updatePosition = () => {
      axios
        .get("/api/devices/position")
        .then((res) => {
          email = res.data.email;
          const x_diff = parseFloat(res.data.x_diff);
          const y_diff = parseFloat(res.data.y_diff);

          setBottom((prevBottom) => prevBottom + y_diff + y_diff);
          setLeft((prevLeft) => prevLeft + x_diff + x_diff + x_diff);
        })
        .catch((err) => {
          return console.log("에러입니다.", err);
        });
    };

    // 컴포넌트 마운트 시 처음 한 번 호출
    updatePosition();

    // 10초마다 API 호출
    const interval = setInterval(updatePosition, 200);

    // 컴포넌트 언마운트 시 인터벌 정리
    return () => clearInterval(interval);
  }, []);

  const fetchNewImage = () => {
    const timestamp = new Date().getTime();
    // setcharacterUrl(`/assets/assemble.png?timestamp=${timestamp}`); //local
    setcharacterUrl(`/user/${email}/assemble.png?timestamp=${timestamp}`); // 배포
  };

  useLayoutEffect(() => {
    fetchNewImage(); // 컴포넌트가 마운트될 때 이미지 가져오기
    const interval = setInterval(fetchNewImage, 200); // 200ms마다 이미지 업데이트
    return () => clearInterval(interval); // 컴포넌트 언마운트 시 인터벌 클리어
  });

  return <img src={characterUrl} alt="" />;
};

function P7() {
  const navigate = useNavigate();
  const [stage, setStage] = useState(0);
  const [showStage, setShowStage] = useState({ 0: true, 1: true, 2: true });
  const [bottom, setBottom] = useState(0);
  const [left, setLeft] = useState(0);

  useEffect(() => {
    axios
      .get("/api/devices/cleardiff")
      .then()
      .catch((err) => {
        return console.log("에러입니다.", err);
      });
  }, []);

  useEffect(() => {
    const studyElement = document.getElementById("study");
    const hurryElement = document.getElementById("hurry");
    const washElement = document.getElementById("wash");
    const character = document.getElementById("character");

    if (!studyElement || !character || !hurryElement || !washElement) return; // 만약 studyElement 또는 character가 없으면 실행 중단

    const rect = [
      studyElement.getBoundingClientRect(),
      hurryElement.getBoundingClientRect(),
      washElement.getBoundingClientRect(),
    ];
    
    const characterRect = character.getBoundingClientRect();

    const touch = (target) => {
      let overlap = !(
        target.right < characterRect.left ||
        target.left > characterRect.right ||
        target.bottom < characterRect.top ||
        target.top > characterRect.bottom
      );

      if (overlap) {
        setShowStage((prev) => {
          return {
            ...prev,
            stage: false,
          }
        });

        if (target[stage] === false) {
          setStage(stage => stage + 1);
          if (stage === 3){
            navigate("/play/story1/p8");
          }
        }
      }
    };

    touch(rect[stage]);
  }, [bottom, left]);

  return (
    <Wrapper>
      <img className="back-ground" src={image1} alt="" />
      <div
        id="character"
        className="character-cam"
        style={{
          left: `${left}px`,
          bottom: `${bottom}px`,
          position: "absolute",
          zIndex: 1,
        }}
      >
        <Charactercam setBottom={setBottom} setLeft={setLeft} />
      </div>

      {showStage[0] && (
        <img id="study" className="balloon study" src={png1} alt="숙제해" />
      )}

      {showStage[1] && <img className="balloon hurry" src={png2} alt="잔소리2" />}
      {showStage[2] && <img className="balloon wash" src={png3} alt="잔소리3" />}

      <audio autoPlay>
        <source src={audio7} type="audio/mp3" />
      </audio>
    </Wrapper>
  );
}

export default P7;
