import Wrapper from "./styles";
import image1 from '../../../../play-background/엄마는 카멜레온_4.gif';
import audio4 from '../../../../play-background/ske_4.mp3';

function P4() {

    return (
        <Wrapper>
            <img src={image1} alt="" />

            <audio autoPlay>
                <source src={audio4} type="audio/mp3" />
            </audio>
            
        </Wrapper>
    )
}

export default P4;
