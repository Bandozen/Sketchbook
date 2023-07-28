import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  img{
    width : 100px;
    margin-left : 10px;
  }

  h2 {
    font-weight: bold;
    text-align: center;
  }
  
  span {
    color: #a451f7
  }
  
  .box {
    margin: 100px;
    background-color: #f8f8f8;
    border-radius: 10px;
    padding: 6% 13%;    
  }
  
  ol{
    margin: 20px 0 40px;
  }

  li {
    font-size: 25px;
    line-height: 60px;
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
    padding: 15px 25px;
    font-weight: bold;
    font-size: 20px;
  }
  `;
  
  export default Wrapper;
