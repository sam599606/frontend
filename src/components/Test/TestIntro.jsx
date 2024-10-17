import React from "react";
import { useNavigate } from "react-router-dom"; // 使用 React Router 進行頁面跳轉
import styles from "./TestIntro.module.css"; // 使用模組樣式
import axios from "axios";

const TestIntro = () => {
  const navigate = useNavigate();
  const getTest = () => {
    let token = localStorage.getItem('token')
    axios({
      method: "get",
      url: `http://localhost:5262/api/Test/TestList`,
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })
      .then((res) => {
        let questions = res.data.result;
        let jsondata = JSON.stringify(questions);
        localStorage.setItem("questions", jsondata);
        console.log(res);
      })
      .then(() => {
        navigate("/test-testing");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  
  return (
    <div className={styles.wrap}>
      {" "}
      {/* 使用 styles.wrap 來引用模組樣式 */}
      <div className={styles.intro}>
        <h2>測驗說明</h2>
        <p>
          測驗一共20題，時間為50分鐘，
          <br />
          在規定時間內，將題目完成，在按下送出，即為成功。
        </p>
      </div>
      <div className={styles.intro}>
        <h2>答題方式</h2>
        <p>將下方選項拖曳至上方空格內，並依喜好程度，去排順序。</p>
      </div>
      {/* 使用 styles.go 來引用模組樣式 */}
      <button className={styles.go} onClick={getTest}>
        測驗開始
      </button>
    </div>
  );
};

export default TestIntro;
