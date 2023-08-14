import Wrapper from "./styles";
import image1 from "../../../../play-background/엄마는 카멜레온_7.gif";
import png1 from "../../../../play-png/7_잔소리1_숙제해.png";
import png2 from "../../../../play-png/7_잔소리3_빨리빨리.png";
import png3 from "../../../../play-png/7_잔소리5_씻어라.png";

import audio7 from "../../../../play-background/ske_7.mp3";
import axios from "axios";
// import Livecam from "../../../../components/Livecam";
import { useEffect, useLayoutEffect, useState } from "react";

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

          setBottom((prevBottom) => prevBottom + y_diff);
          setLeft((prevLeft) => prevLeft + x_diff);
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
  const [showStudy, setShowStudy] = useState(true);
  const [bottom, setBottom] = useState(0);
  const [left, setLeft] = useState(0);

  useEffect(() => {
    axios
      .get("/api/devices/cleardiff")
      .then()
      .catch((err) => {
        return console.log("에러입니다.", err);
      });
    }, [])
    
  useEffect(() => {
    const studyElement = document.getElementById("study");
    const character = document.getElementById("character");
    if (!studyElement || !character) return; // 만약 studyElement 또는 character가 없으면 실행 중단

    const studyRect = studyElement.getBoundingClientRect();
    const characterRect = character.getBoundingClientRect();

    console.log(studyRect);
    console.log(characterRect);

    let overlap = !(
      studyRect.right < characterRect.left ||
      studyRect.left > characterRect.right ||
      studyRect.bottom < characterRect.top ||
      studyRect.top > characterRect.bottom
    );

    console.log(overlap);

    if (overlap) {
      setShowStudy(false);
    }
  }, [bottom, left]);

  return (
    <Wrapper>
      {/* <button
        style={{ position: "absolute", zIndex: "9999" }}
        type="button"
        onClick={() => {
          setBottom(200);
          setLeft(712);
        }}
      >
        test
      </button> */}
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

      {showStudy && (
        <img id="study" className="balloon study" src={png1} alt="숙제해" />
      )}

      <img className="balloon hurry" src={png2} alt="잔소리2" />
      <img className="balloon wash" src={png3} alt="잔소리3" />

      <audio autoPlay>
        <source src={audio7} type="audio/mp3" />
      </audio>
    </Wrapper>
  );
}

export default P7;
