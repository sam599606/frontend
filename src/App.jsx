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
import Dummie_Subsidy from "./components/Dummie/Dummie_subsidy";
import Dummie_Certificate from "./components/Dummie/Dummie_Certificate";
import AdminTest from "./components/Admin_View/Admin-Test/Admin-Test";
import Admin_Member from "./components/Admin_View/Admin_Member/Admin_Member";
import AdminActivity from "./components/Admin_View/Admin_Activity/Admin_Activity";

function App() {
  return (
    <Router>
      <Headbar />
      {/* 導航欄可以放在 Router 外部，這樣它會在所有頁面上保持一致 */}
      <main>
        <Routes>
          <Route path="/" element={<Index />} /> {/* 定義根路徑 */}
          <Route path="/forcast" element={<Forcast />} /> {/* 預測頁面 */}
          <Route path="/dummie" element={<Dummie />} /> {/* Dummie 頁面 */}
          <Route path="/dummie/class" element={<Dummie_Class />} />
          <Route path="/dummie/Subsidy" element={<Dummie_Subsidy />} />
          <Route path="/dummie/Certificate" element={<Dummie_Certificate />} />
          <Route path="/test" element={<TestIntro />} />
          <Route path="/test-testing" element={<TestTesting />} />
          <Route path="/test-history" element={<TestHistory />} />
          <Route path="/test-result" element={<TestResult />} />
          <Route path="/admin_view/admin-test" element={<AdminTest />} />
          <Route path="/admin_view/admin-member" element={<Admin_Member />} />
          <Route
            path="/admin_view/admin-activity"
            element={<AdminActivity />}
          />
          <Route path="0" element={<OutOfTheWorld />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
