import "./App.css";
import Favo from "./pages/Favo/Favo";
import Home from "./pages/Home/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favo/" element={<Favo />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
