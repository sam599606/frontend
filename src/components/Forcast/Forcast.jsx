import React from "react";
import styles from "./Forcast.module.css";

const Forcast = () => {
  return (
    <div className={styles.wrap}>
      <div className={styles.leftside}>
        <div className={styles.date}>2024/08</div>
        <div className={styles.type}>工業生產指數趨勢圖</div>
        <canvas></canvas>
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
            <div className={styles.indicators}>
              <a href="">
                <div className={styles.icon}>
                  <img src="src/images/leading.png" alt="" />
                </div>
                <div className={styles.name}>領先指標</div>
              </a>
            </div>
            <div className={styles.indicators}>
              <a href="">
                <div className={styles.icon}>
                  <img src="src/images/simultaneous.png" alt="" />
                </div>
                <div className={styles.name}>同時指標</div>
              </a>
            </div>
            <div className={styles.indicators}>
              <a href="">
                <div className={styles.icon}>
                  <img src="src/images/lagging.png" alt="" />
                </div>
                <div className={styles.name}>落後指標</div>
              </a>
            </div>
          </div>
          <div className={styles.column}>
            <a href="">工業生產指數</a>
          </div>
          <div className={styles.column}>
            <a href="">製造業營業氣候測驗點</a>
          </div>
          <div className={styles.column}>
            <a href="">工業及服務業加班工時</a>
          </div>
          <div className={styles.column}>
            <a href="">半導體產業</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Forcast;
