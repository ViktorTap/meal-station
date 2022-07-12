import React from "react";
import { useRef, useState, useEffect } from "react";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "../../api/axios";
import { Link } from "react-router-dom";

const USERNAME_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/; //start with a-zA-Z must be followed by next array and must be 3 - 23 char long
const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/; // atleast one etc.
const REGISTER_URL = "/register-user";

export default function UserRegistration() {
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState({
    username: "",
    firstname: "",
    lastname: "",
    address: "",
  });
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const [matchPassword, setMatchPassword] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    const username = user.username;
    const result = USERNAME_REGEX.test(username);
    setValidName(result);
  }, [user]);

  useEffect(() => {
    const result = PASSWORD_REGEX.test(password);
    setValidPassword(result);
    const match = password === matchPassword;
    setValidMatch(match);
  }, [password, matchPassword]);

  useEffect(() => {
    setErrMsg("");
  }, [user, password, matchPassword]);

  function handleChange(event) {
    const { name, value } = event.target;

    setUser((prevUser) => {
      return {
        ...prevUser,
        [name]: value,
      };
    });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    // if button enabled with JS hack
    const v1 = USERNAME_REGEX.test(user.username);
    const v2 = PASSWORD_REGEX.test(password);

    const username = user.username;
    const firstname = user.firstname;
    const lastname = user.lastname;
    const address = user.address;

    if (!v1 || !v2) {
      setErrMsg("Invalid Entry");
      return;
    }
    try {
      const response = await axios.post(
        REGISTER_URL,
        JSON.stringify({ username, firstname, lastname, address, password }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(response);
      setSuccess(true);
      // clear input fields set states back to empty strings
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 409) {
        setErrMsg("Username Taken");
      } else {
        setErrMsg("Registration Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <>
      {success ? (
        <section>
          <h1>Success!</h1>
          <p>
            <Link to={"/"}>
              <h4>Sign In</h4>
            </Link>
          </p>
        </section>
      ) : (
        <section>
          <p
            ref={errRef}
            className={
              errMsg
                ? ".user-registration--errmsg"
                : "user-registration--offscreen"
            }
            aria-live="assertive"
          >
            {errMsg}
          </p>

          <div className="user-registration--main">
            <h1>Account Registration</h1>
            <form onSubmit={handleSubmit}>
              <label htmlFor="username">
                Username:
                <span
                  className={
                    validName
                      ? "user-registration--valid"
                      : "user-registration--hide"
                  }
                >
                  <FontAwesomeIcon icon={faCheck} />
                </span>
                <span
                  className={
                    validName || !user.username
                      ? "user-registration--hide"
                      : "user-registration--invalid"
                  }
                >
                  <FontAwesomeIcon icon={faTimes} />
                </span>
              </label>
              <input
                type="text"
                id="username"
                name="username"
                ref={userRef}
                autoComplete="off"
                onChange={handleChange}
                required
                aria-invalid={validName ? "false" : "true"}
                aria-describedby="user-registration--uidnote"
                onFocus={() => setUserFocus(true)}
                onBlur={() => setUserFocus(false)}
              />
              <p
                id="user-registration--uidnote"
                className={
                  userFocus && user.username && !validName
                    ? "user-registration--instructions"
                    : "user-registration--offscreen"
                }
              >
                <FontAwesomeIcon icon={faInfoCircle} />
                4 to 24 characters.
                <br />
                Must begin with a letter.
                <br />
                Letters, numbers, underscores, hyphens allowed.
              </p>
              <br />
              <label htmlFor="firstname">Firstname:</label>
              <input
                type="text"
                id="firstname"
                name="firstname"
                ref={userRef}
                onChange={handleChange}
                required
                onFocus={() => setUserFocus(true)}
                onBlur={() => setUserFocus(false)}
              />
              <br />
              <label htmlFor="lastname">Lastname:</label>
              <input
                type="text"
                id="lastname"
                name="lastname"
                ref={userRef}
                onChange={handleChange}
                onFocus={() => setUserFocus(true)}
                onBlur={() => setUserFocus(false)}
              />
              <br />
              <label htmlFor="address">Address:</label>
              <input
                type="text"
                id="address"
                name="address"
                ref={userRef}
                onChange={handleChange}
                required
                onFocus={() => setUserFocus(true)}
                onBlur={() => setUserFocus(false)}
              />
              <br />
              <label htmlFor="password">
                Password:
                <span
                  className={
                    validPassword
                      ? "user-registration--valid"
                      : "user-registration--hide"
                  }
                >
                  <FontAwesomeIcon icon={faCheck} />
                </span>
                <span
                  className={
                    validPassword || !password
                      ? "user-registration--hide"
                      : "user-registration--invalid"
                  }
                >
                  <FontAwesomeIcon icon={faTimes} />
                </span>
              </label>
              <input
                type="password"
                id="password"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                required
                aria-invalid={validPassword ? "false" : "true"}
                aria-describedby="user-registration--password-note"
                onFocus={() => setPasswordFocus(true)}
                onBlur={() => setPasswordFocus(false)}
              />
              <p
                id="user-registration--password-note"
                className={
                  passwordFocus && password && !validPassword
                    ? "user-registration--instructions"
                    : "user-registration--offscreen"
                }
              >
                <FontAwesomeIcon icon={faInfoCircle} />
                8 to 24 characters.
                <br />
                Must include uppercase and lowercse letters, a number and a
                special character.
                <br />
                Allowed special characters:{" "}
                <span aria-label="exclamation mark">!</span>
                <span aria-label="at symbol">@</span>
                <span aria-label="hashtag">#</span>
                <span aria-label="dollar sign">$</span>
                <span aria-label="percent">%</span>
              </p>
              <br />
              <label htmlFor="confirm_pwd">
                Confirm Password:
                <span
                  className={
                    validMatch && matchPassword
                      ? "user-registration--valid"
                      : "user-registration--hide"
                  }
                >
                  <FontAwesomeIcon icon={faCheck} />
                </span>
                <span
                  className={
                    validMatch || !matchPassword
                      ? "user-registration--hide"
                      : "user-registration--invalid"
                  }
                >
                  <FontAwesomeIcon icon={faTimes} />
                </span>
              </label>
              <input
                type="password"
                id="confirm_pwd"
                onChange={(e) => setMatchPassword(e.target.value)}
                required
                aria-invalid={validMatch ? "false" : "true"}
                aria-describedby="user-registration--confirmnote"
                onFocus={() => setMatchFocus(true)}
                onBlur={() => setMatchFocus(false)}
              />
              <p
                id="user-registration--confirmnote"
                className={
                  matchFocus && !validMatch
                    ? "user-registration--instructions"
                    : "user-registration--offscreen"
                }
              >
                <FontAwesomeIcon icon={faInfoCircle} />
                Must match the first password input field.
              </p>
              <br />
              <button
                disabled={
                  !validName || !validPassword || !validMatch ? true : false
                }
              >
                Sign Up
              </button>
            </form>
          </div>
        </section>
      )}
    </>
  );
}
