// import { useState, useEffect } from 'react';
// import Image16 from '../../../../play-png/16_엄마손.png';
import Wrapper from "./styles";
import image16 from '../../../../play-background/엄마는 카멜레온_16.gif';
import audio16 from '../../../../play-background/ske_16.mp3';



function P15() {
    // const [isAnimationStarted, setIsAnimationStarted] = useState(false);

    // useEffect(() => {
    //     // 3초 뒤에 애니메이션 시작을 표시합니다.
    //     const timer = setTimeout(() => {
    //         setIsAnimationStarted(true);
    //     }, 2700000);

    //     return () => {
    //         clearTimeout(timer);
    //     };
    // }, []);

    return (
        <Wrapper>
            <img src={image16} alt="" /> 
            <audio autoPlay>
                <source src={audio16} type="audio/mp3" />
            </audio>
        </Wrapper>
    );
}

export default P15;
