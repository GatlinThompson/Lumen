/* login page */
import "../index.css";

function LoginUser() {
  return (
    <form>
      <h1>lumen</h1>
      <h2>login</h2>
      <div class="input-group flex-nowrap">
        <label htmlFor="Email">Email</label>
        <input type="text" />
      </div>
      <div class="input-group flex-nowrap">
        <label htmlFor="Password">Password</label>
        <input type="text" />
      </div>
      <button
        type="button"
        onClick={() => navigate("/login")}
        class="btn-login btn-outline-primary"
      >
        Login
      </button>
      <a href="">Dont Have an account? Sign up</a>
    </form>
  );
}

export default LoginUser;
