import Wrapper from "./styles";
import image from '../../../../play-background/엄마는 카멜레온_11.gif';
import audio11 from '../../../../play-background/ske_11.mp3';


function P11() {

    return (
        <Wrapper>
            <img src={image} alt="" />
            <audio autoPlay>
                <source src={audio11} type="audio/mp3" />
            </audio>  
        </Wrapper>
    )
}

export default P11;
