import React, { useState, useEffect } from "react";
import ReactECharts from "echarts-for-react";
import styles from "./TestResult.module.css";

const TestResult = () => {
  // 用於保存翻轉狀態
  const [isHollandFlipped, setIsHollandFlipped] = useState(false);
  const [isMbtiFlipped, setIsMbtiFlipped] = useState(false);

  let data = localStorage.getItem("ua_data");
  let ua_data = JSON.parse(data);

  console.log("ua_data:", ua_data);

  //#region HOLLAND雷達圖
  const radarData = {
    indicator: [
      { name: "實用型 Realistic", max: 15 },
      { name: "研究型 Investigative", max: 15 },
      { name: "藝術型 Artistic", max: 15 },
      { name: "社會型 Social", max: 15 },
      { name: "企業型 Enterprising", max: 15 },
      { name: "資料型 Conventional", max: 15 },
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
            fontSize: 20,
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

  // MBTI 左右對稱橫條圖配置
  const getMbtiBarOption = () => {
    const data = [
      {
        name: "E 外向 vs I 內向",
        value: ua_data.count_MBTI_E - ua_data.count_MBTI_I,
      },
      {
        name: "N 直覺 vs S 實感",
        value: ua_data.count_MBTI_N - ua_data.count_MBTI_S,
      },
      {
        name: "F 情感 vs T 理性",
        value: ua_data.count_MBTI_F - ua_data.count_MBTI_T,
      },
      {
        name: "P 知覺 vs J 判斷",
        value: ua_data.count_MBTI_P - ua_data.count_MBTI_J,
      },
    ];

    // 將數據順序反轉
    const reversedData = data.reverse();

    return {
      backgroundColor: "#f4eee2",
      grid: {
        left: "15%",
        right: "15%",
        bottom: "10%",
        top: "10%",
        containLabel: true,
      },
      xAxis: {
        max: 20, // 假設正負範圍為 -20 到 20
        min: -20,
        splitLine: { show: false },
        axisLabel: { show: false },
        axisTick: { show: false },
        axisLine: { show: false },
      },
      yAxis: {
        type: "category",
        data: reversedData.map((item) => item.name), // 反轉後的標題
        axisTick: { show: false },
        axisLine: { show: false },
        axisLabel: {
          fontSize: 18,
          color: "#745329",
        },
      },
      series: [
        {
          type: "bar",
          barWidth: "60%",
          data: reversedData.map((item) => item.value), // 反轉後的數據
          itemStyle: {
            color: function (params) {
              return params.value > 0 ? "#ffb144" : "#cfa876"; // 正值和負值不同顏色
            },
          },
          label: {
            show: true,
            position: "insideRight", // 將值顯示在進度條內部
            formatter: "{c}",
            color: "#fff",
            fontSize: 16,
          },
          z: 10, // 確保進度條在最上層
        },
        {
          type: "bar",
          barWidth: "60%",
          data: new Array(reversedData.length).fill(20), // 背景條
          itemStyle: {
            color: "#e0dfd5", // 背景色
          },
          barGap: "-100%", // 重疊
          z: 5, // 背景層
        },
        {
          type: "bar",
          barWidth: "60%",
          data: new Array(reversedData.length).fill(-20), // 負方向背景條
          itemStyle: {
            color: "#e0dfd5", // 背景色
          },
          barGap: "-100%", // 重疊
          z: 5, // 背景層
        },
      ],
    };
  };

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
                喜歡用手和眼睛探索，用冷靜的理性主義和熱情的好奇心觸摸和審視他們周圍的世界...
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
            <div id={styles["type-name"]}>{ua_data.mbtI_Result}</div>
            <div className={styles.front}>
              <ReactECharts
                option={getMbtiBarOption()} // 使用條形圖的配置
                className={styles.mbtiBarChart} // 新增樣式類別來控制圖表大小
              />
            </div>
            <div className={styles.back}>
              <div id={styles.intro}>
                喜歡用手和眼睛探索，用冷靜的理性主義和熱情的好奇心觸摸和審視他們周圍的世界...
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
        {[
          "ElectronicsEngineer",
          "DesignEngineer",
          "CommunicationsEngineer",
          "MechanicalEngineer",
          "SystemEngineer",
        ].map((iconName, index) => (
          <div className={styles["icon-wrap"]} key={index}>
            <div className={styles.icon}>
              <img src={`/src/images/${iconName}.png`} alt={iconName} />
            </div>
            <p>{iconName.replace(/([A-Z])/g, " $1")}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestResult;
