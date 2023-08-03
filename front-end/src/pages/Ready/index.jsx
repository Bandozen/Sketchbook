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
      <br />
      <div>
      <div className="btndiv">
            <a href="/play">
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
