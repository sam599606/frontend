import React, { useEffect } from "react";
import "./Dialog.css";
import axios from "axios";
import Swal from "sweetalert2";
import Cookies from "universal-cookie";

const LoginDialog = ({ isOpen, onClose, onRegister }) => {
  if (!isOpen) return null;

  const cookies = new Cookies();
  let logoutTimer;

  const keyDown = (event) => {
    if (event.key === "Enter") {
      getQuote();
    }
  };

  const getQuote = () => {
    let account = document.getElementById("account").value;
    let password = document.getElementById("password").value;

    if (!account || !password) {
      Swal.fire({
        icon: "warning",
        title: "欄位不能為空",
        text: "請輸入帳號和密碼",
        confirmButtonColor: "#d5ad8a",
      });
      return;
    }

    const memberdata = { account, password };

    axios({
      method: "post",
      url: "http://localhost:5262/api/User/Login",
      data: JSON.stringify(memberdata),
      headers: { "Content-Type": "application/json; charset=utf-8" },
    })
      .then((res) => {
        console.log("login_response:", res);

        if (!res.data.result) {
          Swal.fire({
            icon: "error",
            title: "查無帳號",
            text: "請確認您輸入的帳號是否正確",
            confirmButtonColor: "#d5ad8a",
          });
          return;
        }

        let token = res.data.result;
        cookies.set("token", token, { path: "/" });
        cookies.set("acc", account, { path: "/" });

        // 登入成功彈窗
        Swal.fire({
          icon: "success",
          title: "登入成功",
          text: "您已成功登入！",
          confirmButtonColor: "#d5ad8a",
        });

        // 設定登出計時器為一小時
        logoutTimer = setTimeout(() => {
          cookies.remove("token");
          Swal.fire({
            icon: "info",
            title: "已自動登出",
            text: "由於超過登入時間，您已被自動登出。",
            confirmButtonColor: "#d5ad8a",
          }).then(() => {
            window.location.reload(); // 刷新頁面或重定向
          });
        }, 3600 * 1000);

        // 模擬關閉動作
        onClose();
      })
      .catch((err) => {
        console.log(err);

        if (
          err.response &&
          err.response.data &&
          err.response.data.errorMessage === "查無帳號"
        ) {
          Swal.fire({
            icon: "error",
            title: "查無帳號",
            text: "請確認您輸入的帳號是否正確",
            confirmButtonColor: "#d5ad8a",
          });
        }

        if (
          err.response &&
          err.response.data &&
          err.response.data.errorMessage === "信箱尚未驗證請先去驗證"
        ) {
          Swal.fire({
            icon: "error",
            title: "登入失敗",
            text: "信箱尚未驗證，請先去驗證您的信箱",
            confirmButtonColor: "#d5ad8a",
          });
        }
      });
  };

  // 清除計時器當組件卸載或更新時
  useEffect(() => {
    return () => clearTimeout(logoutTimer);
  }, []);

  //#region return
  return (
    <>
      {/* 模態背景層 */}
      <div className="modal-overlay" onClick={onClose} />

      {/* 登入對話框 */}
      <dialog id="loginpage" open>
        <button href="#" id="close" onClick={onClose}>
          X
        </button>
        <div id="switch">
          <div>登入</div>
          <button id="register" onClick={onRegister}>
            <div>註冊</div>
          </button>
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
