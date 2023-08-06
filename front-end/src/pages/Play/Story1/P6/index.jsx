import Wrapper from "./styles";
import image1 from '../../../../play-background/엄마는 카멜레온_6.gif';
import audio6 from '../../../../play-background/ske_6.mp3';

function P6() {

    return (
        <Wrapper>
            <img src={image1} alt="" />
            
            <audio autoPlay>
                <source src={audio6} type="audio/mp3" />
            </audio>
            
        </Wrapper>
    )
}

export default P6;
