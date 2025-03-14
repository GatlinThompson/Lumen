import { useNavigate } from "react-router-dom";

import Button from "../components/basic-components/Button";
import Footer from "../components/layout/Footer";
import errorImage from "../assets/images/error-image.svg";
export default function ErrorPage() {
  const navigate = useNavigate();
  return (
    <>
      <main className="no-nav error">
        <div className="error-container">
          <div>
            <img src={errorImage} alt="Error Lumen Image" />
          </div>
          <Button variant="yellow" onClick={() => navigate("/dashboard")}>
            Back to home
          </Button>
        </div>
      </main>
      <Footer noNavbar={true} />
    </>
  );
}
