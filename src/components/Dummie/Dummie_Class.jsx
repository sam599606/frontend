import React, { useState, useEffect, useRef } from "react";
import styles from "./Dummie_Class.module.css";
import Dummie_more_Layout from "./Dummie_more_Layout";
import axios from "axios";
import Cookies from "universal-cookie";

const Dummie_Class = () => {
  const [allCourses, setAllCourses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState(""); // 用來儲存搜尋關鍵字
  const [searchQuery, setSearchQuery] = useState(""); // 用來儲存按下搜尋按鈕後的搜尋條件
  const itemsPerPage = 10;
  const cookies = new Cookies();
  const [searchValue, setSearchValue] = useState('');

  // 引用 contentContainer 來抓取內容區塊
  const contentContainerRef = useRef(null);

  let token = cookies.get("token");
  useEffect(() => {
    axios({
      method: "get",
      url: "http://localhost:5262/api/Job/LessonList",
      headers: {
        Authorization: `Bearer ${token}`, // Bearer 跟 token 中間有一個空格
      },
    })
      .then((res) => {
        console.log("LessonList:", res.data.result);
        setAllCourses(res.data.result); // 將獲取的 API 資料設定到 allCourses 狀態中
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

  // 根據按下搜尋按鈕後的 searchQuery 進行過濾，篩選 name, time, intro, address 中包含搜尋關鍵字的課程
  const filteredCourses = allCourses.filter((course) =>
    [course.name, course.time, course.content, course.address]
      .join(" ")
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  // 計算當前頁的課程資料
  const currentCourses = filteredCourses.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // 按下搜尋按鈕時更新搜尋條件
  const handleSearch = () => {
    setSearchQuery(searchTerm);
    setCurrentPage(1);
    contentContainerRef.current.scrollIntoView();
  };

  // 處理按下 Enter 鍵的事件
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  
  useEffect(() => {
    // 從 localStorage 取得預設搜尋值
    let skill = localStorage.getItem('skill')
    if (skill) {
      setSearchTerm(skill); // 設定為 searchTerm 初始值
      setTimeout(() => {
        localStorage.removeItem('skill')
        handleSearch()
      }, 20);
    }
  }, []);

  return (
    <Dummie_more_Layout
      totalItems={filteredCourses.length}
      itemsPerPage={itemsPerPage}
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
    >
      {/* 搜尋欄和筆數顯示 */}
      <div className={styles.searchArea}>
        <div className={styles.searchnum}>
          <p>已搜尋到 {filteredCourses.length} 筆資料</p>
        </div>
        <div className={styles.search}>
          <input
            type="search"
            placeholder="搜尋"
            id="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} // 更新搜尋關鍵字
            onKeyDown={handleKeyDown} // 監聽 Enter 鍵事件
          />
          <button className={styles.searchbtn} onClick={handleSearch} id="searchBtn">
            <img src="../src/images/search.png" alt="搜尋按鈕" />
          </button>
        </div>
      </div>

      {/* 用 ref 抓取 Content 的容器 */}
      <div ref={contentContainerRef}>
        {currentCourses.length > 0 ? (
          currentCourses.map((course) => (
            <Content
              key={course.l_id}
              title={course.name}
              time={course.time}
              intro={course.content}
              address={course.address}
              http={course.http} // 傳入課程的 http 資料
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

const Content = ({ title, time, intro, address, http }) => {
  return (
    <div className={styles.content}>
      <div className={styles.title}>{title}</div>
      <div className={styles.time}>
        <img src="../src/images/clock.png" alt="時鐘" />
        <p>{time}</p>
      </div>

      {/* 根據 http 值條件渲染「前往」按鈕，如果 http 不為 null 才顯示 */}
      {http && (
        <a
          href={http}
          className={styles.more}
          target="_blank"
          rel="noopener noreferrer"
        >
          前往
        </a>
      )}

      {intro && <div className={styles.intro}>{intro}</div>}

      <div className={styles.address}>地址: {address}</div>
    </div>
  );
};

export default Dummie_Class;
