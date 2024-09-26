import React from 'react';
import { Link } from 'react-router-dom';
// import FeaturedArtists from './FeaturedArtists';
// import FeaturedArtworks from './FeaturedArtworks';

const Home = () => {
    return (
        <div className="home">
            <header className="hero">
                <h1>ArtConnect</h1>
                <p>Perfect Online Art Gallery to Get Started</p>
                <Link to="/gallery" className="cta-button">Get Started</Link>
            </header>

            <section className="categories">
                <div className="category">
                    <h3>Paintings</h3>
                </div>
                <div className="category">
                    <h3>Sculptures</h3>
                </div>
                <div className="category">
                    <h3>Photography</h3>
                </div>
            </section>

            {/* <FeaturedArtworks />
            <FeaturedArtists /> */}

            <section className="newsletter">
                <h2>Stay up to date with ArtConnect</h2>
                <p>Sign up for our newsletter</p>
                <form>
                    <input type="email" placeholder="Enter your email" />
                    <button type="submit">Sign Up</button>
                </form>
            </section>
        </div>
    );
};

export default Home;