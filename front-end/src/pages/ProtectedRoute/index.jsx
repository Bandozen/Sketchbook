import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import isLogin from "../../utils/isLogin";
import isConnected from "../../utils/isConnected";

const ProtectedRoute = () => {
  const auth = isLogin();
  const navigate = useNavigate();
  const connection = isConnected();
  const location = useLocation();

  useEffect(() => {
    if (!auth) {
      alert("로그인이 필요한 페이지입니다.");
      navigate("/");
    }
  }, [auth, navigate]);

  if (auth) {
    if (connection && location.pathname === "/connect") {
      navigate("/profile")
    }
    return <Outlet/>
  }
};

export default ProtectedRoute;
