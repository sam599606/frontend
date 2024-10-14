import React from "react";
import "./Dialog.css";
import axios from "axios";
import Swal from "sweetalert2"; // 引入 SweetAlert2

const RegisterDialog = ({ isOpen, onClose, onLogin }) => {
  if (!isOpen) return null; // 如果未打開，則不渲染彈出視窗

  //#region Enter觸發事件
  const keyDown = (event) => {
    if (event.key === "Enter") {
      getQuote();
    }
  };

  //#region 註冊
  const getQuote = () => {
    let account = document.getElementById("account").value;
    let name = document.getElementById("name").value;
    let password = document.getElementById("password").value;
    let phone = document.getElementById("phone").value;
    let address = document.getElementById("address").value;
    let edu = document.getElementById("edu").value;
    let sex = document.getElementById("sex").value;
    let birth = document.getElementById("birth").value;

    // 正規表達式檢查是否為有效的 Email 地址
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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

    // 檢查是否有缺失資料
    if (
      !account ||
      !name ||
      !password ||
      !phone ||
      !address ||
      !edu ||
      !sex ||
      !birth
    ) {
      Swal.fire({
        icon: "warning",
        title: "資料不完整",
        text: "請填寫所有欄位再進行註冊！",
        confirmButtonColor: "#d5ad8a",
      });
      return; // 終止函數，不進行下一步操作
    }

    // // 檢查帳號欄位是否為有效的 Email 地址
    // if (!emailPattern.test(account)) {
    //   Swal.fire({
    //     icon: "warning",
    //     title: "無效的Email",
    //     text: "請填寫有效的電子郵件地址！",
    //     confirmButtonColor: "#d5ad8a",
    //   });
    //   return; // 終止函數，不進行下一步操作
    // }

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
        onLogin();
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
            text: "請確認註冊資料是否完整。",
            confirmButtonColor: "#d5ad8a",
          });
        }
      });
  };

  //#region return
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
