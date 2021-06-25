import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Nav from "../Shared/Nav/Nav";
import './Blog.css';

const Blog = () => {
    const { blogId } = useParams();
    const [blog, setBlog] = useState([]);
    useEffect(() => {
        fetch(`http://localhost:5000/blog/${blogId}`)
            .then((res) => res.json())
            .then((data) => {
                setBlog(data);
            });
    }, []);

    if(!blog?.title){
        return <h1>Loading an incredible blog</h1>
    }
    return (
        <div>
            <Nav />
            <div className="blog">
                <h1>{blog.title}</h1>
                <img src={blog.coverPhotoLink} alt=""/>
                <p>{blog.description}</p>
            </div>
        </div>
    );
};

export default Blog;
