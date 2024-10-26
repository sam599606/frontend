import React, { useState, useEffect, useRef } from "react";
import styles from "./Dummie_Class.module.css";
import Dummie_more_Layout from "./Dummie_more_Layout";
import axios from "axios";
import Cookies from "universal-cookie";

const Dummie_Class = () => {
  const [allCourses, setAllCourses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const itemsPerPage = 10;
  const cookies = new Cookies();
  const contentContainerRef = useRef(null);

  let token = cookies.get("token");
  useEffect(() => {
    axios({
      method: "get",
      url: "http://localhost:5262/api/Job/LessonList",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        console.log("LessonList:", res.data.result);
        setAllCourses(res.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (contentContainerRef.current) {
      contentContainerRef.current.scrollIntoView();
    }
  }, [currentPage]);

  // 搜尋條件變更時即時更新
  useEffect(() => {
    setSearchQuery(searchTerm);
    setCurrentPage(1);
    if (contentContainerRef.current)
      contentContainerRef.current.scrollIntoView();
  }, [searchTerm]);

  const filteredCourses = allCourses.filter((course) =>
    [course.name, course.time, course.content, course.address]
      .join(" ")
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  const currentCourses = filteredCourses.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    let skill = localStorage.getItem("skill");
    if (skill) {
      setSearchTerm(skill);
      setTimeout(() => {
        localStorage.removeItem("skill");
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
            onChange={(e) => setSearchTerm(e.target.value)} // 搜尋欄位變更即更新搜尋條件
          />
          {/* <button className={styles.searchbtn} id="searchBtn">
            <img src="../src/images/search.png" alt="搜尋按鈕" />
          </button> */}
        </div>
      </div>

      <div ref={contentContainerRef}>
        {currentCourses.length > 0 ? (
          currentCourses.map((course) => (
            <Content
              key={course.l_id}
              title={course.name}
              time={course.time}
              intro={course.content}
              address={course.address}
              http={course.http}
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
