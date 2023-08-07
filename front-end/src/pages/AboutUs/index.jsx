import Header from '../../components/HeaderNone';
import Wrapper from './styles';
import { Fade, Slide } from "react-awesome-reveal";

function AboutUs() {
    return (
        <Wrapper>
            <div className="img-container">
                <Header />
                <img className='kid-img' src="/videos/kids_drawing.jpg" alt=''></img>
                <div className="text-overlay">
                    <Fade cascade damping={0.2}>
                        <h1 className='text-overlay_h1'>동화, 그 이상의</h1>
                        <h1 className='text-overlay_h1'>가치를 만들고 있습니다.</h1>
                        <br></br>
                        <h3 className='text-overlay_h3'>아이의 상상을 현실로 만듭니다.</h3>

                    </Fade>
                </div>
            </div>
            <Slide direction="up" triggerOnce>
                <div className="img-container2">
                    <div className="text-overlay">
                        <Fade cascade damping={0.2}>
                            <h1 className='text-overlay_h1'>스케치북의 여정</h1>

                        </Fade>
                    </div>
                </div>
            </Slide>

            <Slide direction="up" triggerOnce>
                <div>
                    <div className="img-container3">
                        <div className="text-overlay2">
                            <Fade cascade damping={0.2}>
                                <h1 className='text-overlay2_h1'>스케치북을 만든 이들</h1>
                                <h3 className='text-overlay_h3'>김진주 박근창 서정빈 안민 이지은 조찬익<br></br></h3>

                                <div className="boxes-container">
                                    <div className="box">
                                        <h2>박스 1</h2>
                                        <p>박스 1의 역할을 적어주세요.</p>
                                    </div>
                                    <div className="box">
                                        <h2>박스 2</h2>
                                        <p>박스 2의 역할을 적어주세요.</p>
                                    </div>
                                    <div className="box">
                                        <h2>박스 3</h2>
                                        <p>박스 3의 역할을 적어주세요.</p>
                                    </div>
                                </div>
                            <div className="boxes-container">
                                <div className="box">
                                    <h2>박스 4</h2>
                                    <p>박스 4의 역할을 적어주세요.</p>
                                </div>
                                <div className="box">
                                    <h2>박스 5</h2>
                                    <p>박스 5의 역할을 적어주세요.</p>
                                </div>
                                <div className="box">
                                    <h2>박스 6</h2>
                                    <p>박스 6의 역할을 적어주세요.</p>
                                </div>
                            </div>

                            </Fade>
                        </div>
                    </div>
                </div>
            </Slide>


        </Wrapper>
    )
}

export default AboutUs;
