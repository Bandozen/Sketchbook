import Wrapper from "./styles";
import image16 from '../../../../play-background/엄마는 카멜레온_16.gif';
import audio16 from '../../../../play-background/ske_16.mp3';



function P1() {

    return (
        <Wrapper>
            <img src={image16} alt="" /> 
            <audio autoPlay>
                <source src={audio16} type="audio/mp3" />
            </audio>
        </Wrapper>
    )
}

export default P1;
