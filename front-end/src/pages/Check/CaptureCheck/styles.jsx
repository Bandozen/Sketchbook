import styled from "styled-components";


const Wrapper = styled.div`
font-family: 'Pretendard-Regular';
justify-content: center;

iframe {
    height: 510px;
}

.arrow {
    position: absolute;
    bottom: 0;
    width: 80px;
    height : 100%;
    right: 0;
    padding : 0 10px;
    margin : auto 0;
}

.arrow:hover {
    background : linear-gradient(to right, white, lightgray);
    right: 0;
}
`;

export default Wrapper;
