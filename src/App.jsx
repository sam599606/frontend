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
import TestIntro from "./components/Test/TestIntro";
import TestTesting from "./components/Test/TestTesting";
import TestHistory from "./components/Test/TestHistory";
import TestResult from "./components/Test/TestResult";


function App() {
  return (
    <Router>
      <Headbar />{" "}
      {/* 導航欄可以放在 Router 外部，這樣它會在所有頁面上保持一致 */}
      <main>
        <p className="testsign">測試站</p>
        <Routes>
          <Route path="/" element={<Index />} /> {/* 定義根路徑 */}
          <Route path="/forcast" element={<Forcast />} /> {/* 預測頁面 */}
          <Route path="/dummie" element={<Dummie />} /> {/* Dummie 頁面 */}
          <Route path="/dummie/class" element={<Dummie_Class />} />
          <Route path="/test" element={<TestIntro />} />
          {/* 配置測驗首頁的路由 */}
          <Route path="/test-testing" element={<TestTesting />} />
          <Route path="/test-history" element={<TestHistory />} />
          <Route path="/test-result" element={<TestResult />} />
          {/* 測驗的進行頁面 */}
          <Route path="0" element={<OutOfTheWorld />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
