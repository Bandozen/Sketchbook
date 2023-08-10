import styled from "styled-components";

const Wrapper = styled.div`
  font-family: 'Pretendard-Regular';
  // height: 90vh;
  // display: flex;
  // flex-direction: column;

  .real_box{
    display: flex;
    flex-direction: row;
  }

  .boxes{
    display: flex;
    align-items: center; 
    justify-content: center; 
    flex-direction: column;
  }

  .btndiv{
    padding: 1em;
  }

  button {
    // border: 1.5px solid #a451f7;
    background-color: #FAC52F;
    border-radius: 8px;
    // color: #a451f7;
    height: 40px;
    width: 100px;
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

  .for_text {
    display: flex;
  }

  h1 {
    font-weight: bold;
    margin-bottom: 40px;
    font-size: 35px;
  }

  .boxes {
    display: flex;
    // justify-content: space-between;
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
`;

export default Wrapper;
