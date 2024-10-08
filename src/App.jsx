import React, { useState } from "react";
import "./App.css";
import Footer from "./components/footer/footer";
import Forcast from "./components/Forcast/Forcast";
import Headbar from "./components/Headbar/Headbar";
import Index from "./components/index";
import Dummie from "./components/Dummie/Dummie";

function App() {
  const [currentPage, setCurrentPage] = useState("index");

  const renderPage = () => {
    switch (currentPage) {
      case "index":
        return <Index />;
      case "forcast":
        return <Forcast />;
      case "dummie":
        return <Dummie />;
      default:
        return <Index />;
    }
  };

  return (
    <>
      <Headbar setCurrentPage={setCurrentPage} />
      <main>{renderPage()}</main>
      <Footer />
    </>
  );
}

export default App;
