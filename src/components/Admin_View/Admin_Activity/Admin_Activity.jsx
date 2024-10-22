import React, { useState } from "react";
import styles from "./Admin_Activity.module.css";

const AdminActivity = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    // 這裡處理搜索邏輯
    console.log(`Search for: ${searchQuery}`);
  };

  return (
    <div id={styles.wrap}>
      <div className={styles.top}>
        <div className={styles.dateContainer}>
          <span>日期：</span>
          <input
            type="date"
            id="startDate"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <span>&nbsp;~&nbsp;</span>
          <input
            type="date"
            id="endDate"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        <div className={styles.search}>
          <input
            type="search"
            placeholder="搜尋"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <a href="#" className={styles.searchbtn} onClick={handleSearch}>
            <img src="/src/images/search.png" alt="Search" />
          </a>
        </div>
      </div>

      <div id={styles.container}>
        <div className={styles.sort}>
          <div
            className={styles.classify}
            onClick={() => console.log("Sort clicked!")}
          >
            全部
          </div>
        </div>

        <div className={styles.middle}>
          <div className={styles.timeline}>
            <div className={styles.dateCircle}>
              <div>
                <div>Sep</div>
                <div>28</div>
              </div>
            </div>
            <div className={styles.verticalLine}></div>
          </div>

          <div id={styles.contents} className={styles.scrollbar}>
            <div className={styles.content}>
              <div className={styles.action}>
                <p className={styles.title}>使用產業景氣預測</p>
                <p className={styles.detail}>使用資訊懶人包</p>
              </div>
              <div className={styles.info}>
                <p className={styles.nametime}>田裕賢</p>
                <p className={styles.datetime}>2024/09/28 14:59</p>
              </div>
            </div>
          </div>
        </div>

        <table className={styles.pages} id={styles.pagesSentence}>
          <tbody>
            <tr>
              <td>
                <a href="#">1</a>
              </td>
              <td>
                <a href="#">
                  <img src="/src/images/nextpage.png" alt="next page" />
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminActivity;
