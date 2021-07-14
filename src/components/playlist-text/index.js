import React from 'react';
import './index.css';

const index = ({ title, artists, album }) => {
    return (
        <div class="text-item">
            <h1 className="title-item">{title}</h1>
            <h2 className="artists-item">{artists}</h2>
            <h3 className="album-item">{album}</h3>
        </div>
    )
}

export default index
