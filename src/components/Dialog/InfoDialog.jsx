import React from "react";
import "./Dialog.css";
import axios from "axios";
import Swal from "sweetalert2"; // 引入 SweetAlert2
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

const InfoDialog = ({ isOpen, onClose }) => {
  if (!isOpen) return null; // 如果未打開，則不渲染彈出視窗
  const navigate = useNavigate();
  const cookies = new Cookies();

  let token = cookies.get("token");
  let account = cookies.get("acc");
  //#region 抓會員資料
  axios({
    method: "post",
    url: "http://localhost:5262/api/User/GetUser",
    data: JSON.stringify({ account }),
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      console.log(res);
      document.getElementById("name").value = res.data.result.name;
      document.getElementById("account").value = res.data.result.account;
      document.getElementById("password").value = res.data.result.password;
      document.getElementById("phone").value = res.data.result.phone;
      document.getElementById("address").value = res.data.result.address;
      document.getElementById("edu").value = res.data.result.edu;
      document.getElementById("sex").value = res.data.result.sex;
      document.getElementById("birth").value = res.data.result.birth.substr(
        0,
        10
      );
    })
    .catch((err) => {
      console.log(err);
    });

  //#region Enter觸發事件
  const keyDown = (event) => {
    if (event.key == "Enter") {
      EditInfo();
    }
  };

  //#region 更改會員資料
  const EditInfo = () => {
    let account = document.getElementById("account").value;
    let name = document.getElementById("name").value;
    let password = document.getElementById("password").value;
    let phone = document.getElementById("phone").value;
    let address = document.getElementById("address").value;
    let edu = document.getElementById("edu").value;
    let sex = document.getElementById("sex").value;
    let birth = document.getElementById("birth").value;

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
        text: "請填寫所有欄位再儲存！",
        confirmButtonColor: "#d5ad8a",
      });
      return; // 終止函數，不進行下一步操作
    }

    axios({
      method: "put",
      url: "http://localhost:5262/api/User/EditUser",
      data: JSON.stringify(memberdata),
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => {
        console.log(res);
        Swal.fire({
          icon: "success",
          title: "儲存成功",
          text: "您的會員資料已修改！",
          confirmButtonColor: "#d5ad8a",
        });
      })
      .catch((err) => {
        console.log(err);
      });
    document.getElementById("close").click();
  };

  //#region 登出
  const logout = () => {
    Swal.fire({
      title: "確定要登出嗎？",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dbc8b6",
      cancelButtonColor: "#d5ad8a",
      confirmButtonText: "是的，登出",
      cancelButtonText: "取消",
    }).then((result) => {
      if (result.isConfirmed) {
        // 清除token並關閉視窗
        localStorage.clear();
        cookies.remove("token");
        cookies.remove("acc");
        navigate("/");
        Swal.fire({
          title: "已成功登出",
          icon: "success",
          confirmButtonText: "確定",
          confirmButtonColor: "#d5ad8a",
        }).then(() => {
          document.getElementById("close").click();
        });
      }
    });
  };

  //#region return
  return (
    <>
      {/* 模態背景層 */}
      <div className="modal-overlay" onClick={onClose} />

      <dialog id="infopage" open>
        <button id="close" onClick={onClose}>
          X
        </button>
        <div id="info">個人資料</div>
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
              <select defaultValue={"default"} id="sex">
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
              <input
                type="date"
                placeholder=""
                id="birth"
                onKeyDown={keyDown}
                required
              />
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
              <select defaultValue={"default"} id="edu">
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
        <div className="columns">
          <button type="button" onClick={onClose} className="cancel-button">
            取消
          </button>
          <button type="submit" className="submit-button" onClick={EditInfo}>
            儲存
          </button>
          <button id="logout" onClick={logout}>
            登出
          </button>
        </div>
      </dialog>
    </>
  );
};

export default InfoDialog;
