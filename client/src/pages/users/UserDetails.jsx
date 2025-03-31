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
        </div>
      )}
    </>
  );
}
