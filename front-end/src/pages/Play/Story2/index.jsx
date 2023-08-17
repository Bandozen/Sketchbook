import { Outlet, useNavigate } from "react-router";
import { useEffect } from "react";
import ReactDOM from "react-dom";
import { CustomDialog } from "./styles";
import axios from "axios";

function Story2() {
  const navigate = useNavigate();

  const stop = (e) => {
    axios
      .get("/api/devices/stop")
      .then((res) => {
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      const currentPath = window.location.pathname;
      const pageNumber = Number(currentPath.split("/").pop().slice(1));
      let nextPageNumber;

      if (event.key === "ArrowLeft") {
        if (pageNumber === 1) {
          renderCustomDialog("첫 페이지에요.");
          return;
        }
        nextPageNumber = Math.max(1, pageNumber - 1);
      } else if (event.key === "ArrowRight") {
        if (pageNumber === 3) {
          renderCustomDialog(
            "아쉽게도 체험판은 여기까지에요.🥺",
            () => {
              stop();
              navigate("/main");
              
            }
          );
          return;
        }
        nextPageNumber = Math.min(17, pageNumber + 1);
      } else {
        return;
      }

      const nextPagePath = `/play/story2/p${nextPageNumber}`;
      window.location.href = nextPagePath;
    };

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

export default Story2;
