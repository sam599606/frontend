import axios from "axios";
import "./App.css";
import Footer from "./components/footer/footer";
import Headbar from "./components/Headbar/Headbar";
import Index from "./components/index";

function App() {
  return (
    <>
      <Headbar />
      <main>
        <Index />
      </main>
      <Footer />
    </>
  );
}

export default App;
