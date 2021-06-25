import React, { useContext, useEffect, useState } from "react";
import { Redirect, Route } from "react-router";
import { userContext } from "../../../App";

const PrivateRoute = ({ children, ...rest }) => {
    const [currentUser, setCurrentUser] = useContext(userContext);
    const [loading, setLoading] = useState(true);
    console.log(currentUser);

    useEffect(() => {
        fetch(`http://localhost:5000/getUser`, {
            headers: {
                "content-type": "application/json",
                "x-access-token": localStorage.getItem("ptToken"),
            },
        })
            .then((res) => res.json())
            .then((result) => {
                console.log(result);
                if (result.auth) {
                    setCurrentUser(result.user);
                    setLoading(false);
                } else {
                    setLoading(false);
                }
            });
    }, []);
    if (loading) {
        return (
            <div className="loading">
                <h1>Processing your request...</h1>
            </div>
        );
    }
    return (
        <Route
            {...rest}
            render={({ location }) =>
                currentUser.email ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: location },
                        }}
                    />
                )
            }
        />
    );
};

export default PrivateRoute;
