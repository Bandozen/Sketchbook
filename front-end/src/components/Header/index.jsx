import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from "axios";

// CSS
import Wrapper from './styles';

function Header() {
  let navigate = useNavigate();

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
      <div className="links">
        <NavLink to="/play/story2/p1" className={({ isActive }) => isActive ? 'active' : undefined}>
          체험하기
        </NavLink>
        <NavLink to="/books" className={({ isActive }) => isActive ? 'active' : undefined}>
          책장
        </NavLink>
        <NavLink to="/guide" className={({ isActive }) => isActive ? 'active' : undefined}>
          이용 가이드
        </NavLink>
        <NavLink to="/profile" className={({ isActive }) => isActive ? 'active' : undefined}>
          회원 정보
        </NavLink>
        <p onClick={handleLogout}>
          로그아웃
        </p>
      </div>
    </Wrapper>
  );
}

export default Header;
