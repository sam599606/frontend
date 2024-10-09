import React from "react";
import "./Dialog.css";
import axios from "axios";

const LoginDialog = ({ isOpen, onClose, onRegister }) => {
  if (!isOpen) return null; // 如果未打開，則不渲染彈出視窗

  const getQuote = () => {
    let account = document.getElementById('account').value
    let password = document.getElementById('password').value

    const memberdata = {
      account,
      password,
    }

    axios({
      method: 'post',
      url: 'http://localhost:5262/api/User/Login',
      data: JSON.stringify(memberdata),
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      }
    })
    .then(res => {
      console.log(res)

      let token = res.data.result
      console.log(token)
      localStorage.setItem('token', token);
      localStorage.setItem('acc', account);
      onClose()
    })
    .catch(err => {
      console.log(err)
    })
  }

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
            <input type="email" placeholder="" id="account" required />
            <label>帳號</label>
          </div>
          <div className="block">
            <input type="password" placeholder="" id="password" required />
            <label>密碼</label>
          </div>
        </div>
        <button id="submit" onClick={getQuote}>登入</button>
      </dialog>
    </>
  );
};

export default LoginDialog;
