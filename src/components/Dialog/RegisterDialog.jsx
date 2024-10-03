import React from "react";
import "./Dialog.css";

const RegisterDialog = ({ isOpen, onClose, onLogin }) => {
  if (!isOpen) return null; // 如果未打開，則不渲染彈出視窗

  return (
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
          <div id="name">
            <input type="text" placeholder="" required />
            <label>姓名</label>
          </div>
          <div id="gender">
            <select required>
              <option value="default" disabled selected>
                請選擇性別
              </option>
              <option value="male">男</option>
              <option value="female">女</option>
              <option value="no">不透露</option>
            </select>
            <label>性別</label>
          </div>
        </div>
        <div className="columns">
          <div id="birth">
            <input type="date" required />
            <label>生日</label>
          </div>
          <div id="acc">
            <input type="email" placeholder="" required />
            <label>帳號</label>
          </div>
        </div>
        <div className="columns">
          <div id="phone">
            <input type="tel" placeholder="" required />
            <label>電話</label>
          </div>
          <div id="edu">
            <select required>
              <option value="default" disabled selected>
                請選擇教育程度
              </option>
              <option value="elementary">國小</option>
              <option value="junior">國中</option>
              <option value="senior">高中</option>
              <option value="university">大學</option>
            </select>
            <label>教育程度</label>
          </div>
        </div>
        <div className="columns">
          <div id="address">
            <input type="text" placeholder="" required />
            <label>地址</label>
          </div>
          <div id="pwd">
            <input type="password" placeholder="" required />
            <label>密碼</label>
          </div>
        </div>
      </div>
      <button id="submit">註冊</button>
    </dialog>
  );
};

export default RegisterDialog;
