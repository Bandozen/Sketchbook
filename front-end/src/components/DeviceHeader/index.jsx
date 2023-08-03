import React from 'react';
import { Link } from 'react-router-dom';
// import axios from "axios";

// CSS
import Wrapper from './styles';

function Header() {

  // const devicelogout = () => {
  //   axios
  //   .get('/api/users/logout')
  //     .then((res) => {
  //       if (res.data.success) {
  //         console.log('Logout successful');
  //         navigate('/');
  //       } else {
  //         console.error('Logout failed:', res.data.err);
  //       }
  //     })
  //     .catch((error) => {
  //       console.error('Logout failed:', error);
  //     });
  // };

  return (
    <Wrapper>
      <Link to="/main">
        <img
          className="logo"
          src={process.env.PUBLIC_URL + '/assets/logo_without.png'}
          alt=""
        />
      </Link>
      {/*       
        <p onClick={devicelogout}>
          기기연결해제
        </p> */}
      <p style={{marginRight: '80px', fontSize: '30px'}}>
        기기 연결해제
      </p>
    </Wrapper>
  );
}

export default Header;
