import React, { useEffect } from "react";
import { useContext } from "react";
import { AppContext } from "../../App.jsx";
import { apiFetch } from "../../hooks/APIFetch.jsx";

export default function Logout() {
  let { removeCookie, setToStart, setLoggedIn } = useContext(AppContext);

  useEffect(() => {
    const logout = async () => {
      await apiFetch("/api/user/logout", "POST");
    };

    logout();
  }, []);
  removeCookie("token");
  localStorage.removeItem("token");
  window.location.href = "/login";
  return <></>;
}
