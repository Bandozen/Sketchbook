import Header from '../../components/Header';
import Wrapper from './styles';

function AboutUs() {
    return (
        <div>
            <Header />
            <Wrapper>
                <div className="box">
                    <h2>
                        AboutUs
                    </h2>
                    <ol>
                        <li>스케치북 서비스 소개</li>
                        <li>팀원 소개</li>
                    </ol>
                </div>
            </Wrapper>
        </div>
    )
}

export default AboutUs;
