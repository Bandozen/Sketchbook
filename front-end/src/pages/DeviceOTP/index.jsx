import React, { useState } from 'react';
import Wrapper from './styles';
import HeaderNone from '../../components/HeaderNone';

function Device() {
  const [OTP, setOTP] = useState("");

  // 버튼 클릭을 처리하는 함수: OTP 길이가 6 미만일 때 새로운 키를 추가
  const handleKeyClick = (key: string) => {
    if (OTP.length < 6) {
      setOTP((prevOTP) => prevOTP + key);
    }
  };

  const handleBackspace = () => {
    setOTP((prevOTP) => prevOTP.slice(0, -1));
  };

  const renderNumberButtons = () => {
    return [1, 2, 3, 4, 5, 6, 7, 8, 9, 0,].map((number) => (
      <button key={number} onClick={() => handleKeyClick(String(number))}>
        {number}
      </button>
    ));
  };

  const optsubmit = (e) => {
    console.log(OTP);
  };

  return (
    <div>
    <HeaderNone/>
    <Wrapper>
      <div className='all'>
        {/* 왼쪽: OTP 입력창 */}

        <div className="inputclass">
          <h1>OTP 입력하기</h1>
          <div>
            <input type="text" value={OTP} readOnly/>
          </div>
        </div>

        {/* 오른쪽: 번호 입력판 */}
        <div>
          <div className='number'>
            {renderNumberButtons()}
          </div>

          <div className='etc'>
            <button type="submit" className="otpsubmit" onClick={optsubmit}>
              인증하기
            </button>
            <button onClick={handleBackspace}>지우기</button>
          </div>
        </div>
      </div>
    </Wrapper>
    </div>
  );
}

export default Device;
