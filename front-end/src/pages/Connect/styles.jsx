import styled from "styled-components";

const Wrapper = styled.div`

font-family: 'Pretendard-Regular';

  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;

  img{
    width : 100px;
    margin-left : 10px;
  }

  h2 {
    font-weight: bold;
  }
  
  span {
    color: #a451f7
  }
  
  .box {
    margin-top: 50px;
    background-color: #f8f8f8;
    border-radius: 10px;
    padding: 3% 5%;    
  }
  
  
  ol{
    margin: 20px 0 40px;
  }

  li {
    font-size: 25px;
    line-height: 42px;
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
