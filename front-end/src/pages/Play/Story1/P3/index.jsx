import Wrapper from "./styles";
import image1 from '../../../../play-background/엄마는 카멜레온_3.gif';
import audio3 from '../../../../play-background/ske_3.mp3';


function P3() {

    return (
        <Wrapper>
            <img src={image1} alt="" />

            <audio autoPlay>
                <source src={audio3} type="audio/mp3" />
            </audio>
            
        </Wrapper>
    )
}

export default P3;
