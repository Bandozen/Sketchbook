import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .image-container {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }

  img {
    object-fit: cover;
    height: 100vh;
    width: 100vw;
  }

  /* 각 png 이미지에 다른 스타일을 적용하기 위해 data-index 속성을 활용합니다. */
  .png-image[data-index="2"] {
    /* 원하는 스타일을 추가하시면 됩니다. 예시로 border를 추가해 보겠습니다. */
    width: 450px;
    height: 610px;
    position: absolute;
    bottom: 0%;
    right: -1.5%;
  }

  .png-image[data-index="4"] {
    /* 원하는 스타일을 추가하시면 됩니다. 예시로 box-shadow를 추가해 보겠습니다. */
    width: 350px;
    height: 500px;
    position: absolute;
    bottom: 10%;
    left: 2%;
  }

  .numbering {
    display: flex;
    align-items: center;
    justify-content: right;
    position: absolute; 
    right: 15px; 
    bottom: 10px;
    font-size: 15px;
  }
`;

export default Wrapper;
