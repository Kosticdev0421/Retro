import { createContext, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Blog from "./components/Blog/Blog";
import Dashboard from "./components/Dashboard/Dashboard/Dashboard";
import Home from "./components/Home/Home/Home";
import LogIn from "./components/Login/Login/Login";
import PrivateRoute from './components/Shared/PrivateRoute/PrivateRoute';
export const userContext = createContext();

function App() {
    const [currentUser, setCurrentUser] = useState({});
    return (
        <userContext.Provider value={[currentUser, setCurrentUser]}>
            <Router>
                <Switch>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route path="/blogs/:blogId">
                        <Blog />
                    </Route>
                    <Route path="/login">
                        <LogIn />
                    </Route>
                    <PrivateRoute path="/dashboard">
                        <Dashboard />
                    </PrivateRoute>
                </Switch>
            </Router>
        </userContext.Provider>
    );
}

export default App;
