import React from "react";
import "./Dialog.css";

const LoginDialog = ({ isOpen, onClose, onRegister }) => {
  if (!isOpen) return null; // 如果未打開，則不渲染彈出視窗

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
          <div id="acc">
            <input type="email" placeholder="" required />
            <label>帳號</label>
          </div>
          <div id="pwd">
            <input type="password" placeholder="" required />
            <label>密碼</label>
          </div>
        </div>
        <button id="submit">登入</button>
      </dialog>
    </>
  );
};

export default LoginDialog;
