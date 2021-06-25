import React from 'react';
import Footer from '../../Shared/Footer/Footer';
import Nav from '../../Shared/Nav/Nav';
import Blogs from '../Blogs/Blogs';
import Header from '../Header/Header';
import Testimonials from '../Testimonials/Testimonials';

const Home = () => {
    return (
        <div className="home">
            <Nav />
            <Header />
            <Blogs />
            <Testimonials />
            <Footer />
        </div>
    );
};

export default Home;