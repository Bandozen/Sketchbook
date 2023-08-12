import { useEffect } from "react";
import Wrapper from "./styles";

function Modal(props) {
  const handleEnter = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      props.clickResult();
    }
  }
  useEffect(() => {
    if (props.isModalOpen) {
      document.addEventListener("keyup", handleEnter)
    }

    return () => {
      document.removeEventListener("keyup", handleEnter)
    }
  })

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
