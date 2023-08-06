import { Outlet, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import isLogin from '../../utils/isLogin';

const PublicRoute = () => {
  const auth = isLogin();
  const navigate = useNavigate();

  useEffect(() => {
    if (auth) {
      navigate('/main');
    }
  }, [auth, navigate]);

  if (!auth) {
    return <Outlet />;
  }

  return null;
};

export default PublicRoute;
