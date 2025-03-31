import { useParams } from "react-router-dom";
import BackButton from "../../components/basic-components/BackButton";
import { use, useEffect, useState } from "react";
import { apiFetch } from "../../hooks/APIFetch";

export default function UserDetails() {
  const { id } = useParams();
  const [pageUser, setPageUser] = useState([]);
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
          <h1>User Details Page Under Construction</h1>
          <p>
            {pageUser.first_name} {pageUser.last_name}
          </p>
          <PageHeader title={"Manager Details"} />
          <div className="row align-items-center mt-4 mb-5">
            <ProfileIcon user={user} size="large" />
            <div className="col-6">
              <h2 className="fs-2 text-nowrap">
                {user.first_name} {user.last_name}
              </h2>
              <p className="m-0">{user.email}</p>
              <p>{user.department}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
