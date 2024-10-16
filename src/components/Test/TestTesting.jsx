import React, { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import styles from "./TestTesting.module.css";
import { useNavigate } from "react-router-dom";

let option = [];
let seletionArr = [];
let ts_idArr = [];
let ts_id = [];
let t_id;
let token = localStorage.getItem('token')


const TestTesting = () => {
  const [currentQuestion, setCurrentQuestion] = useState(1); // 當前題目進度
  const [selectedAnswers, setSelectedAnswers] = useState([]); // 儲存已選擇的選項卡
  const [usedAnswers, setUsedAnswers] = useState({}); // 記錄每個位置上的選項
  const [answerLog, setAnswerLog] = useState([]); // 新增陣列來記錄每一題的選項與槽位
  const navigate = useNavigate();

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
        ts_idArr = [];
        for (let i = 0; i <= res.data.result.length - 1; i++) {
          seletionArr.push(res.data.result[i].seletion);
          ts_idArr.push(res.data.result[i].ts_id);
        }
        option[i] = seletionArr;
        ts_id[i] = ts_idArr;
        if (i === t_idList.length - 1) {
          localStorage.setItem("option", JSON.stringify(option));
          localStorage.setItem("ts_id",JSON.stringify(ts_id))
        }        
      })
      .catch((err) => {
        console.log(err);
      });
  }
  let test = JSON.parse(localStorage.getItem("option"));
  let ts_id = JSON.parse(localStorage.getItem("ts_id"));

  const questions = [];
  for (let i = 0; i <= questionList.length - 1; i++) {
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


//#region 問題
    // 更新 answerLog，記錄第幾題選擇了什麼並放在哪個槽位
    setAnswerLog((prev) => {
      const updatedLog = [...prev];
      const questionIndex = currentQuestion - 1; // 當前題目索引
      if (!updatedLog[questionIndex]) {
        updatedLog[questionIndex] = {
          questionId: currentQuestion,
          answers: {},
        };
      }
      updatedLog[questionIndex].answers[type] = option;
      return updatedLog;
    });
  };

  const handleRemove = (type) => {
    const removedOption = usedAnswers[type];
    setSelectedAnswers((prev) => prev.filter((opt) => opt !== removedOption)); // 從已選擇的選項中移除
    setUsedAnswers((prev) => ({ ...prev, [type]: null })); // 清空該槽位

    // 移除 answerLog 中該選項的紀錄
    setAnswerLog((prev) =>
      prev.filter(
        (log) => !(log.questionId === currentQuestion && log.slot === type)
      )
    );
  };

  const handlePreviousQuestion = () => {
    setCurrentQuestion((prev) => {
      const newQuestion = prev - 1;
      restorePreviousAnswer(newQuestion); // 還原上一題的答案
      return newQuestion;
    });
  };

  // 檢查是否已經填滿了 6 張選項卡
  const isFilled = Object.values(usedAnswers).filter(Boolean).length === 6;

  const handleNextQuestion = () => {
    // 檢查是否已填滿6張卡片
    if (!isFilled) {
      Swal.fire({
        icon: "warning",
        title: "請完成本題",
        text: "你需要將6張選項卡全部放置到槽位中才可進入下一題！",
        confirmButtonColor: "#d5ad8a",
      });
      return;
    }

    // 如果已經填滿了6張卡片，進入下一題
    if (currentQuestion < questions.length) {
      setCurrentQuestion((prev) => {
        const newQuestion = prev + 1;
        restorePreviousAnswer(newQuestion); // 還原下一題的答案
        return newQuestion;
      });
    } else {
      Swal.fire({
        icon: "success",
        title: "測驗完成",
        text: "你已經完成了所有的題目！",
        confirmButtonColor: "#d5ad8a",
      }).then(() => {
        // 當用戶點擊確認時跳轉到結果頁面
        navigate("/test-result");
      });
      console.log("使用者作答紀錄:", answerLog);
      
      let ua_goodList1 = []
      let ua_goodList2 = []
      let ua_goodList3 = []
      let ua_badList1 = []
      let ua_badList2 = []
      let ua_badList3 = []

      for(let i = 0; i <= answerLog.length - 1; i++){
        for(let k = 0; k <= test.length - 1; k++){
          for(let n = 0; n <= test[k].length - 1; n++){
            if(answerLog[i].answers.like0 == test[k][n]){
              ua_goodList1[i] = ts_id[k][n]
            }
            else if(answerLog[i].answers.like1 == test[k][n]){
              ua_goodList2[i] = ts_id[k][n]
            }
            else if(answerLog[i].answers.like2 == test[k][n]){
              ua_goodList3[i] = ts_id[k][n]
            }
            else if(answerLog[i].answers.dislike0 == test[k][n]){
              ua_badList1[i] = ts_id[k][n]
            }
            else if(answerLog[i].answers.dislike1 == test[k][n]){
              ua_badList2[i] = ts_id[k][n]
            }
            else if(answerLog[i].answers.dislike2 == test[k][n]){
              ua_badList3[i] = ts_id[k][n]
            }
          }
        }
      }

      ua_goodList1 = ua_goodList1.join()
      ua_goodList2 = ua_goodList2.join()
      ua_goodList3 = ua_goodList3.join()
      ua_badList1 = ua_badList1.join()
      ua_badList2 = ua_badList2.join()
      ua_badList3 = ua_badList3.join()
      
      let abc = {
        ua_goodList1,
        ua_goodList2,
        ua_goodList3,
        ua_badList1,
        ua_badList2,
        ua_badList3
      }
      console.log(JSON.stringify(abc))
      
      axios({
        method: "post",
        url: `http://localhost:5262/api/UserAnswer/CreateAnswer`,
        data: abc,
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          "Authorization" : token
        },
      })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const restorePreviousAnswer = (questionNumber) => {
    const questionIndex = questionNumber - 1;
    const savedAnswer = answerLog[questionIndex];

    if (savedAnswer) {
      const restoredAnswers = savedAnswer.answers || {};
      setUsedAnswers(restoredAnswers);

      const restoredSelectedAnswers = Object.values(restoredAnswers); // 把已選擇的答案取出來
      setSelectedAnswers(restoredSelectedAnswers);
    } else {
      setUsedAnswers({}); // 沒有紀錄則清空
      setSelectedAnswers([]);
    }
  };
  

  //#region return
  return (
    <div className={styles.wrap}>
      <p>{questions[currentQuestion - 1].question}</p>

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
        <div
          className={`${styles.nextbtn} ${!isFilled ? styles.disabled : ""}`}
          onClick={handleNextQuestion}
          // style={{ pointerEvents: isFilled ? "auto" : "none" }} // 禁止點擊
        >
          <span>下一題</span>
        </div>
      )}

      {/* 顯示送出按鈕 */}
      {currentQuestion === questions.length && (
        <div
          className={`${styles.sendoutbtn} ${!isFilled ? styles.disabled : ""}`}
          onClick={handleNextQuestion}
          // style={{ pointerEvents: isFilled ? "auto" : "none" }} // 禁止點擊
        >
          <span>送出</span>
        </div>
      )}
    </div>
  );
};

export default TestTesting;
