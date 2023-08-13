import styled from "styled-components";

const Wrapper = styled.div`
  font-family: "Pretendard-Regular";
  text-align: center;
  margin: 80px;

  .all{
    display: flex;
    justify-contents: space-around;
    align-items: center;
  }

  button:hover{
    background-color: #ffffff;
    border: solid 1px #9d4fe0;
    color: black;
  }

  button {
    // display: flex;
    // align-items: center;
    padding: 8px 20px;
    border-radius: 5px;
    border: none;
    cursor: pointer;
    background-color: #9d4fe0;
    color: #ffffff;
  }

  // step별 style
  h1 {
    font-weight: bold;
    font-size: 45px;
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

  .image-wrapper {
    position: relative;
  }
  
  // 라이브캠 로딩 페이지
  .loading {
    z-index: 0;
  }

  .overlay-livecam {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1; /* 더 높은 값으로 조정하여 겹치는 순서를 변경할 수 있음 */
  }
  
  .guideline {
    position: absolute;
    left: 0;
    bottom: 0;
    z-index: 2;
  }
`;

export default Wrapper;
