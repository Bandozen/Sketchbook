import React from 'react';
import { Link } from 'react-router-dom';
// import axios from "axios";

// CSS
import Wrapper from './styles';

function Header() {

  return (
    <Wrapper>
      <Link to="/main">
        <img
          className="logo"
          src={process.env.PUBLIC_URL + '/assets/logo_without.png'}
          alt=""
        />
      </Link>
      <p style={{marginRight: '80px', fontSize: '30px'}}>
        기기 연결해제
      </p>
    </Wrapper>
  );
}

export default Header;
