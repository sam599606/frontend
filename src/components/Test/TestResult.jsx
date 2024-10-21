import React, { useState } from "react";
import ReactECharts from "echarts-for-react";
import styles from "./TestResult.module.css";

const TestResult = () => {
  // 用於保存翻轉狀態
  const [isHollandFlipped, setIsHollandFlipped] = useState(false);
  const [isMbtiFlipped, setIsMbtiFlipped] = useState(false);

  let data = localStorage.getItem("ua_data");
  let ua_data = JSON.parse(data);

  let HOL_total =
    ua_data.count_HOL_R +
    ua_data.count_HOL_I +
    ua_data.count_HOL_A +
    ua_data.count_HOL_S +
    ua_data.count_HOL_E +
    ua_data.count_HOL_C;

  console.log("ua_data:", ua_data);

  //#region HOLLAND雷達圖
  const radarData = {
    indicator: [
      { name: "實用型 Realistic", max: 30 },
      { name: "研究型 Investigative", max: 30 },
      { name: "藝術型 Artistic", max: 30 },
      { name: "社會型 Social", max: 30 },
      { name: "企業型 Enterprising", max: 30 },
      { name: "資料型 Conventional", max: 30 },
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

  const getMbtiBarOption = () => {
    const data = [
      {
        leftLabel: "E 外向",
        rightLabel: "I 內向",
        leftValue: ua_data.count_MBTI_E,
        rightValue: ua_data.count_MBTI_I,
      },
      {
        leftLabel: "N 直覺",
        rightLabel: "S 實感",
        leftValue: ua_data.count_MBTI_N,
        rightValue: ua_data.count_MBTI_S,
      },
      {
        leftLabel: "F 情感",
        rightLabel: "T 理性",
        leftValue: ua_data.count_MBTI_F,
        rightValue: ua_data.count_MBTI_T,
      },
      {
        leftLabel: "P 知覺",
        rightLabel: "J 判斷",
        leftValue: ua_data.count_MBTI_P,
        rightValue: ua_data.count_MBTI_J,
      },
    ];

    // console.log("data:", data);

    return {
      backgroundColor: "#f4eee2",
      grid: {
        left: "5%",
        right: "5%",
        bottom: "10%",
        top: "10%",
        containLabel: true,
      },
      xAxis: {
        max: 1, // 100% 範圍 (0-1)
        min: 0,
        splitLine: { show: false },
        axisLabel: { show: false },
        axisTick: { show: false },
        axisLine: { show: false },
      },
      yAxis: {
        type: "category",
        data: data.map((item) => `${item.leftLabel} vs ${item.rightLabel}`), // 設定y軸為左右標籤
        axisTick: { show: false },
        axisLine: { show: false },
        axisLabel: {
          fontSize: 16,
          color: "#745329",
          formatter: function (value, index) {
            const item = data[index];
            return `{left|${item.leftLabel}} {right|${item.rightLabel}}`;
          },
          rich: {
            left: {
              align: "left",
              fontSize: 16,
              color: "#745329",
              padding: [0, 0, 0, 0], // 左側內邊距
            },
            right: {
              align: "right",
              fontSize: 16,
              color: "#745329",
              padding: [0, 0, 0, 0], // 右側內邊距
            },
          },
        },
      },
      series: data
        .map((item, index) => {
          const total = item.leftValue + item.rightValue;
          const leftPercentage = item.leftValue / total; // 計算左側百分比
          const rightPercentage = item.rightValue / total; // 計算右側百分比

          return [
            {
              type: "bar",
              stack: `stack${index}`, // 為每個圖條設置單獨的stack，確保它們彼此不干擾
              barWidth: "100%",
              data: [leftPercentage], // 左側比例
              itemStyle: {
                color: item.leftValue > item.rightValue ? "#ffb144" : "#e0dfd5", // 如果左側分數高，則左側填色，否則背景色
              },
              label: {
                show: true,
                position: "insideLeft",
                formatter: `${item.leftValue}`,
                color: "#fff",
                fontSize: 14,
              },
              z: 10,
            },
            {
              type: "bar",
              stack: `stack${index}`, // 為每個圖條設置單獨的stack，確保它們彼此不干擾
              barWidth: "100%",
              data: [rightPercentage], // 右側比例
              itemStyle: {
                color: item.rightValue > item.leftValue ? "#ffb144" : "#e0dfd5", // 如果右側分數高，則右側填色，否則背景色
              },
              label: {
                show: true,
                position: "insideRight",
                formatter: `${item.rightValue}`,
                color: "#fff",
                fontSize: 14,
              },
              z: 10,
            },
          ];
        })
        .flat(), // 合併左右橫條
    };
  };

  let test = [
    {
      work: "電子工程師",
      icon: "ElectronicsEngineer",
    },
    {
      work: "機械工程師",
      icon: "MechanicalEngineer",
    },
    {
      work: "設計工程師",
      icon: "DesignEngineer",
    },
    {
      work: "通訊工程師",
      icon: "CommunicationsEngineer",
    },
    {
      work: "系統工程師",
      icon: "SystemEngineer",
    },
  ];
  

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
        {test.map((test, index) => (
          <div className={styles["icon-wrap"]} key={index}>
            <div className={styles.icon}>
              <img src={`/src/images/${test.icon}.png`} alt={test} />
            </div>
            <p>{test.work.replace(/([A-Z])/g, " $1")}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestResult;
