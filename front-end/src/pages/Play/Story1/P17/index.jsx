import { useEffect, useState } from "react";
import Wrapper from "./styles";
import image17 from "../../../../play-background/엄마는 카멜레온_17.gif";
import audio17 from "../../../../play-background/ske_17.mp3";
<<<<<<< HEAD
import { useNavigate } from "react-router";
import { CustomDialog } from "../styles"; // Story1에서 CustomDialog 가져오기
=======
import axios from "axios";

// mp3 18초?
// 미션 끝나면 동화 종료 직전에 모달창 뜨게하기 !
>>>>>>> d56a7b99c29b6792841a6405242c23044786cf01

function P17() {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setModalOpen(true);
    }, 32000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const handleCloseModal = () => {
    navigate("/books");
  };


  return (
    <Wrapper>
      <img className="back-ground" src={image17} alt="" />
      <audio autoPlay>
        <source src={audio17} type="audio/mp3" />
      </audio>
      {modalOpen && (
        <CustomDialog>
          <p>동화가 끝났어요. 다른 동화를 보러 가 볼까요?</p>
          <button onClick={handleCloseModal}>확인</button>
        </CustomDialog>
      )}
    </Wrapper>
  );
}

export default P17;
