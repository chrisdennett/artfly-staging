import React from "react";
import { Link } from 'react-router-dom';

const Home = function () {
    return (
        <div>
            <h1>Home</h1>
            <p>Marketing stuff.</p>
            <Link to="/gallery/123galleryId">Featured Gallery</Link>
        </div>
    );
};

export default Home;