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

  const openModal = (message, destination) => {
    setMessage(message);
    setPage(destination);
    setIsModalOpen(true);
  };

  const goTo = () => {
    navigate(page)
    setIsModalOpen(false);
  }

  useEffect(() => {
    if (!auth) {
      openModal();
      navigate("/");
    }

    if (connection === "false" &&
      (location.pathname.startsWith("/play") ||
        location.pathname === "/check" ||
        location.pathname === "/ready")
    ) {
      openModal("기기 연결이 필요해요.", "/connect")
    } else if (connection === "true" && location.pathname === "/connect") {
      openModal("이미 기기가 연결되었어요.", "/profile")
    }
  }, [auth, connection, location.pathname, navigate]);

  return (
    <>
      <Outlet />
      <Modal message={message} clickResult={goTo} isModalOpen={isModalOpen} />
    </>
  );
};

export default ProtectedRoute;
