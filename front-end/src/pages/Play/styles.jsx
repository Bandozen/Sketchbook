import styled, { keyframes, css } from 'styled-components';

// fadeIn 애니메이션 효과 정의
const fadeInAnimation = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const fadeInStyle = css`
  animation: ${fadeInAnimation} 1s ease forwards; /* animation-fill-mode를 forwards로 설정 */
`;

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
    width: 85vw;
  }

  /* 각 png 이미지에 다른 스타일을 적용하기 위해 data-index 속성을 활용 */
  .png-image[data-index="2"] {
    width: 365px;
    height: 478px;
    position: absolute;
    bottom: 9%;
    right: 0%;
    opacity: 0;

    animation: ${fadeInAnimation} 1s ease 3s both; /* 3초 뒤에 애니메이션 실행 */

    /* animation-fill-mode를 both로 설정하여 애니메이션 실행 후도 스타일 유지 */
    animation-fill-mode: both;
  }


  .png-image[data-index="4"] {
    width: 350px;
    height: 500px;
    position: absolute;
    bottom: 10%;
    left: 2%;
    ${fadeInStyle}
  }
`;

export default Wrapper;
