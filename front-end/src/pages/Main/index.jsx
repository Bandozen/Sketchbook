import { Outlet } from 'react-router';

import Wrapper from './styles';

function Main() {


  return (

    <Wrapper>
      
      <div className="video-container">
        <video muted autoPlay loop className="video">
          <source src="/videos/Preview.mp4" type="video/mp4" />
        </video>

        <div className="text-overlay">
          <h1>SKETCH</h1>
          <h1>BOOK</h1>
          <br></br>

          <h3 className="introduce">내가 동화 속 주인공이 되는 즐거운 세상</h3>
          <h3 className="introduce">내가 그린 그림이 내가 되는 행복한 세상</h3>
          <h3 style={{ letterSpacing: '0.6px' }} className="introduce">내가 움직여야만 흘러가는 신기한 세상</h3>

        </div>
        <Outlet />
      </div>
    </Wrapper>);
}

export default Main;
