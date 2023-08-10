import styled from 'styled-components';

const Wrapper = styled.div`
font-family: 'Pretendard-Regular';

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.modal-content {
  background-color: #ffffff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 350px;
  align-items: center;
  text-align: center;
}

span {
  padding: 10px;
}

.modal-content button {
  margin-top: 10px;
  background-color: #9D4FE0;
  border: none;
  color: white;
  padding: 10px 20px;
  cursor: pointer;
  transition: background-color 0.3s;
  border-radius: 8px;
  width: 100px;
}

.modal-content button:hover {
  background-color: #8133D4;
}


  // 검색창
  .search-container {
    display: flex;
    justify-content: center;
  }

 .input-group {
    margin: 50px;
    width: 700px;
    height: 50px;
  }

  .form-control {
    boxShadow: none; //shadow 효과 없애기
    borderColor: #9D4FE0;
    font-size: 18px;
  }

  // 검색 돋보기 이모지
  svg {
		color: #ffffff;
      	font-size: 30px;
    }

  .btn {
    backgroundColor: #9D4FE0;
    border: none; 
  }

  // 페이지네이션
  .pagination {
    display: flex;
    justify-content: center;
    text-align: center;
    
    li {
      a {
        color: #9D4FE0;
        background-color: #ffffff;
        border: 1px solid #9D4FE0;
        margin: 5px;
        padding: 6px 12px;        

        &:hover {
          color: #ffffff;
          background-color: #9D4FE0;
          border-color: #ffffff;
        }
        
        &:focus {
            box-shadow: none; /* 클릭 시 테두리 효과 제거 */
          }
    }
      span {
        background-color: #9D4FE0;
        border: none;
        width: 40px;
        margin: 5px;
      }
    }
  }

  
`;

export default Wrapper;