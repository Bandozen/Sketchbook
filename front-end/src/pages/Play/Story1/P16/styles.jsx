import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  .image-container {
    position: relative;
  }

  // img {
  //   width: 100%;
  //   background-size: cover;
  // }

  .image-button {
    position: absolute;
    top: 50%; /* 이미지 중앙에 위치 */
    right: 0;
    transform: translateY(-50%);
    padding: 10px 20px;
    background-color: #3498db;
    color: white;
    border: none;
    cursor: pointer;
  }
`;

export default Wrapper;
