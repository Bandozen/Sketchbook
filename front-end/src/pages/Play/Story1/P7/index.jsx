import Wrapper from "./styles";
import image1 from "../../../../play-background/엄마는 카멜레온_7.gif";
import png1 from "../../../../play-png/7_잔소리1_숙제해.png";
import png2 from "../../../../play-png/7_잔소리3_빨리빨리.png";
import png3 from "../../../../play-png/7_잔소리5_씻어라.png";

import boom1 from "../../../../play-background/success_clear.mp3";
import boom2 from "../../../../play-background/success_yeah.mp3";

import audio7 from "../../../../play-background/ske_7.mp3";
import axios from "axios";
import { useEffect, useLayoutEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import checkOverlap from "../../../../utils/checkOverlap";

let email;

const Charactercam = (props) => {
  const [characterUrl, setcharacterUrl] = useState();
  const { setCharcord } = props;

  useLayoutEffect(() => {
    // 위치 정보 업데이트 함수
    const updatePosition = () => {
      axios
        .get("/api/devices/position")
        .then((res) => {
          email = res.data.email;
          const x_diff = parseFloat(res.data.x_diff);
          const y_diff = parseFloat(res.data.y_diff);
          const left_x = parseFloat(res.data.left_x);
          const left_y = parseFloat(res.data.left_y);
          const right_x = parseFloat(res.data.right_x);
          const right_y = parseFloat(res.data.right_y);

          setCharcord((prevCharcord) => {
            let newLeft;
            if (prevCharcord.left < 0) {
              newLeft = 0;
            } else if (prevCharcord.left > 895) {
              newLeft = 895;
            } else {
              newLeft = prevCharcord.left + x_diff + x_diff + x_diff;
            }
            const newBottom = prevCharcord.bottom + y_diff + y_diff;

            return {
              bottom: newBottom,
              left: newLeft,
              LhTop: 384 + left_y - newBottom,
              LhLeft: left_x + newLeft,
              RhTop: 384 + right_y - newBottom,
              RhLeft: right_x + newLeft,
            };
          });
        })
        .catch((err) => {
          return console.error(err);
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
  const [charcord, setCharcord] = useState({
    bottom: 0,
    left: 0,
    LhLeft: 0,
    LhTop: 384,
    RhLeft: 0,
    RhTop: 384,
  });
  const [audioFinished, setAudioFinished] = useState(false);

  useEffect(() => {
    axios
      .get("/api/devices/cleardiff")
      .then()
      .catch((err) => {
        return console.error(err);
      });
  }, []);

  const audioElement = new Audio(boom1);
  const audio2Element = new Audio(boom2);

  useEffect(() => {
    if (audioFinished) {
      if (
        stage === 0 &&
        checkOverlap(
          "study",
          charcord.LhLeft,
          charcord.LhTop,
          charcord.RhLeft,
          charcord.RhTop
        )
      ) {
        setStage(1);
        audioElement.play();
      } else if (
        stage === 1 &&
        checkOverlap(
          "hurry",
          charcord.LhLeft,
          charcord.LhTop,
          charcord.RhLeft,
          charcord.RhTop
        )
      ) {
        setStage(2);
        audioElement.play();
      } else if (
        stage === 2 &&
        checkOverlap(
          "wash",
          charcord.LhLeft,
          charcord.LhTop,
          charcord.RhLeft,
          charcord.RhTop
        )
      ) {
        setStage(3);
      }
    }
  }, [
    charcord.bottom,
    charcord.left,
    stage,
    charcord.LhLeft,
    charcord.LhTop,
    charcord.RhLeft,
    charcord.RhTop,
  ]);

  if (stage === 3) {
    audio2Element.play();
    audio2Element.onended = () => {
      navigate("/play/story1/p8");
    };
  }

  return (
    <Wrapper>
      <img className="back-ground" src={image1} alt="" />
      <div
        id="character"
        className="character-cam"
        style={{
          left: `${charcord.left}px`,
          bottom: `${charcord.bottom}px`,
          position: "absolute",
          zIndex: 1,
        }}
      >
        <Charactercam setCharcord={setCharcord} />
      </div>

      {stage === 0 && (
        <img id="study" className="study" src={png1} alt="숙제해" />
      )}
      {stage === 1 && (
        <img id="hurry" className="hurry" src={png2} alt="잔소리2" />
      )}
      {stage === 2 && (
        <img id="wash" className="wash" src={png3} alt="잔소리3" />
      )}

      <audio
        autoPlay
        onEnded={() => {
          setAudioFinished(true);
        }}
      >
        <source src={audio7} type="audio/mp3" />
      </audio>
    </Wrapper>
  );
}

export default P7;
