import { useParams } from "react-router-dom";
import BackButton from "../../components/basic-components/BackButton";
import { useEffect, useState } from "react";
import { apiFetch } from "../../hooks/APIFetch";
import ProfileIcon from "../../components/basic-components/ProfileIcon.jsx";
import PageHeader from "../../components/basic-components/PageHeader.jsx";
import UserDetailsAssignedTrainings from "../../components/trainings/UserDetailsAssignedTrainings.jsx";

export default function UserDetails() {
  const { id } = useParams();
  const [pageUser, setPageUser] = useState(null);
  const [loaded, setLoaded] = useState(false);

  const getPageUser = async () => {
    const { result, error } = await apiFetch(`/api/user/${id}`, "GET");

    if (!error) {
      console.log(result.user);
      setPageUser(result.user);
      setTimeout(() => {
        setLoaded(true);
      }, 100);
    }
  };

  useEffect(() => {
    if (id) {
      getPageUser();
    }
  }, [id]);

  return (
    <>
      {pageUser && (
        <div className={`${loaded ? "loaded loading" : "loading"}`}>
          <BackButton />
          <PageHeader title={`${pageUser.role.name} Details`} />
          <div className="row align-items-center mt-4">
            <ProfileIcon user={pageUser} size="medium" />
            <div className="col-6">
              <h2 className="fs-2 text-nowrap">
                {pageUser.first_name} {pageUser.last_name}
              </h2>
              <p className="m-0">{pageUser.email}</p>
              <p>Department: {pageUser.department.name}</p>
            </div>
          </div>
          <UserDetailsAssignedTrainings/>
        </div>
      )}
    </>
  );
}
