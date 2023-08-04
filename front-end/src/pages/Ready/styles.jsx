import styled from 'styled-components';

export const Wrapper = styled.div`
font-family: 'Pretendard-Regular';
text-align: center;
height: 100%;
color : #9D4FE0;
// margin : 0 auto;

.ready-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
p {
  color: black;
  font-size: 18px;
  margin-top: 10px;
}
h2 {
    font-weight: bold;
    margin: 0px;
}

.ready-message {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 100px;
}

img{
  width : 80px;
  margin : 0 0 5px 20px;
}

.custom-button-style {
    width: 250px;
    height: 45px;
    color: #000000;
    background-color: #D3B2FF;
    border-color: #D3B2FF;
    margin-bottom: 10px;
  }

  .custom-button-style:hover {
    color: #9D4FE0;
    background-color: #ffffff;
    border: solid 1px #9D4FE0;

  }
`;

export default Wrapper;