import styled from 'styled-components';

const Wrapper = styled.div`

img {
    background-size: cover
}

.character {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    width: 640px;
    height: 480px;
}
`;
export default Wrapper;