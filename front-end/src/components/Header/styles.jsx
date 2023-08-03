import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  box-shadow: 0 1px 7px -5px black;
  font-family: 'Pretendard-Regular';

  .logo{
    width:150px;
  }

  .links{
    display: flex;
    margin-right: 20px;
  }
  
  p {
    display: flex;
    margin-right: 20px;
    margin : auto 20px;
    font-size: 18px;
    cursor: pointer;
  }

  .active{
    font-weight: bold;
  }

  a{
    margin : auto 20px;
    text-decoration: none;
    font-size: 18px;
    color: #000000;
    }
  }
`

export default Wrapper;