import Wrapper from "./styles";
import image1 from '../../../../play-background/엄마는 카멜레온_10.gif';
import audio10 from '../../../../play-background/ske_10.mp3';

function P10() {

    return (
        <Wrapper>
            <img src={image1} alt="" />
            <audio autoPlay>
                <source src={audio10} type="audio/mp3" />
            </audio>  
            
        </Wrapper>
    )
}

export default P10;
