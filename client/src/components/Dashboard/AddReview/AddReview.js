import React, { useContext, useRef } from 'react';
import { useHistory } from 'react-router';
import { userContext } from '../../../App';

const AddReview = () => {
    const nameRef = useRef();
    const fromRef = useRef();
    const quoteRef = useRef();
    const [currentUser, setCurrentUser] = useContext(userContext);
    const history = useHistory();
    return (
        <div>
            <h2>Review</h2>
            <form onSubmit={handleAddReview}>
                <input type="text" placeholder="Your Name" ref={nameRef} />
                <input type="text" placeholder="Company’s name, Designation" ref={fromRef} />
                <textarea placeholder="Write something nice" ref={quoteRef} />
                <button className="btn btn-brand">Submit</button>
            </form>
        </div>
    );

    function handleAddReview(e){
        e.preventDefault();
        const reviewInfo = {
            name: nameRef.current.value,
            from: fromRef.current.value,
            quote: quoteRef.current.value,
            img: currentUser.photoURL,
            addedTime: new Date(),
        };
        fetch(`http://localhost:5000/addReview`, {
            method: "POST",
            headers: {
                'content-type': 'application/json',
                'x-access-token': localStorage.getItem('ptToken')
            },
            body: JSON.stringify(reviewInfo)
        })
        .then(res => res.json())
        .then(data => {
            if(data){
                history.push('/#reviews');
            } else {
                alert('Something went wrong, please try again!');
            }
        })
    }
};

export default AddReview;