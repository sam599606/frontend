import React, { useState } from "react";
import styles from "./Dummie_Subsidy.module.css";
import Dummie_more_Layout from "./Dummie_more_Layout";
import axios from "axios";

axios({
  method: "get",
  url: "http://localhost:5262/api/Job/SubsidyList",
})
  .then((res) => {
    console.log("SubsidyList:", res);
  })
  .catch((err) => {
    console.log(err);
  });

const Dummie_Subsidy = () => {
  return (
    <Dummie_more_Layout>
      <p>Dummie_Subsidy</p>
      {/* <Content
        title="(測試用)財富好韻來(上)"
        subsidyname="93分鐘"
        intro="本門課程首先介紹退休金規劃，講座提醒我們儲存退休金要趁早，以應對未來如通貨膨脹等未知的變局。"
      />
      <Content
        title="(測試用)財富好韻來(下)"
        subsidyname="184分鐘"
        intro="本門課程將股票型、產業型與債券型投資進行分析，並告訴我們資產配置的正確步驟與方法，包括挑選資產類別、決定資產配置、選擇個別標的、選擇進場時機、觀察是否符合預期，以及設定預期報酬率。"
      />
      <Content
        title="(測試用)學生打工與新鮮人面試陷阱及防範"
        subsidyname="30分鐘"
        intro="透過常見打工及面試勞資爭議案例，說明相關法律規定及處理方式。"
      />
      <Content
        title="(測試用)財富好韻來(上)"
        subsidyname="93分鐘"
        intro="本門課程首先介紹退休金規劃，講座提醒我們儲存退休金要趁早，以應對未來如通貨膨脹等未知的變局。"
      />
      <Content
        title="(測試用)財富好韻來(下)"
        subsidyname="184分鐘"
        intro="本門課程將股票型、產業型與債券型投資進行分析，並告訴我們資產配置的正確步驟與方法，包括挑選資產類別、決定資產配置、選擇個別標的、選擇進場時機、觀察是否符合預期，以及設定預期報酬率。"
      />
      <Content
        title="(測試用)學生打工與新鮮人面試陷阱及防範"
        subsidyname="30分鐘"
        intro="透過常見打工及面試勞資爭議案例，說明相關法律規定及處理方式。"
      /> */}
    </Dummie_more_Layout>
  );
};

const Content = ({ title, subsidyname, intro }) => {
  return (
    <div className={styles.content}>
      <div className={styles.title}>{title}</div>
      <div className={styles.subsidyname}>
        <img src="../src/images/clock.png" alt="時鐘" />
        <p>補助名稱{ubsidy}</p>
      </div>
      <a href="#" className={styles.more}>
        前往
      </a>
      <div className={styles.intro}>{intro}</div>
    </div>
  );
};

export default Dummie_Subsidy;
