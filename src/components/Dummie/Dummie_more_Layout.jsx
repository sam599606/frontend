import React, { useState } from "react";
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

  return (
    <div className={styles.wrap}>
      <div className={styles.tags}>
        <Link to="/dummie/class" className={styles.tag}>
          課程
        </Link>
        <Link to="/dummie/Subsidy" className={styles.tag}>
          補助
        </Link>
        <Link to="/dummie/Certificate" className={styles.tag}>
          證照
        </Link>
      </div>

      <div className={styles.container}>
        {/* 搜尋 */}
        <div className={styles.search}>
          <input type="search" placeholder="搜尋" />
          <a href="#" className={styles.searchbtn}>
            <img src="../src/images/search.png" alt="搜尋按鈕" />
          </a>
        </div>

        {/* 主要內容區塊 */}
        <div className={styles.contents}>{children}</div>

        {/* 分頁 */}
        <div className={styles.pages} id="pages-sentence">
          <button
            onClick={() => handlePageClick(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <img src="../src/images/previouspage.png" alt="上一頁" />
          </button>

          {/* 動態生成頁碼 */}
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              className={currentPage === index + 1 ? styles.activePage : ""}
              onClick={() => handlePageClick(index + 1)}
            >
              {index + 1}
            </button>
          ))}

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

// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import styles from "./Dummie_more_Layout.module.css";

// const Dummie_more_Layout = ({ children }) => {
//   return (
//     <div className={styles.wrap}>
//       <div className={styles.tags}>
//         <Link to="/dummie/class" className={styles.tag}>
//           課程
//         </Link>
//         <Link to="/dummie/Subsidy" className={styles.tag}>
//           補助
//         </Link>
//         <Link to="/dummie/class" className={styles.tag}>
//           證照
//         </Link>
//       </div>

//       <div className={styles.container}>
//         {/* 搜尋 */}
//         <div className={styles.search}>
//           <input type="search" placeholder="搜尋" />
//           <a href="#" className={styles.searchbtn}>
//             <img src="../src/images/search.png" alt="搜尋按鈕" />
//           </a>
//         </div>

//         {/* 主要內容區塊 */}
//         <div className={styles.contents}>{children}</div>

//         {/* 分頁 */}
//         <table className={styles.pages} id="pages-sentence">
//           <tr>
//             <td>
//               <a href="#">
//                 <img src="../src/images/previouspage.png" alt="下一頁" />
//               </a>
//             </td>
//             <td>
//               <a href="#">1</a>
//             </td>
//             <td>
//               <a href="#">
//                 <img src="../src/images/nextpage.png" alt="下一頁" />
//               </a>
//             </td>
//           </tr>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default Dummie_more_Layout;
