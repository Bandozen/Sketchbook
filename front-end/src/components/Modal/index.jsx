import { useEffect } from "react";
import Wrapper from "./styles";

function Modal(props) {
  
  useEffect(() => {
    document.addEventListener("keyup", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        props.clickResult();
      }
    })
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
