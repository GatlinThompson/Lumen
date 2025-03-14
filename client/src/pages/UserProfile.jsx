import { useContext, useEffect } from "react";
import BackButton from "../components/basic-components/BackButton";
import PageHeader from "../components/basic-components/PageHeader";
import { AppContext } from "../App";

export default function UserProfile() {
  const { user } = useContext(AppContext);

  useEffect(() => {
    if (user) {
      console.log(user);
    }
  }, []);
  return (
    <>
      <BackButton />
      <PageHeader title={"Profile"} />
      <p>{user.first_name}</p>
      <form></form>
    </>
  );
}
