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
  const [skills, setSkills] = useState([]);
  const [licences, setLicences] = useState([]);
  const [oneDown, setOneDown] = useState([]);
  const [oneTothree, setOneTothree] = useState([]);
  const [threeTofive, setThreeTofive] = useState([]);
  const [fiveToten, setFiveToten] = useState([]);
  const [tenTofifteen, setTenTofifteen] = useState([]);
  const [fifteenUp, setFifteenUp] = useState([]);
  const navigate = useNavigate();

  sessionStorage.removeItem("skills");
  sessionStorage.removeItem("licences");
  sessionStorage.removeItem("oneDown");
  sessionStorage.removeItem("oneTothree");
  sessionStorage.removeItem("threeTofive");
  sessionStorage.removeItem("fiveToten");
  sessionStorage.removeItem("tenTofifteen");
  sessionStorage.removeItem("fifteenUp");

  axios({
    method: "get",
    url: "http://localhost:5262/api/Job/JobList",
    headers: {
      Authorization: "Bearer " + token,
    },
  })
    .then((res) => {
      let jobList = [];
      for (let i = 0; i < res.data.result.length; i++) {
        let jobs = res.data.result[i].name;
        let j_id = res.data.result[i].j_id;
        jobList[i] = { jobs, j_id };
      }
      setTimeout(() => {
        sessionStorage.setItem("jobList", JSON.stringify(jobList));
      }, 20);
    })
    .catch((err) => {
      console.log(err);
    });

  let jobList = JSON.parse(sessionStorage.getItem("jobList"));

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const selectJob = (job) => {
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
        sessionStorage.setItem("skills", JSON.stringify(fetchedSkills));
        let fetchedLicences = res.data.result.certificate.split(",");
        sessionStorage.setItem("licences", JSON.stringify(fetchedLicences));
        let fetchedOneDown = res.data.result.oneDown;
        sessionStorage.setItem("oneDown", oneDown);
        let fetchedOneTothree = res.data.result.oneTothree;
        sessionStorage.setItem("oneTothree", oneTothree);
        let fetchedThreeTofive = res.data.result.threeTofive;
        sessionStorage.setItem("threeTofive", threeTofive);
        let fetchedFiveToten = res.data.result.fiveToten;
        sessionStorage.setItem("fiveToten", fiveToten);
        let fetchedTenTofifteen = res.data.result.tenTofifteen;
        sessionStorage.setItem("tenTofifteen", tenTofifteen);
        let fetchedFifteenUp = res.data.result.fifteenUp;
        sessionStorage.setItem("fifteenUp", fifteenUp);

        setSkills(fetchedSkills);
        setLicences(fetchedLicences);
        setOneDown(fetchedOneDown);
        setOneTothree(fetchedOneTothree);
        setThreeTofive(fetchedThreeTofive);
        setFiveToten(fetchedFiveToten);
        setTenTofifteen(fetchedTenTofifteen);
        setFifteenUp(fetchedFifteenUp);
      })
      .catch((err) => {
        console.log(err);
      });
    setIsOpen(false); // 選擇後關閉下拉菜單
  };

  useEffect(() => {
    const storedSkills = JSON.parse(sessionStorage.getItem("skills"));
    const storedLicences = JSON.parse(sessionStorage.getItem("licences"));
    const storedOneDown = sessionStorage.getItem("oneDown");
    const storedOneTothree = sessionStorage.getItem("oneTothree");
    const storedThreeTofive = sessionStorage.getItem("threeTofive");
    const storedFiveToten = sessionStorage.getItem("fiveToten");
    const storedTenTofifteen = sessionStorage.getItem("tenTofifteen");
    const storedFifteenUp = sessionStorage.getItem("fifteenUp");
    if (storedSkills) {
      setSkills(storedSkills); // 设置 state，从而触发重新渲染
      setLicences(storedLicences);
      setOneDown(storedOneDown);
      setOneTothree(storedOneTothree);
      setThreeTofive(storedThreeTofive);
      setFiveToten(storedFiveToten);
      setTenTofifteen(storedTenTofifteen);
      setFifteenUp(storedFifteenUp);
    }
  }, []);

  const clickjob = (skill) => {
    console.log(skill);
    localStorage.setItem("skill", skill);
    navigate("/dummie/class");
  };

  const clickcerti = (licence) => {
    console.log(licence);
    localStorage.setItem("licence", licence);
    navigate("/dummie/certificate");
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.word_cloud_area}>
        <img
          src="../src/images/word_cloud/WC_test.png"
          className={styles.word_cloud}
        />
      </div>
      <div className={styles.rightarea}>
        <div className={styles.job_dropdown}>
          <button onClick={toggleDropdown} className={styles.dropdownButton}>
            {selectedJob}
          </button>
          {isOpen && (
            <ul className={styles.dropdownMenu}>
              {jobList.map((job, index) => (
                <li
                  key={index}
                  onClick={() => selectJob(job)}
                  className={styles.dropdownItem}
                >
                  {job.jobs}
                </li>
              ))}
            </ul>
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
                <a href="">
                  <div className={styles.link}>{oneDown}</div>
                </a>
                <a href="">
                  <div className={styles.link}>{oneTothree}</div>
                </a>
                <a href="">
                  <div className={styles.link}>{threeTofive}</div>
                </a>
              </div>
            </div>

            <div className={styles.salaryRight}>
              <div className={styles.salarycolumn}>
                <div className={styles.seniority}>5 ~ 10年</div>
                <div className={styles.seniority}>10 ~ 15年</div>
                <div className={styles.seniority}>15年以上</div>
              </div>
              <div className={styles.salarycolumn}>
                <a href="">
                  <div className={styles.link}>{fiveToten}</div>
                </a>
                <a href="">
                  <div className={styles.link}>{tenTofifteen}</div>
                </a>
                <a href="">
                  <div className={styles.link}>{fifteenUp}</div>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.requirement}>
          <div className={styles.title}>技能與執照</div>
          <div className={styles.content}>
            {/* 技能區塊 */}
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

            {/* 證照區塊 */}
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
