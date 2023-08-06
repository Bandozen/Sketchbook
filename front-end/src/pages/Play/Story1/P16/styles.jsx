import styled from 'styled-components';
// import styled, { keyframes, css } from 'styled-components';

// // fadeIn 애니메이션 효과 정의
// const fadeInAnimation = keyframes`
//   from {
//     opacity: 0;
//   }
//   to {
//     opacity: 1;
//   }
// `;

// const fadeInStyle = css`
//   animation: ${fadeInAnimation} 1s ease forwards; /* animation-fill-mode를 forwards로 설정 */
// `;

const Wrapper = styled.div`
  display: flex;

  img {
    width: 100%;
    background-size: cover;
  }

`;

export default Wrapper;

// 엄마손 png 애니메이션 효과
//   .png-image {
//     // width: 100%;
//     // height: 100%;
    
//     width: 440px;
//     height: 450px;
//     position: absolute;
//     top: -6%;
//     right: 1%;

//     // fadeInStyle 스타일 적용
//     opacity: 0; /* 초기에 투명 상태로 설정 */
//     animation: ${fadeInAnimation} 1s ease 3s both; /* 3초 뒤에 애니메이션 실행 */
//   }