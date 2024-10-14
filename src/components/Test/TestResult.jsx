import React, { useState, useEffect } from "react";
// import ReactECharts from "echarts-for-react";
import styles from "./TestResult.module.css";

const TestResult = () => {
  // 用於保存翻轉狀態
  const [isHollandFlipped, setIsHollandFlipped] = useState(false);
  const [isMbtiFlipped, setIsMbtiFlipped] = useState(false);

  // 測試數據，用於雷達圖
  const radarData = {
    indicator: [
      { name: "實用型 Realistic", max: 100 },
      { name: "研究型 Investigative", max: 100 },
      { name: "藝術型 Artistic", max: 100 },
      { name: "社會型 Social", max: 100 },
      { name: "企業型 Enterprising", max: 100 },
      { name: "資料型 Conventional", max: 100 },
    ],
    data: [70, 80, 50, 90, 60, 75], // 測試數據
  };

  // HOLLAND雷達圖
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
            <div id={styles["type-name"]}>ISTP</div>
            <div className={styles.front}>
              <div id={styles.sort}>
                {["I 內向", "S 實感", "T 理性", "J 系統"].map(
                  (trait, index) => (
                    <div key={index}>
                      <p>{trait}</p>
                      <div className={styles.bar}>
                        <div></div>
                        <div></div>
                      </div>
                      <p>
                        {trait[0] === "I"
                          ? "E 外向"
                          : trait[0] === "S"
                          ? "N 直覺"
                          : trait[0] === "T"
                          ? "F 感性"
                          : "P 彈性"}
                      </p>
                    </div>
                  )
                )}
              </div>
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
