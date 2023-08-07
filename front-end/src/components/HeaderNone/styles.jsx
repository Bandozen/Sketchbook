import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  font-family: 'Pretendard-Regular';
  z-index: 9999;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;

  .logo {
    width: 150px;
    margin: 8px;
  }

  .links {
    display: flex;
    margin-right: 20px;
  }
  
  p {
    display: flex;
    margin-right: 20px;
    margin: auto 20px;
    font-size: 18px;
    cursor: pointer;
  }

  .active {
    font-weight: bold;
  }

  a {
    margin: auto 20px;
    text-decoration: none;
    font-size: 18px;
    color: #000000;
  }
`;

export default Wrapper;
