import React, { useState, useEffect } from "react";
import styles from "./Dummie_Class.module.css";
import Dummie_more_Layout from "./Dummie_more_Layout";
import axios from "axios";

const Dummie_Class = () => {
  const [allCourses, setAllCourses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    axios({
      method: "get",
      url: "http://localhost:5262/api/Job/LessonList",
    })
      .then((res) => {
        console.log("LessonList:", res.data.result);
        setAllCourses(res.data.result); // 將獲取的 API 資料設定到 allCourses 狀態中
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // 計算當前頁的課程資料
  const currentCourses = allCourses.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <Dummie_more_Layout
      totalItems={allCourses.length}
      itemsPerPage={itemsPerPage}
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
    >
      {currentCourses.map((course, index) => (
        <Content
          key={course.l_id}
          title={course.name}
          time={course.time}
          intro={course.content}
          http={course.http} // 傳入課程的 http 資料
        />
      ))}
    </Dummie_more_Layout>
  );
};

const Content = ({ title, time, intro, http }) => {
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

      <div className={styles.intro}>{intro || "暫無課程簡介"}</div>
    </div>
  );
};

export default Dummie_Class;
