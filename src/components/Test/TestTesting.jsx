import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import styles from "./TestTesting.module.css";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Cookies from "universal-cookie";
import { CSSTransition } from "react-transition-group";
import "./TestTesting.css";

const cookies = new Cookies();
let token = cookies.get("token");
let Bg = styled.div;
let Qp = styled.p;
let Cp = styled.span;
let Qb = styled.div;
let Qs = styled.span;
let animateImgSrc

const TestTesting = () => {
  const [currentQuestion, setCurrentQuestion] = useState(1); // 當前題目進度
  const [selectedAnswers, setSelectedAnswers] = useState([]); // 儲存已選擇的選項卡
  const [usedAnswers, setUsedAnswers] = useState({}); // 記錄每個位置上的選項
  const [answerLog, setAnswerLog] = useState([]); // 新增陣列來記錄每一題的選項與槽位
  const navigate = useNavigate();

  //#region 抓取題目
  let test = JSON.parse(localStorage.getItem("test"));
  let ts_id = JSON.parse(localStorage.getItem("ts_id"));
  let questionList = JSON.parse(localStorage.getItem("questionList"));
  let bgColorList = JSON.parse(localStorage.getItem("bgColorList"));
  let bgImgList = JSON.parse(localStorage.getItem("bgImgList"));
  let animateImgList = JSON.parse(localStorage.getItem("animateImgList"));

  const questions = [];
  for (let i = 0; i <= questionList.length - 1; i++) {
    questions[i] = {
      id: ts_id[i],
      bgImg: bgImgList[i],
      animateImg: animateImgList[i],
      bgColor: bgColorList[i],
      question: questionList[i],
      options: test[i],
    };
  }

  console.log("questions:", questions);

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
      animateImgSrc = questions[currentQuestion].animateImg
      setValue(value - 1);
      return newQuestion;
    });
  };

  // 檢查是否已經填滿了 6 張選項卡
  const isFilled = Object.values(usedAnswers).filter(Boolean).length === 6;

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
        animateImgSrc = questions[currentQuestion].animateImg
        setValue(value + 1);
        return newQuestion;
      });
    } else {
      Swal.fire({
        icon: "success",
        title: "測驗完成",
        text: "你已經完成了所有的題目！",
        confirmButtonColor: "#d5ad8a",
      });
      console.log("使用者作答紀錄:", answerLog);

      //#region 送出答案
      let ua_goodList1 = [];
      let ua_goodList2 = [];
      let ua_goodList3 = [];
      let ua_badList1 = [];
      let ua_badList2 = [];
      let ua_badList3 = [];

      for (let i = 0; i <= answerLog.length - 1; i++) {
        for (let k = 0; k <= test.length - 1; k++) {
          for (let n = 0; n <= test[k].length - 1; n++) {
            if (answerLog[i].answers.like0 == test[k][n]) {
              ua_goodList1[i] = ts_id[k][n];
            } else if (answerLog[i].answers.like1 == test[k][n]) {
              ua_goodList2[i] = ts_id[k][n];
            } else if (answerLog[i].answers.like2 == test[k][n]) {
              ua_goodList3[i] = ts_id[k][n];
            } else if (answerLog[i].answers.dislike0 == test[k][n]) {
              ua_badList1[i] = ts_id[k][n];
            } else if (answerLog[i].answers.dislike1 == test[k][n]) {
              ua_badList2[i] = ts_id[k][n];
            } else if (answerLog[i].answers.dislike2 == test[k][n]) {
              ua_badList3[i] = ts_id[k][n];
            }
          }
        }
      }

      ua_goodList1 = ua_goodList1.join();
      ua_goodList2 = ua_goodList2.join();
      ua_goodList3 = ua_goodList3.join();
      ua_badList1 = ua_badList1.join();
      ua_badList2 = ua_badList2.join();
      ua_badList3 = ua_badList3.join();

      let answerList = {
        ua_goodList1,
        ua_goodList2,
        ua_goodList3,
        ua_badList1,
        ua_badList2,
        ua_badList3,
      };
      console.log(JSON.stringify(answerList));

      axios({
        method: "post",
        url: `http://localhost:5262/api/UserAnswer/CreateAnswerAndCount`,
        data: answerList,
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Authorization: "Bearer " + token,
        },
      })
        .then((res) => {
          console.log("success");
          let ua_id = res.data.result;
          let jsondata = JSON.stringify(ua_id);
          axios({
            method: "post",
            url: "http://localhost:5262/api/UserAnswer/GetAnswerResult",
            data: jsondata,
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          })
            .then((res) => {
              console.log(res);
              localStorage.setItem("ua_data", JSON.stringify(res.data.result));
            })
            .then(() => {
              localStorage.removeItem("test");
              localStorage.removeItem("ts_id");
              localStorage.removeItem("questionList");
              localStorage.removeItem("bgColorList");
              localStorage.removeItem("bgImgList");
              localStorage.removeItem("animateImgList");
              navigate("/test-result");
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  //#region 根據題目改顏色
  if (questions[currentQuestion - 1].bgColor == 1) {
    Bg = styled.div`
      height: 100vh;
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-around;
      overflow: hidden;
      background-color: #f6cf80;
    `;
    Qp = styled.p`
      width: 75%;
      font-size: 30px;
      color: #745329;
    `;
    Cp = styled.span`
      color: #745329;
    `;
    Qb = styled.div`
      white-space: nowrap;
      height: 5%;
      width: 5%;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 10px 20px;
      border-radius: 20px;
      background-color: #ffb144;
      font-size: 28px;
      box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.5);
      position: absolute;
      bottom: 2%;
      right: 2%;
      transition: background-color 0.3s ease;
      cursor: pointer;
    `;
    Qs = styled.span`
      color: #6e3d26;
    `;
    setTimeout(() => {
      for (let i = 0; i <= test[currentQuestion - 1].length - 1; i++) {
        let ts = document.getElementById(`drag_source_multiple_${i}`);
        ts.classList.add(styles.card1);
      }
      for (let i = 0; i <= 6 - 1; i++) {
        let ts = document.getElementById(`drag_drop_container${i}`);
        if (ts.classList.contains(styles.filled)) {
          ts.classList.add(styles.card1);
        }
      }
    }, 10);
  } else if (questions[currentQuestion - 1].bgColor == 2) {
    Bg = styled.div`
      height: 100vh;
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-around;
      overflow: hidden;
      background-color: #ffe785;
    `;
    Qp = styled.p`
      width: 75%;
      font-size: 30px;
      color: #745329;
    `;
    Cp = styled.span`
      color: #745329;
    `;
    Qb = styled.div`
      white-space: nowrap;
      height: 5%;
      width: 5%;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 10px 20px;
      border-radius: 20px;
      background-color: #e67e22;
      font-size: 28px;
      box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.5);
      position: absolute;
      bottom: 2%;
      right: 2%;
      transition: background-color 0.3s ease;
      cursor: pointer;
    `;
    Qs = styled.span`
      color: #fdfefe;
    `;
    setTimeout(() => {
      for (let i = 0; i <= test[currentQuestion - 1].length - 1; i++) {
        let ts = document.getElementById(`drag_source_multiple_${i}`);
        ts.classList.add(styles.card2);
      }
      for (let i = 0; i <= 6 - 1; i++) {
        let ts = document.getElementById(`drag_drop_container${i}`);
        if (ts.classList.contains(styles.filled)) {
          ts.classList.add(styles.card2);
        }
      }
    }, 10);
  } else if (questions[currentQuestion - 1].bgColor == 3) {
    Bg = styled.div`
      height: 100vh;
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-around;
      overflow: hidden;
      background-color: #fdf1cb;
    `;
    Qp = styled.p`
      width: 75%;
      font-size: 30px;
      color: #745329;
    `;
    Cp = styled.span`
      color: #745329;
    `;
    Qb = styled.div`
      white-space: nowrap;
      height: 5%;
      width: 5%;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 10px 20px;
      border-radius: 20px;
      background-color: #8b572a;
      font-size: 28px;
      box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.5);
      position: absolute;
      bottom: 2%;
      right: 2%;
      transition: background-color 0.3s ease;
      cursor: pointer;
    `;
    Qs = styled.span`
      color: #fdfefe;
    `;
    setTimeout(() => {
      for (let i = 0; i <= test[currentQuestion - 1].length - 1; i++) {
        let ts = document.getElementById(`drag_source_multiple_${i}`);
        ts.classList.add(styles.card3);
      }
      for (let i = 0; i <= 6 - 1; i++) {
        let ts = document.getElementById(`drag_drop_container${i}`);
        if (ts.classList.contains(styles.filled)) {
          ts.classList.add(styles.card3);
        }
      }
    }, 10);
  } else if (questions[currentQuestion - 1].bgColor == 4) {
    Bg = styled.div`
      height: 100vh;
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-around;
      overflow: hidden;
      background-color: #745329;
    `;
    Qp = styled.p`
      width: 75%;
      font-size: 30px;
      color: #f1e2b8;
    `;
    Cp = styled.span`
      color: #f1e2b8;
    `;
    Qb = styled.div`
      white-space: nowrap;
      height: 5%;
      width: 5%;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 10px 20px;
      border-radius: 20px;
      background-color: #bdc3c7;
      font-size: 28px;
      box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.5);
      position: absolute;
      bottom: 2%;
      right: 2%;
      transition: background-color 0.3s ease;
      cursor: pointer;
    `;
    Qs = styled.span`
      color: #8b5a2b;
    `;
    setTimeout(() => {
      for (let i = 0; i <= test[currentQuestion - 1].length - 1; i++) {
        let ts = document.getElementById(`drag_source_multiple_${i}`);
        ts.classList.add(styles.card4);
      }
      for (let i = 0; i <= 6 - 1; i++) {
        let ts = document.getElementById(`drag_drop_container${i}`);
        if (ts.classList.contains(styles.filled)) {
          ts.classList.add(styles.card4);
        }
      }
    }, 10);
  } else if (questions[currentQuestion - 1].bgColor == 5) {
    Bg = styled.div`
      height: 100vh;
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-around;
      overflow: hidden;
      background-color: #d5ad8a;
    `;
    Qp = styled.p`
      width: 75%;
      font-size: 30px;
      color: #745329;
    `;
    Cp = styled.span`
      color: #745329;
    `;
    Qb = styled.div`
      white-space: nowrap;
      height: 5%;
      width: 5%;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 10px 20px;
      border-radius: 20px;
      background-color: #6e3d26;
      font-size: 28px;
      box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.5);
      position: absolute;
      bottom: 2%;
      right: 2%;
      transition: background-color 0.3s ease;
      cursor: pointer;
    `;
    Qs = styled.span`
      color: #fdfefe;
    `;
    setTimeout(() => {
      for (let i = 0; i <= test[currentQuestion - 1].length - 1; i++) {
        let ts = document.getElementById(`drag_source_multiple_${i}`);
        ts.classList.add(styles.card5);
      }
      for (let i = 0; i <= 6 - 1; i++) {
        let ts = document.getElementById(`drag_drop_container${i}`);
        if (ts.classList.contains(styles.filled)) {
          ts.classList.add(styles.card5);
        }
      }
    }, 10);
  } else if (questions[currentQuestion - 1].bgColor == 6) {
    Bg = styled.div`
      height: 100vh;
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-around;
      overflow: hidden;
      background-color: #dbc8b6;
    `;
    Qp = styled.p`
      width: 75%;
      font-size: 30px;
      color: #745329;
    `;
    Cp = styled.span`
      color: #745329;
    `;
    Qb = styled.div`
      white-space: nowrap;
      height: 5%;
      width: 5%;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 10px 20px;
      border-radius: 20px;
      background-color: #c0392b;
      font-size: 28px;
      box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.5);
      position: absolute;
      bottom: 2%;
      right: 2%;
      transition: background-color 0.3s ease;
      cursor: pointer;
    `;
    Qs = styled.span`
      color: #ecf0f1;
    `;
    setTimeout(() => {
      for (let i = 0; i <= test[currentQuestion - 1].length - 1; i++) {
        let ts = document.getElementById(`drag_source_multiple_${i}`);
        ts.classList.add(styles.card6);
      }
      for (let i = 0; i <= 6 - 1; i++) {
        let ts = document.getElementById(`drag_drop_container${i}`);
        if (ts.classList.contains(styles.filled)) {
          ts.classList.add(styles.card6);
        }
      }
    }, 10);
  }

  //#region 根據題目改背景圖片
  const [value, setValue] = useState(0);
  const [showImage, setShowImage] = useState(false);
  const [showContent, setShowContent] = useState(true);

  useEffect(() => {
    if (value == 0) {
      animateImgSrc = questions[currentQuestion - 1].animateImg
      setShowImage(true);
      setShowContent(false);
      const timer = setTimeout(() => {
        setShowImage(false);
        setShowContent(true);
      }, 2000); // 圖片顯示2秒
    }
    if (value !== 0) {
      setShowImage(true);
      setShowContent(false);
      const timer = setTimeout(() => {
        setShowImage(false);
        setShowContent(true);
      }, 2000); // 圖片顯示2秒

      return () => clearTimeout(timer);
    }
  }, [value]);

  //#region return
  return (
    <Bg>
      <CSSTransition
        in={showImage}
        timeout={500}
        classNames="fade"
        unmountOnExit
      >
        <div className="image-overlay">
          <img src={`src/images/animate_IMG/${animateImgSrc}`} alt="Logo" className="image" />
        </div>
      </CSSTransition>

      <CSSTransition
        in={showContent}
        timeout={500}
        classNames="fade"
        unmountOnExit
      >
        <div className={styles.wrap}>
          <Qp>{questions[currentQuestion - 1].question}</Qp>

          {/* 題目進度 */}
          <div className={styles.counter}>
            <Cp>
              {currentQuestion}/{questions.length}
            </Cp>
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
                  id={`drag_drop_container${idx}`}
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
                  id={`drag_drop_container${idx + 3}`}
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
            <Qb
              className={`${styles.previousbtn}`}
              onClick={handlePreviousQuestion}
              id="backBtn"
            >
              <Qs>上一題</Qs>
            </Qb>
          )}

          {/* 顯示下一題按鈕 */}
          {currentQuestion < questions.length && (
            <Qb
              className={`${styles.nextbtn} ${
                !isFilled ? styles.disabled : ""
              }`}
              onClick={handleNextQuestion}
              id="nextBtn"
              // style={{ pointerEvents: isFilled ? "auto" : "none" }} // 禁止點擊
            >
              <Qs>下一題</Qs>
            </Qb>
          )}

          {/* 顯示送出按鈕 */}
          {currentQuestion === questions.length && (
            <Qb
              className={`${styles.sendoutbtn} ${
                !isFilled ? styles.disabled : ""
              }`}
              onClick={handleNextQuestion}
              // style={{ pointerEvents: isFilled ? "auto" : "none" }} // 禁止點擊
            >
              <Qs>送出</Qs>
            </Qb>
          )}
        </div>
      </CSSTransition>
    </Bg>
  );
};

export default TestTesting;
