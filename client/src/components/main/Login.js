import { useRef, useState, useEffect, useContext } from "react";
import AuthContext from "../../context/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../api/axios";
const LOGIN_URL = "/auth";

export default function Login() {
  const { setAuth } = useContext(AuthContext);
  const userRef = useRef(); // set focus on first input
  const errRef = useRef(); // set focus on error if occurs

  const nav = useNavigate();

  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    // set focus on first input when the component loads
    userRef.current.focus();
  }, []);

  useEffect(() => {
    // set message empty when user or password inputs change
    setErrMsg("");
  }, [user, password]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        // axios will tell us about error and we don't need to convert json file
        LOGIN_URL,
        JSON.stringify({ user, password }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      const id = response?.data?.id;
      const accessToken = response?.data?.accessToken;
      const roles = response?.data.roles;
      const firstname = response?.data.foundResult.firstname;
      const lastname = response?.data.foundResult.lastname;
      const address = response?.data.foundResult.address;
      const orders = response?.data.foundResult.orders;

      setAuth({
        id,
        user,
        // password,
        roles,
        accessToken,
        firstname,
        lastname,
        address,
        orders,
      });
      // saved in global context
      setUser("");
      setPassword("");
      nav("/");
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <section className="login--main">
      <p
        ref={errRef} // focus on errRef
        className={errMsg ? "errmsg" : "offscreen"} // if true then errmsg
        aria-live="assertive" // screen reader will announce this message immediately if errMsg true
      >
        {errMsg}
      </p>
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <br />
        <input
          type="text"
          id="username"
          ref={userRef}
          autoComplete="off"
          onChange={(e) => setUser(e.target.value)}
          value={user}
          required
        />
        <br />
        <label htmlFor="password">Password:</label>
        <br />
        <input
          type="password" // dots
          id="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required
        />
        <br />
        <button>Sign In</button>
        <p>
          Need an Account? <br />
          <span className="line">
            <Link to={"/register-user"}>Register </Link>
          </span>
        </p>
      </form>
    </section>
  );
}
