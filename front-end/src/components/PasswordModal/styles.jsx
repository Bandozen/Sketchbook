import styled from 'styled-components';

const Wrapper = styled.div`
text-align: center;
font-family: 'Pretendard-Regular';

.modal-content{
    width : 350px;
}

.modal-header{
    padding-bottom: 0;
}

h4{
    font-weight: bold;
    margin-bottom: 20px;
}

.modal-header{
    border-bottom: none;
}

.modal-body{
    padding-top: 0;
}

.sendBtn{
    border-radius: 5px;
    width : 100%;
    border : none;
    background-color: #FFEE59;
    padding: 10px;
    font-weight : bold ;
}

.valid-text{
    text-align: left;
    padding-left: 10px;
    font-size: 12px;
    color : red;
    margin-top: 5px;
}
`

export default Wrapper;