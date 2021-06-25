import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useContext, useRef, useState } from 'react';
import { useHistory } from 'react-router';
import { userContext } from '../../../App';

const AddBlog = () => {
    const [coverPhotoLink, setCoverPhotoLink] = useState("");
    const blogTitleRef = useRef();
    const blogDescriptionRef = useRef();
    const [currentUser, setCurrentUser] = useContext(userContext);
    const history = useHistory();
    const [imageLoaded, setImageLoaded] = useState("");

    return (
        <div>
            <h2>Add Blog</h2>
            <form onSubmit={handleAddBlog}>
                <div>
                    <small>Blog Title</small>
                    <input type="text" placeholder="Enter Title" required ref={blogTitleRef} />
                </div>
                
                <div>
                    <small>Description</small>
                    <textarea
                        cols="30"
                        rows="10"
                        placeholder="Enter Description"
                        required
                        ref={blogDescriptionRef}
                    ></textarea>
                </div>
                <div>
                    <small>Add Blog Cover Photo</small>
                    <input type="file" required onChange={getPhotoLink} />
                    {
                        imageLoaded && <p>{imageLoaded}</p>
                    }
                </div>
                <button className="btn btn-brand" disabled={!coverPhotoLink} >
                    <FontAwesomeIcon icon={faPlus} size="lg" />
                </button>
            </form>
        </div>
    );

    function handleAddBlog(e){
        e.preventDefault();
        if (coverPhotoLink) {
            const newBlog = {
                email: currentUser.email,
                title: blogTitleRef.current.value,
                description: blogDescriptionRef.current.value,
                coverPhotoLink,
            };
            console.log(newBlog);
            fetch(`http://localhost:5000/addBlog`, {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    "x-access-token": localStorage.getItem('ptToken')
                },
                body: JSON.stringify(newBlog),
            })
            .then(res => res.json())
            .then((data) => {
                if (data) {
                    console.log(data);
                    history.push("/");
                } else {
                    alert("Something went wrong, please try again!");
                }
            });
        } else {
            alert("Photo was not uploaded! Please wait");
        }
    }

    function getPhotoLink(e) {
        const imageData = new FormData();

        imageData.set("key", "944474bba0b71f9545ba1025a047dc94");
        imageData.append("image", e.target.files[0]);
        axios
        .post("https://api.imgbb.com/1/upload", imageData)
        .then((response) => {
                setCoverPhotoLink(response.data.data.display_url);
            })
            .catch((err) => {
                console.log(err);
            });
    }
};

export default AddBlog;