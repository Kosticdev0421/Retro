import React, { useEffect, useState } from 'react';
import BlogCard from './BlogCard';
import './Blogs.css';

const Blogs = () => {
    const [blogs, setBlogs] = useState([]);
    useEffect(() => {
        fetch(`http://localhost:5000/blogs`)
        .then(res => res.json())
        .then(data => {
            setBlogs(data);
            console.log(data);
        })
    }, [])
    return (
        <div id="blogs">
            <h1 className="text-center title-text mt-5">
                Our Blogs
            </h1>
            <div className="row justify-content-center">
                {blogs &&
                    blogs.map((blog) => {
                        return (
                            <BlogCard blog={blog} />
                        );
                    })}
            </div>
        </div>
    );
};

export default Blogs;