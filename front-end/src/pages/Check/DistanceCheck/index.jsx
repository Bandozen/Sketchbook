import Wrapper from "./styles";

function DistanceCheck() {
  return (
    <Wrapper>    
    <div>
      <h2> 2. 카메라 위치 확인하기 </h2>
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

export default DistanceCheck;
