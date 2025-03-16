import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";
import ScrollToTop from "./hooks/ScrollToTop";
import { useCookies } from "react-cookie";
import Dashboard from "./pages/Dashboard";
import { useEffect, useState, createContext } from "react";
import { apiFetch } from "./hooks/APIFetch";
import Logout from "./components/role-navagation/Logout";
import TrainingForm from "./pages/TrainingForm";
import TrainingPage from "./pages/TrainingPage";
import TrainingSuccess from "./pages/TrainingSuccess";
import TrainingFormEdit from "./pages/TrainingFormEdit";
import UserCreationPage from "./pages/UserCreation.page";
import UserSuccess from "./pages/UserSuccess";
import ErrorAPiPage from "./pages/ErrorAPiPage";
import ErrorPage from "./pages/ErrorPage";
import UserProfile from "./pages/UserProfile";
import TrainingDetails from "./pages/TrainingDetails";

export const AppContext = createContext();

function App() {
  //set user as null
  const [user, setUser] = useState(null);

  // set logged in status as false
  const [loggedIn, setLoggedIn] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const [toStart, setToStart] = useState(false);
  const [formError, setFormError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

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
        formError,
        setFormError,
        errorMessage,
        setErrorMessage,
      }}
    >
      <Router>
        <ScrollToTop>
          <Routes>
            <Route path="/" element={<Layout />}>
              {/*Authentication Routes */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="logout" element={<Logout />} />
              <Route path="/registration" element={<RegistrationPage />} />
              {/*Commonplace Route */}
              <Route path="/errorapi" element={<ErrorAPiPage />} />
              <Route path="/dashboard" element={<Dashboard />} />
              {/*Training Routes*/}
              <Route path="/trainings" element={<TrainingPage />} />
              <Route path="/training/new" element={<TrainingForm />} />
              <Route
                path="/training/:method/:p_id/success"
                element={<TrainingSuccess />}
              />
              <Route path="/training/:p_id" element={<TrainingDetails />} />
              <Route
                path="/training/:p_id/edit"
                element={<TrainingFormEdit />}
              />
              {/*User Routes*/}
              <Route path="/users/create" element={<UserCreationPage />} />
              <Route path="/users/create/success" element={<UserSuccess />} />
              {/*Profile Route */}
              <Route path="/profile" element={<UserProfile />} />
            </Route>

            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </ScrollToTop>
      </Router>
    </AppContext.Provider>
  );
}

export default App;
