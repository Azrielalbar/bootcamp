
import Navbar from "./navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import YoutubeSearch from "./02.APIYT";
import Home from "./home";
import About from "./about";
import MyForm from "./myform";



function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/youtube" element={<YoutubeSearch />} />
      </Routes>
    </Router>
  );
}

export default App;