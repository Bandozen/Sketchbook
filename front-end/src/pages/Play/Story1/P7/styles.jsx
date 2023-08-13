import styled from 'styled-components';

const Wrapper = styled.div`

.character-cam {
  z-index: 9999;
}

.balloon {
  z-index: 1000;
}

.study {
position: absolute;
top: 0;
left: 50%;
transform: rotate(180deg);
}

.hurry {
position: absolute;
bottom: 5%;
left: 70%;
transform: rotate(260deg);
}

.wash {
position: absolute;
bottom: 30%;
left: 5%;
transform: rotate(200deg);

}
`;
export default Wrapper;