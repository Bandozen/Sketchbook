import { Outlet } from "react-router-dom";
import Wrapper from "./styles";

function Check() {
  return (
    <Wrapper>
      <div className="container">
        <h1 className="check-title">시작하기 전, 확인해주세요!</h1>
        <Outlet />
      </div>

    </Wrapper>
  );
}

export default Check;
