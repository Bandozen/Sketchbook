import { Outlet, useNavigate } from 'react-router';
import { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { CustomDialog } from './styles';

function Story1() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (event) => {
      const currentPath = window.location.pathname;
      const pageNumber = Number(currentPath.split('/').pop().slice(1));
      let nextPageNumber;

      if (event.key === 'ArrowLeft') {
        if (pageNumber === 1) {
          renderCustomDialog('첫 페이지에요.');
          return;
        }
        nextPageNumber = Math.max(1, pageNumber - 1);
      } else if (event.key === 'ArrowRight') {
        if (pageNumber === 17) {
          renderCustomDialog('동화가 끝났어요. 다른 동화를 보러 가 볼까요?', () => {
            navigate('/books');
          });
          return;
        }
        nextPageNumber = Math.min(17, pageNumber + 1);
      } else {
        return;
      }

      const nextPagePath = `/Play/story1/p${nextPageNumber}`;
      window.location.href = nextPagePath;
    };

    const renderCustomDialog = (message, callback) => {
      const dialog = document.createElement('div');
      dialog.setAttribute('id', 'custom-dialog');
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
      document.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
          handleCloseDialog();
        }
      });

      // 바깥을 클릭하면 모달이 닫히도록 이벤트 리스너 추가
      dialog.addEventListener('click', handleCloseDialog);
    };

    const closeCustomDialog = (callback) => {
      const dialog = document.getElementById('custom-dialog');
      if (dialog) {
        ReactDOM.unmountComponentAtNode(dialog);
        document.body.removeChild(dialog);
        if (typeof callback === 'function') {
          callback();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [navigate]);

  const preventClick = (e) => {
    e.preventDefault();
    alert("🚨스케치북의 동화 컨텐츠의 저작권은 동화 작가님과 출판사에 있습니다.\n무단으로 도용, 불법으로 복사(캡처)하여 사용할 경우\n사전 경고 없이 민·형사상 법적조치 등 저작권법에 의한 처벌을 받을 수 있습니다.🚨");
  }

  return (
    <div onContextMenu={preventClick}>
      <Outlet />
    </div>
  );
}

export default Story1;
