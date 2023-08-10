import Header from "../../components/Header";
import Modal from "../../components/Modal";
import Wrapper from "./styles";
import { useNavigate } from "react-router";
import isConnected from "../../utils/isConnected";
import { useState } from "react";

function Guide() {
  const [activeBox, setActiveBox] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const connection = isConnected();
  const navigate = useNavigate();

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const goToConnect = () => {
    if (connection == 'true') {
      openModal();
    } else {
      navigate("/connect");
    }
  };

  const goToBooks = () => {
    navigate("/books");
  };

  const boxes = [
    {
      id: 1,
      className: 'one',
      name: "1. 기기 연결하기",
      description: (
        <div>
          기기를 연결해주세요. <br /> 아직 연결하지 않았다면, <br />아래 버튼을
          눌러주세요.
          <div className="btndiv">
            <button type="button" onClick={goToConnect}>
              기기 연결
            </button>
          </div>
        </div>
      ),
      image: "/videos/otp.png"
    }
    ,
    { id: 2, className: 'two', name: "2. 동화 선택하기", description:(
      <div>
      책장에서 책을 골라주세요. <br /> 재밌는 동화가 여러분을 <br />기다리고 있어요!
    </div>
    ), image: "/videos/books.png" },
    { id: 3, className: 'three', name: "3. 출력 후 색칠하기", description: (
      <div>
      캐릭터를 출력해 색칠해주세요. <br /> 여러분의 그림이 동화의 주인공!
    </div>
    ), image: "/videos/crayon.png" },
    { id: 4, className: 'four', name: "4. 환경 체크하기", description: (
      <div>
      원활한 진행을 위해 필요해요. <br /> 디바이스에 필요한 환경 설정을 <br />꼭 완료해주세요!
    </div>
    ), image: "/videos/setting.png" }
  ];


  return (
    <>
      <Header />
      <Wrapper>
        <h1>동화 여행을 떠나고 싶다면? 😙</h1>
        <div className="boxes">
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
      </Wrapper>
      <Modal closeModal={closeModal} isModalOpen={isModalOpen} message={"기기가 이미 연결되어 있어요."} clickResult={goToBooks}></Modal>
    </>
  );
}

export default Guide;