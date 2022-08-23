import "./App.css";
import Home from "./component/home/home";
import { Routes, Route } from "react-router-dom";
import Search from "./component/search/search";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path={`/search/:searchquery`} element={<Search />} />
      </Routes>
    </div>
  );
}

export default App;
