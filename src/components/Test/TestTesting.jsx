import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./TestTesting.module.css";
import Swal from "sweetalert2";
import axios from "axios";

let option = [];
let seletionArr = [];
let t_id;

const TestTesting = () => {
  const [currentQuestion, setCurrentQuestion] = useState(1); // 當前題目進度
  const [selectedAnswers, setSelectedAnswers] = useState([]); // 儲存已選擇的選項卡
  const [usedAnswers, setUsedAnswers] = useState({}); // 記錄每個位置上的選項

  //#region 抓取題目
  let que = localStorage.getItem("questions");
  let parse = JSON.parse(que);
  let t_idList = [];
  let questionList = [];
  for (let i = 0; i <= parse.length - 1; i++) {
    t_idList.push(parse[i].t_id);
    questionList.push(parse[i].question);
  }

  for (let i = 0; i <= t_idList.length - 1; i++) {
    t_id = t_idList[i];
    let object = { t_id };
    axios({
      method: "post",
      url: "http://localhost:5262/api/Test/GetTestSeletion",
      data: JSON.stringify(object),
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    })
      .then((res) => {
        seletionArr = [];
        for (let i = 0; i <= res.data.result.length - 1; i++) {
          seletionArr.push(res.data.result[i].seletion);
        }
        option[i] = seletionArr;
        if (i == t_idList.length - 1) {
          localStorage.setItem("option", JSON.stringify(option));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  let test = JSON.parse(localStorage.getItem("option"));

  const questions = [];
  for (let i = 0; i <= test.length - 1; i++) {
    questions.push({
      id: t_idList[i],
      question: questionList[i],
      options: test[i],
    });
  }

  //#region 做題
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
    } else if (currentQuestion == questions.length) {
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

  //#region return
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
      {currentQuestion < questions.length && (
        <div className={`${styles.nextbtn}`} onClick={handleNextQuestion}>
          <span>下一題</span>
        </div>
      )}

      {/* 顯示送出按鈕 */}
      {currentQuestion == questions.length && (
        <div className={`${styles.sendoutbtn}`} onClick={handleNextQuestion}>
          <span>送出</span>
        </div>
      )}
    </div>
  );
};

export default TestTesting;
