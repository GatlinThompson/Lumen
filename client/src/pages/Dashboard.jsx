import { useContext } from "react";
import { AppContext } from "../App.jsx";
import Button from "../components/basic-components/Button.jsx";
import { useNavigate } from "react-router-dom";
import ButtonGroup from "../components/basic-components/ButtonGroup.jsx";
import EmployeesList from "../components/employees/EmployeesList.jsx";

export default function Dashboard() {
  const navigate = useNavigate();
  let { loggedIn, user } = useContext(AppContext);

  return (
    <>
      {user ? (
        <p>
          Hello in Dashboard, {user.first_name} {user.last_name}
          <ButtonGroup
            buttons={[
              { text: "Home", link: "/trainings" },
              { text: "About", link: "/trainings" },
              { text: "Contact", link: "/trainings" },
            ]}
          />
        </p>
      ) : null}
    </>
  );
}
