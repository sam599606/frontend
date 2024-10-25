import React from "react";
import { useNavigate } from "react-router-dom"; // 使用 React Router 進行頁面跳轉
import styles from "./TestIntro.module.css"; // 使用模組樣式
import axios from "axios";
import Cookies from "universal-cookie";
import Swal from "sweetalert2";

let t_idList = [];
let questionList = [];
let bgColorList = [];
let bgImgList = [];
let animateImgList = [];
let test = [];
let ts_id = [];
let seletionArr = [];
let ts_idArr = [];
let t_id;

const TestIntro = () => {
  const navigate = useNavigate();
  const cookies = new Cookies();

  const getTest = () => {
    let token = cookies.get("token");

    if (!token) {
      Swal.fire({
        title: "請先登入",
        text: "您需要先登入才能進行測驗。",
        icon: "warning",
        confirmButtonText: "確定",
        confirmButtonColor: "#d5ad8a",
      });
      return;
    }

    axios({
      method: "get",
      url: `http://localhost:5262/api/Test/TestList`,
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => {
        let questions = res.data.result;
        for (let i = 0; i <= questions.length - 1; i++) {
          t_idList[i] = questions[i].t_id;
          bgColorList[i] = questions[i].bgColor;
          bgImgList[i] = questions[i].bgImg;
          animateImgList[i] = questions[i].animateImg;
          questionList[i] = questions[i].question;
        }
      })
      .then(() => {
        for (let i = 0; i <= t_idList.length - 1; i++) {
          t_id = t_idList[i];
          let object = { t_id };
          axios({
            method: "post",
            url: "http://localhost:5262/api/Test/GetTestSeletion",
            data: JSON.stringify(object),
            headers: {
              "Content-Type": "application/json; charset=utf-8",
              Authorization: "Bearer " + token,
            },
          })
            .then((res) => {
              seletionArr = [];
              ts_idArr = [];
              for (let i = 0; i <= res.data.result.length - 1; i++) {
                seletionArr[i] = res.data.result[i].seletion;
                ts_idArr[i] = res.data.result[i].ts_id;
              }
              test[i] = seletionArr;
              ts_id[i] = ts_idArr;
            })
            .then(() => {
              setTimeout(() => {
                if (i === t_idList.length - 1) {
                  localStorage.setItem("test", JSON.stringify(test));
                  localStorage.setItem("ts_id", JSON.stringify(ts_id));
                  localStorage.setItem(
                    "questionList",
                    JSON.stringify(questionList)
                  );
                  localStorage.setItem(
                    "bgColorList",
                    JSON.stringify(bgColorList)
                  );
                  localStorage.setItem("bgImgList", JSON.stringify(bgImgList));
                  localStorage.setItem("animateImgList", JSON.stringify(animateImgList));
                }
              }, 20);
            })
            .catch((err) => {
              console.log(err);
            });
        }
      })
      .then(() => {
        setTimeout(() => {
          navigate("/test-testing");
        }, 200);
        console.log();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className={styles.wrap}>
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
