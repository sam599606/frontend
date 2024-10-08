import React, { useState } from "react";
import "./Headbar.css";
import LoginDialog from "../Dialog/LoginDialog";
import RegisterDialog from "../Dialog/RegisterDialog";
import InfoDialog from "../Dialog/InfoDialog";

const Headbar = ({ setCurrentPage }) => {
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [isRegisterOpen, setRegisterOpen] = useState(false);
  const [isInfoOpen, setInfoOpen] = useState(false);

  return (
    <>
      <header>
        <a href="#" id="logo" onClick={() => setCurrentPage("index")}>
          <img src="src/images/logo.png" alt="logo" />
          <h3>職得期待</h3>
        </a>

        <ul>
          <li>
            <a href="#" onClick={() => setCurrentPage("forcast")}>
              產業景氣預測
            </a>
          </li>
          <li>
            <a href="#" onClick={() => setCurrentPage("dummie")}>
              職業資訊懶人包
            </a>
            <ul>
              <li>
                <a href="dummie-more.html">課程</a>
              </li>
              <li>
                <a href="dummie-more.html">補助</a>
              </li>
              <li>
                <a href="dummie-more.html">證照</a>
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

        <a href="#" id="userinfo" onClick={() => setInfoOpen(true)}>
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

      <InfoDialog isOpen={isInfoOpen} onClose={() => setInfoOpen(false)} />
    </>
  );
};

export default Headbar;
