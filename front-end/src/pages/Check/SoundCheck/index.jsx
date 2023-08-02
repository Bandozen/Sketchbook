import React, { useState, useEffect } from "react";
import SoundWrapper from "./styles";

import { connect } from "react-redux";
import { soundOn, soundOff } from "../../../redux/modules/device";

const SoundCheck = () => {
  const [audioStream, setAudioStream] = useState(null);
  const [volume, setVolume] = useState(0);

  const handleMicrophone = () => {
    if (audioStream) {
      setAudioStream(null);
      setVolume(0);
      soundOff(); // 버튼이 '끄기'일 때 soundOff 액션을 dispatch
    } else {
      async function getMicrophone() {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({
            audio: true,
          });
          setAudioStream(stream);
          soundOn(stream); // 버튼이 '켜기'일 때 soundOn 액션을 dispatch
        } catch (err) {
          console.error("마이크 연결 오류 : ", err);
        }
      }

      getMicrophone();
    }
    console.log(audioStream);
  };

  useEffect(() => {
    if (audioStream) {
      const audioContext = new AudioContext();
      const analyser = audioContext.createAnalyser();
      const microphone = audioContext.createMediaStreamSource(audioStream);
      microphone.connect(analyser);

      analyser.fftSize = 256;
      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      function updateVolume() {
        analyser.getByteFrequencyData(dataArray);
        const average =
          dataArray.reduce((sum, value) => sum + value, 0) / bufferLength;
        setVolume(average);
      }

      let animationFrameId = requestAnimationFrame(function update() {
        updateVolume();
        animationFrameId = requestAnimationFrame(update);
      });

      return () => {
        cancelAnimationFrame(animationFrameId);
        microphone.disconnect();
      };
    }
  }, [audioStream]);

  return (
    <SoundWrapper>
      <h2>4. 음성 인식 확인하기</h2>
      <div className="box">
        <div className="images">
          <img alt="volume-icon"
            className="volume"
            src={process.env.PUBLIC_URL + "/assets/volume.png"}
          />
          <div className="sound">
            <img src={process.env.PUBLIC_URL + "/assets/sound.png"} alt="" />
            <div
              className="gauge"
              style={{
                width: `${volume}px`,
              }}
            />
          </div>
        </div>
        <div className="button">
          <button onClick={handleMicrophone}>
            {audioStream ? "끄기" : "켜기"}
          </button>
        </div>
      </div>
      <h4>
        "출발"이라고 외쳐 보세요!
      </h4>
    </SoundWrapper>
  );
};

const mapStateToProps = (state) => {
  return {
    sound: state.device.sound,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    soundOn: (audioStream) => dispatch(soundOn(audioStream)),
    soundOff: () => dispatch(soundOff()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SoundCheck);
