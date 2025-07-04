import { useContext, useEffect, useState } from "react";
import { AppContext } from "../App.jsx";
import { useNavigate } from "react-router-dom";
import AdminDashboard from "../components/admin-dashboard/AdminDashBoard.jsx";
import ManagerDashboard from "../components/admin-dashboard/ManagerDashboard.jsx";
import TrainerDashboard from "../components/admin-dashboard/TrainerDashBoard.jsx";
import EmployeeDashboard from "../components/admin-dashboard/EmployeeDashboard.jsx";
import PageHeader from "../components/basic-components/PageHeader.jsx";

export default function Dashboard() {
  const navigate = useNavigate();
  const { user } = useContext(AppContext);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoaded(true);
    }, 100);
  }, [user]);

  return (
    <div className={`${loaded ? "loaded loading" : "loading"} max-1024`}>
      {user ? (
        <div className="pt-4">
          <PageHeader title={`Welcome back, ${user.first_name}`} />
          {user && user.role == "admin" && <AdminDashboard />}
          {user && user.role == "manager" && <ManagerDashboard />}
          {user && user.role == "trainer" && <TrainerDashboard />}
          {user && user.role == "employee" && <EmployeeDashboard />}
        </div>
      ) : null}
    </div>
  );
}
