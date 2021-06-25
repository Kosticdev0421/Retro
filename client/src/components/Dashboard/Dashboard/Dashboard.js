import React from "react";
import { Route, Switch } from "react-router-dom";
import AddBlog from "../AddBlog/AddBlog";
import AddReview from "../AddReview/AddReview";
import ManageBlogs from "../ManageBlogs/ManageBlogs";
import Sidebar from "../Sidebar/Sidebar";

const Dashboard = () => {
    return (
        <div className="dashboard">
            <div className="row">
                <Sidebar />
                <div className="col-md-10">
                    <Switch>
                        <Route exact path="/dashboard">
                            <ManageBlogs />
                        </Route>
                        <Route path="/dashboard/add-blog">
                            <AddBlog />
                        </Route>
                        <Route path="/dashboard/manage-blogs">
                            <ManageBlogs />
                        </Route>
                        <Route path="/dashboard/review">
                            <AddReview />
                        </Route>
                    </Switch>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
