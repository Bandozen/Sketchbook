import Wrapper from "./styles";

function MotionCheck() {
  return (
    <Wrapper>
      <div>
        <h2>3. 움직임 확인하기</h2>
        <iframe
          title="라즈베리파이 캠"
          src="http://192.168.100.246:8080/"
          width="100%"
          height="800px"
        ></iframe>
      </div>
    </Wrapper>
  );
}

export default MotionCheck;
