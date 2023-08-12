import React, { Component } from 'react';
import axios from 'axios';

class P0 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photoUrl: '/user/image.jpg'
    };
  }

  componentDidMount() {
    // 초기 사진 로드
    this.fetchPhoto();

    // 100ms마다 사진 갱신 요청
    this.interval = setInterval(this.fetchPhoto, 100);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  fetchPhoto = () => {
    // 사진을 가져오는 API 엔드포인트로 요청을 보냄
    axios.get('/api/devices/getImage')
      .then(response => {
        this.setState({ photoUrl: response.data.url });
      })
      .catch(error => {
        console.error('Error fetching photo:', error);
      });
  }

  render() {
    const { photoUrl } = this.state;

    return (
      <div>
        <img src={photoUrl} alt="Server-provided" />
      </div>
    );
  }
}

export default P0;
