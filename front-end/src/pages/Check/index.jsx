import { Outlet, useNavigate } from "react-router-dom";
import Wrapper from "./styles";
import { useState } from "react";

function Check() {
  const steps = ["capture", "distance", "motion", "sound", "combine"];
  const [step, setStep] = useState(1);

  const navigate = useNavigate();
  const next = (e) => {
    if (step < 5) {
      setStep(step + 1);
      navigate(`/check/${steps[step]}`);
    } else {
      setStep(0);
      navigate("/ready");
    }
  };

  return (
    <Wrapper>
      <div className="container">
        <h1 className="check-title">시작하기 전, 확인해주세요!</h1>
        <Outlet />
      </div>
      <img
        style={{ display: step ? "block" : "none" }}
        className="arrow"
        src={process.env.PUBLIC_URL + "/assets/arrow.png"}
        alt=""
        onClick={next}
      />
    </Wrapper>
  );
}

export default Check;
