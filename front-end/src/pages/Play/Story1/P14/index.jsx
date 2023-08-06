import Wrapper from "./styles";
import image from '../../../../play-background/엄마는 카멜레온_14.gif';
import audio14 from '../../../../play-background/ske_14.mp3';


function P14() {

    return (
        <Wrapper>
            <img src={image} alt="" />
            <audio autoPlay>
                <source src={audio14} type="audio/mp3" />
            </audio>
        </Wrapper>
    )
}

export default P14;
