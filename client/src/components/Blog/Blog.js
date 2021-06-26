import { faClock, faUserAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import { useEffect, useState } from "react";
import Markdown from "react-markdown";
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
                <small>
                    <span>
                        <FontAwesomeIcon icon={faUserAlt} /> {blog.addedBy}
                    </span>
                    <span>
                        <FontAwesomeIcon icon={faClock} />{" "}
                        {moment(blog.addedAt).format("DD/MM/YYYY")}
                    </span>
                </small>
                <img src={blog.coverPhotoLink} alt="" />
                <p>
                    <Markdown>
                        {blog.description}
                    </Markdown>
                </p>
            </div>
        </div>
    );
};

export default Blog;
