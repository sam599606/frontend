import React, { useState } from "react";
import ReactECharts from "echarts-for-react";
import styles from "./Forcast.module.css";

const Forcast = () => {
  const [chartType, setChartType] = useState("leading");
  const [selectedJob, setSelectedJob] = useState(null);

  // 各指標對應的職位列表
  const jobList_1 = [
    "工程/研發/生技",
    "新聞/出版/印刷",
    "旅遊/餐飲/休閒",
    "農林漁牧相關",
    "技術/維修/操作",
    "業務/貿易/銷售",
    "教育/學術/研究",
  ];

  const jobList_2 = [
    "資訊/軟體/系統",
    "人資/法務/智財",
    "營建/製圖/施作",
    "財務/金融/保險",
    "物流/運輸/資材",
    "保全/軍警消",
    "行銷/企劃/專案",
  ];

  const jobList_3 = [
    "客服/門市",
    "品管/製造/環衛",
    "傳播/娛樂/藝術",
    "廣告/公關/設計",
    "清潔/家事/托育(保姆)",
    "經營/行政/總務",
    "醫療/美容/保建",
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
    title: { text: "工程/研發/生技", show: true },
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
    yAxis: { type: "value", min: 98, max: 107 },
    series: [
      {
        name: "領先指標(實際)",
        type: "line",
        data: [
          99.0,
          100.39,
          99.85,
          100.35,
          101.95,
          101.63,
          102.28,
          102.79,
          103.45,
          102.87,
          103.52,
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
          103.52,
          101.76,
          101.23,
          102.89,
          101.56,
          100.34,
          102.11,
          103.45,
          104.78,
          103.32,
          104.68,
          105.05,
          105.42,
          106.79,
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
    title: { text: "資訊/軟體/系統", show: true },
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
          98.42,
          97.31,
          97.84,
          97.35,
          97.28,
          97.45,
          97.05,
          96.92,
          96.45,
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
          97.05,
          97.38,
          97.78,
          97.18,
          97.05,
          97.15,
          96.88,
          96.98,
          97.68,
          97.18,
          97.5,
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
    title: { text: "客服/門市", show: true },
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
          98.48,
          98.31,
          99.05,
          98.83,
          98.22,
          99.16,
          99.03,
          98.83,
          97.54,
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
          98.15,
          97.38,
          97.72,
          96.85,
          97.59,
          97.32,
          96.55,
          95.78,
          95.92,
          96.05,
          94.98,
          95.33,
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
    title: { text: "旅遊/餐飲/休閒", show: true },
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
    yAxis: { type: "value", min: 98, max: 103 },
    series: [
      {
        name: "領先指標(實際)",
        type: "line",
        data: [
          99.0,
          99.25,
          99.15,
          98.9,
          99.2,
          99.45,
          99.75,
          100.0,
          100.8,
          101.35,
          100.89,
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
          100.89,
          101.65,
          100.9,
          101.35,
          101.7,
          101.75,
          101.4,
          102.0,
          102.6,
          102.4,
          102.1,
          102.38,
          102.75,
          102.8,
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
    chartType === "leading" && jobList[selectedJob] === "旅遊/餐飲/休閒"
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
