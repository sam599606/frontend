import React, { useEffect, useState } from 'react';
import ReactECharts from "echarts-for-react";
import styles from "./TestResult.module.css";
import axios from "axios";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";

const cookies = new Cookies();
let token = cookies.get("token");

const TestResult = () => {
  // 用於保存翻轉狀態
  const [isHollandFlipped, setIsHollandFlipped] = useState(false);
  const [isMbtiFlipped, setIsMbtiFlipped] = useState(false);
  const [test, setTest] = useState([]); // 保存工作資料的狀態
  const navigate = useNavigate();

  let data = localStorage.getItem("ua_data");
  let ua_data = JSON.parse(data);
  console.log("ua_data:", ua_data);

  //#region HOLLAND雷達圖
  const radarData = {
    indicator: [
      { name: "實用型 Realistic", max: 50 },
      { name: "研究型 Investigative", max: 50 },
      { name: "藝術型 Artistic", max: 50 },
      { name: "社會型 Social", max: 50 },
      { name: "企業型 Enterprising", max: 50 },
      { name: "資料型 Conventional", max: 50 },
    ],
    data: [
      ua_data.count_HOL_R,
      ua_data.count_HOL_I,
      ua_data.count_HOL_A,
      ua_data.count_HOL_S,
      ua_data.count_HOL_E,
      ua_data.count_HOL_C,
    ], // 測試數據
  };

  const getRadarOption = () => {
    return {
      backgroundColor: "#f4eee2",
      tooltip: {},
      radar: {
        shape: "polygon",
        indicator: radarData.indicator,
        splitNumber: 5,
        splitArea: {
          areaStyle: {
            color: "rgba(0, 0, 0, 0)",
          },
        },
        axisLine: {
          lineStyle: {
            color: "#745329",
          },
        },
        splitLine: {
          lineStyle: {
            color: "#745329",
          },
        },
        name: {
          textStyle: {
            fontSize: 22,
            color: "#745329",
          },
        },
      },
      series: [
        {
          name: "Holland 測試結果",
          type: "radar",
          data: [
            {
              value: radarData.data,
              areaStyle: {
                color: "rgba(255, 180, 68, 0.8)",
              },
            },
          ],
        },
      ],
    };
  };

  //#region MBTI圖
  const getMbtiBarOption = () => {
    const data = [
      {
        leftLabel: "E",
        rightLabel: "I",
        leftValue: ua_data.count_MBTI_E,
        rightValue: ua_data.count_MBTI_I,
      },
      {
        leftLabel: "N",
        rightLabel: "S",
        leftValue: ua_data.count_MBTI_N,
        rightValue: ua_data.count_MBTI_S,
      },
      {
        leftLabel: "F",
        rightLabel: "T",
        leftValue: ua_data.count_MBTI_F,
        rightValue: ua_data.count_MBTI_T,
      },
      {
        leftLabel: "P",
        rightLabel: "J",
        leftValue: ua_data.count_MBTI_P,
        rightValue: ua_data.count_MBTI_J,
      },
    ];

    return {
      backgroundColor: "#f4eee2",
      grid: {
        left: "0%",
        right: "0%",
        bottom: "0%",
        top: "-300%", // 將 top 改為 0% 或可以調整為更小的值來移動
        containLabel: true,
      },
      xAxis: {
        max: 1,
        min: 0,
        splitLine: { show: false },
        axisLabel: { show: false },
        axisTick: { show: false },
        axisLine: { show: false },
      },
      yAxis: {
        type: "category",
        data: ["P - J", "F - T", "N - S", "E - I"],
        axisTick: { show: false },
        axisLine: { show: false },
        axisLabel: {
          show: false,
          margin: 0,
          fontSize: 14,
          color: "#745329",
        },
      },
      series: data
        .map((item, index) => {
          const total = item.leftValue + item.rightValue;
          const leftPercentage = item.leftValue / total;
          const rightPercentage = item.rightValue / total;

          return [
            {
              type: "bar",
              stack: `stack${index}`,
              barWidth: "20%",
              data: [leftPercentage],
              itemStyle: {
                color: leftPercentage > rightPercentage ? "#ffb144" : "#e0dfd5",
              },
              label: {
                show: true,
                position: "insideLeft",
                formatter: `${item.leftLabel} ${(leftPercentage * 100).toFixed(
                  1
                )}%`,
                color: "#000",
                fontSize: 20,
              },
              z: 10,
            },
            {
              type: "bar",
              stack: `stack${index}`,
              barWidth: "60%",
              data: [rightPercentage],
              itemStyle: {
                color: rightPercentage > leftPercentage ? "#ffb144" : "#e0dfd5",
              },
              label: {
                show: true,
                position: "insideRight",
                formatter: `${(rightPercentage * 100).toFixed(1)}% ${
                  item.rightLabel
                }`,
                color: "#000",
                fontSize: 20,
              },
              z: 10,
            },
          ];
        })
        .flat(),
    };
  };

  //#region Job結果
   useEffect(() => {
    let test_result = ua_data.test_Result.split(",");
    let promises = [];

    for (let i = 0; i < test_result.length; i++) {
      let j_id = test_result[i];
      let object = { j_id };

      promises.push(
        axios({
          method: "post",
          url: "http://localhost:5262/api/Job/GetJob",
          data: JSON.stringify(object),
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json; charset=utf-8",
          },
        })
          .then((res) => {
            return {
              jobs: res.data.result.name,
              j_id: res.data.result.j_id,
              icon: "ElectronicsEngineer",
            };
          })
          .catch((err) => {
            console.log(err);
            return null; // 處理錯誤，返回 null 作為佔位
          })
      );
    }

    // 等待所有的請求完成
    Promise.all(promises).then((results) => {
      const dataArray = results.filter((item) => item !== null);
      setTest(dataArray); // 更新 test 狀態以觸發重新渲染
    });
  }, []); // 空依賴數組確保此 useEffect 只在組件首次渲染時執行一次

  const clickjob = (job) => {
    localStorage.setItem("job", JSON.stringify(job));
    navigate("/dummie");
  };

  //#region return
  return (
    <div className={styles.result}>
      <div className={styles.chart}>
        {/* HOLLAND 區域 */}
        <div
          className={`${styles.holland} ${
            isHollandFlipped ? styles.flipped : ""
          }`}
        >
          <div className={styles.title}>HOLLAND</div>
          <div className={styles.content}>
            <div className={styles.front}>
              <ReactECharts
                option={getRadarOption()}
                className={styles.hollandecharts}
              />
            </div>
            <div className={styles.back}>
              <div id={styles.intro}>
                喜歡用手和眼睛探索，用冷靜的理性主義和熱情的好奇心觸摸和審視他們周圍的世界。具有這種個性類型的人是天生的創造者，
                他們從一個項目轉移到另一個項目，
                從樂趣出發構建有用的事物和冗餘， 並在前進的過程中向環境學習。
              </div>
            </div>
            <button
              className={styles.flipbtn}
              onClick={() => setIsHollandFlipped(!isHollandFlipped)}
            >
              {isHollandFlipped ? "返回" : "了解更多"}
            </button>
          </div>
        </div>

        {/* MBTI 區域 */}
        <div
          className={`${styles.mbti} ${isMbtiFlipped ? styles.flipped : ""}`}
        >
          <div className={styles.title}>MBTI</div>
          <div className={styles.content}>
            <div id={styles["type-name"]}></div>
            <div className={styles.front}>
              <div className={styles.leftcontent}>
                <p>E 外向</p>
                <p>N 直覺</p>
                <p>F 感性</p>
                <p>P 彈性</p>
              </div>
              <ReactECharts
                option={getMbtiBarOption()} // 使用條形圖的配置
                className={styles.mbtiBarChart} // 新增樣式類別來控制圖表大小
              />
              <div className={styles.rightcontent}>
                <p>I 內向</p>
                <p>S 實感</p>
                <p>T 理性</p>
                <p>J 調理</p>
              </div>
            </div>
            <div className={styles.back}>
              <div id={styles.intro}>
                喜歡用手和眼睛探索，用冷靜的理性主義和熱情的好奇心觸摸和審視他們周圍的世界。具有這種個性類型的人是天生的創造者，
                他們從一個項目轉移到另一個項目，
                從樂趣出發構建有用的事物和冗餘， 並在前進的過程中向環境學習。
              </div>
            </div>
            <button
              className={styles.flipbtn}
              onClick={() => setIsMbtiFlipped(!isMbtiFlipped)}
            >
              {isMbtiFlipped ? "返回" : "了解更多"}
            </button>
          </div>
        </div>
      </div>

      {/* Icons */}
      <div id={styles.icons}>
        {test.map((test, index) => (
          <div className={styles["icon-wrap"]} key={index} onClick={() => clickjob(test)}>
            <div className={styles.icon}>
              <img src={`/src/images/${test.icon}.png`} alt={test} />
            </div>
            <p className={styles.jobname}>
              {test.jobs.replace(/([A-Z])/g, " $1")}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestResult;
