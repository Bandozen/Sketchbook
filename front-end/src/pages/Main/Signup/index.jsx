import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { Link, useNavigate } from 'react-router-dom';
import Wrapper from "./styles";
import axios from "axios";

export default function Signup() {
  const navigate = useNavigate();

  const [useremail, setUseremail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [verificationCode, setVerificationCode] = useState(""); // 이메일 인증
  const [warning, setWarning] = useState(""); //유효성 검사
  const [passwordwarning, setPasswordWarning] = useState(""); //패스워드유효성검사
  const [confirmPasswordWarning, setConfirmPasswordWarning] = useState(""); //패스워드일치검사
  const [showPassword, setShowPassword] = useState(false); //패스워드 보여줘?
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); //패스워드 확인 보여줘?
  const [isValidEmail, setIsValidEmail] = useState(false); // 이메일 유효성 검사 결과
  const [codeblock, setCodeBlock] = useState(0);  // 이메일 인증 안하면 회원가입 막는 용도

  const emailRegEx = /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/i;
  const passwordRegEx = /^[a-zA-Z0-9!@#$%^&*()\-_=+{}[\]|\\;:'",.<>/?]{8,20}$/;

  const emailCheck = (username) => {
    const isValidEmail = emailRegEx.test(username);
    if (!isValidEmail) {
      setWarning('이메일 형식을 확인해주세요.');
    } else {
      setWarning('');
    }
    setIsValidEmail(isValidEmail); // 이메일 유효성 검사 결과 설정
  };

  const passwordCheck = (password) => {
    if (password.match(passwordRegEx) === null) {
      setPasswordWarning('영어 대/소문자, 숫자를 포함한 8~20자 이내로 설정해 주세요.');
    } else {
      setPasswordWarning('');
    }
  };

  const confirmPasswordCheck = (confirmPassword) => {
    if (confirmPassword !== password) {
      setConfirmPasswordWarning('비밀번호가 일치하지 않습니다.');
    } else {
      setConfirmPasswordWarning('');
    }
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleVerificationCodeChange = (e) => {
    setVerificationCode(e.target.value);
  };

  const handleDuplicateCheck = (e) => {
    e.preventDefault(); // 새로고침 방지
  
    axios.post("/api/users/idCheck", { email: useremail })
      .then((res) => {
        // console.log(res.data)
        const { registerService, message } = res.data;
        if (!isValidEmail) {
          alert("이메일 형식을 확인해주세요")
        }
        else if (registerService) {
          alert("사용 가능한 이메일입니다. \n인증 코드를 이메일로 발송했습니다."); // 이메일 사용 가능
          axios.post("/api/users/mail", { email: useremail })
            .then((res) => {
              // console.log(res.data);
              // alert("인증 코드를 이메일로 발송했습니다.");
            })
            .catch((err) => {
              console.log(err);
              alert("인증 코드 발송에 실패했습니다.");
            });
        }
        else {
          alert(message); // 이메일 중복
        }
      })
      .catch((err) => {
        console.log(err);
        alert("이메일 중복 확인에 실패했습니다.");
      });
  };
  
  const handleVerifyCode = (e) => {
  e.preventDefault(); // 새로고침 방지

  // 인증 코드 확인 로직
  if (!verificationCode) {
    alert("인증 코드를 입력해주세요.");
    return;
  }

  axios
    .post("/api/users/checkVerificationCode", {
      verificationCode: verificationCode,
      email: useremail // 이메일 주소도 함께 전송
    })
    .then((res) => {
      if (res.data.success) {
        alert("인증이 완료되었습니다.");
        setCodeBlock(1);
      } else {
        alert("인증 코드가 유효하지 않습니다.");
      }
    })
    .catch((err) => {
      console.log(err);
      alert("인증 코드 확인에 실패했습니다.");
    });
};
  

  const signup = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setConfirmPasswordWarning('비밀번호가 일치하지 않습니다.');
      alert("비밀번호가 일치하지 않습니다.");
      return;
    } else if (!isValidEmail) {
      alert("이메일 형식을 확인해주세요")
      return;
    } else if (codeblock === 0) {
      alert("이메일을 인증해주세요.")
      return;
    }

    axios
      .post("/api/users/register", {
        email: useremail,
        password: password,
      })
      .then((res) => {
        if (res.data.success === false) {
          alert('잘못된 회원 정보입니다.')
          return
        } else {
          navigate('/');
        }
      })
      .catch((err) => {
        console.log(err);
        alert("회원가입에 실패하였습니다. 다시 시도해주세요.");
      });
  };

  return (
    <Wrapper>
      <div className="signup">
        <div className="login-signup-buttons">
          <Link to="/" style={{ textDecoration: "none", color: "gray" }}>
            <h3>로그인</h3>
          </Link>
          <Link to="/main/signup" style={{ textDecoration: "none", color: "gray" }}>
            <h3 className='activated'>회원가입</h3>
          </Link>
        </div>

        <form>
          <div style={{ display: 'flex', marginBottom: '10px' }}>
            <InputGroup style={{ height: '45px', flex: '1', marginRight: '5px' }}>
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
            <button onClick={handleDuplicateCheck} className='duplicatecheck'>중복확인</button>
          </div>

          <span className='warningmsg'>{warning}</span>

          <div style={{ display: 'flex', marginBottom: '10px' }}>
            <InputGroup style={{ height: '45px', flex: '1', marginRight: '5px' }}>
              <Form.Control
                placeholder="인증 코드 입력"
                aria-label="verificationCode"
                style={{ backgroundColor: "#E6E6E6" }}
                value={verificationCode}
                onChange={handleVerificationCodeChange}
              />
            </InputGroup>
            <button onClick={handleVerifyCode} className='duplicatecheck' style={{ width: '67.34px' }}>인증</button>
          </div>

          <div>
            <InputGroup style={{ height: '45px', marginBottom: '10px' }}>
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
                style={{ cursor: 'pointer' }}
              >
                <i className={showPassword ? "fa-solid fa-eye" : "fa-solid fa-eye-slash"}></i>
              </InputGroup.Text>
            </InputGroup>
            <span className='warningmsg'>{passwordwarning}</span>
          </div>

          <div>
            <InputGroup style={{ height: '45px' }}>
              <Form.Control
                type={showConfirmPassword ? "text" : "password"}
                placeholder="비밀번호 확인"
                aria-label="confirmPassword"
                style={{ backgroundColor: "#E6E6E6" }}
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  confirmPasswordCheck(e.target.value);
                }}
              />
              <InputGroup.Text
                onClick={handleShowConfirmPassword}
                style={{ cursor: 'pointer' }}
              >
                <i className={showConfirmPassword ? "fa-solid fa-eye" : "fa-solid fa-eye-slash"}></i>
              </InputGroup.Text>
            </InputGroup>
            <span className='warningmsg'>{confirmPasswordWarning}</span>
          </div>

          <button type="submit" className='start' onClick={signup}>시작하기</button>

        </form>
      </div>
    </Wrapper>
  );
}
