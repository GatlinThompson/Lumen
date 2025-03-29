import { useContext, useEffect, useState } from "react";
import { AppContext } from "../App.jsx";
import Button from "../components/basic-components/Button.jsx";
import { useNavigate } from "react-router-dom";
import ButtonGroup from "../components/basic-components/ButtonGroup.jsx";
import IconButtons from "../components/admin-dashboard/IconButtons.jsx";
import UsersOverview from "../components/admin-dashboard/UsersOverview.jsx";
import TrainingPrograms from "../components/admin-dashboard/TrainingPrograms.jsx";
import TrainingInsights from "../components/admin-dashboard/TrainingInsights.jsx";
import AdminDashboard from "../components/admin-dashboard/AdminDashBoard.jsx";

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
    <div className={`${loaded ? "loaded loading" : "loading"}`}>
      {user ? (
        <div>
          <p>
            Hello in Dashboard, {user.first_name} {user.last_name}
          </p>
          <ButtonGroup
            buttons={[
              {
                text: "Managers",
                link: "/trainings",
                extraClasses: "active-btn",
              },
              { text: "Trainers", link: "/about", extraClasses: "" },
              { text: "Employees", link: "/contact", extraClasses: "" },
            ]}
            initialActiveIndex={1} // This sets the "About" button as initially active
          />
          {user && user.role == "admin" && <AdminDashboard />}
        </div>
      ) : null}
    </div>
  );
}
