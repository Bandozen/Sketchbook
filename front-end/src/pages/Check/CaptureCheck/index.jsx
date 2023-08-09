import React, { useEffect } from 'react';
import Wrapper from "./styles";
import { useNavigate } from 'react-router-dom';

import PI_URL from "../../../utils/PI_URL";



export default function CaptureCheck() {
  let navigate = useNavigate();
  const pi_url = PI_URL();

  const next = () => {
    navigate('/check/distance');
  };

  return (
    <Wrapper>
      <div>
        <h3 style={{ fontSize: '45px', fontWeight: 'bold' }}> 1. 그림 찍기 </h3>
        <iframe title="라즈베리파이 캠" src="http://192.168.100.246:8300" width="100%" height="800px" sandbox="allow-scripts allow-same-origin"></iframe>
        <img
          className="arrow"
          src={process.env.PUBLIC_URL + "/assets/arrow.png"}
          alt=""
          onClick={next}
        />
      </div>
    </Wrapper>
  );
}

