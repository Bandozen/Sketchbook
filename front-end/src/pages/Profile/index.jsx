import { useState } from "react";
import InputGroup from "react-bootstrap/InputGroup";

// sytled_components
import Wrapper from "./styles";

// Bootstrap
import Form from "react-bootstrap/Form";

// Components
import Header from "../../components/Header";

// utils
import isConnected from "../../utils/isConnected";
///////////////////////////////////////////////

function Profile() {
  const connection = isConnected();

  const [form, setForm] = useState({
    pw: "",
    newPw: "",
    newPwCheck: "",
    newPwMessage: "",
    newPwCheckMessage: "",
  });

  const [showPassword, setShowPassword] = useState({
    pw: false,
    newPw: false,
    newPwCheck: false,
  });

  const togglePasswordVisibility = (field) => {
    setShowPassword({
      ...showPassword,
      [field]: !showPassword[field],
    });
  };

  const onChangePw = (e) => {
    const currentPw = e.target.value;
    setForm((prevForm) => ({
      ...prevForm,
      pw: currentPw,
    }));
  };

  const onChangeNewPw = (e) => {
    const currentNewPW = e.target.value;
    setForm((prevForm) => ({
      ...prevForm,
      newPw: currentNewPW,
    }));
    const newPwRegExp = /^[a-zA-Z0-9!@#$%^&*()\-_=+{}[\]|\\;:'",.<>/?]{8,20}$/;

    if (!newPwRegExp.test(currentNewPW) & (currentNewPW !== "")) {
      setForm((prevForm) => ({
        ...prevForm,
        newPwMessage:
          "영어 대/소문자, 숫자를 포함한 8~20자 이내로 설정해 주세요.",
      }));
    } else {
      setForm((prevForm) => ({
        ...prevForm,
        newPwMessage: "",
      }));
    }
  };
  const onChangeNewPwCheck = (e) => {
    const currentnewPwCheck = e.target.value;
    setForm((prevForm) => ({
      ...prevForm,
      newPwCheck: currentnewPwCheck,
    }));
    if ((form.newPw !== currentnewPwCheck) & (currentnewPwCheck !== "")) {
      setForm((prevForm) => ({
        ...prevForm,
        newPwCheckMessage: "비밀번호가 일치하지 않습니다.",
      }));
    } else {
      setForm((prevForm) => ({
        ...prevForm,
        newPwCheckMessage: "",
      }));
    }
  };

  const onSubmitForm = (e) => {
    e.preventDefault();
    console.log("제출");
  };

  return (
    <div>
      <Header />
      <Wrapper>
        <div className="grid box">
          <h2>
            비밀번호 <span>변경</span>
          </h2>

          <InputGroup size="lg">
            <Form.Control
              name="pw"
              value={form.pw}
              onChange={onChangePw}
              size="lg"
              className="my-2 form-control"
              type={showPassword.pw ? "text" : "password"}
              placeholder="기존 비밀번호"
              style={{ height: "45px", borderRadius: "5px", fontSize: "1rem" }}
            />
            <InputGroup.Text
              id="inputGroup-sizing-lg"
              onClick={() => togglePasswordVisibility("pw")}
            >
              <i
                className={
                  showPassword.pw ? "fa-solid fa-eye" : "fa-solid fa-eye-slash"
                }
              ></i>
            </InputGroup.Text>
          </InputGroup>

          <InputGroup size="lg">
            <Form.Control
              name="newPw"
              value={form.newPw}
              onChange={onChangeNewPw}
              size="lg"
              className="my-2 form-control"
              type={showPassword.newPw ? "text" : "password"}
              placeholder="새로운 비밀번호"
              style={{ height: "45px", borderRadius: "5px", fontSize: "1rem" }}
            />
            <InputGroup.Text
              id="inputGroup-sizing-lg"
              onClick={() => togglePasswordVisibility("newPw")}
            >
              <i
                className={
                  showPassword.newPw
                    ? "fa-solid fa-eye"
                    : "fa-solid fa-eye-slash"
                }
              ></i>
            </InputGroup.Text>
          </InputGroup>
          <span className="message">{form.newPwMessage}</span>

          <InputGroup size="lg">
            <Form.Control
              name="newPwCheck"
              value={form.newPwCheck}
              onChange={onChangeNewPwCheck}
              size="lg"
              className="my-2 form-control"
              type={showPassword.newPwCheck ? "text" : "password"}
              placeholder="새로운 비밀번호 확인"
              style={{ height: "45px", borderRadius: "5px", fontSize: "1rem" }}
            />
            <InputGroup.Text
              id="inputGroup-sizing-lg"
              onClick={() => togglePasswordVisibility("newPwCheck")}
            >
              <i
                className={
                  showPassword.newPwCheck
                    ? "fa-solid fa-eye"
                    : "fa-solid fa-eye-slash"
                }
              ></i>
            </InputGroup.Text>
          </InputGroup>
          <span className="message">{form.newPwCheckMessage}</span>

          <Form.Control
            className="btn my-3"
            type="submit"
            value="변경하기"
            onClick={onSubmitForm}
          />
        </div>

        <div className="grid">
          <div className="box">
            <h2>
              기기 <span>연결</span>
            </h2>
            <h5 className="mt-3" style={{ fontSize: "20px" }}>
              {connection
                ? "기기 연결 되어 있어요."
                : "기기 연결이 안되어 있어요."}
            </h5>
            <h5 style={{ display: connection ? "none" : "block" }}>
              <a href="/connect" style={{ fontSize: "20px", color: "black" }}>
                기기 연결하기 💁‍♀️
              </a>
            </h5>
          </div>
          <img src={process.env.PUBLIC_URL + "/assets/logo_with.png"} alt="" />
        </div>
      </Wrapper>
    </div>
  );
}

export default Profile;
