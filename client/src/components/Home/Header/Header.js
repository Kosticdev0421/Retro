import React from 'react';
// import headerImg from '../../../images/glenn-carstens-peters-RLw-UC03Gwc-unsplash.jpg';
import './Header.css';
const Header = () => {
    return (
        <div className="header">
            <div className="row w-75 m-auto mt-5 d-flex justify-content-center align-items-center">
                <div className="col-md-12">
                    <hr/>
                    <hr/>
                    <h1 className="title-text">
                        RETRO TECH LOVER
                    </h1>
                    <hr/>
                    <hr/>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. <br/> Eius eos velit, illum soluta iste numquam quaerat perspiciatis. Sequi, vero similique.
                    </p>
                    <a href="#blogs">
                        <button className="btn btn-brand my-2">View Blogs</button>
                    </a>
                </div>
                {/* <div className="col-md-6">
                    <img src={headerImg} alt="" className="img-fluid" />
                </div> */}
            </div>
        </div>
    );
};

export default Header;