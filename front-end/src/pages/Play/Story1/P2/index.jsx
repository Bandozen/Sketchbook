import Wrapper from "./styles";
import image2 from '../../../../play-background/엄마는 카멜레온_2.gif';
import audio2 from '../../../../play-background/ske_2.mp3';


function P2() {
    return (
        <Wrapper>
            <img src={image2} alt="" />
            
            <audio autoPlay>
                <source src={audio2} type="audio/mp3" />
            </audio>
        </Wrapper>
    )
}

export default P2;
