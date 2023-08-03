import DeviceHeader from '../../components/DeviceHeader';
import Wrapper from './styles';

function Device() {
  return (
    <div>
<DeviceHeader/>
       <Wrapper>
       <div>
      <h2 style={{display:'flex', justifyContent: 'center'}}> 기기가 연결되었어요! </h2>
      <iframe
        title="라즈베리파이 캠"
        src="http://192.168.100.246:8080/"
        width="100%"
        height="800px"
      ></iframe>
    </div>
      </Wrapper>
    </div>
  );
}

export default Device;
