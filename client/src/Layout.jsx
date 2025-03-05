import { Outlet, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Footer from "./components/Footer";
import LandingPage from "./pages/LandingPage";
import NavBar from "./components/Navbar";
import DesktopHeader from "./components/DesktopHeader";
import { useEffect, useContext } from "react";
import { AppContext } from "./App";

export default function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  let { toStart } = useContext(AppContext);

  //Go to landing page if user has begun
  useEffect(() => {
    if (toStart) {
      navigate("/");
    }
  }, [toStart]);

  // pages where a navbar isnt needed
  const noNavbar =
    location.pathname === "/" ||
    location.pathname === "/login" ||
    location.pathname === "/registration";
  return (
    <>
      {noNavbar ? null : <NavBar />}
      {noNavbar ? null : <DesktopHeader />}
      <main className={` ${noNavbar ? "no-nav" : ""}`}>
        {/*Swap Components based on url location*/}
        {location.pathname === "/" ? <LandingPage /> : <Outlet />}
      </main>
      <Footer noNavbar={noNavbar} />
    </>
  );
}
