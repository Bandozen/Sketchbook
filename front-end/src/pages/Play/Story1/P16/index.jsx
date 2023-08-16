import Wrapper from "./styles";
import image from "../../../../play-background/엄마는 카멜레온_16.png";
import newImage from "../../../../play-background/엄마는 카멜레온_16_엄마손.png";

import audio16 from "../../../../play-background/ske_16.mp3";
import boom from "../../../../play-background/success_clear.mp3";

import axios from "axios";
import { useEffect, useLayoutEffect, useState } from "react";
import { useNavigate } from "react-router";

import checkOverlap from "../../../../utils/checkOverlap";

let email;

const Charactercam = (props) => {
  const [characterUrl, setcharacterUrl] = useState();
  // const { setBottom, setLeft, setLhTop, setLhLeft, setRhTop, setRhLeft } = props;
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

          // setBottom((prevBottom) => prevBottom + y_diff + y_diff);
          // setLeft((prevLeft) => prevLeft + x_diff + x_diff + x_diff);
          // setLhTop(left_y);
          // setLhLeft(left_x);
          // setRhTop(right_y);
          // setRhLeft(right_x);
          setCharcord((prevCharcord) => {
            const newBottom = prevCharcord.bottom + y_diff + y_diff;
            const newLeft = prevCharcord.left + x_diff + x_diff + x_diff;

            return ({
              bottom : newBottom,
              left: newLeft,
              LhTop: 384 + left_y - newBottom,
              LhLeft: left_x + newLeft,
              RhTop: 384 + right_y - newBottom,
              RhLeft: right_x + newLeft
            })
          })
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

  return <img id="character" src={characterUrl} alt="" />;
};

function P16() {
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);
  // const [bottom, setBottom] = useState(0);
  // const [left, setLeft] = useState(0);
  // const [LhTop, setLhTop] = useState(0);
  // const [LhLeft, setLhLeft] = useState(0);
  // const [RhTop, setRhTop] = useState(0);
  // const [RhLeft, setRhLeft] = useState(0);
  const [charcord, setCharcord] = useState({
    bottom: 0,
    left: 0,
    LhLeft: 0,
    LhTop: 384,
    RhLeft: 0,
    RhTop: 384,
  })
  const [audioFinished, setAudioFinished] = useState(false);
  const audioElement = new Audio(boom);

  const [currentImage, setCurrentImage] = useState(image);

  useEffect(() => {
    axios
      .get("/api/devices/cleardiff")
      .then()
      .catch((err) => {
        return console.log("에러입니다.", err);
      });
    }, [])

  useEffect(() => {
    if (audioFinished) {
      if (success === false && checkOverlap("hand", charcord.LhLeft, charcord.LhTop, charcord.RhLeft, charcord.RhTop)) {
        setSuccess(true);
        setCurrentImage(newImage);
      }
    }
  }, [charcord.bottom, charcord.left, charcord.LhLeft, charcord.LhTop, charcord.RhLeft, charcord.RhTop])

  if (success) {
    audioElement.play();
    audioElement.onended = () => {
      navigate("/play/story1/p17");
    };
  }

  return (
    <Wrapper>
      {/* 테스트용 버튼 */}
      {/* <div style={{ position: "absolute", zIndex: "9999", display: "flex" }}>
        <button
          type="button"
          onClick={() => {
            setBottom(200);
            setLeft(712);
          }}
        >
          test
        </button>
      </div> */}
      <div id="hand">
      </div>
      <div
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

      <img className="back-ground" src={currentImage} alt="" />
      <audio autoPlay onEnded={() => {setAudioFinished(true)}}>
        <source src={audio16} type="audio/mp3" />
      </audio>
      {/* <button onClick={handleImageChange}>이미지 변경</button> */}
    </Wrapper>
  );
}

export default P16;
