import styled from "styled-components";

const Wrapper = styled.div`
.Choose {
  background-color: rgba(255, 255, 255, 0.5); 
  padding: 20px;
  border-radius: 10px;
  position: absolute;
  top: 50%;
  right: 30%; 
  transform: translate(50%, -50%);
  font-family: 'Pretendard-Regular';
  color: gray;
  width: 400px
}

.connect {
  border-radius: 5px;
  border: none;
  height: 50px;
  width: 120px;
  margin-bottom: 20px;
}

@media screen and (max-width: 1020px) {
  .Choose {
    right: 50%;
  }
}


`

export default Wrapper;