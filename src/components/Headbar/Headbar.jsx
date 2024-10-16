import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Headbar.css";
import LoginDialog from "../Dialog/LoginDialog";
import RegisterDialog from "../Dialog/RegisterDialog";
import InfoDialog from "../Dialog/InfoDialog";

const Headbar = () => {
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [isRegisterOpen, setRegisterOpen] = useState(false);
  const [isInfoOpen, setInfoOpen] = useState(false);
  const [isInvisible, setInvisible] = useState(false);

  const location = useLocation(); // 使用 useLocation 來獲取當前路徑
  const isTestTestingPage = location.pathname === "/test-testing"; // 判斷是否在 /test-testing 頁面
  let token = localStorage.getItem("token");
  let userInfo = document.getElementById("userinfo");
  let loginBtn = document.getElementById("login");

  function invisibleTF() {
    if (token == null) {
      loginBtn = setInvisible(true);
      userInfo = setInvisible(false);
    } else {
      loginBtn = setInvisible(false);
      userInfo = setInvisible(true);
    }
  }

  useEffect(() => {
    invisibleTF();
  });

  return (
    <>
      <header>
        <Link
          to="/"
          id="logo"
          className={isTestTestingPage ? "disabled-link" : ""}
        >
          <img src="/src/images/logo.png" alt="logo" />
          <h3>職得期待</h3>
        </Link>

        <ul className={isTestTestingPage ? "test-page-disabled" : ""}>
          <li>
            <Link
              to="/forcast"
              className={isTestTestingPage ? "disabled-link" : ""}
              onClick={(e) => isTestTestingPage && e.preventDefault()} // 禁用連結
            >
              產業景氣預測
            </Link>
          </li>
          <li>
            <Link
              to="/dummie"
              className={isTestTestingPage ? "disabled-link" : ""}
              onClick={(e) => isTestTestingPage && e.preventDefault()} // 禁用連結
            >
              職業資訊懶人包
            </Link>
            <ul>
              <li>
                <Link
                  to="/dummie/class"
                  className={isTestTestingPage ? "disabled-link" : ""}
                  onClick={(e) => isTestTestingPage && e.preventDefault()} // 禁用連結
                >
                  課程
                </Link>
              </li>
              <li>
                <Link
                  to="0"
                  className={isTestTestingPage ? "disabled-link" : ""}
                  onClick={(e) => isTestTestingPage && e.preventDefault()} // 禁用連結
                >
                  補助
                </Link>
              </li>
              <li>
                <Link
                  to="0"
                  className={isTestTestingPage ? "disabled-link" : ""}
                  onClick={(e) => isTestTestingPage && e.preventDefault()} // 禁用連結
                >
                  證照
                </Link>
              </li>
            </ul>
          </li>
          <li>
            <Link
              to="/test"
              className={isTestTestingPage ? "disabled-link" : ""}
              onClick={(e) => isTestTestingPage && e.preventDefault()} // 禁用連結
            >
              職涯診斷測驗
            </Link>
          </li>
        </ul>

        {/* 開啟個人資訊彈窗 */}
<<<<<<< HEAD
        <a
          href="#"
          id="userinfo"
          onClick={(e) => {
            if (!isTestTestingPage) setInfoOpen(true);
            else e.preventDefault(); // 禁用點擊
          }}
          className={`${isInvisible ? "" : "invisible"} ${
            isTestTestingPage ? "disabled-link" : ""
          }`}
        >
=======
>>>>>>> f40d83102b780ecf478a8df3ec5d03a5077ec6fe
          <img
            src="/src/images/avatar.png"
            alt="avatar"
            width="40"
            height="40"
            id="userinfo"
            onClick={() => setInfoOpen(true)}
            className={`${isInvisible ? '' : 'invisible'}`}
          />

        {/* 開啟登入介面彈窗 */}
<<<<<<< HEAD
        <a
          href="#"
          className={`login ${isInvisible ? "invisible" : ""} ${
            isTestTestingPage ? "disabled-link" : ""
          }`}
=======
        <button
          className={`login ${isInvisible ? 'invisible' : ''}`}
>>>>>>> f40d83102b780ecf478a8df3ec5d03a5077ec6fe
          id="login"
          onClick={(e) => {
            if (!isTestTestingPage) setLoginOpen(true);
            else e.preventDefault(); // 禁用點擊
          }}
        >
          登入
        </button>
      </header>

      {/* 登入&註冊介面切換 */}
      <LoginDialog
        isOpen={isLoginOpen}
        onClose={() => {
          setLoginOpen(false);
          invisibleTF();
        }}
        onRegister={() => {
          setLoginOpen(false);
          setRegisterOpen(true);
        }}
      />
      <RegisterDialog
        isOpen={isRegisterOpen}
        onClose={() => setRegisterOpen(false)}
        onLogin={() => {
          setRegisterOpen(false);
          setLoginOpen(true);
        }}
      />

      <InfoDialog
        isOpen={isInfoOpen}
        onClose={() => {
          setInfoOpen(false);
          invisibleTF();
        }}
      />
    </>
  );
};

export default Headbar;
