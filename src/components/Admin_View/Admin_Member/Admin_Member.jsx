import React, { useState } from "react";
import styles from "./Admin_Member.module.css";

const Admin_Member = () => {
  const [users, setUsers] = useState([
    {
      id: 1,
      gender: "男",
      account: "gogg@fhhfdfkdf",
      name: "田裕賢",
      time: "一天前上線",
    },
    {
      id: 2,
      gender: "男",
      account: "gogg@fhhfdfkdf",
      name: "田裕賢",
      time: "一天前上線",
    },
    {
      id: 3,
      gender: "男",
      account: "gogg@fhhfdfkdf",
      name: "田裕賢",
      time: "一天前上線",
    },
    {
      id: 4,
      gender: "男",
      account: "gogg@fhhfdfkdf",
      name: "田裕賢",
      time: "一天前上線",
    },
    {
      id: 5,
      gender: "男",
      account: "gogg@fhhfdfkdf",
      name: "田裕賢",
      time: "一天前上線",
    },
  ]);

  return (
    <div className={styles.wrap}>
      <div className={styles.search}>
        <input type="search" placeholder="搜尋" />
        <a href="#" className={styles.searchbtn}>
          <img src="/src/images/search.png" alt="Search" />
        </a>
      </div>
      <div className={styles.container}>
        <div className={styles.bar}>
          <div className={styles.choosetodel}>
            <input type="checkbox" />
            <a href="#" className={styles.delete}>
              <img src="/src/images/delete.png" alt="Delete" />
            </a>
          </div>
          <a href="#" className={styles.adduser}>
            <img src="/src/images/add.svg" alt="Add User" />
          </a>
        </div>
        <div className={styles.sort}>
          <div className={styles.check}></div>
          <div className={styles.gender}>性別</div>
          <div className={styles.account}>帳號</div>
          <div className={styles.name}>姓名</div>
          <div className={styles.time}>上線時間</div>
        </div>
        <table className={styles.items}>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td className={styles.check}>
                  <input type="checkbox" />
                </td>
                <td className={styles.gender}>{user.gender}</td>
                <td className={styles.account}>{user.account}</td>
                <td className={styles.name}>{user.name}</td>
                <td className={styles.time}>{user.time}</td>
                <td className={styles.edit}>
                  <a href="#">
                    <img src="/src/images/edit.svg" alt="Edit" />
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <table className={styles.pages}>
          <tbody>
            <tr>
              <td>
                <a href="#">1</a>
              </td>
              <td>
                <a href="#">
                  <img src="/src/images/nextpage.png" alt="Next" />
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Admin_Member;
