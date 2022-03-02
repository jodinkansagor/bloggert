import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "./login.scss";
import {
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs
} from "firebase/firestore";
import Button from "../Button";
import useStore from "../common/store";

function Login() {
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  const googleProvider = new GoogleAuthProvider();
  const logInWithGoogle = async () => {
    try {
      const res = await signInWithPopup(auth, googleProvider);
      const user = res.user;
      const q = query(collection(db, "users"), where("uid", "==", user.uid));
      const docs = await getDocs(q);
      if (docs.docs.length === 0) {
        await addDoc(collection(db, "users"), {
          uid: user.uid,
          name: user.displayName,
          authProvider: "google",
          email: user.email,
        });
      }
    } catch (err) {
      console.error(err);
    }
  };
    
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
  }, [user, loading, error]);

  return (
    <div className="login">
      <Button title="Login with Google" onClick={logInWithGoogle} />
    </div>
  );
}
export default Login;