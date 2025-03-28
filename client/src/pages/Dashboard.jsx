import { useContext } from "react";
import { AppContext } from "../App.jsx";
import Button from "../components/basic-components/Button.jsx";
import { useNavigate } from "react-router-dom";
import ButtonGroup from "../components/basic-components/ButtonGroup.jsx";
import IconButtons from "../components/admin-dashboard/IconButtons.jsx";
import UsersOverview from "../components/admin-dashboard/UsersOverview.jsx";
import TrainingPrograms from "../components/admin-dashboard/TrainingPrograms.jsx";
import TrainingInsights from "../components/admin-dashboard/TrainingInsights.jsx";

export default function Dashboard() {
  const navigate = useNavigate();
  let { loggedIn, user } = useContext(AppContext);

  return (
    <>
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
          <UsersOverview />
          <IconButtons />
          <TrainingPrograms />
          <TrainingInsights />
        </div>
      ) : null}
    </>
  );
}
