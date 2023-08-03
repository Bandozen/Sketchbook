import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;


  .pagination {
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

export const IconWrap = styled.div`
font-family: 'Pretendard-Regular';

    svg {
		color: #ffffff;
      	font-size: 30px;
    }
`;