import React from "react";
import { Link } from "react-router-dom";
import styles from "./TestHistory.module.css";

const TestHistory = () => {
  const testData = [
    { date: `2024/9/13`, time: `05:17`, result: "MBTI" },
    { date: `2024/9/25`, time: `02:12`, result: "MBTI" },
    { date: `2024/9/13`, time: `05:07`, result: "MBTI" },
    { date: `2024/9/25`, time: `05:24`, result: "MBTI" },
    { date: `2024/9/25`, time: `06:08`, result: "MBTI" },
    { date: `2024/9/9`, time: `08:11`, result: "MBTI" },
    { date: `2024/9/14`, time: `05:00`, result: "MBTI" },
    { date: `2024/9/1`, time: `12:17`, result: "MBTI" },
    { date: `2024/9/25`, time: `11:12`, result: "MBTI" },
    { date: `2024/9/14`, time: `15:37`, result: "MBTI" },
  ];

  console.log(testData);

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
