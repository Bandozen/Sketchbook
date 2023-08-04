import { Outlet, useLocation } from "react-router";
import { useNavigate } from "react-router-dom";
import isLogin from "../../utils/isLogin";

const PublicRoute = () => {
  const auth = isLogin();

  if (!auth) {
    return <Outlet />;
  }

  return (
    <div>
      <useNavigate to="/main" />
    </div>
  );
};

export default PublicRoute;
