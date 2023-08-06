import Wrapper from "./styles";
import image1 from '../../../../play-background/엄마는 카멜레온_5.gif';
import audio5 from '../../../../play-background/ske_5.mp3';

function P5() {

    return (
        <Wrapper>
            <img src={image1} alt="" />
            
            <audio autoPlay>
                <source src={audio5} type="audio/mp3" />
            </audio>
            
        </Wrapper>
    )
}

export default P5;
