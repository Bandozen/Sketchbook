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
  const [isModalOpen, setModalOpen] = useState(false);
  function Modal({ isOpen, onClose }) {
    if (!isOpen) return null;
  
    const handleBackdropClick = (e) => {
      // 여기에서 바깥 부분 클릭을 확인
      if (e.target === e.currentTarget) {
        onClose();
      }
    };
  
    return (
      <div className="modal" onClick={handleBackdropClick}>
        <div className="modal-content" onClick={e => e.stopPropagation()}>
          <span className="close-button" onClick={onClose}>X</span>
          <h2>OTP 생성</h2>
          <div className="timerCount">{otp}</div>
          <div className="btndiv">
            <button type="button" onClick={handleClick}>
              {button.buttonText}
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  
  const [activeBox, setActiveBox] = useState(null);

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
        buttonText: `${parseInt((prevButton.timerCount - 1) / 60)}:${(prevButton.timerCount - 1) % 60
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

  const boxes = [
    {
      id: 1,
      className: 'one',
      name: "1. 기기 전원 켜기",
      description: (
        <div>
          기기의 전원을 켜주세요.
        </div>
      ),
      image: "/videos/turnon.png"
    }
    ,
    {
      id: 2, className: 'two', name: "2. 와이파이 연결하기", description: (
        <div>
          기기 와이파이를 연결해주세요.
        </div>
      ), image: "/videos/wifi.png"
    },
    {
      id: 3, className: 'three', name: "3. OTP 생성하기", description: (
        <div>
          상단의 OTP 생성하기 버튼을 눌러 OTP 번호를 확인해주세요. <br /> 3분간 유효해요.
        </div>
      ), image: "/videos/realotp.png"
    },
    {
      id: 4, className: 'four', name: "4. 기기에 입력하기", description: (
        <div>
          기기 키패드에 해당 OTP번호를  <br /> 입력해주세요. <br /> 동화 플레이할 준비 끝! 👍
        </div>
      ), image: "/videos/input.png"
    }
  ];


  return (
    <>
      <Header />
      <Wrapper>
        <div className="boxes">
          <div className="title">
            <h1>기기 연결 가이드 👀</h1>
            <div className="btndiv">
              <div className="connect-button" onClick={() => setModalOpen(true)}> 
                OTP 생성하기▸
              </div>
            </div>
          </div>
          <div className="real_box">
            {boxes.map(box => (
              <div
                key={box.id}
                className={`box ${activeBox === box.id ? 'active' : ''}`}
                onMouseEnter={() => setActiveBox(box.id)}
                onMouseLeave={() => setActiveBox(null)}
              >
                <img className={box.className} src={box.image} alt={`박스${box.id}`} />
                {activeBox === box.id && <div className="description">{box.description}</div>}
                <span className="box-name">{box.name}</span>
              </div>
            ))}
          </div>
        </div>
        {/* <div className="btndiv">
          <button type="button" onClick={handleClick}>
            {button.buttonText}
          </button>
        </div> */}
        <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)} /> 
      </Wrapper>
    </>
  );
}

export default Connect;