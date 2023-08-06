import { Outlet } from 'react-router';
import Wrapper from './styles';




function Play() {
  

  return (
    <Wrapper>
      <Outlet />
    </Wrapper>
  );
}

export default Play;