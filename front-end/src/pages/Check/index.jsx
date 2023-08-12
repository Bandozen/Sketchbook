import { useState } from "react";
import Wrapper from "./styles";
import CheckStep from "../../components/CheckStep";
import axios from "axios";
import Livecam from "../../components/Livecam";

function Check() {
  const [activeStep, setActiveStep] = useState(1);

  const capture = () => {
    axios
      .get("/api/devices/capture")
      .then((res) => {
        // back에서 찍은 사진을 가져온다.
        // 찍은 사진을 모달로 띄운다.
        console.log(res.mission);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  return (
    <Wrapper>
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
              <Livecam imageName={"image.jpg"} />
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
