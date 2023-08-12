import { useEffect, useState } from "react";
import Wrapper from "./styles";
import CheckStep from "../../components/CheckStep";
import isConnected from "../../utils/isConnected";
import axios from "axios";
import Livecam from "../../components/Livecam";

function Check() {
  const [activeStep, setActiveStep] = useState(1);
  const connection = isConnected();

  const capture = () => {
    alert("axios 전송")
    // axios
    //   .get("/api/devices/capture")
    //   .then((res) => {
    //     console.log(res)
    //     setActiveStep(2)
    //   })
  }

  useEffect(() => {
    
  }, [connection]);

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
          <Livecam />
          <button onClick={capture}>캡처하기</button>
        </div>
      </div>
      <button onClick={() => {setActiveStep(activeStep+1)}}>test</button>
    </Wrapper>
  );
}

export default Check;
