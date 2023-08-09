import Wrapper from "./styles";
import image17 from '../../../../play-background/엄마는 카멜레온_17.gif';
import audio17 from '../../../../play-background/ske_17.mp3';

// mp3 18초
function P17() {

    return (
        <Wrapper>
            <img src={image17} alt="" />
            <audio autoPlay>
                <source src={audio17} type="audio/mp3" />
            </audio>
        </Wrapper>
    )
}

export default P17;
