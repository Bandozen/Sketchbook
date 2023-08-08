import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from "axios";

// CSS
import Wrapper from './styles';

import isLogin from '../../utils/isLogin';

function HeaderNone() {
  const navigate = useNavigate();
  const auth = isLogin();

  const handleLogout = () => {
    axios
    .get('/api/users/logout')
      .then((res) => {
        if (res.data.success) {
          // console.log('Logout successful');
          navigate('/');
        } else {
          console.error('Logout failed:', res.data.err);
        }
      })
      .catch((error) => {
        console.error('Logout failed:', error);
      });
  };

  return (
    <Wrapper>
      <Link to="/aboutUs">
        <img
          className="logo"
          src={process.env.PUBLIC_URL + '/assets/logo_without.png'}
          alt=""
        />
      </Link>
      {auth? <div className="links">
        <NavLink to="/books" >
          책장
        </NavLink>
        <NavLink to="/guide" >
          이용 가이드
        </NavLink>
        <NavLink to="/profile" >
          회원 정보
        </NavLink>
        <p onClick={handleLogout}>
          로그아웃
        </p>
      </div> :
      <div className='links'>
        <NavLink to='/' >로그인하러 가기</NavLink>
      </div>
      }
    </Wrapper>
  );
}

export default HeaderNone;
