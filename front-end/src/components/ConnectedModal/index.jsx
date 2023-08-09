import { useNavigate } from "react-router";
import Wrapper from "./styles";

function ConnectedModal(props) {

  const navigate = useNavigate();
  const goToBooks = () => {
    navigate("/books");
  };


  return (
    <Wrapper style={{ display: props.isModalOpen ? "block" : "none" }}>
      <div className="modal-box">
      <p>기기가 이미 연결되어 있어요.</p>
      <button onClick={goToBooks}>확인</button>
    </div>
    </Wrapper>
  );
}

export default ConnectedModal;
