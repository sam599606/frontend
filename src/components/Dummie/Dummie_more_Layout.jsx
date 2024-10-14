import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Dummie_more_Layout.module.css";

const Dummie_more_Layout = ({ children }) => {
  return (
    <div className={styles.wrap}>
      <div className={styles.tags}>
        <Link to="/dummie/class" className={styles.tag}>
          課程
        </Link>
        <a href="#" className={styles.tag}>
          補助
        </a>
        <a href="#" className={styles.tag}>
          證照
        </a>
      </div>
      <div className={styles.container}>
        <div className={styles.search}>
          <input type="search" placeholder="搜尋" />
          <a href="#" className={styles.searchbtn}>
            <img src="../src/images/search.png" alt="搜尋按鈕" />
          </a>
        </div>
        <div className={styles.contents}>{children}</div>
        <table className={styles.pages} id="pages-sentence">
          <tr>
            <td>
              <a href="#">
                <img src="../src/images/previouspage.png" alt="下一頁" />
              </a>
            </td>
            <td>
              <a href="#">1</a>
            </td>
            <td>
              <a href="#">
                <img src="../src/images/nextpage.png" alt="下一頁" />
              </a>
            </td>
          </tr>
        </table>
      </div>
    </div>
  );
};

export default Dummie_more_Layout;
