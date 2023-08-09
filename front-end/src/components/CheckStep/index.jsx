import Wrapper from "./styles";

function CheckStep(props) {

  return (
    <Wrapper>
      <div className="step">
        {props.step}
      </div>
      <div className={props.step === props.activeStep ? "active message" : "message"}>{props.message}</div>
    </Wrapper>
  );
}

export default CheckStep;
