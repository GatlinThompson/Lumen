import { useNavigate, useParams } from "react-router-dom";
import BackButton from "../../components/basic-components/BackButton";
import { useContext, useEffect, useState } from "react";
import { apiFetch } from "../../hooks/APIFetch";
import ProfileIcon from "../../components/basic-components/ProfileIcon.jsx";
import PageHeader from "../../components/basic-components/PageHeader.jsx";
import UserDetailsAssignedTrainings from "../../components/trainings/UserDetailsAssignedTrainings.jsx";
import Button from "../../components/basic-components/Button";
import { AppContext } from "../../App.jsx";

export default function UserDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [pageUser, setPageUser] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const { user } = useContext(AppContext);

  const getPageUser = async () => {
    const { result, error } = await apiFetch(`/api/user/${id}`, "GET");

    if (!error) {
      setPageUser(result.user);
      setTimeout(() => {
        setLoaded(true);
      }, 100);
    } else {
      navigate("/errorapi");
    }
  };

  const deleteUser = async () => {
    const { result, error } = await apiFetch(
      `/api/user/${id}/delete`,
      "DELETE"
    );

    if (!error) {
      navigate("/users");
    }
  };

  useEffect(() => {
    if (id) {
      getPageUser();
    }
  }, [id]);

  const role = pageUser
    ? pageUser.role.name[0].toUpperCase() + pageUser.role.name.slice(1)
    : null;

  return (
    <>
      {pageUser && (
        <div className={`${loaded ? "loaded loading" : "loading"} max-1080`}>
          <BackButton to={`/users/managers`} />
          <PageHeader title={`${role} Details`} />
          {user && user.role === "admin" && (
            <>
              <Button
                variant="black"
                extraClasses="mt-4"
                onClick={() => {
                  navigate(`/users/${pageUser._id}/edit`);
                }}
              >
                Edit User
              </Button>
              <Button variant="delete" extraClasses="mt-4" onClick={deleteUser}>
                Delete User
              </Button>
            </>
          )}
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
          <UserDetailsAssignedTrainings userID={id} />
        </div>
      )}
    </>
  );
}
