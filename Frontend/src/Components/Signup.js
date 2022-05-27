import { Link, useNavigate } from "react-router-dom";
import "../App.css";
import { ReactComponent as LoginImage } from "../assets/loginImage.svg";
import { useAuth } from "../context/AuthContext";
import React, { useRef, useState } from "react";

export default function Signup() {
  const { registerUser, updateUserName } = useAuth();
  const navigate = useNavigate();
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const userNameRef = useRef("");
  const [isloading, setIsLoading] = useState(false);
  let ifErrorOccurred = false;

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setIsLoading(true);
      await registerUser(emailRef.current.value, passwordRef.current.value);
      await updateUserName(userNameRef.current.value);
    } catch {
      ifErrorOccurred = true;
      alert("Failed to create account!");
    }
    setIsLoading(false);
    if (!ifErrorOccurred) {
      navigate("/");
    }
  }

  return (
    <div className="parent-div">
      <div className="child-div">
        <div className="row">
          <div className="column">
            <LoginImage className="loginImage" />
          </div>
          <div className="column">
            <form onSubmit={handleSubmit}>
              <h3 className="signupTitle">Member Registration</h3>
              <p>
                <input
                  type="text"
                  placeholder="Username"
                  className="inputButton"
                  ref={userNameRef}
                  required
                />
              </p>
              <p>
                <input
                  type="email"
                  placeholder="Email"
                  className="inputButton"
                  ref={emailRef}
                  required
                />
              </p>
              <p>
                <input
                  type="password"
                  placeholder="Password"
                  className="inputButton"
                  ref={passwordRef}
                  required
                />
              </p>
              {/* <p>
                <input
                  type="password"
                  placeholder="Re-Enter Password"
                  className="inputButton"
                />
              </p> */}
              <p>
                <button
                  disabled={isloading}
                  className="signupButton"
                  type="submit"
                >
                  REGISTER
                </button>
              </p>
              <div className="createAccount">
                Already have an account? <Link to="/">Log In</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
