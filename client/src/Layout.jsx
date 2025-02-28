import { Outlet, useNavigate } from "react-router-dom";
import "./index.css";
import Button from "./components/Button";
import logo from "./assets/images/lumenlogo_full_light.svg";

/* this is the landing page */
export default function Layout() {
  const navigate = useNavigate();
  return (
    <>
      <img src={logo} alt="Lumen logo" />
      <p className="landingQuote">
        Your company's guiding light <span> to efficient team compliance</span>
      </p>
      <Button variant="black" type="button" onClick={() => navigate("/login")}>
        Get Started
      </Button>
      <footer></footer>
      <Outlet />
    </>
  );
}
