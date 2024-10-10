import React from "react";
import "./Dialog.css";
import axios from "axios";

const LoginDialog = ({ isOpen, onClose, onRegister }) => {
  if (!isOpen) return null; // 如果未打開，則不渲染彈出視窗

  //#region Enter觸發事件
  const keyDown = (event) => {
    if (event.key == "Enter") {
      getQuote();
    }
  };

  //#region 登入
  const getQuote = () => {
    let account = document.getElementById("account").value;
    let password = document.getElementById("password").value;

    const memberdata = {
      account,
      password,
    };

    axios({
      method: "post",
      url: "http://localhost:5262/api/User/Login",
      data: JSON.stringify(memberdata),
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    })
      .then((res) => {
        console.log(res);

        let token = res.data.result;
        console.log(token);
        localStorage.setItem("token", token);
        localStorage.setItem("acc", account);

        alert('登入成功')
        onClose();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //#region return
  return (
    <>
      {/* 模態背景層 */}
      <div className="modal-overlay" onClick={onClose} />

      {/* 登入對話框 */}
      <dialog id="loginpage" open>
        <a href="#" id="close" onClick={onClose}>
          X
        </a>
        <div id="switch">
          <div>登入</div>
          <a href="#" id="register" onClick={onRegister}>
            <div>註冊</div>
          </a>
        </div>
        <div id="input">
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
        <button id="submit" onClick={getQuote}>
          登入
        </button>
      </dialog>
    </>
  );
};

export default LoginDialog;
