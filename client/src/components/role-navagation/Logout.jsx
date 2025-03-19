import React from "react";
import { useContext } from "react";
import { AppContext } from "../../App.jsx";

export default function Logout() {
  let { removeCookie, setToStart, setLoggedIn } = useContext(AppContext);
  removeCookie("token");
  setToStart(false);
  setLoggedIn(false);
  document.location = "/";
  return <></>;
}
