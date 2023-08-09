import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { Wrapper, FontWrap } from "./styles";
import { useNavigate } from 'react-router-dom';
import isConnected from "../../utils/isConnected";


function BookCard({ book }) {
  const connection = isConnected();
  let navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handleModalShow = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const StartPlay = () => {
    navigate('/check/capture');
  };

  const goToConnect = () => {
    navigate('/connect');
  }

  // 출력 버튼 클릭
  const handlePrint = () => {
    // 새창 생성
    const printWindow = window.open("", "Print Window", "width=800,height=600");

    // 창 페이지 구성
    const printContent = `
    <style>
            @media print {
              .print-show { display:block;}
              .print-hide {display:none;}
              @page {size: A4 landscape;}
              @page :first {margin:0 1.3cm}
              html {margin:1.3cm 0;}
}
              img { width: 100%; height: auto; page-break-after: always;}
            </style>
            <img src="${process.env.PUBLIC_URL}/assets/print.jpg" alt="print">
      `;

    printWindow.document.write(printContent);

    setTimeout(() => {
      printWindow.print();
    }, 500);
  };


  return (
    <>
      <FontWrap>
        <Card
         style={{ width: "100%", maxWidth: "25rem", margin: "20px 0px 20px 0px" }}
         onClick={handleModalShow}
        >
          <Card.Img
            variant="top"
            src={book.bookcover}
            style={{ width: "24.9rem", height: "30rem" }}
          />
          <Card.Body>
            <Card.Title style={{ textAlign: "center", fontSize: "24px" }}>
              {book.title}
            </Card.Title>
          </Card.Body>
        </Card>
      </FontWrap>

      <Modal show={showModal} onHide={handleModalClose} size="xl">
        <Modal.Header closeButton>
          {/* <Modal.Title>{book.title}</Modal.Title> */}
        </Modal.Header>
        <Modal.Body>
          <Wrapper>
            <div style={{ flex: 1 }}>
              <img
                src={book.bookcover}
                alt={book.title}
                style={{ width: "100%", height: "auto", maxWidth: "25rem", maxHeight: "30rem" }}
              />
            </div>
            <div style={{ flex: 2, padding: "10px 40px 10px 40px" }}>
              <h2>{book.title}</h2>
              <h5>{book.writer} 작가</h5>
              <br />
              {/* <p>{book.summary}</p> */}
              <p
                dangerouslySetInnerHTML={{
                  __html: book.summary.replace(/\n/g, "<br>"),
                }}
              />

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  marginTop: "80px",
                }}
              >
                <Button
                  variant="outline-primary"
                  className="custom-button-style"
                  onClick={handlePrint}
                >
                  캐릭터 출력하기
                </Button> 
                {connection ==='true' ? <a href="/check/capture">
                <Button
                  variant="outline-primary"
                  className="custom-button-style"
                  onClick={StartPlay}
                >
                  시작하기
                </Button>
                </a>:
                <Button
                variant="outline-primary"
                className="custom-button-style"
                onClick={goToConnect}
              >
                연결하러 가기
              </Button>}
                
              </div>
            </div>
          </Wrapper>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default BookCard;