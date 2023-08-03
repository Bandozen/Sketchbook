import Wrapper from "./styles";
import { useNavigate } from 'react-router-dom';


function DistanceCheck() {

  let navigate = useNavigate();

  const next = () => {
    navigate('/check/motion');
  };

  return (
    <Wrapper>

      <div>
        <h3 style={{ fontSize: '45px', fontWeight: 'bold' }}> 2. 카메라 위치 확인하기 </h3>
        <iframe
          title="라즈베리파이 캠"
          src="http://192.168.100.246:8080/"
          width="100%"
          height="800px"
        ></iframe>

        <img
          className="arrow"
          src={process.env.PUBLIC_URL + "/assets/arrow.png"}
          alt=""
          onClick={next}
        />


      </div>
    </Wrapper>
  );
}

export default DistanceCheck;
