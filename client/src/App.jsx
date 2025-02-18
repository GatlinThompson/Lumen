import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Layout";

//styling import
import "./App.css";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            {/*Add Other Pages in here*/}
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
