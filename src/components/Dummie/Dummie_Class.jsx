import React, { useState } from "react";
import styles from "./Dummie_Class.module.css";
import Dummie_more_Layout from "./Dummie_more_Layout";
import axios from "axios";

axios({
  method: "get",
  url: "http://localhost:5262/api/Job/LessonList",
})
  .then((res) => {
    console.log("LessonList:", res);
  })
  .catch((err) => {
    console.log(err);
  });

const Dummie_Class = () => {
  const allCourses = [
    {
      title: "(測試用)財富好韻來(上)",
      duration: "93分鐘",
      intro:
        "本門課程首先介紹退休金規劃，講座提醒我們儲存退休金要趁早，以應對未來如通貨膨脹等未知的變局。",
    },
    {
      title: "(測試用)財富好韻來(下)",
      duration: "184分鐘",
      intro:
        "本門課程將股票型、產業型與債券型投資進行分析，並告訴我們資產配置的正確步驟與方法，包括挑選資產類別、決定資產配置、選擇個別標的、選擇進場時機、觀察是否符合預期，以及設定預期報酬率。",
    },
    {
      title: "(測試用)職場溝通與談判技巧",
      duration: "120分鐘",
      intro:
        "本門課程涵蓋有效溝通技巧、衝突管理及談判策略，幫助學員在職場中更好地表達自己、解決問題並與他人達成共識。",
    },
    {
      title: "(測試用)時間管理與工作效率提升",
      duration: "75分鐘",
      intro:
        "課程探討如何利用不同的時間管理工具和方法來提升工作效率，包括任務優先排序、番茄工作法及避免拖延的小技巧。",
    },
    {
      title: "(測試用)財務管理與理財規劃",
      duration: "150分鐘",
      intro:
        "課程將重點介紹如何制定個人理財計劃，從基礎的預算管理到投資策略，並探討如何應對金融風險及實現財務自由。",
    },
    {
      title: "(測試用)專案管理基礎",
      duration: "100分鐘",
      intro:
        "本課程介紹專案管理的基本概念和工具，包括甘特圖、工作分解結構(WBS)及敏捷管理方法，適合初學者及管理新手。",
    },
    {
      title: "(測試用)職業倦怠與心理健康",
      duration: "90分鐘",
      intro:
        "課程重點探討職業倦怠的成因、症狀及應對方法，並提供保持心理健康的具體建議，幫助學員在高壓工作環境中保持平衡。",
    },
    {
      title: "(測試用)數位行銷入門",
      duration: "110分鐘",
      intro:
        "本課程介紹數位行銷的基本概念，涵蓋SEO、社交媒體行銷、內容行銷和數據分析，幫助學員快速進入數位行銷領域。",
    },
    {
      title: "(測試用)職場領導力與團隊合作",
      duration: "130分鐘",
      intro:
        "本門課程探討如何在職場中發展領導力，並強調有效的團隊合作、決策制定和組織管理能力。",
    },
    {
      title: "(測試用)創業基礎與風險管理",
      duration: "160分鐘",
      intro:
        "本課程講述創業的基本步驟，包括商業計劃書撰寫、資金籌措及風險管理，適合有志創業者參加。",
    },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // 計算當前頁的課程資料
  const currentCourses = allCourses.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <Dummie_more_Layout
      totalItems={allCourses.length}
      itemsPerPage={itemsPerPage}
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
    >
      {currentCourses.map((course, index) => (
        <Content
          key={index}
          title={course.title}
          duration={course.duration}
          intro={course.intro}
        />
      ))}
    </Dummie_more_Layout>
  );
};

const Content = ({ title, duration, intro }) => {
  return (
    <div className={styles.content}>
      <div className={styles.title}>{title}</div>
      <div className={styles.duration}>
        <img src="../src/images/clock.png" alt="時鐘" />
        <p>課程長度：{duration}</p>
      </div>
      <a href="#" className={styles.more}>
        前往
      </a>
      <div className={styles.intro}>{intro}</div>
    </div>
  );
};

export default Dummie_Class;
