import { Outlet, Navigate, useLocation } from "react-router";
import isLogin from "../../utils/isLogin";

const ProtectedRoute = () => {
  const location = useLocation();
  const auth = isLogin();

  if (auth) {
    return <Outlet />;
  }

  alert('로그인이 필요한 페이지입니다.');
  return (
    <div>
      <Navigate to="/" />
    </div>
  );
}

export default ProtectedRoute;