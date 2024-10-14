import React from "react";
import "./Dialog.css";
import axios from "axios";
import Swal from "sweetalert2"; // 引入 SweetAlert2

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
        localStorage.setItem("token", token);
        localStorage.setItem("acc", account);

        Swal.fire({
          icon: "success",
          title: "登入成功",
          text: "您的帳號已成功登入！",
          confirmButtonColor: "#d5ad8a",
        });
        onClose();
      })
      .catch((err) => {
        console.log(err);
        if(err.response.data.errorMessage == "密碼錯誤"){
          Swal.fire({
            icon: "error",
            title: "登入失敗",
            text: "密碼輸入錯誤！",
            confirmButtonColor: "#d5ad8a",
          });
        }
        if(err.response.data.errorMessage == "無此帳號"){
          Swal.fire({
            icon: "error",
            title: "登入失敗",
            text: "查無此帳號！",
            confirmButtonColor: "#d5ad8a",
          });
        }
        if(err.response.data.errorMessage == "信箱尚未驗證請先去驗證"){
          Swal.fire({
            icon: "error",
            title: "登入失敗",
            text: "信箱尚未驗證請先去驗證！",
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
          <div className="forgotBlock">
            <button id="forgot">忘記密碼</button>
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
