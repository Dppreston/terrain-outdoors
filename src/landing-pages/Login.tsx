import { useContext } from "react";
import LoginComponent from "../account-components/LoginComponent";
import { GlobalContext, UserContext } from "../App";

const Login = () => {
  const { err } = useContext<GlobalContext>(UserContext);
  return (
    <>
      <div className="single__page--wrapper login__only">
        <h6>Login</h6>
        {err == 1 ? (
          <p style={{ color: "maroon" }}>
            Email/Password combination is incorrect. Please try again.
          </p>
        ) : null}
        <LoginComponent />
      </div>
    </>
  );
};
export default Login;
