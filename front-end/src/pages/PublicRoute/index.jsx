import { Outlet, Navigate, useLocation } from "react-router";
import isLogin from "../../utils/isLogin";

const PublicRoute = () => {
  const auth = isLogin();

  if (!auth) {
    return <Outlet />;
  }

  return (
    <div>
      <Navigate to="/main" />
    </div>
  );
};

export default PublicRoute;
