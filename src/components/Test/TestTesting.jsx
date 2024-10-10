import React, { useState } from "react";
import styles from "./TestTesting.module.css";

const TestTesting = () => {
  // 設定當前題目進度，默認為第一題
  const [currentQuestion, setCurrentQuestion] = useState(1);

  return (
    <div className={styles.wrap}>
      <h1>情境題目</h1>

      {/* 顯示題目進度 */}
      <div className={styles.counter}>
        <span>{currentQuestion}/20</span>
      </div>

      {/* 放置選項的容器 */}
      <div className={styles.targetContainer} id="answers">
        <div className={`${styles.likerow}`}>
          <div
            className={`${styles.ans} ${styles.like}`}
            data-role="drag_drop_container"
          ></div>
          <div
            className={`${styles.ans} ${styles.like}`}
            data-role="drag_drop_container"
          ></div>
          <div
            className={`${styles.ans} ${styles.like}`}
            data-role="drag_drop_container"
          ></div>
        </div>

        <div className={`${styles.dislikerow}`}>
          <div
            className={`${styles.ans} ${styles.dislike}`}
            data-role="drag_drop_container"
          ></div>
          <div
            className={`${styles.ans} ${styles.dislike}`}
            data-role="drag_drop_container"
          ></div>
          <div
            className={`${styles.ans} ${styles.dislike}`}
            data-role="drag_drop_container"
          ></div>
        </div>
      </div>

      {/* 可拖曳的選項容器 */}
      <div className={styles.sourceContainer} id="options">
        {[...Array(8)].map((_, index) => (
          <div
            key={index}
            className={styles.opt}
            draggable="true"
            id={`drag_source_multiple_${index}`}
          >
            選項
          </div>
        ))}
      </div>

      {/* 顯示下一題按鈕 */}
      <div className={`${styles.nextbtn}`}>
        <span>下一題</span>
      </div>
    </div>
  );
};

export default TestTesting;
