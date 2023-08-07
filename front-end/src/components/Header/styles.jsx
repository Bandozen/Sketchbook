import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center; /* 추가: 컴포넌트를 수직 중앙 정렬 */

  padding: 10px 20px; /* 추가: 헤더에 좀 더 공간을 주기 위한 패딩 설정 */
  box-shadow: 0 1px 7px -5px black;
  font-family: 'Pretendard-Regular';

  .logo {
    width: 150px;
  }

  .links {
    display: flex;
  }

  /* 추가: 화면이 768px 이하일 때의 스타일 */
  @media (max-width: 768px) {
    flex-direction: column; /* 세로 정렬로 변경 */
    padding: 10px; /* 좀 더 간격을 줄임 */

    .logo {
      margin-bottom: 10px; /* 로고와 링크들 사이에 간격 추가 */
    }
  }

  a {
    text-decoration: none;
    color: #000000;
    margin-right: 20px;
    font-size: 18px;
    cursor: pointer;

    &.active {
      font-weight: bold;
    }
  }

  p {
    margin-right: 20px;
    margin : auto 20px;
    font-size: 18px;
    cursor: pointer;

    @media (max-width: 768px) {
      margin-bottom: 10px; /* 세로 정렬일 때 간격 추가 */
    }
  }
`;

export default Wrapper;
