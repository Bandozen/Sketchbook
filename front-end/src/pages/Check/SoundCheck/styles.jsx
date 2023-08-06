import styled from "styled-components";

export const SoundWrapper = styled.div`

.box{
    box-shadow: 1px 2px 10px grey;
    border : none;
    width: 100%;
    height: 400px;
    margin-top :30px;
    margin-bottom :30px;

}

.images{
    display : flex;
    align-items : center;
}

.sound{
    padding : 20px;
    width : 70%;
    display: flex;
    flex-direction: column;
}

.sound img { 
    width: 100%;
    height: 100%;
    z-index: 2;
}

.gauge{
    max-width: 90%;
    height: 43%;
    background-color: black;
    position: absolute;
    z-index: 1;
}

.volume {
    width : 20%;
    object-fit: contain;
    z-index: 2;
}

button{
    border : none;
    border-radius : 10px;
    font-weight : bold;
    padding : 10px;
    background-color : #D3B2FF;
}

h4{
    font-weight : bold;
    margin : 20px;
}

.arrow {
    position: absolute;
    bottom: 0;
    width: 80px;
}
`;

export default SoundWrapper;
