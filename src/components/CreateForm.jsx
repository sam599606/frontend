/* eslint-disable react/prop-types */
// 引入 React 的 useState Hook
import { useState } from "react";

// CreateForm 元件定義
function CreateForm({ addTodo }) {
  // 定義狀態 content，初始值為空字串
  const [content, setContent] = useState("");

  // 表單提交處理函式
  const handleSubmit = (e) => {
    e.preventDefault(); // 防止表單默認提交行為
    addTodo(content); // 呼叫 addTodo 函式，新增待辦事項
    setContent(""); // 清空輸入框
  };

  // 返回表單元素
  return (
    <form className="create-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="輸入待辦事項" // 設置輸入框的佔位符
        value={content} // 綁定輸入框的值
        onChange={(e) => {
          setContent(e.target.value); // 更新狀態 content
        }}
      />
      <button type="submit">加入</button> {/* 提交按鈕 */}
    </form>
  );
}

// 匯出 CreateForm 元件
export default CreateForm;
