import image from '../../../../play-background/엄마는 카멜레온_16.gif';
// import { useState, useEffect } from 'react';
// import Image16 from '../../../../play-png/16_엄마손.png';
import Wrapper from "./styles";

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
            <div>
                <img src={image} alt="" />
                {/* <img
                    className={isAnimationStarted ? 'png-image fadeIn' : 'png-image'}
                    src={Image16}
                    alt="Image 16"
                /> */}
            </div>
        </Wrapper>
    );
}

export default P15;
