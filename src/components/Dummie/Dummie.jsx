import React, { useEffect, useState } from "react";
import styles from "./Dummie.module.css";
import axios from "axios";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";

const cookies = new Cookies();
let token = cookies.get("token");

const Dummie = () => {
  const [isOpen, setIsOpen] = useState(false); // 控制下拉選單顯示
  const [selectedJob, setSelectedJob] = useState("選擇職業"); // 預設顯示選擇職業
  const [searchTerm, setSearchTerm] = useState(""); // 新增的搜尋關鍵字狀態
  const [jobList, setJobList] = useState([]); // 儲存職業清單
  const [filteredJobList, setFilteredJobList] = useState([]); // 儲存篩選後的職業清單
  const [skills, setSkills] = useState([]);
  const [licences, setLicences] = useState([]);
  const [oneDown, setOneDown] = useState([]);
  const [oneTothree, setOneTothree] = useState([]);
  const [threeTofive, setThreeTofive] = useState([]);
  const [fiveToten, setFiveToten] = useState([]);
  const [tenTofifteen, setTenTofifteen] = useState([]);
  const [fifteenUp, setFifteenUp] = useState([]);
  const [isFirstTime, setIsFirstTime] = useState(true); // 假設用來判斷是否第一次渲染
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImageSrc, setModalImageSrc] = useState("");

  sessionStorage.removeItem("skills");
  sessionStorage.removeItem("licences");
  sessionStorage.removeItem("oneDown");
  sessionStorage.removeItem("oneTothree");
  sessionStorage.removeItem("threeTofive");
  sessionStorage.removeItem("fiveToten");
  sessionStorage.removeItem("tenTofifteen");
  sessionStorage.removeItem("fifteenUp");

  useEffect(() => {
    axios({
      method: "get",
      url: "http://localhost:5262/api/Job/JobList",
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => {
        console.log("JobList:", res);
        const jobListData = res.data.result.map((job) => ({
          jobs: job.name,
          j_id: job.j_id,
        }));
        setJobList(jobListData);
        setFilteredJobList(jobListData); // 初始設定過濾後的職業清單
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const selectJob = (job) => {
    console.log(job);
    setSelectedJob(job.jobs);
    let j_id = job.j_id;
    let object = { j_id };

    axios({
      method: "post",
      url: "http://localhost:5262/api/Job/GetJob",
      data: JSON.stringify(object),
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json; charset=utf-8",
      },
    })
      .then((res) => {
        console.log(res);
        let fetchedSkills = res.data.result.skill.split(",");
        let fetchedLicences = res.data.result.certificate.split(",");
        setSkills(fetchedSkills);
        setLicences(fetchedLicences);
        setOneDown(res.data.result.oneDown);
        setOneTothree(res.data.result.oneTothree);
        setThreeTofive(res.data.result.threeTofive);
        setFiveToten(res.data.result.fiveToten);
        setTenTofifteen(res.data.result.tenTofifteen);
        setFifteenUp(res.data.result.fifteenUp);
      })
      .catch((err) => {
        console.log(err);
      });
    setIsOpen(false); // 選擇後關閉下拉菜單
  };

  // 處理搜尋輸入框的變更事件
  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    setSearchTerm(searchTerm);
    // 根據搜尋字詞過濾職業清單
    setFilteredJobList(
      jobList.filter((job) =>
        job.jobs.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  };

  useEffect(() => {
    // 初次渲染時執行的邏輯
    let job = JSON.parse(localStorage.getItem("job"));
    if (isFirstTime) {
      if (job != null) {
        selectJob(job);
      }
      // 執行想要的程式碼
      setIsFirstTime(false); // 更新狀態，防止後續渲染重複執行
      setTimeout(() => {
        localStorage.removeItem("job");
      }, 10);
    }
  }, []); // 空依賴陣列，確保只在初次渲染執行一次

  const clickjob = (skill) => {
    localStorage.setItem("skill", skill);
    navigate("/dummie/class");
  };

  const clickcerti = (licence) => {
    localStorage.setItem("licence", licence);
    navigate("/dummie/certificate");
  };

  const handleImageClick = (src) => {
    window.open(src, "_blank"); // 開啟新視窗顯示圖片
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.word_cloud_area}>
        <div style={{ height: "30px" }}></div>
        <div className={styles.up}>
          <h2>工作內容</h2>
          <img
            src={
              selectedJob.includes("會計")
                ? "../src/images/word_cloud/acc_1.jpg"
                : "../src/images/word_cloud/messageImage_1729957292696.jpg"
            }
            className={styles.word_cloud}
            onClick={() =>
              handleImageClick(
                selectedJob.includes("會計")
                  ? "../src/images/word_cloud/acc_1.jpg"
                  : "../src/images/word_cloud/messageImage_1729957292696.jpg"
              )
            }
          />
        </div>
        <div className={styles.down}>
          <h2>工作心得</h2>
          <img
            src={
              selectedJob.includes("會計")
                ? "../src/images/word_cloud/acc_2.jpg"
                : "../src/images/word_cloud/messageImage_1729957271867.jpg"
            }
            className={styles.word_cloud}
            onClick={() =>
              handleImageClick(
                selectedJob.includes("會計")
                  ? "../src/images/word_cloud/acc_2.jpg"
                  : "../src/images/word_cloud/messageImage_1729957271867.jpg"
              )
            }
          />
        </div>
      </div>

      <div className={styles.rightarea}>
        <div className={styles.job_dropdown}>
          <button onClick={toggleDropdown} className={styles.dropdownButton}>
            {selectedJob}
          </button>
          {isOpen && (
            <div className={styles.dropdownContent}>
              <input
                type="text"
                placeholder="搜尋職業"
                value={searchTerm}
                onChange={handleSearch}
                className={styles.searchInput}
              />
              <ul className={styles.dropdownMenu}>
                {filteredJobList.map((job, index) => (
                  <li
                    key={index}
                    onClick={() => selectJob(job)}
                    className={styles.dropdownItem}
                  >
                    {job.jobs}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className={styles.salary}>
          <div className={styles.title}>平均薪資</div>
          <div className={styles.content}>
            <div className={styles.salaryLeft}>
              <div className={styles.salarycolumn}>
                <div className={styles.seniority}>1年以下</div>
                <div className={styles.seniority}>1 ~ 3年</div>
                <div className={styles.seniority}>3 ~ 5年</div>
              </div>
              <div className={styles.salarycolumn}>
                {selectedJob !== "選擇職業" && (
                  <>
                    <div className={styles.money}>{oneDown}</div>
                    <div className={styles.money}>{oneTothree}</div>
                    <div className={styles.money}>{threeTofive}</div>
                  </>
                )}
              </div>
            </div>

            <div className={styles.salaryRight}>
              <div className={styles.salarycolumn}>
                <div className={styles.seniority}>5 ~ 10年</div>
                <div className={styles.seniority}>10 ~ 15年</div>
                <div className={styles.seniority}>15年以上</div>
              </div>
              <div className={styles.salarycolumn}>
                {selectedJob !== "選擇職業" && (
                  <>
                    <div className={styles.money}>{fiveToten}</div>
                    <div className={styles.money}>{tenTofifteen}</div>
                    <div className={styles.money}>{fifteenUp}</div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className={styles.requirement}>
          <div className={styles.title}>技能與執照</div>
          <div className={styles.content}>
            <div className={styles.skill}>
              <p>技能</p>
              <div className={styles.links}>
                {skills.map((skill, index) => (
                  <button
                    key={index}
                    className={styles.link}
                    onClick={() => clickjob(skill)}
                  >
                    {skill}
                  </button>
                ))}
              </div>
            </div>
            <div className={styles.licence}>
              <p>證照</p>
              <div className={styles.links}>
                {licences.map((licence, index) => (
                  <button
                    key={index}
                    className={styles.link}
                    onClick={() => clickcerti(licence)}
                  >
                    {licence}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dummie;
