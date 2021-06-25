import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ManageBlogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetch(`http://localhost:5000/blogs`)
            .then((res) => res.json())
            .then((data) => {
                setBlogs(data);
                console.log(data);
            });
    }, []);

    if (loading) {
        return (
            <div>
                <h1>Processing your request...</h1>
            </div>
        );
    }
    return (
        <div className="row">
            <h2 className="title-text my-4">Created Blogs</h2>
            <div
                className="row shadow-sm py-2 justify-content-around ms-3 text-danger"
                style={{ background: "#f8f8ffad", fontWeight: "bold" }}
            >
                <div className="col-md-6">Title</div>
                <div className="col-md-4">AddedBy</div>
                <div className="col-md-2">Manage</div>
            </div>
            {blogs &&
                blogs.map((blog) => {
                    return (
                        <div
                            className="row shadow-sm mt-3 ms-3 py-2 justify-content-around"
                            style={{ background: "#f8f8ff80" }}
                        >
                            <div className="col-md-6">
                                <Link to={`/blogs/${blog._id}`} className="text-dark">
                                    {blog.title}
                                </Link>
                            </div>
                            <div className="col-md-4">{blog.email}</div>
                            <div className="col-md-2 ps-4">
                                <span style={{ cursor: "pointer" }}>
                                    <span onClick={() => deleteBlog(blog._id, blog.name)}>
                                        <FontAwesomeIcon icon={faTrash} size="lg" color="crimson" />
                                    </span>
                                </span>
                            </div>
                        </div>
                    );
                })}
        </div>
    );

    function deleteBlog(id, name) {
        const confirm = window.confirm("Are you sure to delete: " + name);
        if (confirm) {
            setLoading(true);
            fetch(`http://localhost:5000/blogs/${id}`, {
                method: "DELETE",
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log(data);
                    if (data.deleted) {
                        window.location.reload();
                    } else {
                        setLoading(false);
                        alert(data.message);
                    }
                })
                .catch((err) => {
                    setLoading(false);
                    alert("Could not delete the selected blog!");
                });
        }
    }
};

export default ManageBlogs;
