import React from 'react'
import './index.css'

// Components
import PlaylistItem from '../../components/playlist-item';

// Data
import data from '../../data/index';

const index = () => {
    return (
        <div class="playlist">
            <h1>Data Playlist</h1>

            <div className="list-playlist">
                <PlaylistItem data={data} />
                <PlaylistItem data={data} />
            </div>
        </div>
    )
}

export default index