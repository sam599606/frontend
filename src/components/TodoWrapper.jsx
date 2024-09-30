import { useState } from "react"; // 引入 React 的 useState Hook
import CreateForm from "./CreateForm"; // 引入 CreateForm 元件
import Todo from "./Todo"; // 引入 Todo 元件

// TodoWrapper 元件定義
function TodoWrapper() {
  // 初始化待辦事項的狀態，包含兩個初始項目
  const [todos, setTodos] = useState([
    {
      content: "打掃廁所",
      id: Math.random(), // 生成唯一識別碼
      isCompleted: false,
      isEditing: false,
    },
    {
      content: "寫作業",
      id: Math.random(), // 生成唯一識別碼
      isCompleted: false,
      isEditing: false,
    },
  ]);

  // 新增待辦事項函式
  const addTodo = (content) => {
    setTodos([...todos, { content, id: Math.random() }]); // 更新待辦事項狀態
  };

  // 刪除待辦事項函式
  const deleteTodo = (id) => {
    setTodos(
      todos.filter((todo) => {
        return todo.id !== id; // 過濾掉要刪除的項目
      })
    );
  };

  // 切換待辦事項完成狀態函式
  const toggleCompleted = (id) => {
    setTodos(
      todos.map((todo) => {
        return todo.id === id
          ? { ...todo, isCompleted: !todo.isCompleted } // 切換完成狀態
          : todo;
      })
    );
  };

  // 切換待辦事項編輯狀態函式
  const toggleIsEditing = (id) => {
    setTodos(
      todos.map((todo) => {
        return todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo; // 切換編輯狀態
      })
    );
  };

  // 編輯待辦事項內容函式
  const editTodo = (id, newContent) => {
    setTodos(
      todos.map((todo) => {
        return todo.id === id
          ? { ...todo, content: newContent, isEditing: false } // 更新內容並停止編輯
          : todo;
      })
    );
  };

  // 返回待辦事項列表及相關元件
  return (
    <div className="wrapper">
      <h1>待辦事項</h1>
      {/* 傳遞 addTodo 函式給 CreateForm 元件 */}
      <CreateForm addTodo={addTodo} />
      {/* 遍歷 todos 列表，為每個待辦事項渲染 Todo 元件 */}
      {todos.map((todo) => {
        return (
          <Todo
            toggleCompleted={toggleCompleted} // 傳遞 toggleCompleted 函式
            toggleIsEditing={toggleIsEditing} // 傳遞 toggleIsEditing 函式
            editTodo={editTodo} // 傳遞 editTodo 函式
            todo={todo} // 傳遞待辦事項
            key={todo.id} // 設置唯一 key
            deleteTodo={deleteTodo} // 傳遞 deleteTodo 函式
          />
        );
      })}
    </div>
  );
}

// 匯出 TodoWrapper 元件
export default TodoWrapper;
