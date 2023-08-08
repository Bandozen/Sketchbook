import styled from 'styled-components';

const Wrapper = styled.div.attrs(props => ({
  scrolled: props.scrolled ? 'scrolled' : 'not-scrolled',
}))`
  display: flex;
  justify-content: space-between;
  background-color: ${props => props.scrolled === 'scrolled' ? 'rgba(255, 255, 255, 0.1)' : 'transparent'};
  backdrop-filter: ${props => props.scrolled === 'scrolled' ? 'blur(10px)' : 'none'};
  transition: background-color 0.3s ease;
  font-family: 'Pretendard-Regular';
  z-index: 9999;
  position: fixed;
  width: 100%;
  padding: 5px 10px;

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
