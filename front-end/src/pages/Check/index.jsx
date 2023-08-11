import { useEffect, useState } from "react";
import Wrapper from "./styles";
import CheckStep from "../../components/CheckStep";
import isConnected from "../../utils/isConnected";

function Check() {
  const [activeStep, setActiveStep] = useState(1);
  const connection = isConnected();

  useEffect(() => {
    if (connection === "true") {
      const checkWindow = window.open(
        "",
        "Print Window",
        "width=800,height=600, left=700, top=100"
      );
      checkWindow.location.href = "http://192.168.100.246:8300";
    }
  }, [connection]);

  return (
    <Wrapper>
      <h1 className="check-title">시작하기 전, 확인해주세요!</h1>
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
    </Wrapper>
  );
}

export default Check;
