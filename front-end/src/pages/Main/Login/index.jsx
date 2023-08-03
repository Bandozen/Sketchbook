import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { Link, useNavigate } from "react-router-dom";
import Wrapper from "./styles";
import PasswordModal from "../../../components/PasswordModal";

import axios from "axios";

export default function Login() {
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const [useremail, setUseremail] = useState("");
  const [password, setPassword] = useState("");
  const [warning, setWarning] = useState("");
  const [passwordwarning, setPasswordWarning] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const emailRegEx =
    /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/i;
  const passwordRegEx = /^[a-zA-Z0-9!@#$%^&*()\-_=+{}[\]|\\;:'",.<>/?]{8,20}$/;

  const emailCheck = (username) => {
    const isValidEmail = emailRegEx.test(username);
    if (!isValidEmail) {
      setWarning("이메일 형식을 확인해주세요.");
    } else {
      setWarning("");
    }
    return isValidEmail;
  };

  const passwordCheck = (password) => {
    if (password.match(passwordRegEx) === null) {
      setPasswordWarning("비밀번호 형식이 일치하지 않습니다.");
    } else {
      setPasswordWarning("");
    }
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const login = (e) => {
    e.preventDefault();
    axios
      .post("/api/users/login", {
        email: useremail,
        password: password,
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.loginSuccess==false){
          alert('일치하는 회원정보가 없습니다.')
          return
        } else {
        navigate('/main'); // 기기 연결 페이지로 이동하게 변경
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Wrapper>
      <PasswordModal closeModal={closeModal} isModalOpen={isModalOpen} />
      <div className="login">
        <div className="login-signup-buttons">
          <Link
            to="/main/login"
            style={{ textDecoration: "none", color: "gray" }}
          >
            <h3 className="activated">로그인</h3>
          </Link>
          <Link
            to="/signup"
            style={{ textDecoration: "none", color: "gray" }}
          >
            <h3>회원가입</h3>
          </Link>
        </div>

        <form>
          <div>
            <InputGroup style={{ height: "45px", marginBottom: "10px" }}>
              <Form.Control
                placeholder="이메일"
                aria-label="useremail"
                style={{ backgroundColor: "#E6E6E6" }}
                onChange={(e) => {
                  setUseremail(e.target.value);
                  emailCheck(e.target.value);
                }}
              />
            </InputGroup>
            <span className="warningmsg">{warning}</span>
          </div>

          <div>
            <InputGroup style={{ height: "45px" }}>
              <Form.Control
                type={showPassword ? "text" : "password"}
                placeholder="비밀번호"
                aria-label="password"
                style={{ backgroundColor: "#E6E6E6" }}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  passwordCheck(e.target.value);
                }}
              />
              <InputGroup.Text
                onClick={handleShowPassword}
                style={{ cursor: "pointer" }}
              >
                <i
                  className={
                    showPassword ? "fa-solid fa-eye" : "fa-solid fa-eye-slash"
                  }
                ></i>
              </InputGroup.Text>
            </InputGroup>
            <span className="warningmsg">{passwordwarning}</span>
          </div>

          <button type="submit" className="start" onClick={login}>
            시작하기
          </button>

          <p className="forgot-password" style={{ textDecoration: 'underline'}}> <a onClick={openModal}>비밀번호 찾기</a></p>
        </form>
      </div>
    </Wrapper>
  );
}
