import Wrapper from './styles';
import Button from "react-bootstrap/Button";

function Ready() {
  const ready = (e) => {
    axios
      .get("/api/devices/ready")
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Wrapper onLoad={ready}>
        <div className='ready-container'>
          <div className='ready-message'>
            <h2>준비가 됐다면</h2>
            <img className='icon-ready' src={process.env.PUBLIC_URL + '/assets/ready_emoji.GIF'} alt="" />
          </div>
          <h2>시작하기를 눌러볼까요!</h2>
          <br />
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

          <div className='key-guide'>
            <p>
              <img className='key-icon' style={{ height: '45px' }} src={process.env.PUBLIC_URL + '/assets/key-f11.png'} alt="" />
              전체화면으로 더 재밌게 동화를 즐길 수 있어요.</p>

            <p>
              <img className='key' src={process.env.PUBLIC_URL + '/assets/key-left.png'} alt="" />
              <img className='key-icon' src={process.env.PUBLIC_URL + '/assets/key-right.png'} alt="" />
              방향키로 페이지 이동이 가능하답니다.</p>
            <p>
              <img className='key-icon' src={process.env.PUBLIC_URL + '/assets/key-esc.png'} alt="" />
              동화를 중단하고 책장으로 나갈 수 있어요.</p>
          </div>
        </div>
      </Wrapper>
    </>
  );
}

export default Ready;
