import { useState } from 'react';

// sytled_components
import Wrapper from "./styles";

// Bootstrap
import Form from 'react-bootstrap/Form';

// Components
import Header from "../../components/Header";

///////////////////////////////////////////////

function Profile() {
  const [form, setForm] = useState({
    pw: "",
    newPw: "",
    newPwCheck: "",
    newPwMessage: "",
    newPwCheckMessage: ""
  })

  const onChangePw = (e) => {
    const currentPw = e.target.value;
    setForm((prevForm) => ({
      ...prevForm,
      pw: currentPw
    }));
  }

  const onChangeNewPw = (e) => {
    const currentNewPW = e.target.value;
    setForm((prevForm) => ({
      ...prevForm,
      newPw: currentNewPW
    }));
    const newPwRegExp = /^[a-zA-Z0-9!@#$%^&*()\-_=+{}[\]|\\;:'",.<>/?]{8,20}$/;

    if (!newPwRegExp.test(currentNewPW) & currentNewPW !== "") {
      setForm((prevForm) => ({
        ...prevForm,
        newPwMessage: "영어 대/소문자, 숫자를 포함한 8~20자 이내로 설정해 주세요.",
      }));
    } else {
      setForm((prevForm) => ({
        ...prevForm,
        newPwMessage: "",
      }));
    }
  }

  const onChangeNewPwCheck = (e) => {
    const currentnewPwCheck = e.target.value;
    setForm((prevForm) => ({
      ...prevForm,
      newPwCheck: currentnewPwCheck
    }));
    if (form.newPw !== currentnewPwCheck & currentnewPwCheck !== "") {
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
  }

  const onSubmitForm = (e) => {
    e.preventDefault();
    console.log("제출")
  }

  return <div>
    <Header />
    <Wrapper>
      <div className="grid box">
        <h2>비밀번호 <span>변경</span></h2>
        <Form>
          <Form.Group className="mt-5">
            <Form.Control name='pw' value={form.pw} onChange={onChangePw} size="lg" className="my-3" type="password" placeholder="기존 비밀번호" style={{height: '45px'}}/>
            <Form.Control name='newPw' value={form.newPw} onChange={onChangeNewPw} size="lg" className="my-2" type="password" placeholder="새로운 비밀번호" style={{height: '45px'}}/>
            <span className='message'>{form.newPwMessage}</span>
            <Form.Control name='newPwCheck' value={form.newPwCheck} onChange={onChangeNewPwCheck} size="lg" className="my-3" type="password" placeholder="새로운 비밀번호 확인" style={{height: '45px'}}/>
            <span className='message'>{form.newPwCheckMessage}</span>
          </Form.Group>
          <Form.Control className="btn my-3" type="submit" value="변경하기" onClick={onSubmitForm} />
        </Form>
      </div>

      <div className="grid">
        <div className="box">
          <h2>기기 <span>연결</span></h2>
          <h5 className="my-3">기기 연결이 안되어 있어요.</h5>
          <h5><a href="/connect">기기 연결하러 가기</a></h5>
        </div>
        <img src={process.env.PUBLIC_URL + '/assets/logo_with.png'} alt="" />
      </div>
    </Wrapper>
  </div>;

}

export default Profile;
