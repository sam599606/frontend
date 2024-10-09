import React, { useState } from "react";
import { Link } from "react-router-dom"; // 引入 Link 組件
import "./Headbar.css";
import LoginDialog from "../Dialog/LoginDialog";
import RegisterDialog from "../Dialog/RegisterDialog";
import InfoDialog from "../Dialog/InfoDialog";
import axios from "axios";

const Headbar = () => {
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [isRegisterOpen, setRegisterOpen] = useState(false);
  const [isInfoOpen, setInfoOpen] = useState(false);

  // const getInfo = () => {
  //   axios({
  //     method: 'get',
  //     url: 'http://localhost:5262/api/User/UserList',
  //   })
  //   .then(res => {
  //     console.log(res)
  //     let acc = localStorage.getItem('acc')
  //     for(let i = 0; i <= res.data.result.length; i++){
  //       if(res.data.result[i].account == acc){
  //         let account = res.data.result[i].account
  //         let name = res.data.result[i].name
  //         let password = res.data.result[i].password
  //         let phone = res.data.result[i].phone
  //         let address = res.data.result[i].address
  //         let edu = res.data.result[i].edu
  //         let sex = res.data.result[i].sex
  //         let birth = res.data.result[i].birth

  //         const userInfo = {
  //           account,
  //           name,
  //           password,
  //           phone,
  //           address,
  //           edu,
  //           sex,
  //           birth,
  //         }
  //         localStorage.setItem('userInfo', userInfo);
  //         console.log(userInfo)
  //       }
  //     }
  //   }).catch(err => {
  //     console.log(err)
  //   })
  // }


  return (
    <>
      <header>
        <Link to="/" id="logo">
          <img src="src/images/logo.png" alt="logo" />
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
                <a href="#">補助</a> {/* 還沒定義路徑 */}
              </li>
              <li>
                <a href="#">證照</a> {/* 還沒定義路徑 */}
              </li>
            </ul>
          </li>
          <li>
            <a href="#">職涯診斷測驗</a> {/* 還沒定義路徑 */}
            <ul>
              <li>
                <a href="#">農業</a>
              </li>
              <li>
                <a href="#">工業</a>
              </li>
              <li>
                <a href="#">商業</a>
              </li>
            </ul>
          </li>
        </ul>

        {/* 開啟個人資訊彈窗 */}
        <a href="#" id="userinfo" onClick={() => setInfoOpen(true)}>
          <img
            src="src/images/avatar.png"
            alt="avatar"
            width="40"
            height="40"
          />
        </a>

        {/* 開啟登入介面彈窗 */}
        <a
          href="#"
          className="login"
          id="login"
          onClick={() => setLoginOpen(true)}
        >
          登入
        </a>
      </header>

      {/* 登入&註冊介面切換 */}
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

      <InfoDialog isOpen={isInfoOpen} onClose={() => setInfoOpen(false)}/>
    </>
  );
};

export default Headbar;
