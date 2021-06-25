import React from "react";
import { Link } from "react-router-dom";
import "./Blogs";
const BlogCard = ({ blog }) => {
    return (
        <div className="col-md-3" style={{ paddingRight: 0 }}>
            <div className="shadow-lg p-3 m-2 blog-card">
                <img src={blog.coverPhotoLink} alt="" className="img-fluid" />
                <h4 className="highlighted-text">{blog.title}</h4>

                <p>
                    {blog.description.length < 100
                        ? blog.description
                        : blog.description.slice(0, 100) + "..."}
                </p>
                <Link to={`/blogs/${blog._id}`}>
                    <button className="btn btn-brand">Read</button>
                </Link>
            </div>
        </div>
    );
};

export default BlogCard;
