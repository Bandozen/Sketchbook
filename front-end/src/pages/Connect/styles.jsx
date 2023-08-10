import styled from "styled-components";

const Wrapper = styled.div`

font-family: 'Pretendard-Regular';

.modal {
  position: fixed;
  z-index: 1000;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  width: 80%;
  max-width: 400px; 
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  position: relative;
}

.close-button {
  position: absolute;
  right: 15px;
  top: 15px;
  font-size: 20px;
  cursor: pointer;
  border: none;
  background: none;
}

.btndiv button {
  padding: 10px 15px;
  background-color: #c474f8;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  font-size: 16px;
  transition: background-color 0.3s;
  // border: 1px solid #8f39ea;
}

.btndiv button:hover {
  background-color: #8f39ea;
}


.title {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin-bottom: 30px;
  width: 100%;


  h1 {
    font-weight: bold;
    font-size: 35px;
  }
}

.connect-button {

  text-align: center; 
  line-height: 40px; 
  color: #8f39ea;
  font-size: 25px;
  text-decoration: none; 
  font-weight: bold;
}

.connect-button:hover {
  color: purple;
}

.real_box {
  display: flex;
  justify-content: space-between;
  gap: 20px;
}


.boxes{
  display: flex;
  align-items: center; 
  justify-content: center; 
  flex-direction: column;
  padding: 100px;
}



.box-name {
  font-size: 25px;
}  

.box .one{
  width: 300px;
  height: 300px;
}

.box .two{
  width: 300px;
  height: 300px;
}

.box .three{
  width: 300px;
  height: 300px;
}

.box .four{
  width: 300px;
  height: 300px;
}

// h1 {
//   font-weight: bold;
//   font-size: 35px;
// }

.boxes {
  display: flex;
  justify-content: space-between;
}

.box {
  width: 300px;
  height: 400px;
  background-color: #F8F8F8;
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  margin: 10px;
  border-radius: 10px;
}

.box.active img {
  opacity: 0.1; /* 이미지 투명도 조정 */
}

.box.active .box-name {
  color: white;
}

.box.active {
  background-color: #333;
  color: white;
}

.description {
  position: absolute;
  color: white;
  font-size: 20px;
  display: flex;
  justify-content: center;
  text-align: center;
  padding: 10px;
}
  
  .btndiv{
    display: flex;
    justify-content: center; 
  }

  button {
    color: #a451f7;
    border-radius: 8px;
    border: 1px solid #a451f7;
    background-color: #ffffff;
    padding: 10px 20px;
    font-weight: bold;
    font-size: 20px;
    width : 177px;
  }

  .timerCount{
    text-align: center;
    margin-top : 20px;
    font-size: 60px;
    font-weight: bold;
  }
  `;
  
  export default Wrapper;
