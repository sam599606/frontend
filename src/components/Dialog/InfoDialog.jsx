import React from "react";
import "./Dialog.css";
import axios from "axios";
import Swal from "sweetalert2"; // 引入 SweetAlert2
import { Link } from "react-router-dom";

const InfoDialog = ({ isOpen, onClose }) => {
  if (!isOpen) return null; // 如果未打開，則不渲染彈出視窗

  //#region 抓會員資料
  axios({
    method: "get",
    url: "http://localhost:5262/api/User/UserList",
  })
    .then((res) => {
      console.log(res);
      let acc = localStorage.getItem("acc");
      for (let i = 0; i <= res.data.result.length - 1; i++) {
        if (res.data.result[i].account == acc) {
          let account = res.data.result[i].account;
          let name = res.data.result[i].name;
          let password = res.data.result[i].password;
          let phone = res.data.result[i].phone;
          let address = res.data.result[i].address;
          let edu = res.data.result[i].edu;
          let sex = res.data.result[i].sex;
          let birth = res.data.result[i].birth;

          document.getElementById("name").value = name;
          document.getElementById("account").value = account;
          document.getElementById("password").value = password;
          document.getElementById("phone").value = phone;
          document.getElementById("address").value = address;
          document.getElementById("edu").value = edu;
          document.getElementById("sex").value = sex;
          document.getElementById("birth").value = birth.substr(0, 10);
        }
      }
    })
    .catch((err) => {
      console.log(err);
    });

  //#region Enter觸發事件
  const keyDown = (event) => {
    if (event.key == "Enter") {
      EditInfo();
    }
  };

  //#region 更改會員資料
  const EditInfo = () => {
    let account = document.getElementById("account").value;
    let name = document.getElementById("name").value;
    let password = document.getElementById("password").value;
    let phone = document.getElementById("phone").value;
    let address = document.getElementById("address").value;
    let edu = document.getElementById("edu").value;
    let sex = document.getElementById("sex").value;
    let birth = document.getElementById("birth").value;

    const memberdata = {
      account,
      name,
      password,
      phone,
      address,
      edu,
      sex,
      birth,
    };
    console.log(memberdata);

    axios({
      method: "put",
      url: "http://localhost:5262/api/User/EditUser",
      data: JSON.stringify(memberdata),
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //#region 登出
  const logout = () => {
    localStorage.removeItem('token')
    Swal.fire({
      icon: "success",
      title: "登出成功",
      text: "您的帳號已登出！",
      confirmButtonColor: "#d5ad8a",
    });
    document.getElementById('close').click()
    
  }

  //#region return
  return (
    <>
      {/* 模態背景層 */}
      <div className="modal-overlay" onClick={onClose} />

      <dialog id="infopage" open>
        <a href="#" id="close" onClick={onClose}>
          X
        </a>
        <div id="info">個人資料</div>
        <div id="input">
          <div className="columns">
            <div className="block">
              <input
                type="text"
                placeholder=""
                id="name"
                onKeyDown={keyDown}
                required
              />
              <label>姓名</label>
            </div>
            <div className="block">
              <select defaultValue={"default"} id="sex">
                <option value="default" disabled>
                  請選擇性別
                </option>
                <option value="1">男</option>
                <option value="2">女</option>
                <option value="3">不透露</option>
              </select>
              <label>性別</label>
            </div>
          </div>
          <div className="columns">
            <div className="block">
              <input
                type="date"
                placeholder=""
                id="birth"
                onKeyDown={keyDown}
                required
              />
              <label>生日</label>
            </div>
            <div className="block">
              <input
                type="email"
                placeholder=""
                id="account"
                onKeyDown={keyDown}
                required
              />
              <label>帳號</label>
            </div>
          </div>
          <div className="columns">
            <div className="block">
              <input
                type="tel"
                placeholder=""
                id="phone"
                onKeyDown={keyDown}
                required
              />
              <label>電話</label>
            </div>
            <div className="block">
              <select defaultValue={"default"} id="edu">
                <option value="default" disabled>
                  請選擇教育程度
                </option>
                <option value="1">國小</option>
                <option value="2">國中</option>
                <option value="3">高中</option>
                <option value="4">大學</option>
              </select>
              <label>教育程度</label>
            </div>
          </div>
          <div className="columns">
            <div className="block">
              <input
                type="text"
                placeholder=""
                id="address"
                onKeyDown={keyDown}
                required
              />
              <label>地址</label>
            </div>
            <div className="block">
              <input
                type="password"
                placeholder=""
                id="password"
                onKeyDown={keyDown}
                required
              />
              <label>密碼</label>
            </div>
          </div>
        </div>
        <div className="columns">
          <button type="button" onClick={onClose} className="cancel-button">
            取消
          </button>
          <button type="submit" className="submit-button" onClick={EditInfo}>
            儲存
          </button>
          <Link to="/" id="logout" onClick={logout}> 
          登出
          </Link>
        </div>
      </dialog>
    </>
  );
};

export default InfoDialog;
