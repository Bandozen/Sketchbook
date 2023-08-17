import { Outlet, useNavigate } from "react-router";
import { useEffect } from "react";
import ReactDOM from "react-dom";
import { CustomDialog } from "./styles";
import axios from "axios";

function Story3() {
  const navigate = useNavigate();

  const stop = (e) => {
    axios
      .get("/api/devices/stop")
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };


  useEffect(() => {
    const handleKeyDown = (event) => {
      const currentPath = window.location.pathname;
      const pageNumber = Number(currentPath.split("/").pop().slice(1));
      if (event.key === "ArrowLeft") {
        if (pageNumber === 6) {
          const prevPagePath = `/Play/story3/p1`;
          window.location.href = prevPagePath;
        } else if (pageNumber === 7) {
          const prevPagePath = `/Play/story3/p6`;
          window.location.href = prevPagePath;
        } else if (pageNumber === 15) {
          const prevPagePath = `/Play/story3/p7`;
          window.location.href = prevPagePath;
        } else if (pageNumber === 16) {
          const prevPagePath = `/Play/story3/p15`;
          window.location.href = prevPagePath;
        } else {
          return;
        }
      } else if (event.key === "ArrowRight") {
        if (pageNumber === 1) {
          const nextPagePath = `/Play/story3/p6`;
          window.location.href = nextPagePath;
        } else if (pageNumber === 6) {
          const nextPagePath = `/Play/story3/p7`;
          window.location.href = nextPagePath;
        } else if (pageNumber === 7) {
          const nextPagePath = `/Play/story3/p15`;
          window.location.href = nextPagePath;
        } else if (pageNumber === 15) {
          const nextPagePath = `/Play/story3/p16`;
          window.location.href = nextPagePath;
        } else if (pageNumber === 16) {
          renderCustomDialog(
            "동화가 끝났어요. 다른 동화를 보러 가 볼까요?",
            () => {
              stop();
              navigate("/books");
            }
          );
        }
      }
    };

    //   const nextPagePath = `/Play/story3/p${nextPageNumber}`;
    //   window.location.href = nextPagePath;
    // };

    const renderCustomDialog = (message, callback) => {
      const dialog = document.createElement("div");
      dialog.setAttribute("id", "custom-dialog");
      document.body.appendChild(dialog);

      const handleConfirmClick = () => {
        closeCustomDialog(callback);
      };

      const handleCloseDialog = () => {
        closeCustomDialog(callback);
      };

      ReactDOM.render(
        <CustomDialog>
          <p>{message}</p>
          <button onClick={handleConfirmClick}>확인</button>
        </CustomDialog>,
        dialog
      );

      // Enter 키 누를 때 모달이 닫히도록 이벤트 리스너 추가
      document.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
          handleCloseDialog();
        }
      });

      // 바깥을 클릭하면 모달이 닫히도록 이벤트 리스너 추가
      dialog.addEventListener("click", handleCloseDialog);
    };

    const closeCustomDialog = (callback) => {
      const dialog = document.getElementById("custom-dialog");
      if (dialog) {
        ReactDOM.unmountComponentAtNode(dialog);
        document.body.removeChild(dialog);
        if (typeof callback === "function") {
          callback();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [navigate]);

  return (
    <div>
      <Outlet />
    </div>
  );
}

export default Story3;
