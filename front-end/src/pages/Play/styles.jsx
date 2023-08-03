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

  .numbering {
    display: flex;
    align-items: center;
    justify-content: right;
    position: absolute; 
    right: 15px; 
    bottom: 10px;
    font-size: 15px;
  }

  // .arrow-set {
  //   display: flex;
  //   flex-direction: row;
  //   justify-content: center;
  // }

  // .arrow {
  //   cursor: pointer;
  //   font-size: 30px;
  //   margin: 0 20px 0 20px;
  // }
`;

export default Wrapper;