import Wrapper from "./styles";
import image1 from '../../../../play-background/엄마는 카멜레온_7.gif';
import audio7 from '../../../../play-background/ske_7.mp3';
import { useNavigate } from 'react-router-dom';

function P7() {
    const navigate = useNavigate();
        setTimeout(() => {
            navigate('/play/story1/p8');
        }, 15000);

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
