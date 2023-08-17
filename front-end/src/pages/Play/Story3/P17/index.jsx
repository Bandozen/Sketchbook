import { useEffect, useState } from "react";
import image17 from "../../../../play-background/엄마는 카멜레온_17.gif";
import audio17 from "../../../../play-background/ske_17.mp3";
import { useNavigate } from "react-router";
import { CustomDialog } from "../styles";

function P17() {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setModalOpen(true);
    }, 31000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const handleCloseModal = () => {
    navigate("/books");
  };


  return (
    <div>
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
    </div>
  );
}

export default P17;
