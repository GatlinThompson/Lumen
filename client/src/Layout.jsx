import { Outlet, useNavigate } from "react-router-dom";
import "./index.css";

/* this is the landing page */
export default function Layout() {
  const navigate = useNavigate();
  return (
    <>
      <h1>lumen</h1>
      <p className="landingQuote">
        Your company's guiding light <span> to efficient team compliance</span>
      </p>
      <button
        type="button"
        onClick={() => navigate("/register")}
        class="btn btn-outline-primary"
      >
        Get Started
      </button>
      <footer></footer>
      <Outlet />
    </>
  );
}
