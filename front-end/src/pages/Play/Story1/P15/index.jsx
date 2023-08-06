import Wrapper from "./styles";
import image15 from '../../../../play-background/엄마는 카멜레온_15.gif';
import audio15 from '../../../../play-background/ske_15.mp3';

function P15() {

    return (
        <Wrapper>
            <img src={image15} alt="" /> 
            <audio autoPlay>
                <source src={audio15} type="audio/mp3" />
            </audio>
        </Wrapper>
    )
}

export default P15;
