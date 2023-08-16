import React, { useEffect } from 'react';
import { Outlet } from 'react-router';

import Wrapper from './styles';
import axios from "axios";


function Main() {

  useEffect(() => {
    axios
      .get("/api/devices/clearcord")
      .then()
      .catch((err) => {
        return console.log("에러입니다.", err);
      });
  }, [])


  return (

    <Wrapper>
      
      <div className="video-container">
      <img src="/videos/Preview.gif" alt="GIF" className="gif" />

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
