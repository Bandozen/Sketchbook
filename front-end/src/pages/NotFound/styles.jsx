import styled from "styled-components";


const Wrapper = styled.div`
font-family: 'Pretendard-Regular';

display: flex;
justify-content: center;
align-items: center; /* 세로로 가운데 정렬을 추가 */
height: 90vh; /* 전체 뷰포트 높이만큼의 공간을 차지하여 세로로 가운데 정렬 */

  .notfound {
    font-size: 100px;
  }

  h3 {
    align-items: center;
    text-align: center;
  }
`;

export default Wrapper;
