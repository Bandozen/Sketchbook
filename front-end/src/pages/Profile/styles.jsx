import styled from "styled-components";

const Wrapper = styled.div`
margin-top: 100px;
display : flex;
justify-content : center;
font-family: 'Pretendard-Regular';


.grid{
    width : 500px;
}

img{
    width: 80%;
    height: 40%;
}

.box {
    background-color: #F8F8F8;
    border-radius: 10px;
    padding: 50px;
    margin-right: 50px;
  }

  input{
    padding: 15px;
    background-color: #E6E6E6;
    color: black;
  }

  .btn{
    background-color: #FFEE59;
    padding: 10px 0;
    font-weight : bold ;
  }

  h2{
    font-weight : bold;
  }

  h2 span{
    color: #A451F7;
  }

  .message{
    font-size : 14px;
  }

  .input-group-text{
    height : 45px;
    cursor : pointer;
    margin-top : 8px;
    border-radius: 5px;
  }
  


`

export default Wrapper;