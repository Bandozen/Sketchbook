import styled from "styled-components";

const Wrapper = styled.div`
  font-family: "Pretendard-Regular";
  text-align: center;
  margin: 80px;

  .all {
    display: flex;
    justify-contents: space-around;
    align-items: center;
  }

  button:hover {
    background-color: #ffffff;
    border: solid 2px #9d4fe0;
    color: black;
  }
  
  button {
    border: solid 2px #9d4fe0;
    padding: 8px 20px;
    border-radius: 5px;
    cursor: pointer;
    background-color: #9d4fe0;
    color: #ffffff;
  }

  // step별 style
  h1 {
    font-weight: bold;
    font-size: 45px;
    color: #9d4fe0;
  }

  // 1~5단계별 제목
  h2 {
    font-weight: bold;
    font-size: 40px;
    margin-top: 20px;
  }

  .image-wrapper {
    position: relative;
    border: solid 2px #9d4fe0;
    border-radius: 10px;
    margin: 30px;
    padding: 5px;
  }

  // 라이브캠 로딩 페이지
  .loading {
    z-index: 0;
  }

  .overlay-livecam {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1000; /* 더 높은 값으로 조정하여 겹치는 순서를 변경할 수 있음 */
  }

  .guideline {
    position: absolute;
    left: 0;
    bottom: 0;
    z-index: 9999;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  
  .loading_dot {
    position: absolute;
    left: 45%;
    bottom: 15%;
    z-index: 9999;
    animation: spin 2s linear infinite;
  }

  .play-btn {
    margin-right: 5px;
  }
`;

export default Wrapper;
