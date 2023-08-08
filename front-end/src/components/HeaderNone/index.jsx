import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate, Link } from 'react-router-dom';
import axios from "axios";
import Wrapper from './styles';

function HeaderNone() {
  let navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  const handleLogout = () => {
    axios
    .get('/api/users/logout')
      .then((res) => {
        if (res.data.success) {
          console.log('Logout successful');
          navigate('/');
        } else {
          console.error('Logout failed:', res.data.err);
        }
      })
      .catch((error) => {
        console.error('Logout failed:', error);
      });
  };

  const handleScroll = () => {
    const offset = window.scrollY;
    if (offset > 200 ) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  return (
    <Wrapper scrolled={scrolled}>
      <Link to="/aboutUs">
        <img
          className="logo"
          src={process.env.PUBLIC_URL + '/assets/logo_without.png'}
          alt=""
        />
      </Link>
      <div className="links">
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

export default HeaderNone;
