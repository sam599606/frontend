import React, { useState, useEffect, useRef } from "react";
import styles from "./Dummie_Certificate.module.css";
import Dummie_more_Layout from "./Dummie_more_Layout";
import axios from "axios";

const Dummie_Certificate = () => {
  const [allCertificates, setAllCertificates] = useState([]); // 儲存所有證照資料
  const [filteredCertificates, setFilteredCertificates] = useState([]); // 儲存過濾後的資料
  const [searchTerm, setSearchTerm] = useState(""); // 搜尋欄的輸入
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // 引用 contentContainer 來抓取內容區塊
  const contentContainerRef = useRef(null);

  // 取得 CertificateList 的 API 資料
  useEffect(() => {
    axios({
      method: "get",
      url: "http://localhost:5262/api/Job/CertificateList",
    })
      .then((res) => {
        console.log("CertificateList:", res.data.result);
        setAllCertificates(res.data.result); // 設定證照資料
        setFilteredCertificates(res.data.result); // 預設顯示全部資料
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
    const filtered = allCertificates.filter(
      (certificate) =>
        certificate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        certificate.address.toLowerCase().includes(searchTerm.toLowerCase()) || // 比對地址
        certificate.type.toLowerCase().includes(searchTerm.toLowerCase()) // 比對類型
    );
    setFilteredCertificates(filtered);
    setCurrentPage(1); // 搜尋後回到第一頁
  };

  // 處理按下 Enter 鍵的事件
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  // 計算當前頁的資料
  const currentCertificates = filteredCertificates.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <Dummie_more_Layout
      totalItems={filteredCertificates.length}
      itemsPerPage={itemsPerPage}
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
    >
      {/* 左上角顯示搜尋到的資料筆數 */}
      <div className={styles.searchnum}>
        <p>已搜尋到 {filteredCertificates.length} 筆資料</p>
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

      {/* 顯示搜尋結果 */}
      <div ref={contentContainerRef}>
        {currentCertificates.map((certificate) => (
          <Content
            key={certificate.c_id}
            name={certificate.name}
            type={certificate.type}
            testTIme={certificate.testTIme}
            applyTime={certificate.applyTime}
            address={certificate.address}
            link={certificate.http}
          />
        ))}
      </div>
    </Dummie_more_Layout>
  );
};

// Content 組件負責顯示證照資訊
const Content = ({ name, type, testTIme, applyTime, address, link }) => {
  // 根據 type 判斷顯示的圖標
  const renderIcon = () => {
    if (type === "電腦應試") {
      return <img src="../src/images/computer-icon-md.png" alt="電腦應試" />;
    } else if (type === "筆試") {
      return <img src="../src/images/pen-icon-md.png" alt="筆試" />;
    }
    return null;
  };
  return (
    <div className={styles.content}>
      <div className={styles.title}>{name}</div>
      <div className={styles.duration}>
        <p>
          類型：{type}
          {renderIcon()}
        </p>
        <p>測驗時間：{testTIme}</p>
        <p>報名時間：{applyTime}</p>
        <p>地點：{address}</p>
      </div>
      {link && (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.more}
        >
          前往
        </a>
      )}
    </div>
  );
};

export default Dummie_Certificate;
