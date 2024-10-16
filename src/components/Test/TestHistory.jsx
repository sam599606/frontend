import React from "react";
import { Link } from "react-router-dom";
import styles from "./TestHistory.module.css";
import axios from "axios";

const TestHistory = () => {

  let token = localStorage.getItem('token')
  axios({
    method: "get",
    url: "http://localhost:5262/api/UserAnswer/AnswerResultList",
    headers: {
      'Authorization': 'Bearer ' + token
    },
  })
    .then((res) => {
      console.log(res);
      let date = []
      let time = []
      let result = []
      for(let i = 0; i <= res.data.result.length - 1; i++){
        date[i] = res.data.result[i].testTime.substr(0,10)
        time[i] = res.data.result[i].testTime.substr(11,18)
        result[i] = res.data.result[i].mbtI_Result
      }
      localStorage.setItem('date', date)
      localStorage.setItem('time', time)
      localStorage.setItem('result', result)
    })
    .catch((err) => {
      console.log(err);
    });

    let a = localStorage.getItem('date')
    let b = localStorage.getItem('time')
    let c = localStorage.getItem('result')
    let testData = []

    for(let i = 0; i <= a.split(',').length - 1; i++){
      let date = a.split(',')[i]
      let time = b.split(',')[i]
      let result = c.split(',')[i]
      testData[i] = {date, time, result}
    }
    console.log(testData)

  return (
    <div className={styles.wrap}>
      <div className={styles.sort}>
        <div className={styles.date}>測驗日期</div>
        <div className={styles.time}>測驗時間</div>
        <div className={styles.result}>結果</div>
        <div className={styles.btns}>查看</div>
      </div>
      <div className={styles.tableContainer}>
        <table className={styles.items}>
          <tbody>
            {testData.map((data, index) => (
              <tr key={index}>
                <td className={styles.date}>{data.date}</td>
                <td className={styles.time}>{data.time}</td>
                <td className={styles.result}>{data.result}</td>
                <td className={styles.btns}>
                  <Link to="/test-result">
                    <button className={styles.info}>查看</button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <table className={styles.pages}>
        <tbody>
          <tr>
            <a href="#">
              <img src="/src/images/previouspage.png" alt="next page" />
            </a>
            <td>
              <a href="#">1</a>
            </td>
            <td>
              <a href="#">
                <img src="/src/images/nextpage.png" alt="next page" />
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TestHistory;
