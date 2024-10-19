import React, { useState } from "react";
import styles from "./Dummie_Certificate.module.css";
import Dummie_more_Layout from "./Dummie_more_Layout";
import axios from "axios";

axios({
  method: "get",
  url: "http://localhost:5262/api/Job/CertificateList",
})
  .then((res) => {
    console.log("CertificateList:", res);
  })
  .catch((err) => {
    console.log(err);
  });

const Dummie_Certificate = () => {
  return (
    <Dummie_more_Layout>
      <p>Dummie_Certificate</p>
      {/* <Content
        title="(測試用)財富好韻來(上)"
        testdate="93分鐘"
        intro="本門課程首先介紹退休金規劃，講座提醒我們儲存退休金要趁早，以應對未來如通貨膨脹等未知的變局。"
      />
      <Content
        title="(測試用)財富好韻來(下)"
        testdate="184分鐘"
        intro="本門課程將股票型、產業型與債券型投資進行分析，並告訴我們資產配置的正確步驟與方法，包括挑選資產類別、決定資產配置、選擇個別標的、選擇進場時機、觀察是否符合預期，以及設定預期報酬率。"
      />
      <Content
        title="(測試用)學生打工與新鮮人面試陷阱及防範"
        testdate="30分鐘"
        intro="透過常見打工及面試勞資爭議案例，說明相關法律規定及處理方式。"
      />
      <Content
        title="(測試用)財富好韻來(上)"
        testdate="93分鐘"
        intro="本門課程首先介紹退休金規劃，講座提醒我們儲存退休金要趁早，以應對未來如通貨膨脹等未知的變局。"
      />
      <Content
        title="(測試用)財富好韻來(下)"
        testdate="184分鐘"
        intro="本門課程將股票型、產業型與債券型投資進行分析，並告訴我們資產配置的正確步驟與方法，包括挑選資產類別、決定資產配置、選擇個別標的、選擇進場時機、觀察是否符合預期，以及設定預期報酬率。"
      />
      <Content
        title="(測試用)學生打工與新鮮人面試陷阱及防範"
        testdate="30分鐘"
        intro="透過常見打工及面試勞資爭議案例，說明相關法律規定及處理方式。"
      /> */}
    </Dummie_more_Layout>
  );
};

const Content = ({ title, testdate, intro }) => {
  return (
    <div className={styles.content}>
      <div className={styles.title}>{title}</div>
      <div className={styles.testdate}>
        <p>考試名稱：{testdate}</p>
      </div>
      <a href="#" className={styles.more}>
        前往
      </a>
      <div className={styles.intro}>{intro}</div>
    </div>
  );
};

export default Dummie_Certificate;
