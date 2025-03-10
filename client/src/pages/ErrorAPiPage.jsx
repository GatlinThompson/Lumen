import { useNavigate } from "react-router-dom";

import Button from "../components/basic-components/Button";
import PageHeader from "../components/basic-components/PageHeader";

export default function ErrorAPiPage() {
  const navigate = useNavigate();
  return (
    <>
      <div className="errorapi_container">
        <PageHeader title={"An Error has occured."} />
        <p>Something has gone wrong in the back end. Please try again later</p>
        <Button
          variant="yellow"
          onClick={() => {
            navigate("/dashboard");
          }}
        >
          Back to Home
        </Button>
      </div>
    </>
  );
}
