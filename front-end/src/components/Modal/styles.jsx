import styled from 'styled-components';

const Wrapper = styled.div`
font-family: 'Pretendard-Regular';


  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9999;

.modal-box {
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
  background-color: #f8f8f8;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  padding: 20px;
  width: 325px;
  align-items: center;
  text-align: center;
}

  p {
    margin-bottom: 20px;
  }

  button {
    background-color: #9d4fe0;
    color: white;
    border: none;
    padding: 8px 20px;
    border-radius: 5px;
    cursor: pointer;
  }

  .modal__background{
    position: fixed;
    top:0; left: 0; bottom: 0; right: 0;
    background: rgba(0, 0, 0, 0.8);
  }
`;

export default Wrapper;