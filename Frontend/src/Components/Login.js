import "../App.css";
import { ReactComponent as LoginImage } from "../assets/loginImage.svg";
import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const [isloading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const emailRef = useRef("");
  const passwordRef = useRef("");
  let ifErrorOccurred = false;

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setIsLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
    } catch (err) {
      ifErrorOccurred = true;
      alert("Failed to Login");
    }

    setIsLoading(false);

    if (!ifErrorOccurred) {
      navigate("/voilin");
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
              <h3 className="loginTitle">Member Login</h3>
              <p>
                <input
                  type="email"
                  placeholder="Email"
                  className="inputButton"
                  ref={emailRef}
                />
              </p>
              <p>
                <input
                  type="password"
                  placeholder="Password"
                  className="inputButton"
                  ref={passwordRef}
                />
              </p>
              <p>
                <button
                  disabled={isloading}
                  className="loginButton"
                  type="submit"
                >
                  LOGIN
                </button>
              </p>
              <div className="createAccount">
                Dont have an account? <Link to="/signup">Sign up</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
