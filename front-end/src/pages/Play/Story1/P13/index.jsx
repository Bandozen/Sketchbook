import Wrapper from "./styles";
import image from '../../../../play-background/엄마는 카멜레온_13.gif';
import audio13 from '../../../../play-background/ske_13.mp3';


function P13() {

    return (
        <Wrapper>
            <img src={image} alt="" />
            <audio autoPlay>
                <source src={audio13} type="audio/mp3" />
            </audio>
        </Wrapper>
    )
}

export default P13;
