import React from 'react';
import './index.css';
import data from '../../data/index';

const index = () => {
    return (
        <div className="playlist">
            <div className="playlist-item">
                <img className="img-div" src={data.album.images[0].url} width={data.album.images[0].width} height={data.album.images[0].height}></img>
                <h1 className="title-item">{data.album.name}</h1>
                <h3 className="artists-item">{data.album.artists[0].name}</h3>
                <h3 className="album-item">{data.album.name}</h3>
                <div className="a-item">
                    <a href={data.album.external_urls.spotify}>To Spotify Library</a>
                </div>
            </div>
        </div>
    )
}

export default index