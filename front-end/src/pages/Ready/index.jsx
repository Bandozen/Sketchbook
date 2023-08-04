import Wrapper from './styles';
import Button from "react-bootstrap/Button";

function Ready() {
  return (
    <Wrapper>
      <div className='ready-container'>
        <div className='ready-message'>
          <h2>준비가 됐다면</h2>
          <img src={process.env.PUBLIC_URL + '/assets/ready_emoji.GIF'} alt="" />
        </div>
        <h2>시작하기를 눌러볼까요!</h2>
        <p>F11 버튼을 누르면 더 재밌게 동화를 즐길 수 있어요.<br />
          또, 좌우 방향키로 페이지 이동이 가능하답니다.</p>



        <div>
          <div className="btndiv">
            <a href="/play/story1/p1">
              <Button
                variant="outline-primary"
                className="custom-button-style"
              >
                시작하기
              </Button>
            </a>
          </div>
        </div>
      </div>
    </Wrapper>);
}

export default Ready;
