import BackButton from "../../components/basic-components/BackButton";
import PageHeader from "../../components/basic-components/PageHeader";
import InnerNavigation from "../../components/basic-components/InnerNavigation";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

export default function UserDetailsTraining() {
  return (
    <>
      <BackButton />
      <PageHeader title="Trainings" />
      <InnerNavigation>
        <NavLink to="/">Enrolled</NavLink>
        <NavLink to="/">Not Enrolled</NavLink>
        <NavLink to="/">Complete</NavLink>
        <NavLink to="/">Overdue</NavLink>
      </InnerNavigation>
    </>
  );
}
