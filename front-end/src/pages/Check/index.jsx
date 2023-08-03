import { Outlet } from "react-router-dom";
import Wrapper from "./styles";
import { useState } from "react";

function Check() {
  const steps = ["capture", "distance", "motion", "sound", "combine"];
  const [step, setStep] = useState(1);



  return (
    <Wrapper>
      <div className="container">
        <h1>시작하기 전, 확인해주세요!</h1>
        <Outlet />
      </div>

    </Wrapper>
  );
}

export default Check;
