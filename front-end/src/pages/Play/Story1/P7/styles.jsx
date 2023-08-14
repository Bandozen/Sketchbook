import styled from 'styled-components';

const Wrapper = styled.div`

// 캐릭터가 잔소리보다 위에 있도록 배치
.character-cam {
  z-index: 9999;
}

.balloon {
  // z-index: 1000;
}

// 1번째, 위 "숙제해"
.study {
  position: absolute;
  top: 5%;
  left: 50%;
  transform: rotate(180deg);
}

// 2번째, 오른쪽 "빨리빨리"
.hurry {
  position: absolute;
  bottom: 5%;
  left: 75%;
  transform: rotate(260deg);
}

// 3번째, 왼쪽 "씻어라"
.wash {
  position: absolute;
  bottom: 30%;
  left: 5%;
  transform: rotate(200deg);
}
`;
export default Wrapper;