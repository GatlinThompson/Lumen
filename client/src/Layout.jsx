import { Outlet, useNavigate } from "react-router-dom";

import { useLocation } from "react-router-dom";
import Footer from "./components/Footer";
import LandingPage from "./pages/LandingPage";

export default function Layout() {
  const location = useLocation();

  return (
    <>
      <main className="container">
        {location.pathname === "/" ? <LandingPage /> : <Outlet />}
      </main>
      <Footer />
    </>
  );
}
