import Wrapper from "./styles";
import image from '../../../../play-background/엄마는 카멜레온_16.png';
import audio16 from '../../../../play-background/ske_16.mp3';

function P16() {

    return (
        <Wrapper>
            <img src={image} alt="" />
            <audio autoPlay>
                <source src={audio16} type="audio/mp3" />
            </audio>
        </Wrapper>
    );
}

export default P16;
