import React, { useState, useEffect, useCallback } from 'react';
import Wrapper from './styles';

const imagesCount = 17; // 이미지의 총 개수

function Play() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [hasPngImage, setHasPngImage] = useState(true);

  // 이전 페이지로 이동
  const handleNextImage = useCallback(() => {
    if (currentImageIndex === imagesCount - 1) {
      alert('마지막 페이지에요.');
    } else {
      setCurrentImageIndex((prevIndex) => prevIndex + 1);
    }
  }, [currentImageIndex]);

  // 다음 페이지로 이동
  const handlePrevImage = useCallback(() => {
    if (currentImageIndex === 0) {
      alert('첫 페이지에요.');
    } else {
      setCurrentImageIndex((prevIndex) => prevIndex - 1);
    }
  }, [currentImageIndex]);

  // 전역으로 keydown 이벤트를 감지하여 이미지 이동 처리
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') {
        handleNextImage();
      } else if (e.key === 'ArrowLeft') {
        handlePrevImage();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleNextImage, handlePrevImage]);

  const backgroundImageSource = `./assets/play-background/엄마는카멜레온_${currentImageIndex}.jpg`;
  const pngImageSource = `./assets/play-png/${currentImageIndex}_엄마는카멜레온.png`;

  useEffect(() => {
    // png 이미지의 존재 여부를 체크합니다.
    const img = new Image();
    img.onload = () => {
      setHasPngImage(true);
    };
    img.onerror = () => {
      setHasPngImage(false);
    };
    img.src = pngImageSource;
  }, [pngImageSource]);

  return (
    <Wrapper>
      <div className="image-wrap">
        <div className="image-container">
          <img src={backgroundImageSource} alt={`엄마는카멜레온_${currentImageIndex}`} />
          {hasPngImage && (
            <img
              className="png-image"
              src={pngImageSource}
              alt={`${currentImageIndex}_엄마는카멜레온`}
              data-index={currentImageIndex} // 인덱스를 데이터 속성으로 추가합니다.
            />
          )}
        </div>
        <div className='numbering' >{currentImageIndex + 1}/{imagesCount}</div>
      </div>
    </Wrapper>
  );
}

export default Play;