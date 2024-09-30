/* eslint-disable react/prop-types */
// 引入刪除和編輯圖示
import { MdDelete, MdEdit } from "react-icons/md";
// 引入 EditForm 元件
import EditForm from "./Editform";

// Todo 元件定義
function Todo({
  todo, // 傳入的待辦事項
  deleteTodo, // 刪除待辦事項的函式
  toggleCompleted, // 切換待辦事項完成狀態的函式
  toggleIsEditing, // 切換待辦事項編輯狀態的函式
  editTodo, // 編輯待辦事項內容的函式
}) {
  // 如果待辦事項正在編輯，顯示編輯表單
  return todo.isEditing ? (
    <EditForm todo={todo} editTodo={editTodo} />
  ) : (
    // 否則顯示待辦事項
    <div className={`todo ${todo.isCompleted ? `completed` : ``}`}>
      {/* 點擊待辦事項內容切換完成狀態 */}
      <p
        onClick={() => {
          toggleCompleted(todo.id);
        }}
      >
        {todo.content}
      </p>
      <div>
        {/* 點擊編輯圖示切換編輯狀態 */}
        <MdEdit
          onClick={() => {
            toggleIsEditing(todo.id);
          }}
          style={{ cursor: "pointer" }}
        />
        {/* 點擊刪除圖示刪除待辦事項 */}
        <MdDelete
          onClick={() => {
            deleteTodo(todo.id);
          }}
          style={{ cursor: "pointer", marginLeft: "5px" }}
        />
      </div>
    </div>
  );
}

// 匯出 Todo 元件
export default Todo;
