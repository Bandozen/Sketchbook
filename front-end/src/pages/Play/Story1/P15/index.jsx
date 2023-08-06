import Wrapper from "./styles";
import image from '../../../../play-background/엄마는 카멜레온_15.gif';
import audio15 from '../../../../play-background/ske_15.mp3';

function P1() {

    return (
        <Wrapper>
            <img src={image} alt="" />
            <audio autoPlay>
                <source src={audio15} type="audio/mp3" />
            </audio>
        </Wrapper>
    )
}

export default P1;
