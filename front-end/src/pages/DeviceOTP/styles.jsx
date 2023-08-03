import styled from 'styled-components';


const Wrapper = styled.div`
font-family: 'Pretendard-Regular';

  .all {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 80vh;
  }

  .etc {
    margin-top: 10px;
    font-size: 40px;
    display: flex;
    justify-content: space-between;
  }

  .number{
    display: grid;
    grid-template-columns: repeat(3, 100px);
    grid-template-rows: repeat(3, 100px);
    grid-gap: 5px;
    font-size: 60px;
  }

  button {
    border: none;
    border-radius: 10px;
  }

  .inputclass{
    margin-right: 60px;
  }

  h1 {
    font-size:60px;
    margin-bottom: 50px;
  }

  input {
    height: 70px;
    font-size: 50px;
    width: 340px;
    outline: none;
    border: none;
    background-color: #F0F0F0;
  }

  .number button:nth-child(10) {
    width: 310px;

  }


`;

export default Wrapper;