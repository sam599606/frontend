import React, { useState } from "react";
import styles from "./Admin-Test.module.css";
import axios from "axios";

let token = localStorage.getItem("token");
let testList = []
let question
let bgColor
axios({
  method: "get",
  url: `http://localhost:5262/api/Test/TestList`,
  headers: {
    Authorization: "Bearer " + token,
  },
})
.then((res) => {
  console.log(res);
  for(let i = 0; i < res.data.result.length; i++){
    testList[i] = {
      id: res.data.result[i].t_id,
      content: res.data.result[i].question
    }
  }
})
.catch((err) => {
  console.log(err);
});


const AdminTest = () => {
  const [questions, setQuestions] = useState(testList);
  const [isEditOpen, setIsEditOpen] = useState(false);
  

  const sortTable = (index) => {
    // Sorting logic here
  };

  const openEditDialog = (t_id) => {
    let object = { t_id }
    let jsondata = JSON.stringify(object)
    axios({
      method: "post",
      url: "http://localhost:5262/api/Test/GetTest",
      data: jsondata,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        Authorization: "Bearer " + token,
      },
    })
    .then((res) => {
      console.log(res);
      question = res.data.result.question
      bgColor = res.data.result.bgColor
      if(bgColor == 1){
        document.getElementById('f6cf80').checked = true
      }
      else if(bgColor == 2){
        document.getElementById('ffe785').checked = true
      }
      else if(bgColor == 3){
        document.getElementById('fdfecb').checked = true
      }
      else if(bgColor == 4){
        document.getElementById('745329').checked = true
      }
      else if(bgColor == 5){
        document.getElementById('d5ad8a').checked = true
      }
      else if(bgColor == 6){
        document.getElementById('dbc8b6').checked = true
      }
      axios({
        method: "post",
        url: "http://localhost:5262/api/Test/GetTestSeletion",
        data: jsondata,
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Authorization: "Bearer " + token,
        },
      })
        .then((res) => {
          console.log(res)
        })
        .then(() => {
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });

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
        </div>

        <table className={styles.items}>
          {questions.map((question, index) => (
            <tr key={index}>
              <td className={styles.number}>{question.id}</td>
              <td className={styles.content}>{question.content}</td>
              <td className={styles.edit}>
                <button onClick={() => openEditDialog(question.id)} id={question.id}>
                  <img src="../src/images/edit.svg" alt="Edit" />
                </button>
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
                  <textarea>{question}</textarea>
                </td>
              </tr>
              <tr>
                <th>選項</th>
                <td id={styles.inputarea}>
                  <a href="#">
                    <img src="../src/images/add.svg" alt="Add option"/>
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
