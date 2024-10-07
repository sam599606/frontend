import React, { useState } from "react";
import "./App.css";
import Footer from "./components/footer/footer";
import Forcast from "./components/Forcast/Forcast";
import Headbar from "./components/Headbar/Headbar";
import Index from "./components/index";

function App() {
  const [currentPage, setCurrentPage] = useState("index"); // 預設頁面為 Index

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <Headbar onPageChange={handlePageChange} /> {/* 傳遞頁面切換回調 */}
      <main>
        {currentPage === "index" && <Index />} {/* 預設顯示 Index */}
        {currentPage === "forcast" && <Forcast />} {/* 切換到 Forcast 頁面 */}
      </main>
      <Footer />
    </>
  );
}

export default App;
