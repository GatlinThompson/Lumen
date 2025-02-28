/* login page */
import "../index.css";
import logo from "../assets/images/lumenlogo_full_light.svg";
import Button from "./Button";
import Input from "../components/Input";

function LoginUser() {
  return (
    <>
      <img src={logo} alt="Lumen logo" />
      <form>
        <h2>Login</h2>

        <Input
          type="email"
          label="Email"
          name="email"
          placeholder="Enter your email"
          required
        />
        <Input
          type="password"
          label="Password"
          name="password"
          placeholder="Enter your password"
          required
        />

        <Button variant="black" type="button" onClick={() => navigate("#")}>
          Login
        </Button>
        <a href="/registration">Don't have an account? Sign up</a>
      </form>
    </>
  );
}

export default LoginUser;
