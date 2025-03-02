import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Footer from "./components/Footer";
import LandingPage from "./pages/LandingPage";

export default function Layout() {
  const location = useLocation();

  return (
    <>
      <main className="container">
        {/*Swap Components based on url location*/}
        {location.pathname === "/" ? <LandingPage /> : <Outlet />}
      </main>
      <Footer />
    </>
  );
}
