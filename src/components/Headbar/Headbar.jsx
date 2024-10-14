import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Headbar.css";
import LoginDialog from "../Dialog/LoginDialog";
import RegisterDialog from "../Dialog/RegisterDialog";
import InfoDialog from "../Dialog/InfoDialog";

const Headbar = () => {
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [isRegisterOpen, setRegisterOpen] = useState(false);
  const [isInfoOpen, setInfoOpen] = useState(false);
  const [isInvisible, setInvisible] = useState(false);

  
  
  function invisibleTF() {
    let token = localStorage.getItem("token");
    console.log(token);
    let userInfo = document.getElementById("userinfo")
    let loginBtn = document.getElementById("login")
    if(token == null){
      loginBtn = setInvisible(true)
      userInfo = setInvisible(false)
    }
    else {
      loginBtn = setInvisible(false)
      userInfo = setInvisible(true)
    }
  }
  

  //#region return
  return (
    <>
      <header>
        <Link to="/" id="logo">
          <img src="/src/images/logo.png" alt="logo" />
          <h3>職得期待</h3>
        </Link>

        <ul>
          <li>
            <Link to="/forcast">產業景氣預測</Link>
          </li>
          <li>
            <Link to="/dummie">職業資訊懶人包</Link>
            <ul>
              <li>
                <Link to="/dummie/class">課程</Link>
              </li>
              <li>
                <Link to="0">補助</Link>
              </li>
              <li>
                <Link to="0">證照</Link>
              </li>
            </ul>
          </li>
          <li>
            <Link to="/test">職涯診斷測驗</Link>
            {/* 還沒定義路徑 */}
            <ul>
              <li>
                <Link to="/test">開始測驗</Link>
              </li>
              <li>
                <Link to="/test-history">測驗紀錄</Link>
              </li>
            </ul>
          </li>
        </ul>

        {/* 開啟個人資訊彈窗 */}
        <a
          href="#"
          id="userinfo"
          onClick={() => setInfoOpen(true)}
          className={`${isInvisible ? '' : 'invisible'}`}
        >
          <img
            src="/src/images/avatar.png"
            alt="avatar"
            width="40"
            height="40"
          />
        </a>

        {/* 開啟登入介面彈窗 */}
        <a
          href="#"
          className={`login ${isInvisible ? 'invisible' : ''}`}
          id="login"
          onClick={() => setLoginOpen(true)}
        >
          登入
        </a>
      </header>

      {/* 登入&註冊介面切換 */}
      <LoginDialog
        isOpen={isLoginOpen}
        onClose={() => {
          setLoginOpen(false);
          invisibleTF()}}
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

      <InfoDialog isOpen={isInfoOpen} onClose={() => {
        setInfoOpen(false)
        invisibleTF()
      }} />
    </>
  );
};

export default Headbar;
