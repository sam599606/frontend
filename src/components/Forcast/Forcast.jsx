import React, { useState } from "react";
import ReactECharts from "echarts-for-react";
import styles from "./Forcast.module.css";

const Forcast = () => {
  const [chartType, setChartType] = useState("leading");

  // 領先指標數據
  const leadingData = {
    title: { text: "台灣國發會領先指標趨勢圖", show: false },
    tooltip: { trigger: "axis" },
    xAxis: {
      type: "category",
      data: [
        "2023-11",
        "2023-12",
        "2024-01",
        "2024-02",
        "2024-03",
        "2024-04",
        "2024-05",
        "2024-06",
        "2024-07",
        "2024-08",
        "2024-09",
      ],
    },
    yAxis: { type: "value", min: 99, max: 104 },
    series: [
      {
        name: "領先指標",
        type: "line",
        data: [
          99.0, 99.39, 99.85, 100.35, 100.95, 101.63, 102.28, 102.79, 103.14,
          103.28, 103.35,
        ],
        itemStyle: { color: "red" },
        lineStyle: { width: 2 },
        symbol: "circle",
        symbolSize: 8,
      },
    ],
  };

  // 同時指標數據
  const simultaneousData = {
    title: { text: "台灣國發會同時指標趨勢圖", show: false },
    tooltip: { trigger: "axis" },
    xAxis: {
      type: "category",
      data: [
        "2023-11",
        "2023-12",
        "2024-01",
        "2024-02",
        "2024-03",
        "2024-04",
        "2024-05",
        "2024-06",
        "2024-07",
        "2024-08",
        "2024-09",
      ],
    },
    yAxis: { type: "value", min: 97, max: 106 },
    series: [
      {
        name: "同時指標",
        type: "line",
        data: [
          97.15, 97.62, 98.21, 98.99, 99.97, 101.07, 102.19, 103.26, 104.22,
          105.1, 105.9,
        ],
        itemStyle: { color: "blue" },
        lineStyle: { width: 2 },
        symbol: "circle",
        symbolSize: 8,
      },
    ],
  };

  // 落後指標數據
  const laggingData = {
    title: { text: "台灣國發會落後指標趨勢圖", show: false },
    tooltip: { trigger: "axis" },
    xAxis: {
      type: "category",
      data: [
        "2023-11",
        "2023-12",
        "2024-01",
        "2024-02",
        "2024-03",
        "2024-04",
        "2024-05",
        "2024-06",
        "2024-07",
        "2024-08",
        "2024-09",
      ],
    },
    yAxis: { type: "value", min: 98, max: 100 },
    series: [
      {
        name: "落後指標",
        type: "line",
        data: [
          99.73, 99.48, 99.31, 99.25, 99.23, 99.22, 99.16, 99.03, 98.83, 98.54,
          98.22,
        ],
        itemStyle: { color: "green" },
        lineStyle: { width: 2 },
        symbol: "circle",
        symbolSize: 8,
      },
    ],
  };

  // 根據 chartType 選擇顯示的圖表
  const chartOptions =
    chartType === "leading"
      ? leadingData
      : chartType === "simultaneous"
      ? simultaneousData
      : laggingData;

  return (
    <div className={styles.wrap}>
      <div className={styles.leftside}>
        <div className={styles.date}>2024/09</div>
        <div className={styles.type}>{chartOptions.title.text}</div>
        <ReactECharts
          option={chartOptions}
          style={{ height: "400px", width: "100%" }}
        />
      </div>
      <div className={styles.rightside}>
        <div className={styles.search}>
          <input type="search" placeholder="搜尋" />
          <a href="" className={styles.searchbtn}>
            <img src="src/images/search.png" alt="" />
          </a>
        </div>
        <div className={styles.content}>
          <div className={styles.column}>
            <div
              className={styles.indicators}
              onClick={() => setChartType("leading")}
            >
              <a href="#">
                <div className={styles.icon}>
                  <img src="src/images/leading.png" alt="" />
                </div>
                <div className={styles.name}>領先指標</div>
              </a>
            </div>
            <div
              className={styles.indicators}
              onClick={() => setChartType("simultaneous")}
            >
              <a href="#">
                <div className={styles.icon}>
                  <img src="src/images/simultaneous.png" alt="" />
                </div>
                <div className={styles.name}>同時指標</div>
              </a>
            </div>
            <div
              className={styles.indicators}
              onClick={() => setChartType("lagging")}
            >
              <a href="#">
                <div className={styles.icon}>
                  <img src="src/images/lagging.png" alt="" />
                </div>
                <div className={styles.name}>落後指標</div>
              </a>
            </div>
          </div>
          <div className={styles.column}>
            <a href="#">工業生產指數</a>
          </div>
          <div className={styles.column}>
            <a href="#">製造業營業氣候測驗點</a>
          </div>
          <div className={styles.column}>
            <a href="#">工業及服務業加班工時</a>
          </div>
          <div className={styles.column}>
            <a href="#">半導體產業</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Forcast;
