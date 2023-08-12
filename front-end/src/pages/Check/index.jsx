import { useEffect, useState } from "react";
import Wrapper from "./styles";
import CheckStep from "../../components/CheckStep";
import isConnected from "../../utils/isConnected";
import axios from "axios";

const Livecam = () => {
  
  const [imageUrl, setImageUrl] = useState("/user/image.jpg");

  const fetchNewImage = () => {
    const timestamp = new Date().getTime();
    setImageUrl(`/assets/arrow.png?timestamp=${timestamp}`);
  };

  useEffect(() => {
    fetchNewImage(); // 컴포넌트가 마운트될 때 이미지 가져오기
    const interval = setInterval(fetchNewImage, 200); // 200ms마다 이미지 업데이트
    return () => clearInterval(interval); // 컴포넌트 언마운트 시 인터벌 클리어
  }, []);

  return (
    <div className="container">
      <img src={imageUrl} alt="Random Image"/>
    </div>
  );
};



function Check() {
  const [activeStep, setActiveStep] = useState(1);
  const connection = isConnected();

  const capture = () => {
    axios
      .get("/api/devices/capture")
      .then((res) => {
        setActiveStep(2);
        console.log(res.mission);
      })
      .catch((err) => {
        console.log(err);
      })
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
