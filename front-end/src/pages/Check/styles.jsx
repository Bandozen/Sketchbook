import styled from "styled-components";

const Wrapper = styled.div`
  font-family: "Pretendard-Regular";

  text-align: center;
  margin: 0 auto;

  .container {
    margin-top: 30px;
  }

  h1 {
    color: #9D4FE0;
  }

  h2 {
    font-weight: bold;
    font-size: 50px;
    margin-top: 20px;
  }

  .box {
    border: 1px solid black;
    padding: 10px;
    height: 800px;
    border-radius: 10px;
    border: 1px solid black;
    width: 100%;
  }

  .arrow {
    width: 10%;
    height: 10%;
    position: absolute;
    right: 10px;
    object-fit: contain;
    cursor: pointer;
  }
`;

export default Wrapper;
