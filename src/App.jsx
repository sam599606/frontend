import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // 引入 Router 組件
import "./App.css";
import Footer from "./components/footer/footer";
import Forcast from "./components/Forcast/Forcast";
import Headbar from "./components/Headbar/Headbar";
import Index from "./components/index";
import Dummie from "./components/Dummie/Dummie";
import OutOfTheWorld from "./components/OutOfTheWorld/OutOfTheWorld";
import Dummie_Class from "./components/Dummie/Dummie_Class";

function App() {
  return (
    <Router>
      <Headbar />{" "}
      {/* 導航欄可以放在 Router 外部，這樣它會在所有頁面上保持一致 */}
      <main>
        <Routes>
          <Route path="/" element={<Index />} /> {/* 定義根路徑 */}
          <Route path="/forcast" element={<Forcast />} /> {/* 預測頁面 */}
          <Route path="/dummie" element={<Dummie />} /> {/* Dummie 頁面 */}
          <Route path="/dummie/class" element={<Dummie_Class />} />{" "}
          <Route path="*" element={<OutOfTheWorld />} />{" "}
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
