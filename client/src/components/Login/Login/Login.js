import firebase from "firebase/app";
import React, { useContext, useRef, useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { userContext } from "../../../App";
import Nav from "../../Shared/Nav/Nav";
import { auth } from "./firebase";
import "./Login.css";


const LogIn = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const [error, setError] = useState();
    const [currentUser, setCurrentUser] = useContext(userContext);
    const [loading, setLoading] = useState(false);

    let history = useHistory();
    let location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };

    function handleLogIn(e) {
        setLoading(true);
        e.preventDefault();
        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        auth.signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                // console.log(user);
                const newUser = { displayName: user.displayName, email: user.email, uid: user.uid };
                setCurrentUser(newUser);
                fetch("http://localhost:5000/users", {
                    method: "POST",
                    headers: {
                        "content-type": "application/json",
                    },
                    body: JSON.stringify(newUser),
                })
                    .then((res) => res.json())
                    .then((data) => {
                        if (data.success) {
                            localStorage.setItem("ptToken", data.token);
                            history.replace(from);
                        }
                    });

            })
            .catch((error) => {
                setLoading(false);
                const errorMessage = error.message;
                setError(errorMessage);
            });
    }
    function googleLogIn() {
        const provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider)
            .then((result) => {
                const user = result.user;
                // console.log(user);
                const newUser = {
                    displayName: user.displayName,
                    email: user.email,
                    uid: user.uid,
                    photoURL: user.photoURL,
                };
                setCurrentUser(newUser);
                fetch("http://localhost:5000/users", {
                    method: "POST",
                    headers: {
                        "content-type": "application/json",
                    },
                    body: JSON.stringify(newUser),
                })
                    .then((res) => res.json())
                    .then((data) => {
                        if (data.success) {
                            localStorage.setItem("ptToken", data.token);
                            history.replace(from);
                        }
                    });
            })
            .catch((error) => {
                // Handle Errors
                var errorMessage = error.message;
                setError(errorMessage);
            });
    }
    if(loading){
        return (
            <h1>Processing Your Request...</h1>
        )
    }
    return (
        <div className="log-in">
            <LogInForm />
            <span className="divider">Or</span>
            <button className="btn other-log-in-btn" onClick={googleLogIn}>
                Continue with Google
            </button>
        </div>
    );
    function LogInForm() {
        return (
            <div>
                <Nav />

                <form onSubmit={handleLogIn} className="log-in-form">
                    <h2>Login</h2>
                    {error && <p className="error">{error}</p>}
                    <input
                        ref={emailRef}
                        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                        required
                        placeholder="Email"
                        onInvalid={(e) => e.target.setCustomValidity("Enter your valid email here")}
                    />
                    <input
                        type="password"
                        ref={passwordRef}
                        pattern="(?=.*\d)(?=.*[a-z]).{6,}"
                        required
                        placeholder="password"
                        onInvalid={(e) =>
                            e.target.setCustomValidity(
                                "Passwords without numbers and less than 6 characters are not passwords!"
                            )
                        }
                    />
                    <div className="form-bottom">
                        <div>
                            <input type="checkbox" id="remember" />
                            <small htmlFor="remember">Remember me</small>
                        </div>
                        <a href="#" className="link-text">
                            Forgot password?
                        </a>
                    </div>
                    <button className="btn submit-btn">Log in</button>
                    <small>
                        Don't have an account?{" "}
                        <Link to="/signup" className="link-text">
                            Create an account
                        </Link>
                    </small>
                </form>
            </div>
        );
    }
};

export default LogIn;
