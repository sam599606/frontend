import React, { useState, useEffect } from "react";
import ReactECharts from "echarts-for-react";
import styles from "./Forcast.module.css";

const Forcast = () => {
  const [searchQuery, setSearchQuery] = useState(""); // 儲存搜尋字串
  const [chartType, setChartType] = useState("leading"); // 預設為領先指標
  const [selectedJob, setSelectedJob] = useState(0); // 紀錄選中的項目

  // 當 chartType 改變時重置 selectedJob 為 0
  useEffect(() => {
    setSelectedJob(0);
  }, [chartType]);

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

  const xAxisData = [
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
  ];

  // 根據 chartType 決定 jobList
  const jobList =
    chartType === "leading"
      ? jobList_1
      : chartType === "simultaneous"
      ? jobList_2
      : jobList_3;

  // 根據搜尋關鍵字篩選 jobList
  const filteredJobList = jobList.filter((job) => job.includes(searchQuery));

  // 領先指標數據
  const leadingData_1 = {
    title: { text: "工程/研發/生技", show: true },
    tooltip: { trigger: "axis" },
    xAxis: {
      type: "category",
      data: xAxisData,
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
  const leadingData_2 = {
    title: { text: "新聞/出版/印刷", show: true },
    tooltip: { trigger: "axis" },
    xAxis: {
      type: "category",
      data: xAxisData,
    },
    yAxis: { type: "value", min: 98, max: 106 },
    series: [
      {
        name: "領先指標(實際)",
        type: "line",
        data: [
          101.0,
          100.39,
          98.85,
          99.35,
          100.95,
          101.63,
          101.28,
          101.79,
          102.45,
          102.87,
          104.52,
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
          104.52,
          103.76,
          101.23,
          102.89,
          101.56,
          102.34,
          102.11,
          101.45,
          102.78,
          101.32,
          101.68,
          103.55,
          104.42,
          105.79,
        ],
        itemStyle: { color: "blue" }, // 粉紅色
        lineStyle: { width: 2 },
        symbol: "circle",
        symbolSize: 8,
      },
    ],
  };
  const leadingData_3 = {
    title: { text: "旅遊/餐飲/休閒", show: true },
    tooltip: { trigger: "axis" },
    xAxis: {
      type: "category",
      data: xAxisData,
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
  const leadingData_4 = {
    title: { text: "農林漁牧相關", show: true },
    tooltip: { trigger: "axis" },
    xAxis: {
      type: "category",
      data: xAxisData,
    },
    yAxis: { type: "value", min: 98, max: 105 },
    series: [
      {
        name: "領先指標(實際)",
        type: "line",
        data: [
          101.0,
          101.39,
          100.85,
          101.35,
          100.95,
          99.63,
          101.28,
          102.79,
          102.45,
          101.87,
          101.52,
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
          101.52,
          102.76,
          103.23,
          102.89,
          101.56,
          101.34,
          100.11,
          100.45,
          99.78,
          99.32,
          100.68,
          101.05,
          102.42,
          104.79,
        ],
        itemStyle: { color: "blue" }, // 粉紅色
        lineStyle: { width: 2 },
        symbol: "circle",
        symbolSize: 8,
      },
    ],
  };
  const leadingData_5 = {
    title: { text: "技術/維修/操作", show: true },
    tooltip: { trigger: "axis" },
    xAxis: {
      type: "category",
      data: xAxisData,
    },
    yAxis: { type: "value", min: 98, max: 107 },
    series: [
      {
        name: "領先指標(實際)",
        type: "line",
        data: [
          98.5,
          99.39,
          99.85,
          99.35,
          100.95,
          100.63,
          100.28,
          101.79,
          100.45,
          101.87,
          101.52,
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
          101.52,
          102.76,
          101.23,
          103.89,
          103.56,
          102.34,
          101.11,
          101.45,
          102.78,
          103.32,
          104.68,
          105.05,
          104.42,
          105.79,
        ],
        itemStyle: { color: "blue" }, // 粉紅色
        lineStyle: { width: 2 },
        symbol: "circle",
        symbolSize: 8,
      },
    ],
  };
  const leadingData_6 = {
    title: { text: "業務/貿易/銷售", show: true },
    tooltip: { trigger: "axis" },
    xAxis: {
      type: "category",
      data: xAxisData,
    },
    yAxis: { type: "value", min: 98, max: 105 },
    series: [
      {
        name: "領先指標(實際)",
        type: "line",
        data: [
          100.0,
          99.25,
          100.15,
          99.9,
          98.2,
          99.45,
          100.75,
          101.0,
          101.8,
          102.35,
          101.89,
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
          101.89,
          102.65,
          103.9,
          102.35,
          101.7,
          101.75,
          102.4,
          103.0,
          102.6,
          103.4,
          103.1,
          102.38,
          103.75,
          104.8,
        ],
        itemStyle: { color: "blue" }, // 粉紅色
        lineStyle: { width: 2 },
        symbol: "circle",
        symbolSize: 8,
      },
    ],
  };
  const leadingData_7 = {
    title: { text: "教育/學術/研究", show: true },
    tooltip: { trigger: "axis" },
    xAxis: {
      type: "category",
      data: xAxisData,
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

  // 同時指標數據
  const simultaneousData_1 = {
    title: { text: "資訊/軟體/系統", show: true },
    tooltip: { trigger: "axis" },
    xAxis: {
      type: "category",
      data: xAxisData,
    },
    yAxis: { type: "value", min: 96, max: 99 },
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
  const simultaneousData_2 = {
    title: { text: "人資/法務/智財", show: true },
    tooltip: { trigger: "axis" },
    xAxis: {
      type: "category",
      data: xAxisData,
    },
    yAxis: { type: "value", min: 95, max: 100 },
    series: [
      {
        name: "同時指標(實際)",
        type: "line",
        data: [
          98.5,
          97.42,
          96.31,
          96.84,
          97.35,
          98.28,
          98.45,
          97.05,
          97.92,
          96.45,
          97.95,
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
          97.95,
          98.08,
          98.15,
          99.05,
          98.38,
          98.78,
          96.18,
          96.05,
          97.15,
          96.88,
          98.98,
          97.68,
          96.18,
          98.5,
        ],
        itemStyle: { color: "blue" }, // 淺藍色
        lineStyle: { width: 2 },
        symbol: "circle",
        symbolSize: 8,
      },
    ],
  };
  const simultaneousData_3 = {
    title: { text: "營建/製圖/施作", show: true },
    tooltip: { trigger: "axis" },
    xAxis: {
      type: "category",
      data: xAxisData,
    },
    yAxis: { type: "value", min: 95, max: 100 },
    series: [
      {
        name: "同時指標(實際)",
        type: "line",
        data: [
          97.5,
          99.42,
          98.31,
          98.84,
          99.35,
          98.28,
          97.45,
          98.05,
          97.92,
          98.45,
          98.95,
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
          98.95,
          97.08,
          98.15,
          99.05,
          99.38,
          98.78,
          98.18,
          97.05,
          96.15,
          97.88,
          96.98,
          98.68,
          98.18,
          97.5,
        ],
        itemStyle: { color: "blue" }, // 淺藍色
        lineStyle: { width: 2 },
        symbol: "circle",
        symbolSize: 8,
      },
    ],
  };
  const simultaneousData_4 = {
    title: { text: "財務/金融/保險", show: true },
    tooltip: { trigger: "axis" },
    xAxis: {
      type: "category",
      data: xAxisData,
    },
    yAxis: { type: "value", min: 95, max: 100 },
    series: [
      {
        name: "同時指標(實際)",
        type: "line",
        data: [
          98.5,
          98.42,
          98.31,
          97.84,
          98.35,
          98.28,
          99.45,
          99.05,
          97.92,
          98.45,
          97.95,
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
          97.95,
          95.08,
          96.15,
          96.05,
          97.38,
          97.78,
          98.18,
          98.05,
          97.15,
          98.88,
          98.98,
          98.68,
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
  const simultaneousData_5 = {
    title: { text: "物流/運輸/資材", show: true },
    tooltip: { trigger: "axis" },
    xAxis: {
      type: "category",
      data: xAxisData,
    },
    yAxis: { type: "value", min: 95, max: 100 },
    series: [
      {
        name: "同時指標(實際)",
        type: "line",
        data: [
          96.5,
          97.42,
          97.31,
          98.84,
          98.35,
          97.28,
          98.45,
          96.05,
          96.92,
          97.45,
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
          98.15,
          98.05,
          97.38,
          98.78,
          98.18,
          99.05,
          98.15,
          97.88,
          96.98,
          96.68,
          98.18,
          97.5,
        ],
        itemStyle: { color: "blue" }, // 淺藍色
        lineStyle: { width: 2 },
        symbol: "circle",
        symbolSize: 8,
      },
    ],
  };
  const simultaneousData_6 = {
    title: { text: "保全/軍警消", show: true },
    tooltip: { trigger: "axis" },
    xAxis: {
      type: "category",
      data: xAxisData,
    },
    yAxis: { type: "value", min: 95, max: 100 },
    series: [
      {
        name: "同時指標(實際)",
        type: "line",
        data: [
          99.5,
          98.42,
          98.31,
          98.84,
          97.35,
          98.28,
          97.45,
          96.05,
          97.92,
          97.45,
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
          96.08,
          97.15,
          98.05,
          99.38,
          99.78,
          98.18,
          98.05,
          96.15,
          97.88,
          97.98,
          97.68,
          98.18,
          99.5,
        ],
        itemStyle: { color: "blue" }, // 淺藍色
        lineStyle: { width: 2 },
        symbol: "circle",
        symbolSize: 8,
      },
    ],
  };
  const simultaneousData_7 = {
    title: { text: "行銷/企劃/專案", show: true },
    tooltip: { trigger: "axis" },
    xAxis: {
      type: "category",
      data: xAxisData,
    },
    yAxis: { type: "value", min: 95, max: 100 },
    series: [
      {
        name: "同時指標(實際)",
        type: "line",
        data: [
          98.5,
          99.42,
          99.31,
          98.84,
          98.35,
          97.28,
          96.45,
          96.05,
          97.92,
          96.45,
          97.95,
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
          97.95,
          98.08,
          98.15,
          97.05,
          98.38,
          96.78,
          97.18,
          98.05,
          98.15,
          97.88,
          98.98,
          99.68,
          98.18,
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
  const laggingData_1 = {
    title: { text: "客服/門市", show: true },
    tooltip: { trigger: "axis" },
    xAxis: {
      type: "category",
      data: xAxisData,
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
  const laggingData_2 = {
    title: { text: "品管/製造/環衛", show: true },
    tooltip: { trigger: "axis" },
    xAxis: {
      type: "category",
      data: xAxisData,
    },
    yAxis: { type: "value", min: 93, max: 101 },
    series: [
      {
        name: "落後指標(實際)",
        type: "line",
        data: [
          100.73,
          99.48,
          99.31,
          98.05,
          98.83,
          99.22,
          98.16,
          100.03,
          99.83,
          98.54,
          99.22,
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
          99.22,
          99.93,
          99.15,
          100.38,
          99.72,
          98.85,
          98.59,
          97.32,
          97.55,
          98.78,
          97.92,
          96.05,
          95.98,
          95.33,
        ],
        itemStyle: { color: "blue" }, // 淺綠色
        lineStyle: { width: 2 },
        symbol: "circle",
        symbolSize: 8,
      },
    ],
  };
  const laggingData_3 = {
    title: { text: "傳播/娛樂/藝術", show: true },
    tooltip: { trigger: "axis" },
    xAxis: {
      type: "category",
      data: xAxisData,
    },
    yAxis: { type: "value", min: 92, max: 100 },
    series: [
      {
        name: "落後指標(實際)",
        type: "line",
        data: [
          98.73,
          97.48,
          97.31,
          98.05,
          99.83,
          98.22,
          97.16,
          96.03,
          96.83,
          97.54,
          97.22,
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
          97.22,
          98.93,
          97.15,
          97.38,
          96.72,
          96.85,
          98.59,
          97.32,
          96.55,
          95.78,
          94.92,
          93.05,
          93.98,
          94.33,
        ],
        itemStyle: { color: "blue" }, // 淺綠色
        lineStyle: { width: 2 },
        symbol: "circle",
        symbolSize: 8,
      },
    ],
  };
  const laggingData_4 = {
    title: { text: "廣告/公關/設計", show: true },
    tooltip: { trigger: "axis" },
    xAxis: {
      type: "category",
      data: xAxisData,
    },
    yAxis: { type: "value", min: 93, max: 100 },
    series: [
      {
        name: "落後指標(實際)",
        type: "line",
        data: [
          99.73,
          99.48,
          99.31,
          98.05,
          97.83,
          97.22,
          98.16,
          98.03,
          97.83,
          96.54,
          96.22,
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
          96.22,
          97.93,
          99.15,
          99.38,
          98.72,
          98.85,
          98.59,
          99.32,
          98.55,
          96.78,
          96.92,
          94.05,
          95.98,
          94.33,
        ],
        itemStyle: { color: "blue" }, // 淺綠色
        lineStyle: { width: 2 },
        symbol: "circle",
        symbolSize: 8,
      },
    ],
  };
  const laggingData_5 = {
    title: { text: "清潔/家事/托育(保姆)", show: true },
    tooltip: { trigger: "axis" },
    xAxis: {
      type: "category",
      data: xAxisData,
    },
    yAxis: { type: "value", min: 94, max: 100 },
    series: [
      {
        name: "落後指標(實際)",
        type: "line",
        data: [
          98.73,
          97.48,
          97.31,
          96.05,
          95.83,
          96.22,
          96.16,
          96.03,
          97.83,
          96.54,
          95.22,
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
          95.22,
          96.93,
          96.15,
          97.38,
          96.72,
          97.85,
          98.59,
          98.32,
          97.55,
          96.78,
          96.92,
          97.05,
          96.98,
          95.33,
        ],
        itemStyle: { color: "blue" }, // 淺綠色
        lineStyle: { width: 2 },
        symbol: "circle",
        symbolSize: 8,
      },
    ],
  };
  const laggingData_6 = {
    title: { text: "經營/行政/總務", show: true },
    tooltip: { trigger: "axis" },
    xAxis: {
      type: "category",
      data: xAxisData,
    },
    yAxis: { type: "value", min: 93, max: 100 },
    series: [
      {
        name: "落後指標(實際)",
        type: "line",
        data: [
          100.73,
          99.48,
          99.31,
          98.05,
          99.83,
          98.22,
          97.16,
          97.03,
          96.83,
          95.54,
          95.22,
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
          95.22,
          96.93,
          96.15,
          97.38,
          98.72,
          96.85,
          96.59,
          95.32,
          94.55,
          95.78,
          95.92,
          94.05,
          94.98,
          93.33,
        ],
        itemStyle: { color: "blue" }, // 淺綠色
        lineStyle: { width: 2 },
        symbol: "circle",
        symbolSize: 8,
      },
    ],
  };
  const laggingData_7 = {
    title: { text: "醫療/美容/保建", show: true },
    tooltip: { trigger: "axis" },
    xAxis: {
      type: "category",
      data: xAxisData,
    },
    yAxis: { type: "value", min: 93, max: 100 },
    series: [
      {
        name: "落後指標(實際)",
        type: "line",
        data: [
          97.73,
          97.48,
          98.31,
          98.05,
          97.83,
          97.22,
          96.16,
          95.03,
          95.83,
          96.54,
          96.22,
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
          96.22,
          97.93,
          98.15,
          98.38,
          97.72,
          97.85,
          96.59,
          96.32,
          95.55,
          95.78,
          94.92,
          94.05,
          93.98,
          94.33,
        ],
        itemStyle: { color: "blue" }, // 淺綠色
        lineStyle: { width: 2 },
        symbol: "circle",
        symbolSize: 8,
      },
    ],
  };

  // 根據 chartType 選擇顯示的圖表
  let chartOptions;
  if (chartType === "leading" && jobList[selectedJob] === "工程/研發/生技") {
    chartOptions = leadingData_1;
  } else if (
    chartType === "leading" &&
    jobList[selectedJob] === "新聞/出版/印刷"
  ) {
    chartOptions = leadingData_2;
  } else if (
    chartType === "leading" &&
    jobList[selectedJob] === "旅遊/餐飲/休閒"
  ) {
    chartOptions = leadingData_3;
  } else if (
    chartType === "leading" &&
    jobList[selectedJob] === "農林漁牧相關"
  ) {
    chartOptions = leadingData_4;
  } else if (
    chartType === "leading" &&
    jobList[selectedJob] === "技術/維修/操作"
  ) {
    chartOptions = leadingData_5;
  } else if (
    chartType === "leading" &&
    jobList[selectedJob] === "業務/貿易/銷售"
  ) {
    chartOptions = leadingData_6;
  } else if (
    chartType === "leading" &&
    jobList[selectedJob] === "教育/學術/研究"
  ) {
    chartOptions = leadingData_7;
  } else if (
    chartType === "simultaneous" &&
    jobList[selectedJob] === "資訊/軟體/系統"
  ) {
    chartOptions = simultaneousData_1;
  } else if (
    chartType === "simultaneous" &&
    jobList[selectedJob] === "人資/法務/智財"
  ) {
    chartOptions = simultaneousData_2;
  } else if (
    chartType === "simultaneous" &&
    jobList[selectedJob] === "營建/製圖/施作"
  ) {
    chartOptions = simultaneousData_3;
  } else if (
    chartType === "simultaneous" &&
    jobList[selectedJob] === "財務/金融/保險"
  ) {
    chartOptions = simultaneousData_4;
  } else if (
    chartType === "simultaneous" &&
    jobList[selectedJob] === "物流/運輸/資材"
  ) {
    chartOptions = simultaneousData_5;
  } else if (
    chartType === "simultaneous" &&
    jobList[selectedJob] === "保全/軍警消"
  ) {
    chartOptions = simultaneousData_6;
  } else if (
    chartType === "simultaneous" &&
    jobList[selectedJob] === "行銷/企劃/專案"
  ) {
    chartOptions = simultaneousData_7;
  } else if (chartType === "lagging" && jobList[selectedJob] === "客服/門市") {
    chartOptions = laggingData_1;
  } else if (
    chartType === "lagging" &&
    jobList[selectedJob] === "品管/製造/環衛"
  ) {
    chartOptions = laggingData_2;
  } else if (
    chartType === "lagging" &&
    jobList[selectedJob] === "傳播/娛樂/藝術"
  ) {
    chartOptions = laggingData_3;
  } else if (
    chartType === "lagging" &&
    jobList[selectedJob] === "廣告/公關/設計"
  ) {
    chartOptions = laggingData_4;
  } else if (
    chartType === "lagging" &&
    jobList[selectedJob] === "清潔/家事/托育(保姆)"
  ) {
    chartOptions = laggingData_5;
  } else if (
    chartType === "lagging" &&
    jobList[selectedJob] === "經營/行政/總務"
  ) {
    chartOptions = laggingData_6;
  } else if (
    chartType === "lagging" &&
    jobList[selectedJob] === "醫療/美容/保建"
  ) {
    chartOptions = laggingData_7;
  } else {
    chartOptions = leadingData_1;
  }

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
          <input
            type="search"
            placeholder="搜尋"
            value={searchQuery} // 綁定狀態
            onChange={(e) => setSearchQuery(e.target.value)} // 更新搜尋字串
          />
          <a href="#" className={styles.searchbtn}>
            <img src="src/images/search.png" alt="Search" />
          </a>
        </div>
        <div className={styles.content}>
          <div className={styles.column}>
            {["領先指標", "同時指標", "落後指標"].map((type, idx) => (
              <div
                key={type}
                className={styles.indicators}
                onClick={() =>
                  setChartType(["leading", "simultaneous", "lagging"][idx])
                }
              >
                <button>
                  <div
                    className={`${styles.icon} ${
                      chartType !== ["leading", "simultaneous", "lagging"][idx]
                        ? styles.notSelected
                        : ""
                    }`}
                  >
                    <img
                      src={`src/images/${
                        ["leading", "simultaneous", "lagging"][idx]
                      }.png`}
                      alt={type}
                    />
                  </div>
                  <div className={styles.name}>{type}</div>
                </button>
              </div>
            ))}
          </div>

          <div className={styles.jobcontent}>
            {filteredJobList.map((job, index) => (
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
