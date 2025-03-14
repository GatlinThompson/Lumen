import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";
import ScrollToTop from "./hooks/ScrollToTop";
import { useCookies } from "react-cookie";
import Dashboard from "./pages/Dashboard";
import { useEffect, useState, createContext } from "react";
import { apiFetch } from "./hooks/APIFetch";
import Logout from "./components/Logout";

export const AppContext = createContext();

function App() {
  //set user as null
  const [user, setUser] = useState(null);

  // set logged in status as false
  const [loggedIn, setLoggedIn] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const [toStart, setToStart] = useState(false);

  //verify user
  const verifyUser = async () => {
    const { result, error, loading } = await apiFetch("api/user/verify", "GET");

    if (!error) {
      //set logged in to true
      setLoggedIn(true);
      setUser(result.user);
    } else {
      // set to start if user isnt valid
      setToStart(true);
    }
  };

  //get user from token cookie
  useEffect(() => {
    if (cookies.token !== undefined) {
      //verify user with token
      verifyUser();
    } else {
      //cookie not found
      //setToStart(true);
    }
  }, []);

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        loggedIn,
        setLoggedIn,
        cookies,
        setCookie,
        removeCookie,
        toStart,
        setToStart,
      }}
    >
      <Router>
        <ScrollToTop>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="/login" element={<LoginPage />} />
              <Route path="logout" element={<Logout />} />
              <Route path="/registration" element={<RegistrationPage />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>
          </Routes>
        </ScrollToTop>
      </Router>
    </AppContext.Provider>
  );
}

export default App;
