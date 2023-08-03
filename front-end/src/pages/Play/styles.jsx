import styled from 'styled-components';
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .image-container {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  img {
    objectFit: cover;
    height: 100vh;
    width: 100vw;
  }
  
  .png-image {
    width: 450px;
    height: 410px;
    position: absolute;
    bottom: 7%;
    right: -1.5%;
  }
  
  .numbering {
    display: flex;
    align-items: center;
    justify-content: right;
    position: absolute; 
    right: 15px; 
    bottom: 10px;
    font-size: 15px;
  }
`;

export default Wrapper;