import Main from "./Pages/Main";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Admin from "./Pages/Admin";

function App() {
  const dev = true;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/Play" element={<Main />} />
        <Route path="/Admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
