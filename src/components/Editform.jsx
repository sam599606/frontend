/* eslint-disable react/prop-types */
// 引入 React 的 useState Hook
import { useState } from "react";

// EditForm 元件定義
function EditForm({ todo, editTodo }) {
  // 定義狀態 content，初始值為待辦事項的內容
  const [content, setContent] = useState(todo.content);

  // 表單提交處理函式
  const handleSubmit = (e) => {
    e.preventDefault(); // 防止表單默認提交行為
    editTodo(todo.id, content); // 呼叫 editTodo 函式，編輯待辦事項
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
      <button type="submit">完成</button> {/* 提交按鈕 */}
    </form>
  );
}

// 匯出 EditForm 元件
export default EditForm;
