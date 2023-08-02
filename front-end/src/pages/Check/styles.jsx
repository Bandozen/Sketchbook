import styled from "styled-components";

const Wrapper = styled.div`
  font-family: "Pretendard-Regular";

  text-align: center;
  margin: 0 auto;

  .container {
    padding: 50px;
  }

  .check-title {
    font-weight: bold;
    color: #9D4FE0;
  }

  // 1~5단계별 제목
  h2 {
    font-weight: bold;
    font-size: 40px;
    margin-top: 20px;
  }

  .box {
    border: 1px solid black;
    padding: 10px;
    // display: flex;
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
