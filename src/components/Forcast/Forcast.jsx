import React, { useState } from "react";
import ReactECharts from "echarts-for-react";
import styles from "./Forcast.module.css";

const Forcast = () => {
  const [chartType, setChartType] = useState("leading");
  const [selectedJob, setSelectedJob] = useState(null);

  // 各指標對應的職位列表
  const jobList_1 = [
    "經營/行政/總務",
    "業務/貿易/銷售",
    "人資/法務/智財",
    "財務/金融/保險",
    "廣告/公關/設計",
  ];

  const jobList_2 = [
    "客服/門市",
    "工程/研發/生技",
    "資訊/軟體/系統",
    "品管/製造/環衛",
    "技術/維修/操作",
  ];

  const jobList_3 = [
    "教育/學術/研究",
    "物流/運輸/資材",
    "旅遊/餐飲/休閒",
    "醫療/美容/保健",
    "保全/軍警消",
  ];

  // 根據 chartType 設定對應的職位列表
  const jobList =
    chartType === "leading"
      ? jobList_1
      : chartType === "simultaneous"
      ? jobList_2
      : jobList_3;

  // 領先指標數據
  const leadingData = {
    title: { text: "產業領先指標趨勢圖", show: false },
    tooltip: { trigger: "axis" },
    xAxis: {
      type: "category",
      data: [
        "2024-01",
        "2024-02",
        "2024-03",
        "2024-04",
        "2024-05",
        "2024-06",
        "2024-07",
        "2024-08",
        "2024-09",
        "2024-10",
        "2024-11",
        "2024-12",
        "2025-01",
        "2025-02",
        "2025-03",
        "2025-04",
        "2025-05",
        "2025-06",
        "2025-07",
        "2025-08",
        "2025-09",
        "2025-10",
        "2025-11",
        "2025-12",
      ],
    },
    yAxis: { type: "value", min: 99, max: 106 },
    series: [
      {
        name: "領先指標(實際)",
        type: "line",
        data: [
          99.0,
          99.39,
          99.85,
          100.35,
          100.95,
          101.63,
          102.28,
          102.79,
          103.14,
          103.28,
          103.35,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
        ],
        itemStyle: { color: "red" },
        lineStyle: { width: 2 },
        symbol: "circle",
        symbolSize: 8,
      },
      {
        name: "領先指標(預測)",
        type: "line",
        data: [
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          103.35,
          103.48,
          103.52,
          103.67,
          103.85,
          104.02,
          104.15,
          104.25,
          104.48,
          104.62,
          104.75,
          104.92,
          105.08,
          105.12,
        ],
        itemStyle: { color: "blue" }, // 粉紅色
        lineStyle: { width: 2 },
        symbol: "circle",
        symbolSize: 8,
      },
    ],
  };

  // 同時指標數據
  const simultaneousData = {
    title: { text: "產業同時指標趨勢圖", show: false },
    tooltip: { trigger: "axis" },
    xAxis: {
      type: "category",
      data: [
        "2024-01",
        "2024-02",
        "2024-03",
        "2024-04",
        "2024-05",
        "2024-06",
        "2024-07",
        "2024-08",
        "2024-09",
        "2024-10",
        "2024-11",
        "2024-12",
        "2025-01",
        "2025-02",
        "2025-03",
        "2025-04",
        "2025-05",
        "2025-06",
        "2025-07",
        "2025-08",
        "2025-09",
        "2025-10",
        "2025-11",
        "2025-12",
      ],
    },
    yAxis: { type: "value", min: 95, max: 100 },
    series: [
      {
        name: "同時指標(實際)",
        type: "line",
        data: [
          97.5,
          97.42,
          97.31,
          97.24,
          97.35,
          97.28,
          97.15,
          97.05,
          96.92,
          96.85,
          96.95,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
        ],
        itemStyle: { color: "orange" },
        lineStyle: { width: 2 },
        symbol: "circle",
        symbolSize: 8,
      },
      {
        name: "同時指標(預測)",
        type: "line",
        data: [
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          96.95,
          97.08,
          97.15,
          97.25,
          97.38,
          97.28,
          97.18,
          97.05,
          96.95,
          96.88,
          96.98,
          97.08,
          97.18,
          97.25,
        ],
        itemStyle: { color: "blue" }, // 淺藍色
        lineStyle: { width: 2 },
        symbol: "circle",
        symbolSize: 8,
      },
    ],
  };

  // 落後指標數據
  const laggingData = {
    title: { text: "產業落後指標趨勢圖", show: false },
    tooltip: { trigger: "axis" },
    xAxis: {
      type: "category",
      data: [
        "2024-01",
        "2024-02",
        "2024-03",
        "2024-04",
        "2024-05",
        "2024-06",
        "2024-07",
        "2024-08",
        "2024-09",
        "2024-10",
        "2024-11",
        "2024-12",
        "2025-01",
        "2025-02",
        "2025-03",
        "2025-04",
        "2025-05",
        "2025-06",
        "2025-07",
        "2025-08",
        "2025-09",
        "2025-10",
        "2025-11",
        "2025-12",
      ],
    },
    yAxis: { type: "value", min: 94, max: 100 },
    series: [
      {
        name: "落後指標(實際)",
        type: "line",
        data: [
          99.73,
          99.48,
          99.31,
          99.25,
          99.23,
          99.22,
          99.16,
          99.03,
          98.83,
          98.54,
          98.22,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
        ],
        itemStyle: { color: "green" },
        lineStyle: { width: 2 },
        symbol: "circle",
        symbolSize: 8,
      },
      {
        name: "落後指標(預測)",
        type: "line",
        data: [
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          98.22,
          97.93,
          97.65,
          97.38,
          97.12,
          96.85,
          96.59,
          96.32,
          96.05,
          95.78,
          95.52,
          95.25,
          94.98,
          94.93,
        ],
        itemStyle: { color: "blue" }, // 淺綠色
        lineStyle: { width: 2 },
        symbol: "circle",
        symbolSize: 8,
      },
    ],
  };

  // 自訂圖表數據
  const customChartData = {
    title: { text: "產業領先指標趨勢圖", show: false },
    tooltip: { trigger: "axis" },
    xAxis: {
      type: "category",
      data: [
        "2024-01",
        "2024-02",
        "2024-03",
        "2024-04",
        "2024-05",
        "2024-06",
        "2024-07",
        "2024-08",
        "2024-09",
        "2024-10",
        "2024-11",
        "2024-12",
        "2025-01",
        "2025-02",
        "2025-03",
        "2025-04",
        "2025-05",
        "2025-06",
        "2025-07",
        "2025-08",
        "2025-09",
        "2025-10",
        "2025-11",
        "2025-12",
      ],
    },
    yAxis: { type: "value", min: 98, max: 104 },
    series: [
      {
        name: "領先指標(實際)",
        type: "line",
        data: [
          99.0,
          99.25,
          99.55,
          99.9,
          100.2,
          100.45,
          100.75,
          101.0,
          101.2,
          101.35,
          101.5,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
        ],
        itemStyle: { color: "red" },
        lineStyle: { width: 2 },
        symbol: "circle",
        symbolSize: 8,
      },
      {
        name: "領先指標(預測)",
        type: "line",
        data: [
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          101.5,
          101.65,
          101.8,
          101.95,
          102.1,
          102.25,
          102.4,
          102.5,
          102.6,
          102.7,
          102.8,
          102.88,
          102.95,
          103.0,
        ],
        itemStyle: { color: "blue" }, // 粉紅色
        lineStyle: { width: 2 },
        symbol: "circle",
        symbolSize: 8,
      },
    ],
  };

  // 根據 chartType 選擇顯示的圖表
  const chartOptions =
    chartType === "leading" && selectedJob === 2 // 假設 "人資/法務/智財" 在 jobList_1 中的索引為 2
      ? customChartData
      : chartType === "leading"
      ? leadingData
      : chartType === "simultaneous"
      ? simultaneousData
      : laggingData;

  return (
    <div className={styles.wrap}>
      <div className={styles.leftside}>
        <div className={styles.date}>2025/12</div>
        <div className={styles.type}>{chartOptions.title.text}</div>
        <ReactECharts
          option={chartOptions}
          style={{ height: "400px", width: "100%" }}
        />
      </div>
      <div className={styles.rightside}>
        <div className={styles.search}>
          <input type="search" placeholder="搜尋" />
          <a href="#" className={styles.searchbtn}>
            <img src="src/images/search.png" alt="" />
          </a>
        </div>
        <div className={styles.content}>
          <div className={styles.column}>
            <div
              className={styles.indicators}
              onClick={() => setChartType("leading")}
            >
              <button>
                <div className={styles.icon}>
                  <img src="src/images/leading.png" alt="" />
                </div>
                <div className={styles.name}>領先指標</div>
              </button>
            </div>
            <div
              className={styles.indicators}
              onClick={() => setChartType("simultaneous")}
            >
              <button>
                <div className={styles.icon}>
                  <img src="src/images/simultaneous.png" alt="" />
                </div>
                <div className={styles.name}>同時指標</div>
              </button>
            </div>
            <div
              className={styles.indicators}
              onClick={() => setChartType("lagging")}
            >
              <button>
                <div className={styles.icon}>
                  <img src="src/images/lagging.png" alt="" />
                </div>
                <div className={styles.name}>落後指標</div>
              </button>
            </div>
          </div>
          <div className={styles.jobcontent}>
            {jobList.map((job, index) => (
              <a
                key={index}
                href="#"
                onClick={() => setSelectedJob(index)}
                className={`${styles.jobLink} ${
                  selectedJob === index ? styles.selected : ""
                }`}
              >
                {job}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Forcast;
