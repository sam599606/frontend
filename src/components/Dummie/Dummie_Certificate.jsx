import React, { useState, useEffect, useRef } from "react";
import styles from "./Dummie_Certificate.module.css";
import Dummie_more_Layout from "./Dummie_more_Layout";
import axios from "axios";
import Cookies from "universal-cookie";

const Dummie_Certificate = () => {
  const [allCertificates, setAllCertificates] = useState([]);
  const [filteredCertificates, setFilteredCertificates] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const cookies = new Cookies();
  const contentContainerRef = useRef(null);

  let token = cookies.get("token");
  useEffect(() => {
    axios({
      method: "get",
      url: "http://localhost:5262/api/Job/CertificateList",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        console.log("CertificateList:", res.data.result);
        setAllCertificates(res.data.result);
        setFilteredCertificates(res.data.result);
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

  // 更新搜尋條件
  useEffect(() => {
    const filtered = allCertificates.filter(
      (certificate) =>
        certificate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        certificate.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
        certificate.type.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCertificates(filtered);
    setCurrentPage(1);
  }, [searchTerm]);

  useEffect(() => {
    let licence = localStorage.getItem("licence");
    if (licence) {
      setSearchTerm(licence);
      setTimeout(() => {
        localStorage.removeItem("licence");
      }, 20);
    }
  }, []);

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
      <div className={styles.searchnum}>
        <p>已搜尋到 {filteredCertificates.length} 筆資料</p>
      </div>

      <div className={styles.search}>
        <input
          type="search"
          placeholder="搜尋"
          id="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div ref={contentContainerRef}>
        {currentCertificates.length > 0 ? (
          currentCertificates.map((certificate) => (
            <Content
              key={certificate.c_id}
              name={certificate.name}
              type={certificate.type}
              testTIme={certificate.testTIme}
              applyTime={certificate.applyTime}
              address={certificate.address}
              link={certificate.http}
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

const Content = ({ name, type, testTIme, applyTime, address, link }) => {
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
        <p className={styles.duration_type}>
          類型：{type}
          {renderIcon()}
        </p>
        <p className={styles.duration_testTIme}>測驗時間：{testTIme}</p>
        <p className={styles.duration_applyTime}>報名時間：{applyTime}</p>
        <p className={styles.duration_address}>地點：{address}</p>
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
