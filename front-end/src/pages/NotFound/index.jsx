import Wrapper from "./styles";

function NotFound() {
  return (
    <Wrapper>
      <div>
        <h1 className="notfound">PAGE NOT FOUND</h1>
        <h3> 페이지가 존재하지 않거나, 사용할 수 없는 페이지 입니다.</h3>
        <h3> 입력하신 주소가 정확한지 다시 한번 확인해주세요!</h3>
      </div>
    </Wrapper>
  );
}

export default NotFound;
