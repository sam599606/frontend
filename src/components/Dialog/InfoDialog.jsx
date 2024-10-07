import React from "react";
import "./Dialog.css";

const InfoDialog = ({ isOpen, onClose }) => {
  if (!isOpen) return null; // 如果未打開，則不渲染彈出視窗

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
            <div id="name">
              <input type="text" placeholder="" required readOnly />
              <label>姓名</label>
            </div>
            <div id="gender">
              <select>
                <option value="default" selected disabled>
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
              <input type="date" placeholder="" required readOnly />
              <label>生日</label>
            </div>
            <div id="acc">
              <input type="email" placeholder="" required readOnly />
              <label>帳號</label>
            </div>
          </div>
          <div className="columns">
            <div id="phone">
              <input type="tel" placeholder="" required />
              <label>電話</label>
            </div>
            <div id="edu">
              <select>
                <option value="default" selected disabled>
                  請選擇教育程度
                </option>
                <option value="elementry">國小</option>
                <option value="junior">國中</option>
                <option value="senior">高中</option>
                <option value="universty">大學</option>
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
        <div className="columns">
          <input type="reset" value="取消" />
          <input type="submit" value="儲存" />
        </div>
      </dialog>
    </>
  );
};

export default InfoDialog;
