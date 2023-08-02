import React, { useState, useEffect, useCallback } from 'react';
import Wrapper from './styles';

const imagesCount = 17; // 이미지의 총 개수

function Play() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

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

  // 이미지 경로 저장
  // currentImageIndex에 따라 동적으로 변하면서, 해당하는 이미지 파일을 불러와서 보여줄 수 있도록
  const imageSource = `./assets/play-background/엄마는카멜레온_${currentImageIndex}.jpg`;

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
  }, [currentImageIndex, handleNextImage, handlePrevImage]);


  return (
    <Wrapper>
      <div className="image-wrap">
        <div className="image-container">
          <img src={imageSource} alt={`엄마는카멜레온_${currentImageIndex}`} />
        </div>
        {/* 페이지 번호 표시 (현 페이지 / 전체 페이지) */}
        <div className='numbering' >{currentImageIndex + 1}/{imagesCount}</div>
        {/* 페이지 이동 화살표 */}
        {/* <div className='arrow-set'>
        <div className="arrow" onClick={handlePrevImage}>
          &larr;
        </div>
        <div className="arrow" onClick={handleNextImage}>
          &rarr;
        </div>
        </div> */}
      </div>
    </Wrapper>
  );
}

export default Play;
