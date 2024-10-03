// Headbar.jsx
import React, { useState } from "react";
import "./Headbar.css";
import LoginDialog from "../Dialog/LoginDialog";
import RegisterDialog from "../Dialog/RegisterDialog";

const Headbar = () => {
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [isRegisterOpen, setRegisterOpen] = useState(false);

  return (
    <div>
      <header>
        <a href="index.html" id="logo">
          <img src="src/images/logo.png" alt="logo" />
          <h3>職得期待</h3>
        </a>

        <ul>
          <li>
            <a href="forcast.html">產業景氣預測</a>
          </li>
          <li>
            <a href="dummie.html">職業資訊懶人包</a>
            <ul>
              <li>
                <a href="dummie.html">心得</a>
              </li>
              <li>
                <a href="dummie.html">薪資</a>
              </li>
              <li>
                <a href="dummie.html">課程</a>
              </li>
            </ul>
          </li>
          <li>
            <a href="test.html">職涯診斷測驗</a>
            <ul>
              <li>
                <a href="test.html">農業</a>
              </li>
              <li>
                <a href="test.html">工業</a>
              </li>
              <li>
                <a href="test.html">商業</a>
              </li>
            </ul>
          </li>
        </ul>

        <a href="#" id="userinfo">
          <img
            src="src/images/avatar.png"
            alt="avatar"
            width="40"
            height="40"
          />
        </a>

        <a
          href="#"
          className="login"
          id="login"
          onClick={() => setLoginOpen(true)}
        >
          登入
        </a>
      </header>

      {/* 使用 LoginDialog 和 RegisterDialog 組件 */}
      <LoginDialog
        isOpen={isLoginOpen}
        onClose={() => setLoginOpen(false)}
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

      <main></main>
      <footer>this is footer</footer>
    </div>
  );
};

export default Headbar;
