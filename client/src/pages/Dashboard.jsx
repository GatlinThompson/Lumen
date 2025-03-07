import { useContext } from "react";
import { AppContext } from "../App.jsx";
import Button from "../components/basic-components/Button.jsx";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  let { loggedIn, user } = useContext(AppContext);

  return (
    <>
      {user ? (
        <p>
          Hello in Dashboard, {user.first_name} {user.last_name}
        </p>
      ) : null}
    </>
  );
}
