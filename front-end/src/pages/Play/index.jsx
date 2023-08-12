import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom'; // 필요한 모듈 import 추가
import Wrapper from './styles';
import Modal from '../../components/Modal';
import isConnected from '../../utils/isConnected';

function Play() {
  const navigate = useNavigate(); // useNavigate 훅 사용
  const connection = isConnected();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ConnectModal, setConnectModal] = useState(false);
  
  const closeConnectModal = () => {
    setConnectModal(false);
    navigate("/connect");
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (connection === "false") {
      setConnectModal(true);
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        navigate('/books'); // "esc" 키 누르면 경로 변경
      }
    };

    const handleKeyUp = (event) => {
      if (event.key === 'PrintScreen') {
        try {
          navigator.clipboard.writeText("🚨 스케치북의 동화 컨텐츠의 저작권은 동화 작가님과 출판사에 있습니다. 무단으로 도용, 불법으로 복사(캡처)하여 사용할 경우 사전 경고 없이 민·형사상 법적조치 등 저작권법에 의한 처벌을 받을 수 있습니다. 🚨")
        } catch (e) {
          console.error(e);
        }
        
        openModal();
      }
    }
    
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [navigate]);

  const preventClick = (e) => {
    e.preventDefault();
    openModal();
  };

  return (
    <Wrapper onContextMenu={preventClick} onDragStart={preventClick}>
      <Outlet />
      <Modal isModalOpen={isModalOpen} clickResult={closeModal} 
      message = {"🚨 스케치북의 동화 컨텐츠의 저작권은 동화 작가님과 출판사에 있습니다. 무단으로 도용, 불법으로 복사(캡처)하여 사용할 경우 사전 경고 없이 민·형사상 법적조치 등 저작권법에 의한 처벌을 받을 수 있습니다. 🚨"}/>
      <Modal isModalOpen={ConnectModal} clickResult={closeConnectModal} 
      message = {"기기 연결이 되어 있지 않습니다."}/>
    </Wrapper>
  );
}

export default Play;
