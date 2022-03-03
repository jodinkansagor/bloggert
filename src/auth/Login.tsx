import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "./login.scss";
import { logInWithGoogle } from "../firebase"
import Button from "../Button";

function Login() {
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (error) {
      console.error(error)
    }
    if (user) {
      navigate("/");
    }
  }, [user, loading, error, navigate]);

  return (
    <div className="login">
      <Button title="Login with Google" onClick={logInWithGoogle} />
    </div>
  );
}
export default Login;