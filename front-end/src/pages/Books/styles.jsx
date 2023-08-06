import styled from 'styled-components';

const Wrapper = styled.div`
font-family: 'Pretendard-Regular';

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
    
    li {
      a {
        color: #9D4FE0;
        background-color: #ffffff;
        border: 1px solid #9D4FE0;
        margin: 2px;
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
      }
    }
  }
`;

export default Wrapper;