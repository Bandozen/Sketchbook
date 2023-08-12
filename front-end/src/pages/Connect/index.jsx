import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import Header from "../../components/Header";
import Wrapper from "./styles";
import axios from "axios";
import isConnected from "../../utils/isConnected";
import Modal2 from "../../components/Modal";

function useInterval(callback, delay) {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

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
  const navigate = useNavigate();
  const connection = isConnected();
  const [ConnectModal, setConnectModal] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [activeBox, setActiveBox] = useState(null);
  const [button, setButton] = useState({
    buttonText: "OTP 생성하기",
    timerActive: false,
    timerCount: 0,
    tryCount: 0,
  });

  const [otp, setOtp] = useState("");

  const closeConnectModal = () => {
    setConnectModal(false)
    navigate("/")
  }

  useEffect(() => {
    if (connection === "true") {
      setConnectModal(true);
    }
  })

  function Modal({ isOpen, onClose }) {
    if (!isOpen) return null;

    const handleBackdropClick = (e) => {
      if (e.target === e.currentTarget) {
        onClose();
      }
    };

    return (
      <div className="modal" onClick={handleBackdropClick}>
        <div className="modal-content" onClick={e => e.stopPropagation()}>
          <span className="close-button" onClick={onClose}>X</span>
          <h3>OTP 생성</h3>
          <div className="timerCount">
            {otp}
            <div className="timer">
              {
                `${parseInt(button.timerCount / 60)}:${(button.timerCount % 60).toString().padStart(2, '0')}`
              }

            </div>
          </div>
        </div>
      </div>
    );
  }

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
      }));
    }
  };

  const handleOpenModal = () => {
    handleClick();
    setModalOpen(true);
  };

  const createOtp = () => {
    axios
      .get("/api/devices/issue")
      .then((res) => {
        setOtp(res.data.otp);
      })
      .catch((err) => {
        console.log(err);
      });
  };


  const tick = () => {
    if (button.timerCount > 0) {
      setButton((prevButton) => ({
        ...prevButton,
        timerCount: prevButton.timerCount - 1,
        buttonText: `${parseInt((prevButton.timerCount - 1) / 60)}:${(prevButton.timerCount - 1) % 60}`,
      }));

      axios
        .get("/api/devices/checkConnect")
        .then((res) => {
          const connection = isConnected();
          if (connection === "true") {
            return navigate("/books");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      if (button.tryCount < 3) {
        handleClick();
      } else {
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
              <div className="connect-button" onClick={handleOpenModal}>
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
        <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
      </Wrapper>
      <Modal2 isModalOpen = {ConnectModal} clickResult={closeConnectModal} message={"기기 연결이 되어 있지 않아요."} />
    </>
  );
}

export default Connect;