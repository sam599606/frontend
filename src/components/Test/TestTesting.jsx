import React, { useState } from "react";
import styles from "./TestTesting.module.css";
import Swal from "sweetalert2";

// 模擬題目及選項的數據（可以用於測試）
const questions = [
  {
    id: 1,
    question: "你喜歡哪些食物？",
    options: ["蘋果", "香蕉", "橙子", "牛排", "壽司", "蛋糕", "披薩", "沙拉"],
  },
  {
    id: 2,
    question: "你不喜歡哪些活動？",
    options: ["游泳", "跑步", "登山", "讀書", "唱歌", "跳舞", "滑雪", "畫畫"],
  },
  {
    id: 3,
    question: "哪些是你常做的休閒活動？",
    options: ["看電影", "運動", "購物", "打電動", "看書", "健身", "烹飪"],
  },
  {
    id: 4,
    question: "你最常使用哪些社交媒體平台？",
    options: [
      "Facebook",
      "Instagram",
      "Twitter",
      "YouTube",
      "TikTok",
      "Snapchat",
    ],
  },
  {
    id: 5,
    question: "你偏好哪些音樂類型？",
    options: ["流行", "搖滾", "古典", "電子", "爵士", "嘻哈"],
  },
  {
    id: 6,
    question: "你會選擇哪種交通工具？",
    options: ["汽車", "自行車", "巴士", "火車", "飛機", "步行"],
  },
  {
    id: 7,
    question: "你喜歡哪些類型的電影？",
    options: ["喜劇", "恐怖", "動作", "科幻", "愛情", "紀錄片"],
  },
  {
    id: 8,
    question: "哪些是你常喝的飲料？",
    options: ["咖啡", "茶", "牛奶", "果汁", "汽水", "水"],
  },
  {
    id: 9,
    question: "你喜歡的旅遊方式是什麼？",
    options: ["自助旅行", "團體旅遊", "豪華旅行", "背包旅行", "露營", "登山"],
  },
  {
    id: 10,
    question: "你喜歡哪些寵物？",
    options: ["狗", "貓", "兔子", "魚", "鳥", "倉鼠"],
  },
];

const TestTesting = () => {
  const [currentQuestion, setCurrentQuestion] = useState(1); // 當前題目進度
  const [selectedAnswers, setSelectedAnswers] = useState([]); // 儲存已選擇的選項卡
  const [usedAnswers, setUsedAnswers] = useState({}); // 記錄每個位置上的選項

  const handleDragStart = (e, option) => {
    e.dataTransfer.setData("text", option); // 將選項卡的資料放入拖曳事件
  };

  const handleDrop = (e, type) => {
    e.preventDefault();
    const option = e.dataTransfer.getData("text"); // 從拖曳事件中獲取選項
    if (selectedAnswers.includes(option)) return; // 確保選項只出現一次

    setUsedAnswers((prev) => ({
      ...prev,
      [type]: option,
    }));
    setSelectedAnswers((prev) => [...prev, option]); // 加入已選擇的選項
  };

  const handleRemove = (type) => {
    const removedOption = usedAnswers[type];
    setSelectedAnswers((prev) => prev.filter((opt) => opt !== removedOption)); // 從已選擇的選項中移除
    setUsedAnswers((prev) => ({ ...prev, [type]: null })); // 清空該槽位
  };

  const handlePreviousQuestion = () => {
    setCurrentQuestion((prev) => prev - 1); // 切換到上一題
    setSelectedAnswers([]); // 清空選擇的答案
    setUsedAnswers({}); // 清空選項槽位
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length) {
      setCurrentQuestion((prev) => prev + 1); // 切換到下一題
      setSelectedAnswers([]); // 清空選擇的答案
      setUsedAnswers({}); // 清空選項槽位
    } else {
      Swal.fire({
        icon: "success",
        title: "測驗完成",
        text: "你已經完成了所有的題目！",
        confirmButtonColor: "#d5ad8a",
      });
    }
  };

  return (
    <div className={styles.wrap}>
      <h1>{questions[currentQuestion - 1].question}</h1>

      {/* 題目進度 */}
      <div className={styles.counter}>
        <span>
          {currentQuestion}/{questions.length}
        </span>
      </div>

      {/* 放選項的槽位 */}
      <div className={styles.targetContainer} id="answers">
        <div className={`${styles.likerow}`}>
          {[0, 1, 2].map((idx) => (
            <div
              key={idx}
              className={`${styles.ans} ${styles.like} ${
                usedAnswers[`like${idx}`] ? styles.filled : ""
              }`}
              data-role="drag_drop_container"
              onDrop={(e) => handleDrop(e, `like${idx}`)}
              onDragOver={(e) => e.preventDefault()}
              onClick={() => handleRemove(`like${idx}`)}
            >
              {usedAnswers[`like${idx}`]}
            </div>
          ))}
        </div>

        <div className={`${styles.dislikerow}`}>
          {[0, 1, 2].map((idx) => (
            <div
              key={idx}
              className={`${styles.ans} ${styles.dislike} ${
                usedAnswers[`dislike${idx}`] ? styles.filled : ""
              }`}
              data-role="drag_drop_container"
              onDrop={(e) => handleDrop(e, `dislike${idx}`)}
              onDragOver={(e) => e.preventDefault()}
              onClick={() => handleRemove(`dislike${idx}`)}
            >
              {usedAnswers[`dislike${idx}`]}
            </div>
          ))}
        </div>
      </div>

      {/* 選項:可拖曳 */}
      <div className={styles.sourceContainer} id="options">
        {questions[currentQuestion - 1].options.map((option, index) => (
          <div
            key={index}
            className={`${styles.opt} ${
              selectedAnswers.includes(option) ? styles.selected : ""
            }`}
            draggable="true"
            id={`drag_source_multiple_${index}`}
            onDragStart={(e) => handleDragStart(e, option)}
          >
            {option}
          </div>
        ))}
      </div>

      {/* 顯示上一題按鈕，當 currentQuestion > 1 時顯示按鈕 */}
      {currentQuestion > 1 && (
        <div
          className={`${styles.previousbtn}`}
          onClick={handlePreviousQuestion}
        >
          <span>上一題</span>
        </div>
      )}

      {/* 顯示下一題按鈕 */}
      <div className={`${styles.nextbtn}`} onClick={handleNextQuestion}>
        <span>下一題</span>
      </div>
    </div>
  );
};

export default TestTesting;
