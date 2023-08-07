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
                    <div className="text-overlay_ballon">
                        <Fade cascade damping={0.2} delay={200}>
                            <div className="container">
                                <div className="message-container">
                                    <div className="message-box">
                                        <p>프로젝트를 어떻게 시작하시게 된거죠? 기획의도가 궁금해요! 🙄</p>
                                    </div>
                                </div>
                            </div>
                        </Fade>
                    </div>
                    <div className="text-overlay_ballon2">
                        <Fade cascade damping={0.2} delay={400}>
                            <div className="container">
                                <div className="message-container">
                                    <div className="message-box2">
                                        <p>
                                            16:00 ~ 19:30 까지 돌봄 공백 영유아를 대상으로 어린이집에서는 연장보육제도를
                                            운영해요. <br></br> 주로 맞벌이 부모님을 둔 자녀들이 이용하죠.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </Fade>
                    </div>
                    <div className="text-overlay_ballon3">
                        <Fade cascade damping={0.2} delay={600}>
                            <div className="container">
                                <div className="message-container">
                                    <div className="message-box">
                                        <p>어랏 몰랐던 사실이네요! 😯</p>
                                    </div>
                                </div>
                            </div>
                        </Fade>
                    </div>
                    <div className="text-overlay_ballon4">
                        <Fade cascade damping={0.2} delay={400}>
                            <div className="container">
                                <div className="message-container">
                                    <div className="message-box2">
                                        <p> 부모님들은
                                            연장보육시간 동안의 아이 교육적 활동 부족을 늘 안타까워해요.😢 <br></br> 그래서 우리는
                                            연장보육반 영유아를 위한 동화 프로그램을 개발하기로 결심했어요! <br></br>
                                            <p style={{color:'purple', fontSize:'35px'}}>'모션과 음성인식 기반의 동화와 아이 간 상호작용 교육'</p>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </Fade>
                    </div>
                </div>
            </Slide>


            <Slide direction="up" triggerOnce>
                <div>
                    <div className="img-container2">
                        <div className="text-overlay2">
                            <Fade cascade damping={0.2}>
                                <h1 className='text-overlay2_h1'>스케치북을 만든 이들</h1>
                                <h3 className='text-overlay_h3'>김진주 박근창 서정빈 안민 이지은 조찬익<br></br></h3>
                                <br></br>
                                <div className="boxes-container">
                                    <div className="box">
                                        <img src="/videos/dingdu.png" alt='' style={{ width: '130px', height: '150px' }}></img>
                                        <div className='name'>
                                            <h2 style={{ fontWeight: 'bold' }}>김진주</h2>
                                            <p style={{ color: '#E64B49', margin: '0px', fontWeight: 'bold' }}>프론트엔드</p>
                                            <p>
                                                동화 콘텐츠 제작<br></br>
                                                책장 페이지<br></br>
                                                플레이 전반
                                            </p>
                                        </div>
                                    </div>
                                    <div className="box">
                                        <img src="/videos/chang.png" alt='' style={{ width: '130px', height: '150px' }}></img>
                                        <div className='name'>
                                            <h2 style={{ fontWeight: 'bold' }}>박근창</h2>
                                            <p style={{ color: '#AC8BB8', margin: '0px', fontWeight: 'bold' }}>하드웨어</p>
                                            <p>
                                                모션 인식<br></br>
                                                디바이스 개발<br></br>
                                                캐릭터 연동기능
                                            </p>
                                        </div>
                                    </div>
                                    <div className="box">
                                        <img src="/videos/bean.png" alt='' style={{ width: '130px', height: '150px' }}></img>
                                        <div className='name'>
                                            <h2 style={{ fontWeight: 'bold' }}>서정빈</h2>
                                            <p style={{ color: '#5B9C90', margin: '0px', fontWeight: 'bold' }}>백엔드</p>
                                            <p>
                                                서버 INFRA<br></br>
                                                서버 배포<br></br>
                                                디바이스 DB구축
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="boxes-container">
                                    <div className="box">
                                        <img src="/videos/min.png" alt='' style={{ width: '130px', height: '150px' }}></img>
                                        <div className='name'>
                                            <h2 style={{ fontWeight: 'bold' }}>안민</h2>
                                            <p style={{ color: '#E64B49', margin: '0px', fontWeight: 'bold' }}>프론트엔드</p>
                                            <p>
                                                로그인/회원가입<br></br>
                                                메인화면<br></br>
                                                웹화면 디자인
                                            </p>
                                        </div>
                                    </div>
                                    <div className="box">
                                        <img src="/videos/jieun.png" alt='' style={{ width: '130px', height: '150px' }}></img>
                                        <div className='name'>
                                            <h2 style={{ fontWeight: 'bold' }}>이지은</h2>
                                            <p style={{ color: '#E64B49', margin: '0px', fontWeight: 'bold' }}>프론트엔드 매니저</p>
                                            <p>
                                                Router 구현<br></br>
                                                사용자 인증<br></br>
                                                기기-화면 연결 전반
                                            </p>
                                        </div>
                                    </div>
                                    <div className="box">
                                        <img src="/videos/ikjo.png" alt='' style={{ width: '130px', height: '150px' }}></img>
                                        <div className='name'>
                                            <h2 style={{ fontWeight: 'bold' }}>조찬익</h2>
                                            <p style={{ color: '#5B9C90', margin: '0px', fontWeight: 'bold' }}>백엔드</p>
                                            <p>
                                                사용자 DB구축<br></br>
                                                회원정보 로직구현<br></br>
                                                웹화면 디자인
                                            </p>
                                        </div>
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
