import React, { useState } from "react";
import styles from "./Dummie.module.css";

const Dummie = () => {
  const [isOpen, setIsOpen] = useState(false); // 控制下拉選單顯示
  const [selectedJob, setSelectedJob] = useState("選擇職業"); // 預設顯示選擇職業

  const jobs = ["牙科技術員", "陶工", "建築設計員", "模型工", "細木工"];
  const skills = ["技能1", "技能2", "技能3", "技能4", "技能5"];
  const licences = ["證照1", "證照2", "證照3", "證照4"];

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const selectJob = (job) => {
    setSelectedJob(job);
    setIsOpen(false); // 選擇後關閉下拉菜單
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
              {jobs.map((job, index) => (
                <li
                  key={index}
                  onClick={() => selectJob(job)}
                  className={styles.dropdownItem}
                >
                  {job}
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
                  <div className={styles.link}>41,000</div>
                </a>
                <a href="">
                  <div className={styles.link}>42,000</div>
                </a>
                <a href="">
                  <div className={styles.link}>43,000</div>
                </a>
              </div>
            </div>

            <div className={styles.salaryRight}>
              <div className={styles.salarycolumn}>
                <div className={styles.seniority}>6 ~ 8年</div>
                <div className={styles.seniority}>8 ~ 10年</div>
                <div className={styles.seniority}>10年以上</div>
              </div>
              <div className={styles.salarycolumn}>
                <a href="">
                  <div className={styles.link}>44,000</div>
                </a>
                <a href="">
                  <div className={styles.link}>45,000</div>
                </a>
                <a href="">
                  <div className={styles.link}>46,000</div>
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
                  <a key={index} href="">
                    <div className={styles.link}>{skill}</div>
                  </a>
                ))}
              </div>
            </div>

            {/* 證照區塊 */}
            <div className={styles.licence}>
              <p>證照</p>
              <div className={styles.links}>
                {licences.map((licence, index) => (
                  <a key={index} href="">
                    <div className={styles.link}>{licence}</div>
                  </a>
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
