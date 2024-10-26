import React, { useState, useEffect, useRef } from "react";
import styles from "./Dummie_Subsidy.module.css";
import Dummie_more_Layout from "./Dummie_more_Layout";
import axios from "axios";
import Cookies from "universal-cookie";

const Dummie_Subsidy = () => {
  const [allSubsidies, setAllSubsidies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredSubsidies, setFilteredSubsidies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const cookies = new Cookies();
  const contentContainerRef = useRef(null);

  let token = cookies.get("token");

  useEffect(() => {
    axios({
      method: "get",
      url: "http://localhost:5262/api/Job/SubsidyList",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        console.log("SubsidyList:", res.data.result);
        setAllSubsidies(res.data.result);
        setFilteredSubsidies(res.data.result);
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

  // 自動更新搜尋結果
  useEffect(() => {
    const filtered = allSubsidies.filter(
      (subsidy) =>
        subsidy.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        String(subsidy.money).includes(searchTerm)
    );
    setFilteredSubsidies(filtered);
    setCurrentPage(1);
  }, [searchTerm]);

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
      <div className={styles.searchnum}>
        <p>已搜尋到 {filteredSubsidies.length} 筆資料</p>
      </div>

      <div className={styles.search}>
        <input
          type="search"
          placeholder="搜尋"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

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
            <p>找不到符合條件的補助</p>
          </div>
        )}
      </div>
    </Dummie_more_Layout>
  );
};

const Content = ({ name, money }) => {
  return (
    <div className={styles.content}>
      <div className={styles.title}>{name}</div>
      <div className={styles.duration}>
        <img src="../src/images/money.png" alt="金額圖標" />
        <p>補助金額：{money} 元</p>
      </div>
    </div>
  );
};

export default Dummie_Subsidy;
