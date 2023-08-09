import styled from "styled-components";

const Wrapper = styled.div`
display: flex;
justify-content: start;
align-items: center;
text-align: center;

.step{
    background-color: #9D4FE0;
    border-radius: 100%;
    padding: 30px;
    width: 70px;
    height: 70px;
    color : #FFFFFF;
    font-size : 40px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.message{
    margin : 20px;
    font-size : 50px;
    color : lightgray;
}

.active{
    color : black;
}


`;

export default Wrapper;