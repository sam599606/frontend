import React, { useState, useEffect } from "react";
import "./index.css";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";

const Index = () => {
  const [currentIndex, setCurrentIndex] = useState(0); // 控制當前圖片索引
  const location = useLocation(); // 使用 useLocation 來獲取當前路徑
  const isTestTestingPage = location.pathname === "/test-testing"; // 判斷是否在 /test-testing 頁面

  const images = [
    "src/images/輪播圖_1.png",
    "src/images/輪播圖_2.png",
    "src/images/輪播圖_3.png",
    "src/images/輪播圖_4.png",
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
        <div id="previous" onClick={goToPrevious}>
          &lt;
        </div>

        {/* 輪播圖片 */}
        <div id="images">
          {images.map((src, index) => (
            <img key={index} src={src} alt={`slide-${index}`} />
          ))}
        </div>

        {/* 右側箭頭 */}
        <div id="next" onClick={goToNext}>
          &gt;
        </div>
      </div>
      {/* 底部圖示部分 */}
      <div id="icons">
        <div className="icon">
          <Link
            id="iconlink"
            to="/test"
            className={isTestTestingPage ? "disabled-link" : ""}
            onClick={(e) => isTestTestingPage && e.preventDefault()} // 禁用連結
          >
            <div className="link_icon">
              <img src="src/images/feedback.png" />
            </div>
            <p>職涯診斷測驗</p>
          </Link>
        </div>

        <div className="icon">
          <Link
            id="iconlink"
            to="/dummie"
            className={isTestTestingPage ? "disabled-link" : ""}
            onClick={(e) => isTestTestingPage && e.preventDefault()} // 禁用連結
          >
            <div className="link_icon">
              <img src="src/images/businessman.png" />
            </div>
            <p>職業資訊懶人包</p>
          </Link>
        </div>

        <div className="icon">
          <Link
            id="iconlink"
            to="/dummie/class"
            className={isTestTestingPage ? "disabled-link" : ""}
            onClick={(e) => isTestTestingPage && e.preventDefault()} // 禁用連結
          >
            <div className="link_icon">
              <img src="src/images/success.png" />
            </div>
            <p>課程資訊</p>
          </Link>
        </div>

        <div className="icon">
          <Link
            id="iconlink"
            to="/dummie/Subsidy"
            className={isTestTestingPage ? "disabled-link" : ""}
            onClick={(e) => isTestTestingPage && e.preventDefault()} // 禁用連結
          >
            <div className="link_icon">
              <img src="src/images/moneylink.png" />
            </div>
            <p>補助資訊</p>
          </Link>
        </div>

        <div className="icon">
          <Link
            id="iconlink"
            to="/dummie/Certificate"
            className={isTestTestingPage ? "disabled-link" : ""}
            onClick={(e) => isTestTestingPage && e.preventDefault()} // 禁用連結
          >
            <div className="link_icon">
              <img src="src/images/certificate.png" />
            </div>
            <p>證照資訊</p>
          </Link>
        </div>

        <div className="icon">
          <Link
            id="iconlink"
            to="/forcast"
            className={isTestTestingPage ? "disabled-link" : ""}
            onClick={(e) => isTestTestingPage && e.preventDefault()} // 禁用連結
          >
            <div className="link_icon">
              <img src="src/images/prediction.png" />
            </div>
            <p>產業景氣預測</p>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Index;
