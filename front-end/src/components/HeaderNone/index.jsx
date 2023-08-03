import React from 'react';
// import axios from "axios";

// CSS
import Wrapper from './styles';

function Header() {



  return (
    <Wrapper>
        <img
          className="logo"
          src={process.env.PUBLIC_URL + '/assets/logo_without.png'}
          alt=""
        />

    </Wrapper>
  );
}

export default Header;
