import React, { useState, useEffect } from "react";
import styles from "./TestHistory.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const TestHistory = () => {
  const [testData, setTestData] = useState([]);
  const navigate = useNavigate();
  // 使用 useEffect 來確保在組件首次渲染時抓取資料
  useEffect(() => {
    const fetchData = async () => {
      let token = localStorage.getItem("token");

      try {
        const res = await axios({
          method: "get",
          url: "http://localhost:5262/api/UserAnswer/AnswerResultList",
          headers: {
            Authorization: "Bearer " + token,
          },
        });

        // 處理取得的資料
        let ua_id = [];
        let account = [];
        let date = [];
        let time = [];
        let result = [];

        for (let i = 0; i < res.data.result.length; i++) {
          ua_id[i] = res.data.result[i].ua_id;
          account[i] = res.data.result[i].account;
          date[i] = res.data.result[i].testTime.substr(0, 10);
          time[i] = res.data.result[i].testTime.substr(11, 18);
          result[i] = res.data.result[i].mbtI_Result;
        }

        // 將資料儲存到 localStorage 中
        localStorage.setItem("ua_id", JSON.stringify(ua_id));
        localStorage.setItem("test_account", JSON.stringify(account));
        localStorage.setItem("date", JSON.stringify(date));
        localStorage.setItem("time", JSON.stringify(time));
        localStorage.setItem("result", JSON.stringify(result));

        // 從 localStorage 取出資料
        let a = JSON.parse(localStorage.getItem("ua_id"));
        let b = JSON.parse(localStorage.getItem("test_account"));
        let c = JSON.parse(localStorage.getItem("date"));
        let d = JSON.parse(localStorage.getItem("time"));
        let e = JSON.parse(localStorage.getItem("result"));

        let fetchedTestData = [];

        for (let i = 0; i < a.length; i++) {
          let ua_ida = a[i];
          let test_account = b[i];
          let date = c[i];
          let time = d[i];
          let result = e[i];
          fetchedTestData.push({ ua_ida, test_account, date, time, result });
        }

        // 過濾與目前帳號不符的資料
        let aa = localStorage.getItem("acc");
        fetchedTestData = fetchedTestData.filter(
          (data) => data.test_account === aa
        );

        // 更新狀態
        setTestData(fetchedTestData);
        localStorage.setItem("testData", JSON.stringify(fetchedTestData));
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  const handleClick = async (ua_id) => {
    let token = localStorage.getItem("token");
    try {
      let object = { ua_id };
      let jsondata = JSON.stringify(object);

      const res = await axios({
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
        localStorage.setItem('ua_data', JSON.stringify(res.data.result))
      })
      .then(() => {
        navigate("/test-result");
      })
    } catch (err) {
      console.log(err);
    }
  };

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
                  <button
                    className={styles.info}
                    id={data.ua_ida}
                    onClick={() => handleClick(data.ua_ida)}
                  >
                    查看
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TestHistory;
