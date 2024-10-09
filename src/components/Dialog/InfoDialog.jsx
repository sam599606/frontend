import React from "react";
import "./Dialog.css";
import axios from "axios";


const InfoDialog = ({ isOpen, onClose }) => {
  if (!isOpen) return null; // 如果未打開，則不渲染彈出視窗

    axios({
      method: 'get',
      url: 'http://localhost:5262/api/User/UserList',
    })
    .then(res => {
      console.log(res)
      let acc = localStorage.getItem('acc')
      for(let i = 0; i <= res.data.result.length; i++){
        if(res.data.result[i].account == acc){
          let account = res.data.result[i].account
          let name = res.data.result[i].name
          let password = res.data.result[i].password
          let phone = res.data.result[i].phone
          let address = res.data.result[i].address
          let edu = res.data.result[i].edu
          let sex = res.data.result[i].sex
          let birth = res.data.result[i].birth

          document.getElementById('name').value = name
          document.getElementById('account').value = account
          document.getElementById('password').value = password
          document.getElementById('phone').value = phone
          document.getElementById('address').value = address
          document.getElementById('edu').value = edu
          document.getElementById('sex').value = sex
          document.getElementById('birth').value = birth.substr(0, 10)
        }
      }
    }).catch(err => {
      console.log(err)
    })

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
            <div className="block">
              <input type="text" placeholder="" id="name" required readOnly />
              <label>姓名</label>
            </div>
            <div className="block">
              <select defaultValue={'default'} id="sex">
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
              <input type="date" placeholder="" id="birth" required readOnly />
              <label>生日</label>
            </div>
            <div className="block">
              <input type="email" placeholder="" id="account" required readOnly />
              <label>帳號</label>
            </div>
          </div>
          <div className="columns">
            <div className="block">
              <input type="tel" placeholder="" id="phone" required />
              <label>電話</label>
            </div>
            <div className="block">
              <select defaultValue={'default'} id="edu">
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
              <input type="text" placeholder="" id="address" required />
              <label>地址</label>
            </div>
            <div className="block">
              <input type="password" placeholder="" id="password" required />
              <label>密碼</label>
            </div>
          </div>
        </div>
        <div className="columns">
          <button type="button" onClick={onClose} className="cancel-button">
            取消
          </button>
          <button type="submit" className="submit-button">
            儲存
          </button>
        </div>
      </dialog>
    </>
  );
};

export default InfoDialog;
