import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Wrapper from "./styles";
import CheckStep from "../../components/CheckStep";
import axios from "axios";

let camUrl;

const Livecam = () => {
  const [imageUrl, setImageUrl] = useState(`/assets/livecam_loading.jpg`);
  // const [imageUrl, setImageUrl] = useState(`/user/image.jpg`);
  let email;
  axios
    .get("/api/devices/position")
    .then((res) => {
      email = res.data.email;
      // 카메라 화면 : "user/[user_email]/image.jpg"
      // 캐릭터 : user/[user_email]/assemble.png
      console.log(email);
    })
    .catch((err) => {
      return console.log(err);
    });

  const fetchNewImage = () => {
    const timestamp = new Date().getTime();
    setImageUrl(`/assets/assemble.png?timestamp=${timestamp}`); //local
    camUrl = `/assets/assemble.png?timestamp=${timestamp}`; // local
    // setImageUrl(`/user/${email}/image.jpg?timestamp=${timestamp}`); // 배포
    // camUrl = `/user/${email}/image.jpg?timestamp=${timestamp}` // 배포
  };

  useEffect(() => {
    fetchNewImage(email); // 컴포넌트가 마운트될 때 이미지 가져오기
    const interval = setInterval(fetchNewImage, 200); // 200ms마다 이미지 업데이트
    return () => clearInterval(interval); // 컴포넌트 언마운트 시 인터벌 클리어
  }, []);

  return <img src={imageUrl} className="overlay-image" />;
};

const Charactercam = () => {
  const [characterUrl, setcharacterUrl] = useState(`/assets/char_load.png`);
  let email;
  axios
    .get("/api/devices/position")
    .then((res) => {
      email = res.data.email;
      // 카메라 화면 : "user/[user_email]/image.jpg"
      // 캐릭터 : user/[user_email]/assemble.png
    })
    .catch((err) => {
      return console.log(err);
    });

  const fetchNewImage = () => {
    const timestamp = new Date().getTime();
    // setcharacterUrl(`/assets/assemble.png?timestamp=${timestamp}`); //local
    setcharacterUrl(`/user/${email}/assemble.png?timestamp=${timestamp}`); // 배포
  };

  useEffect(() => {
    fetchNewImage(email); // 컴포넌트가 마운트될 때 이미지 가져오기
    const interval = setInterval(fetchNewImage, 200); // 200ms마다 이미지 업데이트
    return () => clearInterval(interval); // 컴포넌트 언마운트 시 인터벌 클리어
  }, []);

  return <img src={characterUrl} className="overlay-image" />;
};

function Check() {
  const [activeStep, setActiveStep] = useState(1);
  let navigate = useNavigate();

  const capture = () => {
    axios
      .post("/api/devices/capture", { camUrl: camUrl })
      .then((res) => {
        // back에서 찍은 사진을 가져온다.
        // 찍은 사진을 모달로 띄운다.
        setActiveStep(2);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const mission = (e) => {
    setActiveStep(activeStep + 1);
    axios
      .post("/api/devices/mission", {
        flag: "1", // mission이 없으면 0 있으면 1
      })
      .then((res) => {
        // console.log(res.data.mission);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const record = (e) => {
    setActiveStep(activeStep + 1);
    axios
      .get("/api/devices/record")
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const goToReady = () => {
    navigate("/ready");
  };

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
            message={"캐릭터 연동 확인하기"}
          ></CheckStep>
        </div>
        <div>
          {activeStep === 1 && (
            <>
              {/* 카메라 화면 : "user/[user_email]/image.jpg" */}
              <div className="image-wrapper">
                <img src="/assets/livecam_loading.jpg" />
                <Livecam />
              </div>
              <button onClick={capture}>캡처하기</button>
            </>
          )}
          {activeStep === 2 && (
            <>
              <div className="image-wrapper">
                <img src="/assets/livecam_loading.jpg" />
                <Livecam />
              </div>              
              <button onClick={record}>위치 확인</button>
            </>
          )}
          {activeStep === 3 &&  (
            <>
              <div className="image-wrapper">
                <img src="/assets/char_load.png" />
                <Charactercam />
              </div>
              <button onClick={goToReady}>준비 완료</button>
            </>
          )}
        </div>
      </div>
    </Wrapper>
  );
}

export default Check;
