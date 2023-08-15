import Wrapper from "./styles";
import image1 from "../../../../play-background/엄마는 카멜레온_7.gif";
import png1 from "../../../../play-png/7_잔소리1_숙제해.png";
import png2 from "../../../../play-png/7_잔소리3_빨리빨리.png";
import png3 from "../../../../play-png/7_잔소리5_씻어라.png";

import audio7 from "../../../../play-background/ske_7.mp3";
import axios from "axios";
// import Livecam from "../../../../components/Livecam";
import { useEffect, useLayoutEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import checkOverlap from "../../../../utils/checkOverlap";

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
    const interval = setInterval(updatePosition, 100);

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
    const interval = setInterval(fetchNewImage, 100); // 200ms마다 이미지 업데이트
    return () => clearInterval(interval); // 컴포넌트 언마운트 시 인터벌 클리어
  });

  return <img src={characterUrl} alt="" />;
};

function P7() {
  const navigate = useNavigate();
  const [stage, setStage] = useState(0);
  const [bottom, setBottom] = useState(0);
  const [left, setLeft] = useState(0);

  useEffect(() => {
    if (stage === 0 && checkOverlap("hurry")) {
      setStage(1);
    } else if (stage === 1 && checkOverlap("study")) {
      setStage(2);
    } else if (stage === 2 && checkOverlap("wash")) {
      setStage(3);
    }

  }, [bottom, left, stage]);

  if (stage === 3) {
    navigate("/play/story1/p8");
  }

  return (
    <Wrapper>
      {/* 로컬 작동 확인용 */}
      <div style={{ position: "absolute", zIndex: "9999", display: "flex" }}>
        <button
          type="button"
          onClick={() => {
            setBottom(200);
            setLeft(712);
          }}
        >
          test
        </button>
        <button

          type="button"
          onClick={() => {
            setBottom(0);
            setLeft(712);
          }}
        >
          test2
        </button>
        <button

          type="button"
          onClick={() => {
            setBottom(0);
            setLeft(0);
          }}
        >
          test3
        </button>
      </div>
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

      {stage === 0 && (
        <img id="hurry" className="balloon hurry" src={png2} alt="잔소리2" />
      )}
      {stage === 1 && (
        <img id="study" className="balloon study" src={png1} alt="숙제해" />
      )}
      {stage === 2 && (
        <img id="wash" className="balloon wash" src={png3} alt="잔소리3" />
      )}

      <audio autoPlay>
        <source src={audio7} type="audio/mp3" />
      </audio>
    </Wrapper>
  );
}

export default P7;