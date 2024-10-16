import React, { useState, useEffect } from "react";
import "./index.css";
import { useLocation } from "react-router-dom";

const Index = () => {
  const [currentIndex, setCurrentIndex] = useState(0); // 控制當前圖片索引
  const location = useLocation();
  const images = [
    "src/images/meeting.png",
    "src/images/successful.png",
    "src/images/stonk.png",
  ];
  const totalImages = images.length;

  // 更新輪播圖位置
  const updateCarousel = (index) => {
    const offset = -index * 100;
    document.getElementById(
      "images"
    ).style.transform = `translateX(${offset}%)`;
  };

  // 手動切換到上一張
  const goToPrevious = () => {
    const newIndex = (currentIndex - 1 + totalImages) % totalImages;
    setCurrentIndex(newIndex);
    updateCarousel(newIndex);
  };

  // 手動切換到下一張
  const goToNext = () => {
    const newIndex = (currentIndex + 1) % totalImages;
    setCurrentIndex(newIndex);
    updateCarousel(newIndex);
  };

  // 自動播放功能，5秒自動切換
  useEffect(() => {
    const interval = setInterval(() => {
      const newIndex = (currentIndex + 1) % totalImages;
      setCurrentIndex(newIndex);
      updateCarousel(newIndex);
    }, 5000);
    return () => clearInterval(interval); // 清理 interval 避免內存洩漏
  }, [currentIndex]);

  return (
    <>
      <div id="carousel">
        {/* 左側箭頭 */}
        <a href="#" id="previous" onClick={goToPrevious}>
          &lt;
        </a>

        {/* 輪播圖片 */}
        <div id="images">
          {images.map((src, index) => (
            <img key={index} src={src} alt={`slide-${index}`} />
          ))}
        </div>

        {/* 右側箭頭 */}
        <a href="#" id="next" onClick={goToNext}>
          &gt;
        </a>
      </div>

      {/* 底部圖示部分 */}
      <div id="icons">
        <div className="icon">
          <img src="src/images/emoji.png" alt="" />
          <p>icon描述</p>
        </div>
        <div className="icon">
          <img src="src/images/emoji.png" alt="" />
          <p>icon描述</p>
        </div>
        <div className="icon">
          <img src="src/images/emoji.png" alt="" />
          <p>icon描述</p>
        </div>
        <div className="icon">
          <img src="src/images/emoji.png" alt="" />
          <p>icon描述</p>
        </div>
        <div className="icon">
          <img src="src/images/emoji.png" alt="" />
          <p>icon描述</p>
        </div>
      </div>
    </>
  );
};

export default Index;
