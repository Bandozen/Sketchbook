import Wrapper from "./styles";

function Modal(props) {

  return (
    <Wrapper style={{ display: props.isModalOpen ? "block" : "none" }}>
      <div className="modal-box">
      <p>{props.message}</p>
      <button onClick={props.clickResult}>확인</button>
    </div>
    </Wrapper>
  );
}

export default Modal;
