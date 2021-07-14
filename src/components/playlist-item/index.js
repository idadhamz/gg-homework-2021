import React from 'react';
import './index.css';

// Components
import PlaylistText from '../playlist-text'

const index = ({ data }) => {
    return (
        <div className="playlist-item">
            <img className="img-div" src={data.album.images[0].url} width={data.album.images[0].width} height={data.album.images[0].height}></img>
            
            <PlaylistText title={data.album.name} artists={data.album.artists[0].name} album={data.album.name} />
            
            <div className="a-item">
                <a href={data.album.external_urls.spotify}>To Spotify Library</a>
            </div>
        </div>
    )
}

export default index