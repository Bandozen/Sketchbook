import styled from "styled-components";

const Wrapper = styled.div`
.video-container {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

.video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.65;
}

.text-overlay {
  position: absolute;
  top: 50%;
  left: 30%;
  transform: translate(-50%, -50%);
  font-family: 'Pretendard-Regular';
  text-align: center;
}

.text-overlay h1 {
  font-size: 90px;
  color: yellow;
  line-height: 1;
  font-family: 'EF_jejudoldam';
  letter-spacing: -10px;
}


.introduce{
  line-height: 0.9;
  color: white;

}

.signup {
  background-color: rgba(255, 255, 255, 0.5); 
  padding: 20px;
  border-radius: 10px;
  position: absolute;
  top: 50%;
  right: 30%; 
  transform: translate(50%, -50%);
  font-family: 'Pretendard-Regular';
  color: gray;
}

.start {
  border: none;
  background-color: #FFEE59;
  width: 350px;
  height: 45px;
  display: block; /* Use block display to occupy the entire width of its container */
}
/* 시작하기 버튼 */

.mb-3{
  height: 45px;
}
.activated{
  color: black;
  font-weight: bold;
  text-decoration: underline;
}
/* 선택시 활성화표시하려고 */


.login-signup-buttons {
  display: flex;
  justify-content: space-around; 
  width: 100%; 
  margin-bottom: 20px; 

}

.forgot-password {
  margin-top: 20px;
  font-size: 14px;
  text-align: end;
}

.forgot-password a {
  color: black;
}

.warningmsg{
  color: black;
  margin-top: 0px;
  text-align: left;
  margin-bottom: 5px;
  font-size: 14px;
}

.duplicatecheck{
  border: none;
  border-radius: 5px;
  background-color: #FFEE59;
}

@media screen and (max-width: 1020px) {
  .signup {
    right: 50%;
  }
}

form{
  display: flex;
  flex-direction: column;
}

span{
  margin-left: 5px;
}
`

export default Wrapper;