import React, { useState, useEffect } from "react";
import Wrapper from "./styles";
import CheckStep from "../../components/CheckStep";
import getUserEmail from "../../utils/getUserEmail";
import axios from "axios";

let url
const Livecam = () => {
  const email = getUserEmail()
  const [imageUrl, setImageUrl] = useState(`/user/${email}/image.jpg`);
  // 카메라 화면 : "user/[user_email]/image.jpg"
  // 캐릭터 : user/[user_email]/assemble.png    
  const fetchNewImage = () => {
    const timestamp = new Date().getTime();
    setImageUrl(`/user/${email}/image.jpg?timestamp=${timestamp}`);
    url = imageUrl 
  };

  useEffect(() => {
    fetchNewImage(); // 컴포넌트가 마운트될 때 이미지 가져오기
    const interval = setInterval(fetchNewImage, 200); // 200ms마다 이미지 업데이트
    return () => clearInterval(interval); // 컴포넌트 언마운트 시 인터벌 클리어
  }, []);

  return (
    <img src={imageUrl} alt="RandomImage" />
  );
};

function Check() {
  const [activeStep, setActiveStep] = useState(1);  

  const start = (e) => {
    axios
      .get("/api/devices/start")
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  
  const capture = () => {
    axios
      .post("/api/devices/capture", { imgUrl: url })
      .then((res) => {
        // back에서 찍은 사진을 가져온다.
        // 찍은 사진을 모달로 띄운다.
        setActiveStep(2)

      })
      .catch((err) => {
        console.log(err);
      })
  }

  return (
    <Wrapper onLoad={start}>
      <h1 className="check-title">시작하기 전, 확인해주세요!</h1>
      <div className="all">
        <div className="container">
          <CheckStep
            activeStep={activeStep}
            step={1}
            message={"그림 찍기"}
          ></CheckStep>
          <CheckStep
            activeStep={activeStep}
            step={2}
            message={"카메라 위치 확인하기"}
          ></CheckStep>
          <CheckStep
            activeStep={activeStep}
            step={3}
            message={"음성 인식 확인하기"}
          ></CheckStep>
          <CheckStep
            activeStep={activeStep}
            step={4}
            message={"캐릭터 연동 확인하기"}
          ></CheckStep>
        </div>
        <div>
          {activeStep === 1 &&
            <>
              {/* 카메라 화면 : "user/[user_email]/image.jpg" */}
              <Livecam />
              <button onClick={capture}>캡처하기</button>
            </>
          }
          {activeStep === 2 &&
            <>
              <Livecam />
              <button onClick={capture}>2단계 확인</button>
            </>
          }
          {activeStep === 3 &&
            <>
              <Livecam />
              <button onClick={capture}>3단계 확인</button>
            </>
          }
          {activeStep === 4 &&
            <>
              <Livecam />
              <button onClick={capture}>확인</button>
            </>
          }
        </div>
      </div>
      <button onClick={() => { setActiveStep(activeStep + 1) }}>test</button>
    </Wrapper>
  );
}

export default Check;