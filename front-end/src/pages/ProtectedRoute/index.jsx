import { Outlet, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import isLogin from "../../utils/isLogin";

const ProtectedRoute = () => {
  const auth = isLogin();
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth) {
      alert('로그인이 필요한 페이지입니다.');
      navigate('/');
    }
  }, [auth, navigate]);

  if (auth) {
    return <Outlet />;
  }

  return null;
}

export default ProtectedRoute;
