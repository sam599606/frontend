import React from "react";
import { Link } from "react-router-dom";
import styles from "./Dummie_more_Layout.module.css";

const Dummie_more_Layout = ({
  children,
  totalItems,
  itemsPerPage,
  currentPage,
  setCurrentPage,
}) => {
  // 計算總頁數
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // 處理頁面點擊事件
  const handlePageClick = (pageNum) => {
    setCurrentPage(pageNum);
  };

  // 計算頁碼範圍 (最多顯示9個頁碼)
  const getPageNumbers = () => {
    const maxPagesToShow = 9; // 最多顯示9個頁碼
    let startPage, endPage;

    if (totalPages <= maxPagesToShow) {
      startPage = 1;
      endPage = totalPages;
    } else {
      if (currentPage <= Math.ceil(maxPagesToShow / 2)) {
        startPage = 1;
        endPage = maxPagesToShow;
      } else if (currentPage + Math.floor(maxPagesToShow / 2) >= totalPages) {
        startPage = totalPages - maxPagesToShow + 1;
        endPage = totalPages;
      } else {
        startPage = currentPage - Math.floor(maxPagesToShow / 2);
        endPage = currentPage + Math.floor(maxPagesToShow / 2);
      }
    }

    return [...Array(endPage - startPage + 1)].map(
      (_, index) => startPage + index
    );
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.tags}>
        <Link
          to="/dummie/class"
          className={`${styles.tag} ${
            location.pathname === "/dummie/class" ? styles.activeTag : ""
          }`}
        >
          課程
        </Link>
        <Link
          to="/dummie/Subsidy"
          className={`${styles.tag} ${
            location.pathname === "/dummie/Subsidy" ? styles.activeTag : ""
          }`}
        >
          補助
        </Link>
        <Link
          to="/dummie/Certificate"
          className={`${styles.tag} ${
            location.pathname === "/dummie/Certificate" ? styles.activeTag : ""
          }`}
        >
          證照
        </Link>
      </div>

      <div className={styles.container}>
        {/* 主要內容區塊 */}
        <div className={styles.contents} id="content-container">
          {children}
        </div>

        {/* 分頁 */}
        <div className={styles.pages} id="pages-sentence">
          <button
            onClick={() => handlePageClick(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <img src="../src/images/previouspage.png" alt="上一頁" />
          </button>

          {/* "第1頁" 連結 (如果沒有顯示第1頁) */}
          {getPageNumbers()[0] > 1 && (
            <>
              <button onClick={() => handlePageClick(1)}>1</button>
              <span>...</span> {/* 省略號 */}
            </>
          )}

          {/* 動態生成頁碼 */}
          {getPageNumbers().map((pageNum) => (
            <button
              key={pageNum}
              className={currentPage === pageNum ? styles.activePage : ""}
              onClick={() => handlePageClick(pageNum)}
            >
              {pageNum}
            </button>
          ))}

          {/* "第n頁" 連結 (如果沒有顯示最後一頁) */}
          {getPageNumbers().slice(-1)[0] < totalPages && (
            <>
              <span>...</span> {/* 省略號 */}
              <button onClick={() => handlePageClick(totalPages)}>
                {totalPages}
              </button>
            </>
          )}

          <button
            onClick={() => handlePageClick(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <img src="../src/images/nextpage.png" alt="下一頁" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dummie_more_Layout;
