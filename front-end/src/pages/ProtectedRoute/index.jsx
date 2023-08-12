import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import isLogin from "../../utils/isLogin";
import isConnected from "../../utils/isConnected";
import Modal from "../../components/Modal";

const ProtectedRoute = () => {
  const auth = isLogin();
  const navigate = useNavigate();
  const connection = isConnected();
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [message, setMessage ] = useState("");
  const [page, setPage] = useState("");

  const openModal = () => {
    setIsModalOpen(true);
  };

  useEffect(() => {
    if (!auth) {
      openModal();
      navigate("/");
    }

  }, [auth, connection, location.pathname, navigate]);

  return (
    <>
      <Outlet />
    </>
  );
};

export default ProtectedRoute;
