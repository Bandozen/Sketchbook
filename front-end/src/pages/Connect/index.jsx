import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import Header from "../../components/Header";
import Wrapper from "./styles";
import axios from "axios";
import isConnected from "../../utils/isConnected";

function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

function Connect() {
//   console.log(`
// ╭ ◜◝ ͡ ◜◝ ͡  ◜◝ ͡ ◜◝ ͡  ◜◝ ╮
//         기기연결 페이지
// OTP 기기 연결 해야 동화를 보지요
// ╰ ◟◞ ͜  ◟ ͜   ◟◞ ͜  ◟ ͜   ◟◞ ╯
//                   O
//                 °
// `)
  const [button, setButton] = useState({
    buttonText: "OTP 생성하기",
    timerActive: false,
    timerCount: 0,
    tryCount: 0,
  });

  const [otp, setOtp] = useState("");

  const handleClick = () => {
    if (
      button.timerActive === false ||
      (button.timerCount === 0 && button.tryCount < 3)
    ) {
      createOtp();
      setButton((prevButton) => ({
        ...prevButton,
        timerActive: true,
        timerCount: 180,
        tryCount: prevButton.tryCount + 1,
      })); // 3분(180초)로 타이머 설정
    }
  };

  // axios createOtp
  const createOtp = () => {
    axios
      .get("/api/devices/issue")
      .then((res) => {
        setOtp(res.data.otp);
      })
      .catch((err) => {
        console.log(err);
      });
    // SetOtp(12345);
    // console.log(button.tryCount);
  };

  const navigate = useNavigate();
  // 타이머 로직을 담당하는 함수
  const tick = () => {
    if (button.timerCount > 0) {
      setButton((prevButton) => ({
        ...prevButton,
        timerCount: prevButton.timerCount - 1,
        buttonText: `${parseInt((prevButton.timerCount - 1) / 60)}:${
          (prevButton.timerCount - 1) % 60
        }`,
      }));

      axios
        .get("/api/devices/checkConnect")
        .then((res) => {
          const connection = isConnected();
          if (connection == "true") {
            return navigate("/books");
          }
        })
        .catch((err) => {
          console.log(err);
        });
      // SetOtp(12345);
      // console.log(button.tryCount);
    } else {
      if (button.tryCount < 3) {
        handleClick();
      } else {
        // 타이머가 끝났을 때 초기 상태로 돌아감
        setButton((prevButton) => ({
          ...prevButton,
          buttonText: "OTP 생성하기",
          timerActive: false,
          timerCount: 0,
          tryCount: 0,
        }));
        setOtp("");
      }
    }
  };

  // useInterval 훅스를 사용하여 1초마다 타이머 업데이트
  useInterval(tick, button.timerActive ? 1000 : null);

  return (
    <>
      <Header />
      <Wrapper>
        <div className="box">
          <h2>
            기기연결, <span>어떻게</span> 하나요?
            <img src={process.env.PUBLIC_URL + "/assets/emoji.png"} alt="" />
          </h2>
          <ol>
            <li>기기의 전원을 켜주세요.</li>
            <li>기기에 와이파이를 연결해주세요.</li>
            <li>
              웹 페이지의 OTP 생성하기 버튼을 눌러 OTP 번호를 확인해주세요.
            </li>
            <li>기기의 키패드에 해당 OTP 번호를 입력해주세요.</li>
          </ol>
          <div className="btndiv">
            <button type="button" onClick={handleClick}>
              {button.buttonText}
            </button>
          </div>
          <div className="timerCount">{otp}</div>
        </div>
      </Wrapper>
    </>
  );
}

export default Connect;
