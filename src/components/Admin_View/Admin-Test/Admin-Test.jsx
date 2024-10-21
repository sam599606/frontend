import React, { useState } from "react";
import styles from "./Admin-Test.module.css";

const AdminTest = () => {
  const [questions, setQuestions] = useState([
    { id: 1, content: "內容", date: "2024/09/20" },
    { id: 2, content: "內容", date: "2024/09/20" },
    { id: 3, content: "內容", date: "2024/09/20" },
    { id: 4, content: "內容", date: "2024/09/20" },
    { id: 5, content: "內容", date: "2024/09/20" },
    { id: 6, content: "內容", date: "2024/09/20" },
  ]);

  const [isEditOpen, setIsEditOpen] = useState(false);

  const sortTable = (index) => {
    // Sorting logic here
  };

  const openEditDialog = () => {
    setIsEditOpen(true);
  };

  const closeEditDialog = () => {
    setIsEditOpen(false);
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.search}>
        <input type="search" placeholder="搜尋" />
        <a href="#" className={styles.searchbtn}>
          <img src="../src/images/search.png" alt="Search" />
        </a>
        <a href="#" className={styles.add} id="addquestion">
          <img src="../src/images/add.svg" alt="Add" />
        </a>
      </div>

      <div className={styles.container}>
        <div className={styles.sort}>
          <div className={styles.number} onClick={() => sortTable(0)}>
            題號
          </div>
          <div className={styles.content}>測驗題目內容</div>
          <div className={styles.date} onClick={() => sortTable(2)}>
            更新時間
          </div>
        </div>

        <table className={styles.items}>
          {questions.map((question, index) => (
            <tr key={index}>
              <td className={styles.number}>{question.id}</td>
              <td className={styles.content}>{question.content}</td>
              <td className={styles.date}>{question.date}</td>
              <td className={styles.edit}>
                <a href="#" onClick={openEditDialog}>
                  <img src="../src/images/edit.svg" alt="Edit" />
                </a>
              </td>
            </tr>
          ))}
        </table>

        <table className={styles.pages}>
          <tr>
            <td>
              <a href="#">1</a>
            </td>
            <td>
              <a href="#">
                <img src="../src/images/nextpage.png" alt="Next page" />
              </a>
            </td>
          </tr>
        </table>
      </div>

      {/* Edit dialog */}
      {isEditOpen && (
        <dialog className={styles.testEdit} open>
          <a href="#" className={styles.close} onClick={closeEditDialog}>
            &times;
          </a>
          <div className={styles.title}>編輯題目</div>
          <div className={styles.table}>
            <table>
              <tr>
                <th>題目</th>
                <td>
                  <textarea></textarea>
                </td>
              </tr>
              <tr>
                <th>選項</th>
                <td id={styles.inputarea}>
                  <a href="#">
                    <img src="../src/images/add.svg" alt="Add option" />
                  </a>
                </td>
              </tr>
              <tr>
                <th>背景圖</th>
                <td>
                  <input type="file" id="upload" accept="image/*" />
                  <label htmlFor="upload" className={styles.upload}>
                    上傳圖片
                  </label>
                </td>
              </tr>
              <tr>
                <th>顏色</th>
                <td>
                  <input type="radio" name="color" id="f6cf80" />
                  <label htmlFor="f6cf80"></label>
                  <input type="radio" name="color" id="ffe785" />
                  <label htmlFor="ffe785"></label>
                  <input type="radio" name="color" id="fdfecb" />
                  <label htmlFor="fdfecb"></label>
                  <input type="radio" name="color" id="745329" />
                  <label htmlFor="745329"></label>
                  <input type="radio" name="color" id="d5ad8a" />
                  <label htmlFor="d5ad8a"></label>
                  <input type="radio" name="color" id="dbc8b6" />
                  <label htmlFor="dbc8b6"></label>
                </td>
              </tr>
              <tr>
                <th>動畫圖</th>
                <td>
                  <input type="file" id="upload" accept="image/*" />
                  <label htmlFor="upload" className={styles.upload}>
                    上傳圖片
                  </label>
                </td>
              </tr>
            </table>
          </div>
          <div className={styles.column}>
            <button className={styles.preview}>預覽</button>
            <button type="submit" className={styles.save}>
              儲存
            </button>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default AdminTest;
