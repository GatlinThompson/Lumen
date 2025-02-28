import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import LoginUser from "./components/login";

//styling import
import "./App.css";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}></Route>
          <Route path="/login" element={<LoginUser />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
