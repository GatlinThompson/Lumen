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
import TrainingForm from "./pages/training/TrainingForm";
import TrainingPage from "./pages/training/TrainingPage";
import TrainingSuccess from "./pages/training/TrainingSuccess";
import TrainingFormEdit from "./pages/training/TrainingFormEdit";
import UserCreationPage from "./pages/users/UserCreation.page";
import UserSuccess from "./pages/users/UserSuccess";
import ErrorAPiPage from "./pages/ErrorAPiPage";
import ErrorPage from "./pages/ErrorPage";
import UserProfile from "./pages/profile/UserProfile";
import TrainingDetails from "./pages/training/TrainingDetails";
import ManagerEmployeeAssign from "./pages/training/ManagerEmployeeAssign";
import ManagerEmployeeAssignSuccess from "./pages/training/ManagerEmployeeAssignSuccess";
import UsersPage from "./pages/users/UsersPage";
import UsersTable from "./pages/users/UsersTable";
import UserDetails from "./pages/users/UserDetails";
import ManagerEmployeesAssignPage from "./pages/training/ManagerEmployeesAssignPage";
import NotificationPage from "./pages/NotificationsPage";
import TrainerEmployeeComplete from "./pages/training/TrainingEmployeeComplete";
import TrainerEmployeeCompleteSuccess from "./pages/training/TrainerEmployeeCompleteSuccess";
import EmployeeTrainingConfirm from "./pages/training/EmployeeTrainingConfim";
import EmployeeTrainingConfirmSuccess from "./pages/training/EmployeeTrainingConfimSuccess";
import EditUser from "./pages/users/EditUser";

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
  const [newAssignedEmployees, setNewAssignedEmployees] = useState([]);
  const [newSession, setNewSession] = useState([]);

  //verify user
  const verifyUser = async () => {
    const { result, error } = await apiFetch("/api/user/verify", "GET");

    if (!error) {
      //set logged in to true
      setLoggedIn(true);
      setToStart(false);
      setUser(result.user);
    } else {
      // set to start if user isnt valid
      setToStart(true);
    }
  };

  //get user from token cookie
  useEffect(() => {
    //get user from locale storage
    const localUser = localStorage.getItem("user");

    // check if user exist
    if (localUser) {
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
        newAssignedEmployees,
        setNewAssignedEmployees,
        newSession,
        setNewSession,
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
              {/*Training Details Routes */}
              <Route path="/trainings/:p_id" element={<TrainingDetails />} />
              <Route
                path="/trainings/:p_id/assign"
                element={<ManagerEmployeeAssign />}
              />
              <Route
                path="/trainings/:p_id/assigned"
                element={<ManagerEmployeesAssignPage />}
              />
              <Route
                path="/trainings/:p_id/assign/success"
                element={<ManagerEmployeeAssignSuccess />}
              />
              <Route
                path="/training/:p_id/edit"
                element={<TrainingFormEdit />}
              />
              <Route
                path="/trainings/:p_id/complete"
                element={<TrainerEmployeeComplete />}
              />
              <Route
                path="/trainings/:p_id/complete/success"
                element={<TrainerEmployeeCompleteSuccess />}
              />
              <Route
                path="/trainings/:p_id/confirmation"
                element={<EmployeeTrainingConfirm />}
              />
              <Route
                path="/trainings/:p_id/confirmation/success"
                element={<EmployeeTrainingConfirmSuccess />}
              />
              {/*Users Routes */}
              <Route path="/users" element={<UsersPage />}>
                <Route path="/users/managers" element={<UsersTable />} />
                <Route path="/users/trainers" element={<UsersTable />} />
                <Route path="/users/employees" element={<UsersTable />} />
              </Route>

              {/*User Routes*/}
              <Route path="user/:id" element={<UserDetails />} />
              <Route path="/users/create" element={<UserCreationPage />} />
              <Route path="/users/create/success" element={<UserSuccess />} />
              {/*Profile Route */}
              <Route path="/profile" element={<UserProfile />} />
              {/*Edit User Route */}
              <Route path="/users/:id/edit" element={<EditUser />} />
              {/*Notification Route */}
              <Route path="/notifications" element={<NotificationPage />} />
            </Route>

            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </ScrollToTop>
      </Router>
    </AppContext.Provider>
  );
}

export default App;
