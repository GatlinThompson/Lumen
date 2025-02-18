import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <p>Start of Lumen</p>
      <Outlet />
    </>
  );
}
