import { useContext } from "react";
import { AppContext } from "../App.jsx";
import Button from "../components/basic-components/Button.jsx";
import { useNavigate } from "react-router-dom";
import ButtonGroup from "../components/basic-components/ButtonGroup.jsx";
import IconButtons from "../components/admin-dashboard/IconButtons.jsx";

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
              { text: "Home", link: "/trainings", extraClasses: "active-btn" },
              { text: "About", link: "/about", extraClasses: "" },
              { text: "Contact", link: "/contact", extraClasses: "",},
            ]}
            initialActiveIndex={1} // This sets the "About" button as initially active
          />

          <IconButtons/>
          
        </p>
      ) : null}
    </>
  );
}
