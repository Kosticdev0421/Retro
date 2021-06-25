import { faFacebookF, faGooglePlusG, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import FooterCol from "../FooterCol/FooterCol";
import "./Footer.css";

const Footer = () => {
    const ourAddress = [
        { name: "New York - 101010 Hudson", link: "//google.com/map" },
        { name: "Yards", link: "//google.com/map" },
    ];

    const quickLinks = [
        { name: "Login", link: "/login" },
        { name: "Dashboard", link: "/dashboard" },
        { name: "Our blog", link: "/blog" },
    ];
    return (
        <footer className="footer-area clear-both">
            <div className="container pt-5">
                <div className="row py-5">
                    <FooterCol key={1} menuTitle="Quick Links" menuItems={quickLinks} />
                    <FooterCol key={2} menuTitle="Our Address" menuItems={ourAddress}>
                        <ul className="social-media list-inline">
                            <li className="list-inline-item">
                                <a href="//facebook.com">
                                    <FontAwesomeIcon
                                        className="icon active-icon"
                                        icon={faFacebookF}
                                    />
                                </a>
                            </li>
                            <li className="list-inline-item">
                                <a href="//google.com">
                                    <FontAwesomeIcon className="icon" icon={faGooglePlusG} />
                                </a>
                            </li>
                            <li className="list-inline-item">
                                <a href="//instagram.com">
                                    <FontAwesomeIcon className="icon" icon={faInstagram} />
                                </a>
                            </li>
                        </ul>
                        <div className="mt-5">
                            <h6>Call now</h6>
                            <a href="tel:123-456-7890">
                                <button className="btn btn-brand">123-456-7890</button>
                            </a>
                        </div>
                    </FooterCol>
                </div>
                <div className="copyRight text-center">
                    <p>Copyright {new Date().getFullYear()} All Rights Reserved</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
