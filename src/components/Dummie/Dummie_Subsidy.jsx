import React, { useState, useEffect, useRef } from "react";
import styles from "./Dummie_Subsidy.module.css";
import Dummie_more_Layout from "./Dummie_more_Layout";
import axios from "axios";

const Dummie_Subsidy = () => {
  const [allSubsidies, setAllSubsidies] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // 搜尋欄的輸入
  const [filteredSubsidies, setFilteredSubsidies] = useState([]); // 儲存過濾後的資料
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  let token = localStorage.getItem("token");
  // 引用 contentContainer 來抓取內容區塊
  const contentContainerRef = useRef(null);

  useEffect(() => {
    // 取得補助資料的 API
    axios({
      method: "get",
      url: "http://localhost:5262/api/Job/SubsidyList",
      headers: {
        Authorization: `Bearer ${token}`, // Bearer 跟 token 中間有一個空格
      },
    })
      .then((res) => {
        console.log("SubsidyList:", res.data.result);
        setAllSubsidies(res.data.result); // 設定補助資料
        setFilteredSubsidies(res.data.result); // 預設顯示全部資料
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // 當 currentPage 改變時滾動到 Content 區塊頂部
  useEffect(() => {
    if (contentContainerRef.current) {
      contentContainerRef.current.scrollIntoView();
    }
  }, [currentPage]);

  // 處理搜尋功能
  const handleSearch = () => {
    const filtered = allSubsidies.filter(
      (subsidy) =>
        subsidy.name.toLowerCase().includes(searchTerm.toLowerCase()) || // 比對補助名稱
        String(subsidy.money).includes(searchTerm) // 比對補助金額
    );
    setFilteredSubsidies(filtered);
    setCurrentPage(1); // 搜尋後回到第一頁
  };

  // 處理按下 Enter 鍵的事件
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  // 計算當前頁的資料
  const currentSubsidies = filteredSubsidies.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <Dummie_more_Layout
      totalItems={filteredSubsidies.length}
      itemsPerPage={itemsPerPage}
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
    >
      {/* 左上角顯示搜尋到的資料筆數 */}
      <div className={styles.searchnum}>
        <p>已搜尋到 {filteredSubsidies.length} 筆資料</p>
      </div>

      {/* 搜尋欄 */}
      <div className={styles.search}>
        <input
          type="search"
          placeholder="搜尋"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // 更新輸入值
          onKeyDown={handleKeyDown} // 監聽 Enter 鍵事件
        />
        <a href="#" className={styles.searchbtn} onClick={handleSearch}>
          <img src="../src/images/search.png" alt="搜尋按鈕" />
        </a>
      </div>

      {/* 內容區塊，加入引用以便滾動 */}
      <div ref={contentContainerRef}>
        {currentSubsidies.length > 0 ? (
          currentSubsidies.map((subsidy) => (
            <Content
              key={subsidy.s_id}
              name={subsidy.name}
              money={subsidy.money}
            />
          ))
        ) : (
          <div className={styles.notfound}>
            <p>找不到符合條件的課程</p>
          </div>
        )}
      </div>
    </Dummie_more_Layout>
  );
};

// Content 組件負責顯示補助資訊
const Content = ({ name, money }) => {
  return (
    <div className={styles.content}>
      <div className={styles.title}>{name}</div>
      <div className={styles.duration}>
        <img src="../src/images/money.png" alt="時鐘" />
        <p>補助金額：{money} 元</p>
      </div>
    </div>
  );
};

export default Dummie_Subsidy;
