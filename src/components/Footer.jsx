import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer>
            <div className="footer-links">
                <Link to="/">Home</Link>
                <Link to="/shop">Shop</Link>
                <Link to="/contact">Contact</Link>
                <Link to="/style-guide">Style Guide</Link>
            </div>
            <div className="social-links">
                {/* Add social media icons/links here */}
            </div>
            <p>&copy; 2023 ArtConnect. Powered by WebFlow</p>
        </footer>
    );
};

export default Footer;