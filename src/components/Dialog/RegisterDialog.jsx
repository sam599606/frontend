import React from "react";
import "./Dialog.css";
import axios from "axios";
import Swal from "sweetalert2"; // 引入 SweetAlert2

const RegisterDialog = ({ isOpen, onClose, onLogin }) => {
  if (!isOpen) return null; // 如果未打開，則不渲染彈出視窗

  const keyDown = (event) => {
    if (event.key === "Enter") {
      getQuote();
    }
  };

  const getQuote = () => {
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

    // 發送註冊請求
    axios({
      method: "post",
      url: "http://localhost:5262/api/User/Register",
      data: memberdata,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    })
      .then((res) => {
        console.log(res);
        Swal.fire({
          icon: "success",
          title: "註冊成功",
          text: "您的帳號已成功註冊！",
          confirmButtonColor: "#d5ad8a",
        });
        onClose(); // 成功後關閉註冊對話框
      })
      .catch((err) => {
        console.log(err);
        // 檢查是否是帳號重複的錯誤
        if (
          err.response &&
          err.response.data &&
          err.response.data.errorMessage === "帳號重複"
        ) {
          Swal.fire({
            icon: "error",
            title: "註冊失敗",
            text: "此帳號已被註冊，請使用其他帳號！",
            confirmButtonColor: "#d5ad8a",
          });
        } else {
          // 處理其他錯誤
          Swal.fire({
            icon: "error",
            title: "發生錯誤",
            text: "請稍後再試或聯繫支援人員。",
            confirmButtonColor: "#d5ad8a",
          });
        }
      });
  };

  return (
    <>
      {/* 模態背景層 */}
      <div className="modal-overlay" onClick={onClose} />

      <dialog id="registerpage" open>
        <a href="#" id="close" onClick={onClose}>
          X
        </a>
        <div id="switch">
          <a href="#" id="login" onClick={onLogin}>
            <div>登入</div>
          </a>
          <div>註冊</div>
        </div>
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
              <select id="sex" defaultValue={"default"} required>
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
              <input type="date" id="birth" required />
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
              <select id="edu" defaultValue={"default"} required>
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
        <button id="submit" onClick={getQuote}>
          註冊
        </button>
      </dialog>
    </>
  );
};

export default RegisterDialog;
