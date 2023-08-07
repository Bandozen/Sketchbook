import styled from "styled-components";

const Wrapper = styled.div`
font-family: 'Pretendard-Regular';

.img-container {
  display: flex
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

.img-container2 {
  background-color: #e5e1db;
  display: flex
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

.img-container3 {
  background-color: #e5e1db;
  display: flex
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

.kid-img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 110%;
  object-fit: cover;
  opacity: 0.5;
}

.text-overlay {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-family: 'Pretendard-Regular';
  text-align: center;
}

.text-overlay2 {
  position: absolute;
  top: 20%;
  left: 30%;
  transform: translate(-50%, -50%);
  font-family: 'Pretendard-Regular';

}

.text-overlay_h1 {
  font-size: 70px;
  color: black;
  line-height: 1;
  font-weight: bold;
  letter-spacing: -2px;
}

.text-overlay2_h1 {
  font-size: 50px;
  color: black;
  line-height: 1;
  font-weight: bold;
  letter-spacing: -2px;
}

.text-overlay_h3 {
  font-size: 30px;
  color: black;
  
}

.text-overlay_h4 {
  font-size: 25px;
  color: black;
}

.boxes-container {
  display: flex;
  justify-content: space-between;

}

.box {
  width: 200px;
  height: 150px;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  text-align: center;
}

`

export default Wrapper;