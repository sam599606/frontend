import React from "react";
import styles from "./Dummie.module.css";

const Dummie = () => {
  return (
    <>
      <div className={styles.upside}></div>
      <div className={styles.downside}>
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
            <div className={styles.skill}>
              <p>技能</p>
              <div className={styles.links}>
                <a href="">
                  <div className={styles.link}>技能1</div>
                </a>
                <a href="">
                  <div className={styles.link}>技能2</div>
                </a>
                <a href="">
                  <div className={styles.link}>技能3</div>
                </a>
                <a href="">
                  <div className={styles.link}>技能4</div>
                </a>
                <a href="">
                  <div className={styles.link}>技能5</div>
                </a>
              </div>
            </div>

            <div className={styles.licence}>
              <p>證照</p>
              <div className={styles.links}>
                <a href="">
                  <div className={styles.link}>證照1</div>
                </a>
                <a href="">
                  <div className={styles.link}>證照2</div>
                </a>
                <a href="">
                  <div className={styles.link}>證照3</div>
                </a>
                <a href="">
                  <div className={styles.link}>證照4</div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dummie;
