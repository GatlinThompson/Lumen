import { Outlet, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Footer from "./components/layout/Footer";
import LandingPage from "./pages/LandingPage";
import NavBar from "./components/layout/NavBar";
import DesktopHeader from "./components/layout/DesktopHeader";
import { useEffect, useContext } from "react";
import { AppContext } from "./App";
import NotificationAlert from "./components/NotificationAlert";

export default function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  let { toStart } = useContext(AppContext);

  // pages where a navbar isnt needed
  const noNavbar =
    location.pathname === "/" ||
    location.pathname === "/login" ||
    location.pathname === "/registration";

  //Go to landing page if user has begun
  useEffect(() => {
    if (toStart) {
      if (!noNavbar) {
        navigate("/");
      }
    }
  }, [toStart]);

  return (
    <>
      {noNavbar ? null : <NavBar />}
      {noNavbar ? null : <DesktopHeader />}
      <main className={` ${noNavbar ? "no-nav" : ""}`}>
        {location.pathname === "/" ? <LandingPage /> : <Outlet />}
      </main>
      <Footer noNavbar={noNavbar} />
    </>
  );
}
