import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Wrapper from './styles';
import { useState } from 'react';
import axios from 'axios';

function PasswordModal(props) {

  const [email, setEmail] = useState("");

  const EmailExp = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.(com|net)$/;
  const isValidEmail = email === "" || EmailExp.test(email);


  const sendNewPw = () => {
    if (email !== "" && isValidEmail) {
      alert("입력하신 " + email + "로 임시 비밀번호를 보냈습니다.")
      axios.post("api/users/tempPassword", {email: email})
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
      props.closeModal();
    } else {
      alert("잘못된 이메일 형식입니다.")
    }
  }

  return (
    <Modal show={props.isModalOpen} onHide={props.closeModal} centered>
      <Wrapper
      >
        <Modal.Header closeButton>
        </Modal.Header>
        <Modal.Body>
          <h4>비밀번호 찾기</h4>
          <p>
            계정에 등록된 이메일을 입력하시면 <br />
            이메일로 임시 비밀번호를 보내드려요.
          </p>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Control
                type="email"
                placeholder="이메일 주소"
                value={email}
                autoFocus
                onChange={(e) => {
                  setEmail(e.target.value);

                  
                }}
              />
              <div className='valid-text'>{isValidEmail ? '' : '이메일 형식을 확인해주세요.'}</div>
            </Form.Group>
          </Form>
          <button className='sendBtn' type="button" onClick={sendNewPw}>
            이메일로 임시비밀번호 받기
          </button>
        </Modal.Body>
      </Wrapper>
    </Modal>
  );
}

export default PasswordModal;
