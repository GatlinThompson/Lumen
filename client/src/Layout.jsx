import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Footer from "./components/Footer";
import LandingPage from "./pages/LandingPage";
import NavBar from "./components/Navbar";
import DesktopHeader from "./components/DesktopHeader";

export default function Layout() {
  const location = useLocation();

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
