import React from "react";
import { Link, useLocation } from "react-router-dom"; // 引入 useLocation
import styles from "./Dummie_more_Layout.module.css";

const Dummie_more_Layout = ({
  children,
  totalItems,
  itemsPerPage,
  currentPage,
  setCurrentPage,
}) => {
  const location = useLocation(); // 獲取當前路由
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageClick = (pageNum) => {
    setCurrentPage(pageNum);
  };

  const getPageNumbers = () => {
    const maxPagesToShow = 9;
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
        <div className={styles.contents} id="content-container">
          {children}
        </div>

        <div className={styles.pages} id="pages-sentence">
          <button
            onClick={() => handlePageClick(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <img src="../src/images/previouspage.png" alt="上一頁" />
          </button>

          {getPageNumbers()[0] > 1 && (
            <>
              <button onClick={() => handlePageClick(1)}>1</button>
              <span>...</span>
            </>
          )}

          {getPageNumbers().map((pageNum) => (
            <button
              key={pageNum}
              className={currentPage === pageNum ? styles.activePage : ""}
              onClick={() => handlePageClick(pageNum)}
            >
              {pageNum}
            </button>
          ))}

          {getPageNumbers().slice(-1)[0] < totalPages && (
            <>
              <span>...</span>
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
