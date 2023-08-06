import Wrapper from "./styles";
import image1 from '../../../../play-background/엄마는 카멜레온_7.gif';
import audio7 from '../../../../play-background/ske_7.mp3';

function P7() {

    return (
        <Wrapper>
            <img src={image1} alt="" />
            <audio autoPlay>
                <source src={audio7} type="audio/mp3" />
            </audio>            
        </Wrapper>
    )
}

export default P7;
