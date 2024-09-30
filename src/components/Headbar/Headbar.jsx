import React from "react";
import "./Headbar.css";

const Headbar = () => {
  return (
    <div>
      <header>
        <a href="index.html" id="logo">
          <img src="src\images\logo.png" alt="logo" />
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
        <a href="" id="userinfo">
          <img src="src\images\avatar.png" alt="" width="40" height="40" />
        </a>
        <a href="" class="login" id="login">
          登入
        </a>
      </header>
      <dialog id="loginpage">
        <a href="" id="close">
          X
        </a>
        <div id="switch">
          <div>登入</div>
          <a href="" id="register">
            <div>註冊</div>
          </a>
        </div>
        <div id="input">
          <div id="acc">
            <input type="email" placeholder="" required />
            <label>帳號</label>
          </div>
          <div id="pwd">
            <input type="password" placeholder="" required />
            <label>密碼</label>
          </div>
        </div>
        <button id="submit">登入</button>
      </dialog>
      <dialog id="registerpage">
        <a href="" id="close">
          X
        </a>
        <div id="switch">
          <a href="" id="login">
            <div>登入</div>
          </a>
          <div>註冊</div>
        </div>
        <div id="input">
          <div class="columns">
            <div id="name">
              <input type="text" placeholder="" required />
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
          <div class="columns">
            <div id="birth">
              <input type="date" placeholder="" required />
              <label>生日</label>
            </div>
            <div id="acc">
              <input type="email" placeholder="" required />
              <label>帳號</label>
            </div>
          </div>
          <div class="columns">
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
          <div class="columns">
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
      <dialog id="infopage">
        <div id="info">個人資料</div>
        <div id="input">
          <div class="columns">
            <div id="name">
              <input type="text" placeholder="" required readonly />
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
          <div class="columns">
            <div id="birth">
              <input type="date" placeholder="" required readonly />
              <label>生日</label>
            </div>
            <div id="acc">
              <input type="email" placeholder="" required readonly />
              <label>帳號</label>
            </div>
          </div>
          <div class="columns">
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
          <div class="columns">
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
        <div class="columns">
          <input type="reset" value="取消" />
          <input type="submit" value="儲存" />
        </div>
      </dialog>
      <main></main>
      <footer>this is footer</footer>
    </div>
  );
};

export default Headbar;
